"use client"

import { LoginForm } from "@/components/auth"

export default function AdminLoginPage() {
  return (
    <div className="w-full max-w-md space-y-8 rounded-lg bg-system-1 p-8 shadow-md">
      <LoginForm />
    </div>
  )
}
