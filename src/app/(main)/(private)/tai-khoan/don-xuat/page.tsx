"use client";

import DataTable from "@/components/table/data-table";
import { columns } from "./columns";
import { useRecoilState } from "recoil";
import { combineOrderFilterState } from "@/store/state/combine-order-filter.atom";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { getCombineOrder } from "@/api/order";

const ExportOrderPage = () => {
  const [combineOrderFilter, setCombineOrderFilter] = useRecoilState(
    combineOrderFilterState
  );
  const { data: combineOrderData } = useQuery({
    queryKey: [QueryKey.GET_COMBINE_ORDER, combineOrderFilter],
    queryFn: () => getCombineOrder(combineOrderFilter),
  });

  return (
    <>
      {combineOrderData && (
        <DataTable data={combineOrderData.data} columns={columns} />
      )}
    </>
  );
};

export default ExportOrderPage;
