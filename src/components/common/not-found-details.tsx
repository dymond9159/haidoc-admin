"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui"

export const NotFoundDetails = () => {
  const router = useRouter()
  return (
    <div className="flex h-[calc(100vh-200px)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium">Não encontrada</p>
        <Button variant={"outline"} onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    </div>
  )
}
