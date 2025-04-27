"use client"

import { StatCard } from "@/components/common"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LaptopMinimal,
  MicroscopeIcon,
  PillBottleIcon,
  StethoscopeIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { UserStats } from "../users-stats"
import { HarvestsTable } from "./harvests-table"
import { OnlineConsultTable } from "./online-consult-table"
import { PersonConsultTable } from "./person-consult-table"
import { PharmacyDeliveriesTable } from "./pharmacy-deliveries-table"
import { ProjectionTabs } from "./projection-section"

export enum AppointmentTab {
  Complete = "realizadas",
  Scheduled = "agendadas",
}

export const DashboardDefaultSection = () => {
  const router = useRouter()
  // const [appointmentTabValue, setAppointmentTabValue] =
  //   useState<AppointmentTab>(AppointmentTab.REALIZADAS)

  const [currentItem, setCurrentItem] = useState<ProjectionTabs>(
    ProjectionTabs.OnlineConsultation,
  )

  const handleViewMoreClick = () => {
    router.push(`/admin/dashboard/details?mode=${currentItem}`)
  }

  const renderTable = useMemo(() => {
    switch (currentItem) {
      case ProjectionTabs.OnlineConsultation:
        return <OnlineConsultTable />
      case ProjectionTabs.PrecenseConsultation:
        return <PersonConsultTable />
      case ProjectionTabs.PharmacyDeliveries:
        return <PharmacyDeliveriesTable />
      case ProjectionTabs.Harvests:
        return <HarvestsTable />
      default:
        return <p className="text-sm text-muted-foreground">Página inválida</p>
    }
  }, [currentItem])

  return (
    <div className="space-y-8">
      <UserStats />
      <Tabs defaultValue={AppointmentTab.Complete}>
        <TabsList>
          <TabsTrigger value={AppointmentTab.Complete}>Realizadas</TabsTrigger>
          <TabsTrigger value={AppointmentTab.Scheduled}>Agendadas</TabsTrigger>
        </TabsList>
        <TabsContent value={AppointmentTab.Complete} className="mt-4">
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard
              title="Consultas Online"
              icon={<LaptopMinimal />}
              value={300}
              trend={20}
              toggle
              selected={currentItem === ProjectionTabs.OnlineConsultation}
              onClick={() => setCurrentItem(ProjectionTabs.OnlineConsultation)}
            />
            <StatCard
              title="Consultas Presenciais"
              icon={<StethoscopeIcon />}
              value={300}
              trend={20}
              toggle
              selected={currentItem === ProjectionTabs.PrecenseConsultation}
              onClick={() =>
                setCurrentItem(ProjectionTabs.PrecenseConsultation)
              }
            />
            <StatCard
              title="Entregas de Farmácia"
              icon={<PillBottleIcon />}
              value={300}
              trend={20}
              toggle
              selected={currentItem === ProjectionTabs.PharmacyDeliveries}
              onClick={() => setCurrentItem(ProjectionTabs.PharmacyDeliveries)}
            />
            <StatCard
              title="Colheitas"
              icon={<MicroscopeIcon />}
              value={300}
              trend={20}
              toggle
              selected={currentItem === ProjectionTabs.Harvests}
              onClick={() => setCurrentItem(ProjectionTabs.Harvests)}
            />
          </div>
          {renderTable}
        </TabsContent>
      </Tabs>
    </div>
  )
}
