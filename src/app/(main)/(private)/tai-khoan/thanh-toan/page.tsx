"use client";

import React from "react";
import DataTable from "@/components/table/data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { useRecoilState } from "recoil";
import { paymentFilterState } from "@/store/state/payment-filter.atom";
import { getPaymentList } from "@/api/payment";
import { CloseButton, Input, Pagination, Select } from "@mantine/core";

const PaymentPage = () => {
  const [keyword, setKeyword] = React.useState("");
  const [paymentFilter, setPaymentFilter] = useRecoilState(paymentFilterState);
  const { data: paymentData, refetch } = useQuery({
    queryKey: [QueryKey.GET_PAYMENT_LIST, paymentFilter],
    queryFn: () => getPaymentList(paymentFilter),
  });

  const handleSearchKeyword = () => {
    setPaymentFilter((prev) => ({
      ...prev,
      query: keyword,
    }));
  };

  const handleGoToPage = (pageIndex: number) => {
    setPaymentFilter((prev) => ({
      ...prev,
      page: pageIndex,
    }));
  };

  const handleChangePageSize = (pageSize: string | null) => {
    setPaymentFilter((prev) => ({
      ...prev,
      size: Number(pageSize),
    }));
  };

  return (
    <div className="flex flex-col h-full gap-3">
      <Input
        placeholder="Tìm kiếm mã thanh toán, nội dung và tiền"
        value={keyword}
        onChange={(event) => setKeyword(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => {
              setKeyword("");
              setPaymentFilter((prev) => ({ ...prev, query: "" }));
            }}
            style={{ display: keyword ? undefined : "none" }}
          />
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSearchKeyword();
        }}
        className="w-1/3"
      />
      {paymentData && (
        <div className="w-full">
          <DataTable data={paymentData?.data} columns={columns} />
          <div className="flex justify-end gap-3 mt-4">
            <Select
              display={paymentData.data.length > 0 ? "flex" : "none"}
              w={70}
              value={paymentFilter.size?.toString()}
              onChange={handleChangePageSize}
              data={["10", "20", "30", "40", "50"]}
            />
            <Pagination
              value={paymentData.page}
              onChange={handleGoToPage}
              total={paymentData.totalPages}
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

export default PaymentPage;
