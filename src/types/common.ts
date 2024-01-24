export type Response<T> = {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
};
