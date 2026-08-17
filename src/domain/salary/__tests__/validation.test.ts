import { describe, expect, it } from "vitest";
import { validateSalaryInput } from "@/domain/salary";

describe("INPUT-001 and INPUT-002 — salary input validation", () => {
  it("rejects EUR 19,999.99", () => {
    const result = validateSalaryInput({
      grossAnnualSalary: 19_999.99,
      installments: 13,
    });

    expect(result.valid).toBe(false);
    expect(result).toMatchObject({
      valid: false,
      errors: [
        expect.objectContaining({
          field: "grossAnnualSalary",
          code: "below_minimum",
        }),
      ],
    });
  });

  it("accepts EUR 20,000", () => {
    expect(
      validateSalaryInput({
        grossAnnualSalary: 20_000,
        installments: 13,
      }),
    ).toEqual({ valid: true });
  });

  it("accepts EUR 35,000", () => {
    expect(
      validateSalaryInput({
        grossAnnualSalary: 35_000,
        installments: 13,
      }),
    ).toEqual({ valid: true });
  });

  it("accepts EUR 100,000", () => {
    expect(
      validateSalaryInput({
        grossAnnualSalary: 100_000,
        installments: 13,
      }),
    ).toEqual({ valid: true });
  });

  it("rejects EUR 100,000.01", () => {
    const result = validateSalaryInput({
      grossAnnualSalary: 100_000.01,
      installments: 13,
    });

    expect(result.valid).toBe(false);
    expect(result).toMatchObject({
      valid: false,
      errors: [
        expect.objectContaining({
          field: "grossAnnualSalary",
          code: "above_maximum",
        }),
      ],
    });
  });

  it("rejects a missing RAL", () => {
    const result = validateSalaryInput({
      installments: 13,
    });

    expect(result.valid).toBe(false);
    expect(result).toMatchObject({
      valid: false,
      errors: [
        expect.objectContaining({
          field: "grossAnnualSalary",
          code: "required",
        }),
      ],
    });
  });

  it("rejects a non-numeric RAL", () => {
    const result = validateSalaryInput({
      grossAnnualSalary: "35000",
      installments: 13,
    });

    expect(result.valid).toBe(false);
    expect(result).toMatchObject({
      valid: false,
      errors: [
        expect.objectContaining({
          field: "grossAnnualSalary",
          code: "invalid_number",
        }),
      ],
    });
  });

  it("rejects zero RAL", () => {
    const result = validateSalaryInput({
      grossAnnualSalary: 0,
      installments: 13,
    });

    expect(result.valid).toBe(false);
    expect(result).toMatchObject({
      valid: false,
      errors: [
        expect.objectContaining({
          field: "grossAnnualSalary",
          code: "must_be_positive",
        }),
      ],
    });
  });

  it("rejects a negative RAL", () => {
    const result = validateSalaryInput({
      grossAnnualSalary: -1,
      installments: 13,
    });

    expect(result.valid).toBe(false);
    expect(result).toMatchObject({
      valid: false,
      errors: [
        expect.objectContaining({
          field: "grossAnnualSalary",
          code: "must_be_positive",
        }),
      ],
    });
  });

  it("rejects NaN", () => {
    const result = validateSalaryInput({
      grossAnnualSalary: Number.NaN,
      installments: 13,
    });

    expect(result.valid).toBe(false);
    expect(result).toMatchObject({
      valid: false,
      errors: [
        expect.objectContaining({
          field: "grossAnnualSalary",
          code: "invalid_number",
        }),
      ],
    });
  });

  it("rejects Infinity", () => {
    const result = validateSalaryInput({
      grossAnnualSalary: Number.POSITIVE_INFINITY,
      installments: 13,
    });

    expect(result.valid).toBe(false);
    expect(result).toMatchObject({
      valid: false,
      errors: [
        expect.objectContaining({
          field: "grossAnnualSalary",
          code: "non_finite",
        }),
      ],
    });
  });

  it("rejects invalid installments", () => {
    const result = validateSalaryInput({
      grossAnnualSalary: 35_000,
      installments: 11,
    });

    expect(result.valid).toBe(false);
    expect(result).toMatchObject({
      valid: false,
      errors: [
        expect.objectContaining({
          field: "installments",
          code: "invalid_installments",
        }),
      ],
    });
  });
});
