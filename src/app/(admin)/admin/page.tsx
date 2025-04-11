"use client"

import {
  DollarSign,
  UserPlus,
  UserCheck,
  Receipt,
  ScrollText,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { StatCard, LineChart } from "@/components/common"
import { ApplicationStats } from "@/components/admin/applications/application-stats"

// Sample data for the graphs
const newUsersData = [
  { day: "Seg", value: 290 },
  { day: "Ter", value: 260 },
  { day: "Qua", value: 210 },
  { day: "Qui", value: 190 },
  { day: "Sex", value: 140 },
  { day: "Sáb", value: 90 },
  { day: "Dom", value: 75 },
]

const activeUsersData = [
  { day: "Seg", value: 240 },
  { day: "Ter", value: 250 },
  { day: "Qua", value: 260 },
  { day: "Qui", value: 255 },
  { day: "Sex", value: 140 },
  { day: "Sáb", value: 90 },
  { day: "Dom", value: 300 },
]

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      {/* Users Section */}
      <section>
        <h3 className="mb-4 text-xl font-semibold">Usuários</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <StatCard
            title="Novos Usuários"
            value="300"
            icon={<UserPlus className="h-5 w-5 text-system-11" />}
            performance={-20}
            chart={
              <LineChart
                data={newUsersData}
                color="#FF4D4F"
                className="h-full"
              />
            }
          />

          <StatCard
            title="Usuários ativos"
            value="300"
            icon={<UserCheck className="h-5 w-5 text-system-11" />}
            performance={20}
            chart={
              <LineChart
                data={activeUsersData}
                className="h-full"
                color="#52C41A"
              />
            }
          />
        </div>
      </section>

      {/* Applications Section */}
      <section>
        <h3 className="mb-4 text-xl font-semibold">Aplicações</h3>
        <ApplicationStats />
      </section>

      {/* Finance and Delivery Sections */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Finance Section */}
        <section>
          <h3 className="mb-4 text-xl font-semibold">Finanças</h3>
          <div className="space-y-4">
            <StatCard
              title="Faturamento total"
              value="MT 300"
              icon={<DollarSign className="h-5 w-5 text-system-11" />}
              performance={20}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <StatCard
                title="Total de Faturas"
                value="500"
                icon={<ScrollText className="h-5 w-5 text-system-11" />}
                performance={20}
              />

              <StatCard
                title="Total de Recibos"
                value="500"
                icon={<Receipt className="h-5 w-5 text-system-11" />}
                performance={0}
              />
            </div>
          </div>
        </section>

        {/* Delivery Section */}
        <section>
          <h3 className="mb-4 text-xl font-semibold">Entregas</h3>
          <div className="grid gap-4 grid-cols-2">
            <StatCard
              title="Aguardando Separação"
              value="300"
              icon={<UserPlus className="h-5 w-5 text-system-11" />}
              performance={20}
            />

            <StatCard
              title="Entregues"
              value="300"
              icon={<UserPlus className="h-5 w-5 text-system-11" />}
              performance={20}
            />

            <StatCard
              title="Aguardando motorista"
              value="300"
              icon={<UserPlus className="h-5 w-5 text-system-11" />}
              performance={20}
            />

            <StatCard
              title="A caminho"
              value="300"
              icon={<UserPlus className="h-5 w-5 text-system-11" />}
              performance={20}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
