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

export enum OrderStateColor {
  SENT = "text-orange-500",
  ALLOCATED = "text-blue-500",
}

export enum OrderStateTitle {
  SENT = "Hàng đã gửi",
  ALLOCATED = "Hàng đã về",
}

export enum ProductStatusTitle {
  UNPURCHASED = "Chưa mua hàng",
  BOUGHT = "Đã mua hàng",
  CANCELLED = "Hủy",
  HANDLE = "Đã mua hàng",
  IN_SHORTAGE = "Đã mua hàng",
  ENDED = "Đã mua hàng",
  YET_DELIVERED = "Đã mua hàng",
  IN_STOCK = "Còn hàng",
  OUT_OF_STOCK = "Hết hàng",
}

export enum ProductStatusColor {
  UNPURCHASED = "text-blue-500",
  BOUGHT = "text-green-500",
  CANCELLED = "text-red-500",
  HANDLE = "text-green-500",
  IN_SHORTAGE = "text-green-500",
  ENDED = "text-green-500",
  YET_DELIVERED = "text-green-500",
  IN_STOCK = "text-blue-500",
  OUT_OF_STOCK = "text-red-500",
}
