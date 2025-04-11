"use client"

import { useState } from "react"
import { ChevronDown, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"
import { DeliverStatus } from "@/types/admin"

interface StatusDropdownProps {
  status: DeliverStatus
  availableStatus: string[]
  onStatusChange: (newStatus: DeliverStatus) => Promise<void>
}

export function DeliverStatusDropdown({
  status,
  availableStatus,
  onStatusChange,
}: StatusDropdownProps) {
  const [isChanging, setIsChanging] = useState(false)

  const getStatusClass = (status: DeliverStatus) => {
    switch (status) {
      case DeliverStatus.WaitingDriver:
        return "bg-rating-2 text-rating-6"
      case DeliverStatus.OnWay:
        return "bg-warning-2 text-warning-5"
      case DeliverStatus.WaitingSeparation:
        return "bg-info-2 text-info-5"
      case DeliverStatus.Delivered:
        return "bg-success-2 text-success-6"
      case DeliverStatus.Canceled:
        return "bg-error-2 text-error-5"
      case DeliverStatus.OrderPlaced:
        return "status-order-placed" // Added class for this status
      default:
        return ""
    }
  }

  const handleStatusChange = async (newStatus: DeliverStatus) => {
    setIsChanging(true)
    try {
      await onStatusChange(newStatus)
    } finally {
      setIsChanging(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "cursor-pointer px-3 py-1 rounded-full text-sm font-medium inline-flex items-center transition-colors duration-150",
            getStatusClass(status),
            isChanging && "bg-transparent text-foreground",
          )}
          disabled={isChanging}
        >
          {isChanging ? (
            <>
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Atualizando...
            </>
          ) : (
            <>
              {status} {/* Enum implicitly converts to string */}
              <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {availableStatus?.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleStatusChange(item as DeliverStatus)}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
