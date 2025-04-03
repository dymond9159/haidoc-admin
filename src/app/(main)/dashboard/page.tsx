"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  // Check if the user is authenticated
  useEffect(() => {
    const isAuthenticated =
      sessionStorage.getItem("verificationMethod") !== null

    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  return <div className="space-y-6">Comming soon ! </div>
}
