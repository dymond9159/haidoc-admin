"use client"

import * as React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"

import { ColumnDef } from "@/components/common/data-table"
import { mockPharmacy } from "@/lib/mock-data/delivers"
import { ProjectionTabs } from "./projection-section"
import { Consultation } from "@/types/admin"
import { EnhancedTable } from "@/components/common/enhanced-table" // Import EnhancedTable
import { FilterConfig } from "@/components/common/table-filter"

interface PresenceConsultTableProps {
  mode?: ProjectionTabs
  maxRecords?: number
  filterable?: boolean
  viewMore?: boolean
  onViewMoreClick?: () => void
}

interface FilterOption {
  patientId?: string
  specialty?: string
  doctor?: string
}

export function PresenceConsultTable({
  mode = ProjectionTabs.OnlineConsultation,
  filterable = true,
  viewMore = false,
  maxRecords,
  onViewMoreClick,
}: PresenceConsultTableProps) {
  const [allData, setAllData] = useState<Consultation[]>([])
  const [filters, setFilters] = useState<FilterOption>({}) // Initialize filter state
  const [isLoading, setIsLoading] = useState(true)

  const handleFilterChange = useCallback(
    (filterKey: keyof FilterOption, value: any) => {
      setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }))
    },
    [],
  )

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let data: Consultation[] = []

      switch (mode) {
        case ProjectionTabs.OnlineConsultation:
        case ProjectionTabs.PrecenseConsultation:
        case ProjectionTabs.PharmacyDeliveries:
        case ProjectionTabs.Harvests:
          data = mockPharmacy
          break
      }

      setAllData(data)
      setIsLoading(false)
    }
    fetchData()
  }, [mode])

  const columns: ColumnDef<Consultation>[] = useMemo(
    () => [
      {
        accessorKey: "patientId",
        header: "ID DO PACIENTE",
        className: "font-medium",
      },
      { accessorKey: "specialty", header: "ESPECIALIDADE" },
      { accessorKey: "doctor", header: "MÉDICO" },
      { accessorKey: "value", header: "VALOR" },
      { accessorKey: "date", header: "DATA E HORA" },
    ],
    [],
  )

  const filterConfigs: FilterConfig<Consultation>[] = useMemo(
    () => [
      {
        type: "search",
        label: "Pesquisar ID",
        accessorKey: "patientId",
        placeholder: "Pesquisar por ID",
        value: filters.patientId,
        onChange: (value) => handleFilterChange("patientId", value),
      },
      {
        type: "search",
        label: "Pesquisar Especialidade",
        accessorKey: "specialty",
        placeholder: "Pesquisar por Especialidade",
        value: filters.specialty,
        onChange: (value) => handleFilterChange("specialty", value),
      },
      {
        type: "search",
        label: "Pesquisar Médico",
        accessorKey: "doctor",
        placeholder: "Pesquisar por Médico",
        value: filters.doctor,
        onChange: (value) => handleFilterChange("doctor", value),
      },
      // Add more filters as needed
    ],
    [filters, handleFilterChange],
  )

  return (
    <div className="space-y-4">
      <EnhancedTable
        data={allData}
        columns={columns}
        filterConfigs={filterable ? filterConfigs : []} // Pass filterConfigs conditionally
        isLoading={isLoading}
        getRowId={(row) => row.id}
        viewMore={viewMore}
        maxRecords={maxRecords}
        onViewMoreClick={onViewMoreClick}
      />
    </div>
  )
}
