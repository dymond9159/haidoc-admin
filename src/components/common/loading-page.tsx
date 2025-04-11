import { Loader2 } from "lucide-react"

export function Loading() {
  return (
    <div className="flex h-[calc(100vh-200px)] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary-9" />
        <p>Carregando detalhes da entrega...</p>
      </div>
    </div>
  )
}
