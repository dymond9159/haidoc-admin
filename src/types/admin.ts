export enum DeliverStatus {
  OrderPlaced = "Pedido realizado",
  WaitingSeparation = "Esperando separação",
  WaitingDriver = "Esperando motorista",
  OnWay = "A caminho",
  Delivered = "Entregue",
  Canceled = "Cancelado",
}

export const statusColorMap: Record<DeliverStatus, string> = {
  [DeliverStatus.WaitingDriver]: "bg-rating-2 text-rating-6", // Using var(--color-rating-2) etc.
  [DeliverStatus.OnWay]: "bg-warning-2 text-warning-5",
  [DeliverStatus.WaitingSeparation]: "bg-info-2 text-info-5",
  [DeliverStatus.Delivered]: "bg-success-2 text-success-6",
  [DeliverStatus.Canceled]: "bg-error-2 text-error-5",
  [DeliverStatus.OrderPlaced]: "bg-system-3 text-system-11",
}
