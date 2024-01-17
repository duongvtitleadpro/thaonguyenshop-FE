export type Response<T> = {
  data: T[];
  page: number;
  pageSize: number;
  totalPage: number;
  total: number;
};
