"use client";

import DataTable from "@/components/table/data-table";
import { columns } from "./columns";
import { useRecoilState } from "recoil";
import { combineOrderFilterState } from "@/store/state/combine-order-filter.atom";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { getCombineOrder } from "@/api/order";
import { Select } from "@mantine/core";
import PaginationCustom from "@/components/pagination";
import { useEffect, useMemo, useRef } from "react";
import { currency } from "@/utils/currency";

const ExportOrderPage = () => {
  const [combineOrderFilter, setCombineOrderFilter] = useRecoilState(
    combineOrderFilterState
  );

  const tableRef = useRef<HTMLDivElement | null>(null);
  const { data: combineOrderData } = useQuery({
    queryKey: [QueryKey.GET_COMBINE_ORDER, combineOrderFilter],
    queryFn: () => getCombineOrder(combineOrderFilter),
  });

  const handleGoToPage = (pageIndex: number) => {
    setCombineOrderFilter((prev) => ({
      ...prev,
      page: pageIndex,
    }));
  };

  const handleChangePageSize = (pageSize: string | null) => {
    setCombineOrderFilter((prev) => ({
      ...prev,
      size: Number(pageSize),
    }));
    tableRef.current?.scrollTo({
      top: 0,
    });
  };
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
      });
    }, 0);
  }, []);

  const combineOrderFooter = useMemo(() => {
    if (!combineOrderData) return [];
    return [
      {
        colSpan: 2,
        value: "Tổng",
      },
      {
        colSpan: 1,
        value: `${currency.format(combineOrderData.totalPrice || 0)}`,
        className: "text-left",
      },
      {
        colSpan: 2,
      },
    ];
  }, [combineOrderData]);

  return (
    <>
      {combineOrderData && (
        <div className="w-full">
          <DataTable
            ref={tableRef}
            data={combineOrderData.data}
            columns={columns}
            footer={combineOrderFooter}
          />
          <div className="flex justify-end gap-3 mt-4">
            <Select
              display={combineOrderData.data.length > 0 ? "flex" : "none"}
              w={70}
              value={combineOrderFilter.size?.toString()}
              onChange={handleChangePageSize}
              data={["10", "20", "30", "40", "50"]}
            />
            <PaginationCustom
              value={combineOrderData.page}
              onChange={handleGoToPage}
              total={combineOrderData.totalPages}
              color="blue"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ExportOrderPage;
