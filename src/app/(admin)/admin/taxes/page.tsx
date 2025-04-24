"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaxesTable } from "@/components/admin/taxes/taxes-table"
import { useRouter } from "next/navigation"

export default function TaxasPage() {
  const router = useRouter()

  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <div></div>
        <Button onClick={() => router.push("/admin/taxes/new")}>
          <Plus size={18} />
          Nova taxa
        </Button>
      </div>
      <TaxesTable />
    </div>
  )
}
