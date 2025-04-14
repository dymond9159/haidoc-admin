import { ArrowLeftIcon } from "lucide-react"
import { Button } from "../ui"

interface BackButtonProps {
  onClick?: () => void
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="flex items-center text-secondary -ml-2"
    >
      <ArrowLeftIcon className="mr-1 h-4 w-4" />
      Detalhes
    </Button>
  )
}
