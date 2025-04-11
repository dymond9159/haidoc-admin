"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { DeliverStatus } from "@/types/admin"
import { DeliverStatusLabel } from "./deliver-status-label"

interface Delivery {
  id: string
  patientId: string
  date: string
  value: string
  status: DeliverStatus
}

interface DeliveryHistoryTableProps {
  searchQuery: string
  selectedDate: Date | undefined
  selectedStatus: string
}

export function DeliveryHistoryTable({
  searchQuery,
  selectedDate,
  selectedStatus,
}: DeliveryHistoryTableProps) {
  const router = useRouter()
  const [allDeliveries] = useState<Delivery[]>([
    {
      id: "123570",
      patientId: "123470",
      date: "07/07/2024",
      value: "35 MZN",
      status: DeliverStatus.Delivered,
    },
    {
      id: "123571",
      patientId: "123471",
      date: "07/07/2024",
      value: "35 MZN",
      status: DeliverStatus.Canceled,
    },
    {
      id: "123572",
      patientId: "123472",
      date: "07/07/2024",
      value: "35 MZN",
      status: DeliverStatus.Delivered,
    },
    {
      id: "123573",
      patientId: "123473",
      date: "07/07/2024",
      value: "35 MZN",
      status: DeliverStatus.Delivered,
    },
    {
      id: "123574",
      patientId: "123474",
      date: "07/07/2024",
      value: "35 MZN",
      status: DeliverStatus.Canceled,
    },
    {
      id: "123575",
      patientId: "123475",
      date: "06/07/2024",
      value: "40 MZN",
      status: DeliverStatus.Delivered,
    },
    {
      id: "123576",
      patientId: "123476",
      date: "06/07/2024",
      value: "40 MZN",
      status: DeliverStatus.Delivered,
    },
    {
      id: "123577",
      patientId: "123477",
      date: "06/07/2024",
      value: "40 MZN",
      status: DeliverStatus.Canceled,
    },
    {
      id: "123578",
      patientId: "123478",
      date: "06/07/2024",
      value: "40 MZN",
      status: DeliverStatus.Delivered,
    },
    {
      id: "123579",
      patientId: "123479",
      date: "06/07/2024",
      value: "40 MZN",
      status: DeliverStatus.Canceled,
    },
    {
      id: "123580",
      patientId: "123480",
      date: "05/07/2024",
      value: "45 MZN",
      status: DeliverStatus.Delivered,
    },
    {
      id: "123581",
      patientId: "123481",
      date: "05/07/2024",
      value: "45 MZN",
      status: DeliverStatus.Delivered,
    },
    {
      id: "123582",
      patientId: "123482",
      date: "05/07/2024",
      value: "45 MZN",
      status: DeliverStatus.Canceled,
    },
    {
      id: "123583",
      patientId: "123483",
      date: "05/07/2024",
      value: "45 MZN",
      status: DeliverStatus.Delivered,
    },
  ])

  const [filteredDeliveries, setFilteredDeliveries] =
    useState<Delivery[]>(allDeliveries)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 7

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Apply filters when search query, date, or status changes
  useEffect(() => {
    let filtered = allDeliveries

    // Filter by patient ID
    if (searchQuery) {
      filtered = filtered.filter((delivery) =>
        delivery.patientId.includes(searchQuery),
      )
    }

    // Filter by date
    if (selectedDate) {
      const formattedSelectedDate = new Intl.DateTimeFormat("pt-BR").format(
        selectedDate,
      )
      filtered = filtered.filter(
        (delivery) => delivery.date === formattedSelectedDate,
      )
    }

    // Filter by status
    if (selectedStatus !== "all") {
      const statusMap: Record<string, string> = {
        delivered: DeliverStatus.Delivered,
        canceled: DeliverStatus.Canceled,
      }

      filtered = filtered.filter(
        (delivery) => delivery.status === statusMap[selectedStatus],
      )
    }

    setFilteredDeliveries(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedDate, selectedStatus, allDeliveries])

  const handleViewDetails = (deliveryId: string) => {
    router.push(`/admin/deliveries/${deliveryId}`)
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage)
  const paginatedDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div className="bg-white rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-secondary">ID DO PACIENTE</TableHead>
            <TableHead className="text-secondary">DATA DA COMPRA</TableHead>
            <TableHead className="text-secondary">VALOR</TableHead>
            <TableHead className="text-secondary">STATUS</TableHead>
            <TableHead className="text-secondary">AÇÕES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-secondary" />
                  <span className="ml-2">Carregando histórico...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : paginatedDeliveries.length > 0 ? (
            paginatedDeliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell className="font-medium">
                  {delivery.patientId}
                </TableCell>
                <TableCell>{delivery.date}</TableCell>
                <TableCell>{delivery.value}</TableCell>
                <TableCell>
                  <DeliverStatusLabel status={delivery.status} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    onClick={() => handleViewDetails(delivery.id)}
                  >
                    Visualizar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Nenhuma entrega encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {filteredDeliveries.length > 0 && (
        <div className="p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}
