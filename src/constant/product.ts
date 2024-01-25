export enum OrderStatusTitle {
  NOT_PURCHASED = "Chưa mua hàng",
  PURCHASED = "Đã mua hàng",
  CANCELLED = "Hủy",
  CUSTOMER_CANCELLED = "Khách hủy đơn",
}

export enum OrderStatusColor {
  NOT_PURCHASED = "text-yellow-500",
  PURCHASED = "text-green-500",
  CANCELLED = "text-red-500",
  CUSTOMER_CANCELLED = "text-orange-500",
}

export enum OrderStateTitle {
  SENT = "Đã xuất",
  ALLOCATED = "Đã chia",
}
