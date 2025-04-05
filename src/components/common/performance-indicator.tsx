import { cn } from "@/lib/utils"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

interface PerformanceIndicatorProps {
  value: number
  className?: string
}

export function PerformanceIndicator({
  value,
  className,
}: PerformanceIndicatorProps) {
  const isPositive = value > 0
  const isNeutral = value === 0
  const isNegative = value < 0

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-sm",
        isPositive && "text-success-6",
        isNeutral && "text-warning-6",
        isNegative && "text-error-6",
        className,
      )}
    >
      {isPositive && <ArrowUpRight className="h-4 w-4" />}
      {isNeutral && <Minus className="h-4 w-4" />}
      {isNegative && <ArrowDownRight className="h-4 w-4" />}
      <span>
        {isPositive ? "+" : ""}
        {value}%
      </span>
    </div>
  )
}
