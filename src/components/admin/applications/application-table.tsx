"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pagination } from "@/components/ui/pagination"
import { formatDate } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Application type definition
interface Application {
  id: string
  businessName: string
  date: string
  plan: "Normal" | "Plus"
  rejectionCount?: number
}

interface ApplicationTableProps {
  status: "pending" | "approved" | "rejected" | "canceled"
  searchTerm?: string
  dateFilter?: string
  planFilter?: string
  onViewDetails?: (id: string) => void
}

export function ApplicationTable({
  status,
  searchTerm = "",
  dateFilter = "",
  planFilter = "",
  onViewDetails,
}: ApplicationTableProps) {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 7

  // Mock data for applications
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const mockApplications: Application[] = Array.from(
      { length: 20 },
      (_, i) => ({
        id: `app-${i + 1}`,
        businessName: `Farmácia com nome muuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuito grande ${i + 1}`,
        date: new Date(2024, 6, 15 - i).toISOString(),
        plan: i % 3 === 0 ? "Plus" : "Normal",
        rejectionCount:
          status === "rejected" ? Math.floor(Math.random() * 3) + 1 : undefined,
      }),
    )

    setApplications(mockApplications)
  }, [status])

  // Filter applications based on search term, date, plan, and status
  useEffect(() => {
    let filtered = [...applications]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((app) =>
        app.businessName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter).toISOString().split("T")[0]
      filtered = filtered.filter(
        (app) => new Date(app.date).toISOString().split("T")[0] === filterDate,
      )
    }

    // Filter by plan
    if (planFilter && planFilter !== "all") {
      filtered = filtered.filter(
        (app) => app.plan.toLowerCase() === planFilter.toLowerCase(),
      )
    }

    setFilteredApplications(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    setCurrentPage(1) // Reset to first page when filters change
  }, [applications, searchTerm, dateFilter, planFilter])

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredApplications.slice(startIndex, endIndex)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle view details
  const handleViewDetails = (id: string) => {
    if (onViewDetails) {
      onViewDetails(id)
    } else {
      // Navigate to the appropriate route based on status
      router.push(`/admin/applications/${id}?status=${status}`)
    }
  }

  return (
    <div className="rounded-md border overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-secondary">NOME</TableHead>
              <TableHead className="text-center text-secondary">DATA</TableHead>
              <TableHead className="text-center text-secondary">
                PLANO
              </TableHead>
              {status === "rejected" && (
                <TableHead className="text-center text-secondary">
                  TENTATIVAS
                </TableHead>
              )}
              <TableHead className="text-center text-secondary">
                DETALHES
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getCurrentPageItems().map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium max-w-[300px] truncate">
                  {application.businessName}
                </TableCell>
                <TableCell className="text-center">
                  {formatDate(new Date(application.date))}
                </TableCell>
                <TableCell className="text-center">
                  {application.plan}
                </TableCell>
                {status === "rejected" && (
                  <TableCell className="text-center">
                    {application.rejectionCount} de 3
                  </TableCell>
                )}
                <TableCell className="text-center">
                  <Button
                    variant="link"
                    className="text-primary-9 p-0 h-auto"
                    onClick={() => handleViewDetails(application.id)}
                  >
                    Visualizar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {getCurrentPageItems().length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={status === "rejected" ? 5 : 4}
                  className="h-24 text-center"
                >
                  Nenhuma aplicação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="p-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
