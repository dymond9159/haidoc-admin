import { UserCheck, UserPlus } from "lucide-react"
import { StatCard } from "../common"
import { ThemeColor } from "@/lib/constants"
import { activeUsersData, newUsersData } from "@/lib/mock-data/users"
import { UserLineChart } from "./user-line-chart"

export const UserStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StatCard
        title="Novos Usuários"
        value="300"
        icon={<UserPlus />}
        trend={-20}
        chart={
          <UserLineChart
            data={newUsersData}
            color={ThemeColor.error[5]}
            className="h-full"
          />
        }
      />

      <StatCard
        title="Usuários ativos"
        value="300"
        icon={<UserCheck />}
        trend={20}
        chart={
          <UserLineChart
            data={activeUsersData}
            className="h-full"
            color={ThemeColor.success[5]}
          />
        }
      />
    </div>
  )
}
