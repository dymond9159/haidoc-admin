"use client"

import { ChevronLeftIcon } from "lucide-react"
import { Button } from "../ui"
import { useRouter } from "next/navigation"

interface BackButtonProps {
  text?: string
  onClick?: () => void
}

export const BackButton = ({ text = "Detalhes", onClick }: BackButtonProps) => {
  const router = useRouter()
  const handleBack = () => {
    if (onClick) {
      onClick()
    } else {
      router.back()
    }
  }
  return (
    <Button
      variant="link"
      onClick={handleBack}
      className="flex items-center text-foreground hover:text-secondary -ml-2 !pl-0"
    >
      <ChevronLeftIcon className="h-4 w-4" />
      {text}
    </Button>
  )
}
