/*
 * Time frame Tab
 */
export enum TimeframeOptions {
  SEVEN_DAYS = "7 Dias",
  ONE_MONTH = "1 Mês",
  SIX_MONTHS = "6 Meses",
  ONE_YEAR = "1 Ano",
  ALL_TIME = "Todo Período",
}

/*
 * Chart Type
 */

export enum ChartType {
  Line = "line",
  Bar = "bar",
}

/*
 * Applications
 */

export interface Application {
  id: string
  businessName: string
  date: string
  plan: "Normal" | "Plus"
  rejectionCount?: number
}

/*
 *  Deliver
 */
export enum DeliverStatus {
  OrderPlaced = "Pedido realizado",
  WaitingSeparation = "Esperando separação",
  WaitingDriver = "Esperando motorista",
  OnWay = "A caminho",
  Delivered = "Entregue",
  Canceled = "Cancelado",
}

export interface Deliver {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  patientEmail: string
  patientAddress: string
  date: string
  value: string
  status: DeliverStatus
  items: any[]
  statusHistory: any[]
  documents: any[]
  paymentMethod: string
}

/*
 * Patient
 */
export enum PatientStatus {
  Pending = "Pendente",
  Waiting = "Aguardando",
  Rejected = "Recusada",
  Completed = "Concluída",
}

export interface Patient {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  patientEmail: string
  patientAddress: string
  date: string
  plan: string
  status: PatientStatus
}

/*
 * Invoice
 */

interface Party {
  name: string
  nuit: string
  address: string
  email: string
  phone: string
}

export enum InvoiceStatus {
  Paid = "Paga",
  Pending = "Pendente",
  Canceled = "Cancelada",
}

export enum PaymentMethod {
  CreditCard = "Cartão de crédito",
  BankTransfer = "Transferência bancária",
  Multicaixa = "Multicaixa",
}

export interface Invoice {
  id: string
  number: string
  issueDate: string
  unitValue: number
  plansCount: string
  paymentMethod: PaymentMethod
  status: InvoiceStatus
  issuer: Party
  customer: Party
  subtotal: number
  totalWithTaxes: number
  dueDate: string
}

/*
 * Online Consultation
 */

export interface Consultation {
  id: string
  patientId: string
  specialty: string
  doctor: string
  value: string
  date: string
  time: string
}

/*
 *  Status Color
 */
export const statusColorMap: Record<string, string> = {
  // Deliver Status Colors
  [DeliverStatus.WaitingDriver]: "bg-rating-2 text-rating-6",
  [DeliverStatus.OnWay]: "bg-warning-2 text-warning-5",
  [DeliverStatus.WaitingSeparation]: "bg-info-2 text-info-5",
  [DeliverStatus.Delivered]: "bg-success-2 text-success-6",
  [DeliverStatus.Canceled]: "bg-error-2 text-error-5",
  [DeliverStatus.OrderPlaced]: "bg-system-3 text-system-11",

  // Patient Status Colors
  [PatientStatus.Pending]: "bg-warning-2 text-warning-5",
  [PatientStatus.Waiting]: "bg-info-2 text-info-5",
  [PatientStatus.Rejected]: "bg-error-2 text-error-5",
  [PatientStatus.Completed]: "bg-success-2 text-success-6",
}
