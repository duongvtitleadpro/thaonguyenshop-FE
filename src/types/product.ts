export type WarehouseStatus = "READY" | "ORDER";

export type ProductParam = {
  page: number;
  limit: number;
  category?: number;
  warehouseStatus?: WarehouseStatus;
  keyword?: string;
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
  totalQuantity: number;
  productImages: ProductImage[];
  categoryProducts: CategoryProduct[];
};

export interface ProductImage {
  id: number;
  imageUrl: string;
}

export interface CategoryProduct {
  category: {
    id: number;
    name: string;
  };
}

export interface ProductSize {
  id: number;
  title: string;
}
