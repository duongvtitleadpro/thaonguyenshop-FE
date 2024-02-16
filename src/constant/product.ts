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

export enum ProductStatusTitle {
  UNPURCHASED = "Chưa mua hàng",
  BOUGHT = "Đã mua hàng",
  CANCELLED = "Hủy",
  HANDLE = "Cần xử lý",
}

export enum ProductStatusColor {
  UNPURCHASED = "text-blue-500",
  BOUGHT = "text-green-500",
  CANCELLED = "text-red-500",
  HANDLE = "text-yellow-500",
}
