"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { ColumnDef } from "@/components/common/data-table"
import { EnhancedTable } from "@/components/common/enhanced-table" // Import EnhancedTable
import { FilterConfig } from "@/components/common/table-filter"
import { mockHarvests } from "@/lib/mock-data/dashboard"
import { HarvestsColumns } from "@/types/admin"

interface HarvestsTableProps {
  maxRecords?: number
  filterable?: boolean
  viewMore?: boolean
  onViewMoreClick?: () => void
}

interface FilterOption {
  patientId?: string
  harvestType?: string
  laboratory?: string
  date?: string
}

export function HarvestsTable({
  filterable = true,
  viewMore = false,
  maxRecords,
  onViewMoreClick,
}: HarvestsTableProps) {
  const [allData, setAllData] = useState<HarvestsColumns[]>([])
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

      let data: HarvestsColumns[] = []

      data = mockHarvests

      setAllData(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const columns: ColumnDef<HarvestsColumns>[] = useMemo(
    () => [
      {
        accessorKey: "patientId",
        header: "ID DO PACIENTE",
        className: "font-medium",
      },
      { accessorKey: "harvestType", header: "TIPO DE COLHEITA" },
      { accessorKey: "laboratory", header: "LABORATÓRIO" },
      { accessorKey: "value", header: "VALOR" },
      { accessorKey: "date", header: "DATA E HORA" },
    ],
    [],
  )

  const filterConfigs: FilterConfig<HarvestsColumns>[] = useMemo(
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
        accessorKey: "harvestType",
        placeholder: "Selecione um Tipo",
        value: filters.harvestType,
        onChange: (value) => handleFilterChange("harvestType", value),
      },
      {
        type: "search",
        label: "Pesquisar Laboratório",
        accessorKey: "laboratory",
        placeholder: "Nome do Laboratório",
        value: filters.laboratory,
        onChange: (value) => handleFilterChange("laboratory", value),
      },
      {
        type: "date",
        label: "Data",
        accessorKey: "date",
        placeholder: "Selecione uma Data",
        value: filters.date,
        onChange: (value) => handleFilterChange("date", value),
      },
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
