// @vitest-environment jsdom

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { calculateSalary } from "@/domain/salary";
import { SalaryCalculator } from "@/components/salary-calculator";
import { formatEuro } from "@/lib/salaryPresentation";

function formatVisibleEuro(value: number) {
  return formatEuro(value).replace(/\u00A0/g, " ");
}

describe("SalaryCalculator UI", () => {
  it("keeps results hidden before the first valid submission", () => {
    render(<SalaryCalculator />);

    expect(screen.queryByText("Netto mensile medio")).not.toBeInTheDocument();
    expect(screen.getByText("Nessuna simulazione mostrata")).toBeInTheDocument();
  });

  it("shows the golden-case monthly and annual values after submitting EUR 35,000 and 13 installments", async () => {
    const user = userEvent.setup();
    render(<SalaryCalculator />);

    await user.click(screen.getByRole("button", { name: "Calcola il netto" }));

    const thirteenInstallmentResult = calculateSalary({
      grossAnnualSalary: 35_000,
      installments: 13,
    });
    const monthlyNetHeading = screen.getByRole("heading", { name: "Netto mensile medio" });
    const resultsSummary = monthlyNetHeading.closest("section");

    expect(resultsSummary).not.toBeNull();

    const annualNetLabel = within(resultsSummary!).getByText("Netto annuale");

    expect(monthlyNetHeading).toBeInTheDocument();
    expect(monthlyNetHeading.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(thirteenInstallmentResult.totals.averageMonthlyNetSalary),
    );
    expect(annualNetLabel.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(thirteenInstallmentResult.totals.annualNetSalary),
    );
    expect(screen.getByText("Media annuale su 13 mensilità")).toBeInTheDocument();
  });

  it("rejects an out-of-range RAL and removes stale results", async () => {
    const user = userEvent.setup();
    render(<SalaryCalculator />);

    await user.click(screen.getByRole("button", { name: "Calcola il netto" }));
    expect(screen.getByText("Netto mensile medio")).toBeInTheDocument();

    const input = screen.getByLabelText("Retribuzione annua lorda");
    await user.clear(input);
    await user.type(input, "15000");
    await user.click(screen.getByRole("button", { name: "Calcola il netto" }));

    expect(
      screen.getByText("Il prototipo supporta RAL comprese tra €20.000 e €100.000."),
    ).toBeInTheDocument();
    expect(screen.queryByText("Netto mensile medio")).not.toBeInTheDocument();
  });

  it("updates only the average monthly value when installments change and the user recalculates", async () => {
    const user = userEvent.setup();
    render(<SalaryCalculator />);

    await user.click(screen.getByRole("button", { name: "Calcola il netto" }));

    const thirteenInstallmentResult = calculateSalary({
      grossAnnualSalary: 35_000,
      installments: 13,
    });
    const twelveInstallmentResult = calculateSalary({
      grossAnnualSalary: 35_000,
      installments: 12,
    });
    const monthlyNetHeading = screen.getByRole("heading", { name: "Netto mensile medio" });
    const resultsSummary = monthlyNetHeading.closest("section");

    expect(resultsSummary).not.toBeNull();

    const annualNetLabel = within(resultsSummary!).getByText("Netto annuale");

    expect(monthlyNetHeading.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(thirteenInstallmentResult.totals.averageMonthlyNetSalary),
    );
    expect(annualNetLabel.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(thirteenInstallmentResult.totals.annualNetSalary),
    );
    expect(screen.getByText("Media annuale su 13 mensilità")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "12" }));
    await user.click(screen.getByRole("button", { name: "Calcola il netto" }));

    expect(annualNetLabel.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(twelveInstallmentResult.totals.annualNetSalary),
    );
    expect(monthlyNetHeading.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(twelveInstallmentResult.totals.averageMonthlyNetSalary),
    );
    expect(screen.getByText("Media annuale su 12 mensilità")).toBeInTheDocument();
  });
});
