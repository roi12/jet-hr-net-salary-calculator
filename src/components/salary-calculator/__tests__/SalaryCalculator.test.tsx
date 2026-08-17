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

function formatGinTonic(value: number) {
  return `≈ ${new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 0,
  }).format(Math.floor(value / 8))} gin tonic`;
}

describe("SalaryCalculator UI", () => {
  it("keeps results hidden before the first valid submission", () => {
    render(<SalaryCalculator />);

    expect(screen.queryByText("Netto mensile medio")).not.toBeInTheDocument();
    expect(screen.getByText("Nessuna simulazione mostrata")).toBeInTheDocument();
    expect(screen.getByText("Cosa semplifica questa stima")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Il risultato usa uno scenario standard: dipendente privato a Milano, anno completo, nessun altro reddito o agevolazione.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "I contributi INPS del dipendente usano l'aliquota standard del 9,19%; l'1% aggiuntivo si applica solo alla quota oltre €56.224.",
      ),
    ).toBeInTheDocument();
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
    const summaryQueries = within(resultsSummary!);

    expect(monthlyNetHeading).toBeInTheDocument();
    expect(monthlyNetHeading.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(thirteenInstallmentResult.totals.averageMonthlyNetSalary),
    );
    expect(screen.getByRole("radio", { name: "Euro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: /Gin tonic/i })).not.toBeChecked();
    expect(resultsSummary).toHaveTextContent("Netto annuale");
    expect(resultsSummary).toHaveTextContent(
      formatVisibleEuro(thirteenInstallmentResult.totals.annualNetSalary),
    );
    expect(summaryQueries.getByText("Media annuale su 13 mensilità")).toBeInTheDocument();
    expect(
      summaryQueries.getByText("Stima annualizzata, non previsione del singolo cedolino."),
    ).toBeInTheDocument();
    expect(summaryQueries.queryByText("Valore indicativo: 1 gin tonic = 8 €")).not.toBeInTheDocument();
    expect(summaryQueries.getByText("Aliquota fiscale effettiva")).toBeInTheDocument();
    expect(summaryQueries.getByText("Incidenza complessiva")).toBeInTheDocument();
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
    const summaryQueries = within(resultsSummary!);

    expect(monthlyNetHeading.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(thirteenInstallmentResult.totals.averageMonthlyNetSalary),
    );
    expect(resultsSummary).toHaveTextContent("Netto annuale");
    expect(resultsSummary).toHaveTextContent(
      formatVisibleEuro(thirteenInstallmentResult.totals.annualNetSalary),
    );
    expect(summaryQueries.getByText("Media annuale su 13 mensilità")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "12" }));
    await user.click(screen.getByRole("button", { name: "Calcola il netto" }));

    expect(resultsSummary).toHaveTextContent(
      formatVisibleEuro(twelveInstallmentResult.totals.annualNetSalary),
    );
    expect(monthlyNetHeading.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(twelveInstallmentResult.totals.averageMonthlyNetSalary),
    );
    expect(summaryQueries.getByText("Media annuale su 12 mensilità")).toBeInTheDocument();
  });

  it("switches between euro and gin tonic modes without changing domain values", async () => {
    const user = userEvent.setup();
    render(<SalaryCalculator />);

    await user.click(screen.getByRole("button", { name: "Calcola il netto" }));

    const result = calculateSalary({
      grossAnnualSalary: 35_000,
      installments: 13,
    });
    const monthlyNetHeading = screen.getByRole("heading", { name: "Netto mensile medio" });
    const resultsSummary = monthlyNetHeading.closest("section");

    expect(resultsSummary).not.toBeNull();
    const summaryQueries = within(resultsSummary!);
    const taxesLabel = summaryQueries.getByText("Imposte annuali");
    const contributionsLabel = summaryQueries.getByText("Contributi INPS");
    const withholdingsLabel = summaryQueries.getByText("Trattenute complessive");

    expect(monthlyNetHeading.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(result.totals.averageMonthlyNetSalary),
    );
    expect(resultsSummary).toHaveTextContent(formatVisibleEuro(result.totals.annualNetSalary));
    expect(taxesLabel.nextElementSibling).toHaveTextContent(formatVisibleEuro(result.totals.totalTaxes));
    expect(contributionsLabel.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(result.contributions.totalEmployeeContributions),
    );
    expect(withholdingsLabel.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(result.totals.totalWithholdings),
    );

    await user.click(screen.getByRole("radio", { name: /Gin tonic/i }));

    expect(screen.getByRole("radio", { name: /Gin tonic/i })).toBeChecked();
    expect(monthlyNetHeading.nextElementSibling).toHaveTextContent(
      formatGinTonic(result.totals.averageMonthlyNetSalary),
    );
    expect(resultsSummary).toHaveTextContent(formatGinTonic(result.totals.annualNetSalary));
    expect(summaryQueries.getByText("Valore indicativo: 1 gin tonic = 8 €")).toBeInTheDocument();
    expect(taxesLabel.nextElementSibling).toHaveTextContent(formatVisibleEuro(result.totals.totalTaxes));
    expect(contributionsLabel.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(result.contributions.totalEmployeeContributions),
    );
    expect(withholdingsLabel.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(result.totals.totalWithholdings),
    );
    expect(summaryQueries.getByText("Aliquota fiscale effettiva")).toBeInTheDocument();
    expect(summaryQueries.getByText("Incidenza complessiva")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Euro" }));

    expect(screen.getByRole("radio", { name: "Euro" })).toBeChecked();
    expect(monthlyNetHeading.nextElementSibling).toHaveTextContent(
      formatVisibleEuro(result.totals.averageMonthlyNetSalary),
    );
    expect(resultsSummary).toHaveTextContent(formatVisibleEuro(result.totals.annualNetSalary));
    expect(summaryQueries.queryByText("Valore indicativo: 1 gin tonic = 8 €")).not.toBeInTheDocument();
  });
});
