"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ApplicationStatsProps {
  className?: string
}

export function ApplicationStats({ className }: ApplicationStatsProps) {
  // Mock data for application counts
  const stats = [
    { label: "Pendentes", count: 10, value: "pending" },
    { label: "Aprovadas", count: 108, value: "approved" },
    { label: "Reprovadas", count: 5, value: "rejected" },
    { label: "Canceladas", count: 12, value: "canceled" },
  ]

  return (
    <div className={cn("grid gap-4 md:grid-cols-4", className)}>
      {stats.map((stat) => (
        <Card key={stat.value} className={cn("p-6")}>
          <h3 className="text-sm font-medium text-system-11">{stat.label}</h3>
          <p className="mt-2 text-3xl font-bold">{stat.count}</p>
        </Card>
      ))}
    </div>
  )
}
