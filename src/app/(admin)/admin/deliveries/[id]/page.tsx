"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loading } from "@/components/common"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, Loader2 } from "lucide-react"
import { ProblemReportDialog } from "@/components/admin/deliveries/problem-report-dialog"
import { DocumentList } from "@/components/admin/document-list"
import { Card } from "@/components/ui/card"
import { DeliverStatus } from "@/types/admin"
import { DeliverStatusDropdown } from "@/components/admin/deliveries/deliver-status-dropdown"
import { OrderStatusList } from "@/lib/constants"

interface DeliveryItem {
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

interface Delivery {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  patientEmail: string
  patientAddress: string
  date: string
  value: string
  status: DeliverStatus
  items: DeliveryItem[]
  statusHistory: StatusHistoryItem[]
  documents: Document[]
  paymentMethod: string
}

export default function DeliveryDetailsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [delivery, setDelivery] = useState<Delivery | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isReportingProblem, setIsReportingProblem] = useState(false)
  const [isChangingStatus, setIsChangingStatus] = useState(false)

  const params = useParams<{ id: string }>()
  const id = params.id

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data based on ID
        const mockDelivery: Delivery = {
          id,
          patientId: "123456789",
          patientName: "Ana Maria Santos de Oliveira",
          patientPhone: "82 123 4567",
          patientEmail: "ana.maria@example.com",
          patientAddress:
            "Rua do Dão, nº49, 2º Andar, Bairro Central, Cidade de Maputo, Moçambique",
          date: "04/06/2024",
          value: "300 MZN",
          status: DeliverStatus.OnWay,
          items: [
            { name: "Paracetamol 500mg", quantity: 2, price: "150 MZN" },
            { name: "Ibuprofeno 400mg", quantity: 1, price: "150 MZN" },
          ],
          statusHistory: [
            {
              status: DeliverStatus.OrderPlaced,
              timestamp: "04/06/2024 10:30",
            },
            { status: DeliverStatus.OnWay, timestamp: "04/06/2024 10:35" },
            {
              status: DeliverStatus.WaitingDriver,
              timestamp: "04/06/2024 11:00",
            },
          ],
          documents: [
            { name: "exame.pdf", type: "pdf" },
            { name: "historico.pdf", type: "pdf" },
            { name: "exame.jpeg", type: "image" },
          ],
          paymentMethod: "E-mola",
        }

        setDelivery(mockDelivery)
      } catch (error) {
        console.log(error)
        toast?.({
          title: "Erro",
          description: "Não foi possível carregar os detalhes da entrega.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDeliveryDetails()
  }, [id])

  const handleBack = () => {
    router.back()
  }

  const handleReportProblem = () => {
    setIsReportingProblem(true)
  }

  const handleStatusChange = async (newStatus: DeliverStatus) => {
    if (!delivery) return

    setIsChangingStatus(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      const updatedDelivery = {
        ...delivery,
        status: newStatus,
        statusHistory: [
          ...delivery.statusHistory,
          {
            status: newStatus,
            timestamp: new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date()),
          },
        ],
      }

      setDelivery(updatedDelivery)

      toast({
        title: "Status atualizado",
        description: `Entrega #${delivery.id} atualizada para "${newStatus}"`,
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status da entrega.",
      })
    } finally {
      setIsChangingStatus(false)
    }
  }

  const handleConfirm = async () => {
    if (!delivery) return

    setIsChangingStatus(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      const updatedDelivery = {
        ...delivery,
        status: DeliverStatus.Delivered,
        statusHistory: [
          ...delivery.statusHistory,
          {
            status: DeliverStatus.Delivered,
            timestamp: new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date()),
          },
        ],
      }

      setDelivery(updatedDelivery)

      // Show success message
      toast({
        title: "Sucesso",
        description: `Sua ação foi realizada com sucesso!`,
      })

      // Hide success message after 3 seconds
      setTimeout(() => {
        // Navigate back after showing success
        router.push("/admin/deliveries")
      }, 3000)
    } catch (error) {
      console.log(error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao confirmar a entrega. Tente novamente.",
      })
    } finally {
      setIsChangingStatus(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (!delivery) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-medium">Entrega não encontrada</p>
          <Button
            variant={"outline"}
            onClick={() => router.push("/admin/deliveries")}
          >
            Voltar para entregas
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="flex items-center text-primary-9 -ml-2"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Detalhes
      </Button>
      <div className="max-w-xl mx-auto">
        <Card className="space-y-6 ">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pedido {id}</h2>
          </div>

          <div className="mt-6 space-y-6">
            <section>
              <h3 className="font-medium">Informações do pedido</h3>
              <div className="mt-2 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">ID do pedido</p>
                  <p className="text-sm">{delivery.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Data da compra
                  </p>
                  <p className="text-sm">{delivery.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="mt-1">
                    <DeliverStatusDropdown
                      status={delivery.status as DeliverStatus}
                      availableStatus={OrderStatusList}
                      onStatusChange={(newStatus) =>
                        handleStatusChange(newStatus)
                      }
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Forma de pagamento
                  </p>
                  <p className="text-sm">{delivery.paymentMethod}</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-medium">Informações do paciente</h3>
              <div className="mt-2 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    ID do paciente
                  </p>
                  <p className="text-sm">{delivery.patientId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Nome do paciente
                  </p>
                  <p className="text-sm">{delivery.patientName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Endereço</p>
                  <p className="text-sm">{delivery.patientAddress}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Número de telefone
                  </p>
                  <p className="text-sm">{delivery.patientPhone}</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-medium">Orçamento</h3>
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">Valor</p>
                <p className="text-sm">{delivery.value}</p>
              </div>
            </section>

            <section>
              <h3 className="font-medium">Documentos enviados</h3>
              <div className="mt-2">
                <DocumentList documents={delivery.documents} />
              </div>
            </section>
          </div>
        </Card>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={handleReportProblem}>
            Reportar problema
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isChangingStatus}
            className="bg-primary-9 text-white"
          >
            {isChangingStatus ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirmando...
              </>
            ) : (
              "Confirmar"
            )}
          </Button>
        </div>
      </div>

      <ProblemReportDialog
        open={isReportingProblem}
        onOpenChange={setIsReportingProblem}
        orderId={delivery.id}
      />
    </div>
  )
}
