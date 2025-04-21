"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ChartSection } from "./chart-section"
import { monthlyData } from "@/lib/mock-data/users"
import {
  LaptopMinimalIcon,
  MicroscopeIcon,
  PillBottleIcon,
  StethoscopeIcon,
  UserRoundCheckIcon,
  UserRoundPlusIcon,
} from "lucide-react"
import { PlanoStats } from "../plano-stats"

export enum ProjectionTabs {
  NewUser = "Novos Usuários",
  ActiveUser = "Usuários Ativos",
  OnlineConsultation = "Consultas Online",
  PrecenseConsultation = "Consultas Presenciais",
  PharmacyDeliveries = "Entregas de Farmácia",
  Harvests = "Colheitas",
}

const Icons = {
  NewUser: <UserRoundPlusIcon />,
  ActiveUser: <UserRoundCheckIcon />,
  OnlineConsultation: <LaptopMinimalIcon />,
  PrecenseConsultation: <StethoscopeIcon />,
  PharmacyDeliveries: <PillBottleIcon />,
  Harvests: <MicroscopeIcon />,
}

export function DashboardProjectionSection() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue={ProjectionTabs.NewUser}>
        <TabsList className="w-full h-fit space-y-6">
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(ProjectionTabs).map(([key, item], index) => (
              <TabsTrigger
                key={index}
                className={cn(index < 2 ? "col-span-2" : "col-span-1")}
                value={item}
                variant="button"
                size="lg"
              >
                {Icons?.[key as keyof typeof Icons]}
                {item}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>
        <TabsContent value={ProjectionTabs.NewUser} className="mt-4">
          <ChartSection title={"Novos Usuários"} data={monthlyData} />
        </TabsContent>
        <TabsContent value={ProjectionTabs.ActiveUser} className="mt-4">
          <ChartSection title={"Usuários Ativos"} data={monthlyData} />
          <PlanoStats />
        </TabsContent>
        <TabsContent value={ProjectionTabs.OnlineConsultation} className="mt-4">
          <ChartSection
            title={"Consultas Online Realizadas"}
            data={monthlyData}
          />
          <ChartSection
            title={"Consultas Online Agendadas"}
            data={monthlyData}
          />
        </TabsContent>
        <TabsContent
          value={ProjectionTabs.PrecenseConsultation}
          className="mt-4"
        >
          <ChartSection
            title={"Consultas Presenciais Realizadas"}
            data={monthlyData}
          />
          <ChartSection
            title={"Consultas Presenciais Agendadas"}
            data={monthlyData}
          />
        </TabsContent>
        <TabsContent value={ProjectionTabs.PharmacyDeliveries} className="mt-4">
          <ChartSection
            title={"Entregas de Farmácia Realizadas"}
            data={monthlyData}
          />
          <ChartSection
            title={"Entregas de Farmácia Agendadas"}
            data={monthlyData}
          />
        </TabsContent>
        <TabsContent value={ProjectionTabs.Harvests} className="mt-4">
          <ChartSection title={"Colheitas Realizadas"} data={monthlyData} />
          <ChartSection title={"Colheitas Agendadas"} data={monthlyData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
