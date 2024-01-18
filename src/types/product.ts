export type WarehouseStatus = "READY" | "ORDER";

export type ProductParam = {
  page: number;
  limit: number;
  category?: number;
  warehouseStatus?: WarehouseStatus;
  keyword?: string;
  sizes: number[];
  colors: number[];
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
  details: ProductDetail[];
  productImages: ProductImage[];
  categoryProducts: CategoryProduct[];
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
};

export type ProductColor = ProductSize;
