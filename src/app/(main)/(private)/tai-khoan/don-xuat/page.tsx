"use client";

import DataTable from "@/components/table/data-table";
import { columns } from "./columns";
import { useRecoilState } from "recoil";
import { combineOrderFilterState } from "@/store/state/combine-order-filter.atom";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { getCombineOrder } from "@/api/order";
import { Pagination, Select } from "@mantine/core";

const ExportOrderPage = () => {
  const [combineOrderFilter, setCombineOrderFilter] = useRecoilState(
    combineOrderFilterState
  );
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
  };

  return (
    <>
      {combineOrderData && (
        <div className="w-full">
          <DataTable data={combineOrderData.data} columns={columns} />
          <div className="flex justify-end gap-3 mt-4">
            <Select
              display={combineOrderData.data.length > 0 ? "flex" : "none"}
              w={70}
              value={combineOrderFilter.size?.toString()}
              onChange={handleChangePageSize}
              data={["10", "20", "30", "40", "50"]}
            />
            <Pagination
              value={combineOrderData.page}
              onChange={handleGoToPage}
              total={combineOrderData.totalPages}
              styles={{
                control: {
                  backgroundColor: "var(--_control-bg-color)",
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ExportOrderPage;
