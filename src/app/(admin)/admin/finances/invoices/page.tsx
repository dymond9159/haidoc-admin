"use client"

import { InvoiceTable } from "@/components/admin/finances/invoice-table"
import { BackButton } from "@/components/common"
import { useRouter } from "next/navigation"

export default function InvoicesPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }
  return (
    <div className="space-y-6">
      <BackButton text="Faturas" onClick={handleBack} />
      <InvoiceTable />
    </div>
  )
}
