import { Logo } from "@/components/logo"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-verification">
      <div className="flex justify-center mb-12">
        <Logo size="md" />
      </div>

      <div className="flex items-center mb-4">
        <Link
          href="/login"
          className="flex items-center text-md font-bold text-system-12 hover:text-system-12"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Autenticação
        </Link>
      </div>

      {children}
    </div>
  )
}
