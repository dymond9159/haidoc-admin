import type { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="flex min-h-screen items-center justify-center bg-system-2 py-4">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-system-1 p-8 shadow-md">
          {children}
        </div>
      </div>
    </div>
  )
}
