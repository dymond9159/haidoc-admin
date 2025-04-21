// app/admin/dashboard/details/page.tsx
"use client"

import { useRouter } from "next/navigation"
import { BackButton, Loading } from "@/components/common"
import { OnlineConsultTable } from "@/components/admin/dashboard/online-consult-table"
import { PresenceConsultTable } from "@/components/admin/dashboard/presence-consult-table"
import { PharmacyDeliveriesTable } from "@/components/admin/dashboard/pharmacy-deliveries-table"
import { HarvestsTable } from "@/components/admin/dashboard/harvests-table"
import { ProjectionTabs } from "@/components/admin/dashboard/projection-section"
import { Suspense } from "react"

interface PageProps {
  searchParams: { mode: ProjectionTabs }
}

export default function DashboardDetailsPage({ searchParams }: PageProps) {
  const router = useRouter()
  const { mode } = searchParams

  const handleBack = () => {
    router.back()
  }

  const renderTable = () => {
    switch (mode) {
      case ProjectionTabs.OnlineConsultation:
        return <OnlineConsultTable />
      case ProjectionTabs.PrecenseConsultation:
        return <PresenceConsultTable />
      case ProjectionTabs.PharmacyDeliveries:
        return <PharmacyDeliveriesTable />
      case ProjectionTabs.Harvests:
        return <HarvestsTable />
      default:
        return <p className="text-sm text-muted-foreground">Página inválida</p>
    }
  }

  return (
    <div className="space-y-6">
      <BackButton text={`${mode} Realizadas`} onClick={handleBack} />
      <Suspense fallback={<Loading text="Carregando detalhes..." />}>
        {/* Components that depend on data fetched with useSearchParams */}
        {renderTable()}
      </Suspense>
    </div>
  )
}
