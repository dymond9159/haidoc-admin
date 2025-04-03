import { AuthLayout } from "@/components/layouts/auth-layout"
import type { ReactNode } from "react"

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}
