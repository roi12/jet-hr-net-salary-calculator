import type { SalaryCalculation } from "@/domain/salary";
import { CalculationBreakdown } from "./CalculationBreakdown";
import { ResultsSummary } from "./ResultsSummary";

type SalaryResultsProps = {
  result: SalaryCalculation;
  resultHeadingRef: React.RefObject<HTMLHeadingElement | null>;
};

export function SalaryResults({ result, resultHeadingRef }: SalaryResultsProps) {
  return (
    <div className="space-y-6">
      <ResultsSummary result={result} resultHeadingRef={resultHeadingRef} />
      <CalculationBreakdown result={result} />
    </div>
  );
}
