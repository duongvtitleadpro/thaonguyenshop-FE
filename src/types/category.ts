export type Category = {
  id: number;
  name: string;
  imageUrl: string;
  categoryImages: CategoryImage[];
};

export interface CategoryImage {
  id: number;
  categoryId: number;
  imageUrl: string;
  categoryStatus: string;
}
