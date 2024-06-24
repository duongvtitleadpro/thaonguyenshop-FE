export type WarehouseStatus = "READY" | "ORDER";

export type ProductParam = {
  page: number;
  limit: number;
  category?: number;
  warehouseStatus?: WarehouseStatus;
  keyword?: string;
  sizes: number[];
  colors: number[];
  sort?: string;
};

export type Product = {
  id: number;
  createdAt: string;
  name: string;
  productCode: string;
  description: string;
  origin: string;
  phoneNumber?: string;
  price: number;
  warehouseStatus: WarehouseStatus;
  productStatus: ProductStatus;
  totalQuantity: number;
  details: ProductDetail[];
  productImages: ProductImage[];
  categoryProducts: CategoryProduct[];
  isDeleted: boolean;
};

export type ProductDetail = {
  color: ProductColor;
  size: ProductSize[];
};

export type ProductImage = {
  id: number;
  imageUrl: string;
};

export type CategoryProduct = {
  category: {
    id: number;
    name: string;
    imageUrl: string;
  };
};

export type ProductSize = {
  id: number;
  title: string;
  inventory: number;
};

export type ProductColor = ProductSize;

export type ProductStatus =
  | "UNPURCHASED"
  | "BOUGHT"
  | "CANCELLED"
  | "HANDLE"
  | "IN_SHORTAGE"
  | "ENDED"
  | "YET_DELIVERED"
  | "IN_STOCK" // còn hàng
  | "OUT_OF_STOCK" // hết hàng
  | null;

export type StockProductImageParam = {
  page: number;
  size: number;
};

export type StockProductImage = {
  id: number;
  createdAt: string;
  url: string;
};
