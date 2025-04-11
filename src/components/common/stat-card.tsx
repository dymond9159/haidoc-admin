"use client"

import type { ReactNode } from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { PerformanceIndicator } from "@/components/common/performance-indicator"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  performance?: number
  chart?: ReactNode
  className?: string
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  icon,
  performance,
  chart,
  className,
  onClick,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden",
        className,
        onClick && "cursor-pointer hover:shadow-md transition-shadow",
      )}
      onClick={onClick}
    >
      <div className="flex flex-row gap-1 sm:gap-5 md:gap-10">
        <div className="">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="text-sm font-medium text-system-11">{title}</h3>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold">{value}</p>
            {performance !== undefined && (
              <PerformanceIndicator value={performance} className="mt-2" />
            )}
          </div>
        </div>
        {chart && <div className="w-full flex-1">{chart}</div>}
      </div>
    </Card>
  )
}
