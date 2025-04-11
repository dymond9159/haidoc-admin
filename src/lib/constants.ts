import { DeliverStatus } from "@/types/admin"

export const OrderStatusList = [
  DeliverStatus.WaitingDriver,
  DeliverStatus.OnWay,
  DeliverStatus.WaitingSeparation,
]

export const HistoryStatusList = [
  DeliverStatus.Canceled,
  DeliverStatus.Delivered,
  DeliverStatus.OrderPlaced,
]
