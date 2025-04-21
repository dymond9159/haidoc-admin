import { ChevronLeftIcon } from "lucide-react"
import { Button } from "../ui"

interface BackButtonProps {
  text?: string
  onClick?: () => void
}

export const BackButton = ({ text = "Detalhes", onClick }: BackButtonProps) => {
  return (
    <Button
      variant="link"
      onClick={onClick}
      className="flex items-center text-foreground hover:text-secondary -ml-2"
    >
      <ChevronLeftIcon className="h-4 w-4" />
      {text}
    </Button>
  )
}
