"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserStats } from "../users-stats"
import { StatCard } from "@/components/common"
import {
  LaptopMinimal,
  MicroscopeIcon,
  PillBottleIcon,
  StethoscopeIcon,
} from "lucide-react"
import { useState } from "react"
import { OnlineConsultTable } from "./online-consult-table"
import { ProjectionTabs } from "./projection-section"
import { useRouter } from "next/navigation"

// enum AppointmentTab {
//   REALIZADAS = "realizadas",
//   AGENDADAS = "agendadas",
// }

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

  return (
    <div className="space-y-8">
      <UserStats />
      <Tabs defaultValue="realizadas">
        <TabsList>
          <TabsTrigger value="realizadas">Realizadas</TabsTrigger>
          <TabsTrigger value="agendadas">Agendadas</TabsTrigger>
        </TabsList>
        <TabsContent value="realizadas" className="mt-4">
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
        </TabsContent>
      </Tabs>

      {/* <DeliveryTable /> */}
      <OnlineConsultTable
        filterable={false}
        viewMore
        maxRecords={3}
        onViewMoreClick={handleViewMoreClick}
      />
    </div>
  )
}
