import { describe, expect, it } from "vitest";
import { DEFAULT_SALARY_INSTALLMENTS } from "@/config/salaryCalculator";

describe("INPUT-002 — presentation default installments", () => {
  it("keeps the approved default selection at 13", () => {
    expect(DEFAULT_SALARY_INSTALLMENTS).toBe(13);
  });
});
