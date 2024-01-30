export type Response<T> = {
  data: T[];
  page: number;
  pageSize: number;
  size: number;
  totalPages: number;
  totalPage: number;
  total: number;
  totalElement: number;
};
