export type Response<T> = {
  data: T[];
  page: number;
  pageSize: number;
  size: number;
  totalPages: number;
  totalPage: number;
  total: number;
  totalElement: number;
  summaryOrderFilter: ISummaryOrderFilter;
  totalPrice: number;
  totalAmount: number;
};

export interface ISummaryOrderFilter {
  totalAllocated: number;
  totalAllocationStatus: number;
  totalCancelled: number;
  totalCustomerCancelled: number;
  totalNotAllocated: number;
  totalNotPurchased: number;
  totalPurchased: number;
  totalQuantity: number;
  totalSent: number;
}
