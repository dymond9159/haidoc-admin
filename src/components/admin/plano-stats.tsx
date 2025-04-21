import { StatCard } from "../common"
import { ThemeColor } from "@/lib/constants"
import { activeUsersData, newUsersData } from "@/lib/mock-data/users"
import { UserLineChart } from "./user-line-chart"

export const PlanoStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StatCard
        title="Individual"
        value="300"
        trend={-20}
        chart={
          <UserLineChart
            data={newUsersData}
            color={ThemeColor.success[5]}
            className="h-full"
          />
        }
      />

      <StatCard
        title="HaiPatient"
        value="300"
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
