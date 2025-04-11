"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DeliverStatus, statusColorMap } from "@/types/admin"

interface DeliverStatusLabelProps {
  status: DeliverStatus
  className?: string
}

export function DeliverStatusLabel({
  status,
  className,
}: DeliverStatusLabelProps) {
  const statusSpecificClasses =
    statusColorMap[status] ?? "bg-system-2 text-system-11"

  return (
    <Badge
      className={cn(
        "transition-colors duration-150",
        statusSpecificClasses,
        className,
      )}
    >
      {status}
    </Badge>
  )
}
