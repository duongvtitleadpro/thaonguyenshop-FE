export type Order = {
  productId: number;
  orderDetails: OrderDetail[];
};

export type OrderDetail = {
  productId: number;
  colorId: number;
  sizeId: number;
  quantity: number;
};

export type OrderResponse = {
  id: number;
  orderDate: string;
  totalPrice: number;
  note: any;
  productId: number;
  userId: number;
  orderStatus: string;
  allocationStatus: any;
  orderDetails: OrderDetailRespose[];
};

export type OrderDetailRespose = {
  size: {
    title: string;
  };
  color: {
    title: string;
  };
  quantity: number;
};
