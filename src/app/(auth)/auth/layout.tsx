import { Logo } from "@/components/logo"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-system-2 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-system-1 p-8 shadow-md">
        <div className="flex justify-center">
          <Logo size="md" />
        </div>

        <div className="flex items-center">
          <Link
            href="/login"
            className="flex items-center text-sm text-system-11 hover:text-system-13"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Autenticação
          </Link>
        </div>

        {children}
      </div>
    </div>
  )
}
