"use client";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import DataTable from "@/components/table/data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getOrder } from "@/api/order";
import { useMemo } from "react";
import PurchaseOrderFilter from "./filter";
import { useRecoilState } from "recoil";
import { purchaseOrderFilterState } from "@/store/state/purchase-order-filter.atom";
import { QueryKey } from "@/constant/query-key";
import { currency } from "@/utils/currency";
import { Pagination, Select } from "@mantine/core";

const PurchaseOrderPage = () => {
  const [purchaseOrderFilter, setPurchaseOrderFilter] = useRecoilState(
    purchaseOrderFilterState
  );
  const { data: purchaseOrderData, refetch } = useQuery({
    queryKey: [QueryKey.GET_PURCHASE_ORDER, purchaseOrderFilter],
    queryFn: () => getOrder(purchaseOrderFilter),
  });

  const purchaseOrderFooter = useMemo(() => {
    if (!purchaseOrderData) return [];
    return [
      {
        colSpan: 3,
        value: "Tổng tiền",
      },
      {
        colSpan: 1,
        value: `${purchaseOrderData.totalQuantity}`,
        className: "text-center",
      },
      {
        colSpan: 1,
        value: `${purchaseOrderData.totalRecievedQuantity}`,
        className: "text-center",
      },
      {
        colSpan: 2,
        value: `${currency.format(purchaseOrderData.totalPrice)}`,
        className: "text-right",
      },
      {
        colSpan: 6,
      },
    ];
  }, [purchaseOrderData]);

  const handleGoToPage = (pageIndex: number) => {
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      page: pageIndex,
    }));
  };

  const handleChangePageSize = (pageSize: string | null) => {
    console.log("😻 ~ handleChangePageSize ~ pageSize:", pageSize);
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      size: Number(pageSize),
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <PurchaseOrderFilter />
      {/* <CalendarDateRangePicker /> */}
      {purchaseOrderData && (
        <div className="h-[550px] w-full">
          <DataTable
            columns={columns}
            data={purchaseOrderData.data}
            footer={purchaseOrderFooter}
          />
          <div className="flex justify-end gap-3 mt-4">
            <Select
              display={purchaseOrderData.data.length > 0 ? "flex" : "none"}
              w={70}
              value={purchaseOrderFilter.size?.toString()}
              onChange={handleChangePageSize}
              data={["10", "20", "30", "40", "50"]}
            />
            <Pagination
              value={purchaseOrderData.page}
              onChange={handleGoToPage}
              total={purchaseOrderData.totalPages}
              styles={{
                control: {
                  backgroundColor: "var(--_control-bg-color)",
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrderPage;
