import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui"
import { EnhancedTable } from "@/components/common/enhanced-table"
import { ColumnDef, StatusDropdown, StatusLabel } from "@/components/common"
import { FilterConfig, StatusOption } from "@/components/common/table-filter"
import { PatientTabOption } from "@/app/(admin)/admin/pre-assessments/page"
import { PatientStatusList } from "@/lib/constants"
import { Patient, PatientStatus } from "@/types/admin"
import { useToast } from "@/hooks/use-toast"
import { mockCompletedPatients, mockPatients } from "@/lib/mock-data/patients"

interface PatientTableProps {
  mode?: PatientTabOption
}

type FilterOptions = {
  patientId?: string
  patientName?: string
  id?: string
  date?: Date | undefined
  status?: PatientStatus | null
}

export function PatientTable({
  mode = PatientTabOption.Received,
}: PatientTableProps) {
  const router = useRouter()
  const [allData, setAllData] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({})

  const { toast } = useToast()

  // Fetch data
  useEffect(() => {
    const fetchDatas = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockData =
        mode === PatientTabOption.Received
          ? mockPatients
          : mockCompletedPatients

      setAllData(mockData)
      setIsLoading(false)
    }
    fetchDatas()
  }, [mode])

  // Navigation and Status Update Handlers (remain in PatientTable as they are specific)
  const handleStatusChange = async (id: string, newStatus: PatientStatus) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API

      // Update local state
      const updatedItem = allData.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
            }
          : item,
      )
      setAllData(updatedItem)

      toast({
        title: "Status atualizado",
        description: `Pedido #${id} atualizado para "${newStatus}"`,
      })
    } catch (error) {
      console.error("Status update error:", error)
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status do pedido.",
      })
    }
  }

  const handleViewDetails = (orderId: string) => {
    router.push(`/admin/pre-assessments/${orderId}`)
  }

  // Define Columns
  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "patientId",
      header: "ID DO PACIENTE",
      className: "font-medium",
    },
    {
      accessorKey: "date",
      header: "DATA DO PEDIDO",
      cell: (row) => format(new Date(row.date), "dd/MM/yyyy", { locale: ptBR }),
    },
    { accessorKey: "plan", header: "PLANO" },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: (row) =>
        mode === PatientTabOption.Received ? (
          <StatusDropdown
            status={row.status}
            availableStatus={PatientStatusList}
            onStatusChange={(newStatus) =>
              handleStatusChange(row.id, newStatus)
            }
          />
        ) : (
          <StatusLabel status={row.status} />
        ),
    },
    {
      accessorKey: "actions",
      header: "AÇÕES",
      cell: (row) => (
        <Button
          variant="link"
          className="text-primary-9 h-auto p-0"
          onClick={() => handleViewDetails(row.id)}
        >
          Visualizar
        </Button>
      ),
    },
  ]

  // Prepare status options for the filter dropdown
  const deliverStatusFilterOptions: StatusOption<PatientStatus>[] =
    PatientStatusList.map((status) => ({
      value: status,
      label: status,
    }))

  const handleFilterChange = useCallback(
    (filterKey: keyof typeof filters, value: any) => {
      setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }))
    },
    [],
  )

  // Define Filter Configurations
  const filterConfigs: FilterConfig<Patient>[] = useMemo(
    () => [
      {
        type: "search",
        label: "Pesquisar",
        accessorKey: "patientId",
        placeholder: "Pesquisar por ID do Paciente...",
        value: filters.patientId, // Initialize with current filter state
        onChange: (value) => handleFilterChange("patientId", value),
      },
      {
        type: "date",
        label: "Data",
        accessorKey: "date",
        placeholder: "Selecione uma Data",
        value: filters.date,
        onChange: (date) => handleFilterChange("date", date),
      },
      {
        type: "select",
        label: "Status",
        accessorKey: "status",
        placeholder: "Selecione o status",
        options: deliverStatusFilterOptions,
        value: filters.status,
        onChange: (value) => handleFilterChange("status", value),
      },
    ],
    [deliverStatusFilterOptions, filters, handleFilterChange],
  )
  return (
    <EnhancedTable
      data={allData}
      columns={columns}
      filterConfigs={filterConfigs}
      isLoading={isLoading}
      getRowId={(row) => row.id}
    />
  )
}
