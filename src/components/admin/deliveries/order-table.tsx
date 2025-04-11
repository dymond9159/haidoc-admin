"use client"

import * as React from "react"
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
import { useToast } from "@/hooks/use-toast" // Assuming use-toast is renamed or kept
import { Loader2 } from "lucide-react"
import { Pagination } from "@/components/ui/pagination" // Assuming pagination component path
import { DeliverStatus } from "@/types/admin"
import { DeliverStatusDropdown } from "./deliver-status-dropdown"
import { OrderStatusList } from "@/lib/constants"

interface OrderItem {
  name: string
  quantity: number
  price: string
}

interface StatusHistoryItem {
  status: DeliverStatus
  timestamp: string
}

interface Document {
  name: string
  type: "pdf" | "image"
}

interface Order {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  patientEmail: string
  patientAddress: string
  date: string
  value: string
  status: DeliverStatus
  items: OrderItem[]
  statusHistory: StatusHistoryItem[]
  documents: Document[]
  paymentMethod: string
}

interface OrderTableProps {
  searchQuery: string
  selectedDate: Date | undefined
  selectedStatus: string
}

export function OrderTable({
  searchQuery,
  selectedDate,
  selectedStatus,
}: OrderTableProps) {
  const router = useRouter()
  const [allOrders, setAllOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null)
  const { toast } = useToast()
  const itemsPerPage = 7

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API

      // Mock data using Enum
      const mockOrders: Order[] = [
        {
          id: "123556",
          patientId: "123456",
          patientName: "Ana Maria Santos",
          patientPhone: "82 123 4567",
          patientEmail: "ana.maria@example.com",
          patientAddress:
            "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
          date: "09/07/2024",
          value: "24 MZN",
          status: DeliverStatus.WaitingDriver,
          items: [
            { name: "Paracetamol 500mg", quantity: 2, price: "150 MZN" },
            { name: "Ibuprofeno 400mg", quantity: 1, price: "150 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "09/07/2024 10:30",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "09/07/2024 10:35",
            },
            {
              status: DeliverStatus.WaitingDriver,
              timestamp: "09/07/2024 11:00",
            },
          ],
          documents: [
            { name: "Receita médica.pdf", type: "pdf" },
            { name: "Comprovante de pagamento.pdf", type: "pdf" },
          ],
          paymentMethod: "Cartão de crédito",
        },
        {
          id: "123557",
          patientId: "123457",
          patientName: "João Silva",
          patientPhone: "82 234 5678",
          patientEmail: "joao.silva@example.com",
          patientAddress:
            "Av. Eduardo Mondlane, nº123, Bairro Polana, Cidade de Maputo, Moçambique",
          date: "09/07/2024",
          value: "24 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Vitamina C 1000mg", quantity: 1, price: "200 MZN" },
            { name: "Máscara facial N95", quantity: 5, price: "250 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "09/07/2024 09:15",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "09/07/2024 09:20",
            },
            {
              status: DeliverStatus.WaitingDriver,
              timestamp: "09/07/2024 10:00",
            },
            { status: DeliverStatus.OnWay, timestamp: "09/07/2024 10:30" },
          ],
          documents: [{ name: "Receita médica.pdf", type: "pdf" }],
          paymentMethod: "PIX",
        },
        {
          id: "123558",
          patientId: "123458",
          patientName: "Maria Fernanda",
          patientPhone: "82 345 6789",
          patientEmail: "maria.fernanda@example.com",
          patientAddress:
            "Rua Joaquim Chissano, nº78, Bairro Sommerschield, Cidade de Maputo, Moçambique",
          date: "09/07/2024",
          value: "24 MZN",
          status: DeliverStatus.WaitingSeparation,
          items: [
            { name: "Dipirona 500mg", quantity: 2, price: "120 MZN" },
            { name: "Omeprazol 20mg", quantity: 1, price: "180 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OnWay,
              timestamp: "09/07/2024 11:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "09/07/2024 11:50",
            },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.pdf", type: "pdf" },
          ],
          paymentMethod: "Dinheiro",
        },
        {
          id: "123563",
          patientId: "123463",
          patientName: "Pedro Oliveira",
          patientPhone: "82 890 1234",
          patientEmail: "pedro.oliveira@example.com",
          patientAddress:
            "Av. Karl Marx, nº345, Bairro Alto Maé, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.WaitingSeparation,
          items: [
            { name: "Metformina 850mg", quantity: 2, price: "200 MZN" },
            { name: "Glibenclamida 5mg", quantity: 1, price: "180 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 14:30",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 14:35",
            },
            {
              status: DeliverStatus.WaitingDriver,
              timestamp: "08/07/2024 15:15",
            },
            { status: DeliverStatus.OnWay, timestamp: "08/07/2024 15:45" },
            { status: DeliverStatus.Delivered, timestamp: "08/07/2024 16:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.pdf", type: "pdf" },
          ],
          paymentMethod: "Dinheiro",
        },
        {
          id: "123564",
          patientId: "123465",
          patientName: "Ricardo Silva",
          patientPhone: "82 012 3456",
          patientEmail: "ricardo.silva@example.com",
          patientAddress:
            "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
            { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 16:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 16:50",
            },
            { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.jpg", type: "image" },
          ],
          paymentMethod: "Transferência bancária",
        },
        {
          id: "123565",
          patientId: "123465",
          patientName: "Ricardo Silva",
          patientPhone: "82 012 3456",
          patientEmail: "ricardo.silva@example.com",
          patientAddress:
            "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
            { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 16:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 16:50",
            },
            { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.jpg", type: "image" },
          ],
          paymentMethod: "Transferência bancária",
        },
        {
          id: "123566",
          patientId: "123465",
          patientName: "Ricardo Silva",
          patientPhone: "82 012 3456",
          patientEmail: "ricardo.silva@example.com",
          patientAddress:
            "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
            { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 16:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 16:50",
            },
            { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.jpg", type: "image" },
          ],
          paymentMethod: "Transferência bancária",
        },
        {
          id: "123567",
          patientId: "123465",
          patientName: "Ricardo Silva",
          patientPhone: "82 012 3456",
          patientEmail: "ricardo.silva@example.com",
          patientAddress:
            "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
            { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 16:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 16:50",
            },
            { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.jpg", type: "image" },
          ],
          paymentMethod: "Transferência bancária",
        },
        {
          id: "123568",
          patientId: "123465",
          patientName: "Ricardo Silva",
          patientPhone: "82 012 3456",
          patientEmail: "ricardo.silva@example.com",
          patientAddress:
            "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
            { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 16:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 16:50",
            },
            { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.jpg", type: "image" },
          ],
          paymentMethod: "Transferência bancária",
        },
        {
          id: "123569",
          patientId: "123465",
          patientName: "Ricardo Silva",
          patientPhone: "82 012 3456",
          patientEmail: "ricardo.silva@example.com",
          patientAddress:
            "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
            { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 16:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 16:50",
            },
            { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.jpg", type: "image" },
          ],
          paymentMethod: "Transferência bancária",
        },
        {
          id: "123570",
          patientId: "123465",
          patientName: "Ricardo Silva",
          patientPhone: "82 012 3456",
          patientEmail: "ricardo.silva@example.com",
          patientAddress:
            "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
            { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 16:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 16:50",
            },
            { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.jpg", type: "image" },
          ],
          paymentMethod: "Transferência bancária",
        },
        {
          id: "123571",
          patientId: "123465",
          patientName: "Ricardo Silva",
          patientPhone: "82 012 3456",
          patientEmail: "ricardo.silva@example.com",
          patientAddress:
            "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
            { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 16:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 16:50",
            },
            { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.jpg", type: "image" },
          ],
          paymentMethod: "Transferência bancária",
        },
        {
          id: "123572",
          patientId: "123465",
          patientName: "Ricardo Silva",
          patientPhone: "82 012 3456",
          patientEmail: "ricardo.silva@example.com",
          patientAddress:
            "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
            { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 16:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 16:50",
            },
            { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.jpg", type: "image" },
          ],
          paymentMethod: "Transferência bancária",
        },
        {
          id: "123573",
          patientId: "123465",
          patientName: "Ricardo Silva",
          patientPhone: "82 012 3456",
          patientEmail: "ricardo.silva@example.com",
          patientAddress:
            "Av. Ahmed Sekou Touré, nº78, Bairro Polana Caniço, Cidade de Maputo, Moçambique",
          date: "08/07/2024",
          value: "30 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Nimesulida 100mg", quantity: 2, price: "140 MZN" },
            { name: "Dexametasona creme", quantity: 1, price: "160 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "08/07/2024 16:45",
            },
            {
              status: DeliverStatus.WaitingSeparation,
              timestamp: "08/07/2024 16:50",
            },
            { status: DeliverStatus.Canceled, timestamp: "08/07/2024 17:00" },
          ],
          documents: [
            { name: "Receita médica.jpg", type: "image" },
            { name: "Comprovante de pagamento.jpg", type: "image" },
          ],
          paymentMethod: "Transferência bancária",
        },
      ]

      setAllOrders(mockOrders)
      setFilteredOrders(mockOrders)
      setIsLoading(false)
    }

    fetchOrders()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = allOrders

    // Filter by patient ID (or other criteria like name, order id etc.)
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.patientId.includes(searchQuery) ||
          order.patientName.toLowerCase().includes(lowerCaseQuery) ||
          order.id.includes(searchQuery),
      )
    }

    // Filter by date
    if (selectedDate) {
      const formattedSelectedDate = selectedDate.toLocaleDateString("pt-BR") // Simpler formatting if time isn't needed
      filtered = filtered.filter(
        (order) => order.date === formattedSelectedDate,
      )
    }

    const statusValueMap: Record<string, DeliverStatus> = {
      "waiting-separation": DeliverStatus.WaitingSeparation,
      "waiting-driver": DeliverStatus.WaitingDriver,
      "on-way": DeliverStatus.OnWay,
      delivered: DeliverStatus.Delivered,
      canceled: DeliverStatus.Canceled,
    }

    if (selectedStatus !== "all" && statusValueMap[selectedStatus]) {
      const targetStatus = statusValueMap[selectedStatus]
      filtered = filtered.filter((order) => order.status === targetStatus)
    }

    setFilteredOrders(filtered)
    setCurrentPage(1)
  }, [searchQuery, selectedDate, selectedStatus, allOrders])

  const handleStatusChange = async (id: string, newStatus: DeliverStatus) => {
    setIsUpdatingStatus(id)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API

      // Format timestamp consistently
      const timestamp = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date())

      // Update local state
      const updatedOrders = allOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: newStatus,
              statusHistory: [
                ...order.statusHistory,
                { status: newStatus, timestamp: timestamp },
              ],
            }
          : order,
      )
      setAllOrders(updatedOrders)

      // Update filtered state directly from the updated source
      setFilteredOrders((prevFiltered) =>
        prevFiltered
          .map((order) =>
            order.id === id ? updatedOrders.find((o) => o.id === id)! : order,
          )
          .filter(Boolean),
      ) // Ensure item exists after update

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
    } finally {
      setIsUpdatingStatus(null)
    }
  }

  // Handle view details navigation
  const handleViewDetails = (orderId: string) => {
    router.push(`/admin/deliveries/${orderId}`)
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div className="bg-white rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-secondary">ID DO PACIENTE</TableHead>
            <TableHead className="text-secondary">DATA DO PEDIDO</TableHead>
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
                  <span className="ml-2">Carregando pedidos...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : paginatedOrders.length > 0 ? (
            paginatedOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{order.patientId}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.value}</TableCell>
                <TableCell>
                  <DeliverStatusDropdown
                    status={order.status}
                    availableStatus={OrderStatusList}
                    onStatusChange={(newStatus) =>
                      handleStatusChange(order.id, newStatus)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    className="text-primary-9 h-auto p-0"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    Visualizar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Nenhum pedido encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination */}
      {totalPages > 1 && ( // Only show pagination if needed
        <div className="p-4 border-t">
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
