"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ApplicationTable } from "@/components/admin/applications/application-table"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { ApplicationStats } from "@/components/admin/applications/application-stats"

export default function ApplicationsPageClient() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<
    "pending" | "approved" | "rejected" | "canceled"
  >("pending")
  const [searchTerm, setSearchTerm] = useState("")

  // Handle view application details
  const handleViewApplication = (id: string) => {
    // Navigate to the appropriate route based on active tab
    switch (activeTab) {
      case "pending":
        router.push(`/admin/applications/${id}`)
        break
      case "approved":
        router.push(`/admin/applications/approved/${id}`)
        break
      case "rejected":
        router.push(`/admin/applications/rejected/${id}`)
        break
      case "canceled":
        router.push(`/admin/applications/canceled/${id}`)
        break
    }
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "pending" | "approved" | "rejected" | "canceled")
  }

  return (
    <div className="space-y-6">
      <ApplicationStats />

      <div className="w-full">
        <label className="mb-2 block text-sm font-medium">Pesquisar</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-system-10" />
          <Input
            placeholder="Nome da empresa"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="pending"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="approved">Aprovadas</TabsTrigger>
          <TabsTrigger value="rejected">Reprovadas</TabsTrigger>
          <TabsTrigger value="canceled">Canceladas</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4">
          <ApplicationTable
            status="pending"
            searchTerm={searchTerm}
            onViewDetails={handleViewApplication}
          />
        </TabsContent>
        <TabsContent value="approved" className="mt-4">
          <ApplicationTable
            status="approved"
            searchTerm={searchTerm}
            onViewDetails={handleViewApplication}
          />
        </TabsContent>
        <TabsContent value="rejected" className="mt-4">
          <ApplicationTable
            status="rejected"
            searchTerm={searchTerm}
            onViewDetails={handleViewApplication}
          />
        </TabsContent>
        <TabsContent value="canceled" className="mt-4">
          <ApplicationTable
            status="canceled"
            searchTerm={searchTerm}
            onViewDetails={handleViewApplication}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
