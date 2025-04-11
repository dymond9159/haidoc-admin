"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PackageSearch,
  Truck,
  Navigation,
  PackageCheck,
  UserPlus,
} from "lucide-react"
import { StatCard } from "@/components/common"

interface DeliveryStatsData {
  waitingSeparation: number
  waitingDriver: number
  onWay: number
  delivered: number
  waitingSeparationChange: number
  waitingDriverChange: number
  onWayChange: number
  deliveredChange: number
}

export function DeliveryStats() {
  const [stats, setStats] = useState<DeliveryStatsData>({
    waitingSeparation: 0,
    waitingDriver: 0,
    onWay: 0,
    delivered: 0,
    waitingSeparationChange: 0,
    waitingDriverChange: 0,
    onWayChange: 0,
    deliveredChange: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch initial stats
    const fetchStats = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStats({
        waitingSeparation: 300,
        waitingDriver: 150,
        onWay: 75,
        delivered: 450,
        waitingSeparationChange: 20,
        waitingDriverChange: 15,
        onWayChange: -5,
        deliveredChange: 30,
      })

      setLoading(false)
    }

    fetchStats()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Aguardando Separação"
        value="300"
        icon={<UserPlus className="h-5 w-5 text-system-11" />}
        performance={20}
      />
      <StatCard
        title="Aguardando Separação"
        value="150"
        icon={<UserPlus className="h-5 w-5 text-system-11" />}
        performance={15}
      />
      <StatCard
        title="Aguardando Separação"
        value="75"
        icon={<UserPlus className="h-5 w-5 text-system-11" />}
        performance={-5}
      />
      <StatCard
        title="Aguardando Separação"
        value="450"
        icon={<UserPlus className="h-5 w-5 text-system-11" />}
        performance={30}
      />
    </div>
  )
}
