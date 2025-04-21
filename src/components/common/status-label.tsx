"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { statusColorMap } from "@/types/admin"

interface StatusLabelProps<T> {
  status: T
  className?: string
}

export function StatusLabel<T>({ status, className }: StatusLabelProps<T>) {
  const statusSpecificClasses =
    statusColorMap[status as string] ?? "bg-system-2 text-system-11"

  return (
    <Badge
      className={cn(
        "transition-colors duration-150",
        statusSpecificClasses,
        className,
      )}
    >
      {status as string}
    </Badge>
  )
}
