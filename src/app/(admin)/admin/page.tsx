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

// Sample data for the graphs
const newUsersData = [400, 380, 360, 340, 320, 300, 280]
const activeUsersData = [240, 250, 260, 255, 270, 280, 300]

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      {/* Users Section */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Usuários</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <StatCard
            title="Novos Usuários"
            value="300"
            icon={<UserPlus className="h-5 w-5 text-system-11" />}
            performance={-20}
            chart={<LineChart data={newUsersData} color="#FF4D4F" />}
          />

          <StatCard
            title="Usuários ativos"
            value="300"
            icon={<UserCheck className="h-5 w-5 text-system-11" />}
            performance={20}
            chart={<LineChart data={activeUsersData} color="#52C41A" />}
          />
        </div>
      </section>

      {/* Applications Section */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Aplicações</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-l-3 border-secondary-9">
            <h3 className="text-sm font-medium text-system-11">Pendentes</h3>
            <p className="mt-2 text-3xl font-bold">10</p>
          </Card>

          <Card className="border border-success-5">
            <h3 className="text-sm font-medium text-system-11">Aprovadas</h3>
            <p className="mt-2 text-3xl font-bold">108</p>
          </Card>

          <Card className="border border-error-5">
            <h3 className="text-sm font-medium text-system-11">Reprovadas</h3>
            <p className="mt-2 text-3xl font-bold">5</p>
          </Card>

          <Card className="border-r-3 border-warning-5">
            <h3 className="text-sm font-medium text-system-11">Canceladas</h3>
            <p className="mt-2 text-3xl font-bold">12</p>
          </Card>
        </div>
      </section>

      {/* Finance and Delivery Sections */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Finance Section */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">Finanças</h2>
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
          <h2 className="mb-4 text-2xl font-bold">Entregas</h2>
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
