"use client";

import React, { useEffect, useMemo, useRef } from "react";
import DataTable from "@/components/table/data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { useRecoilState } from "recoil";
import { paymentFilterState } from "@/store/state/payment-filter.atom";
import { getPaymentList } from "@/api/payment";
import { CloseButton, Input, Select } from "@mantine/core";
import PaginationCustom from "@/components/pagination";
import { currency } from "@/utils/currency";

const PaymentPage = () => {
  const [keyword, setKeyword] = React.useState("");
  const [paymentFilter, setPaymentFilter] = useRecoilState(paymentFilterState);
  const tableRef = useRef<HTMLDivElement | null>(null);
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
    tableRef.current?.scrollTo({
      top: 0,
    });
  };

  const paymentDataFooter = useMemo(() => {
    if (!paymentData) return [];
    return [
      {
        colSpan: 3,
        value: "Tổng",
      },
      {
        colSpan: 1,
        value: `${currency.format(paymentData.totalAmount || 0)}`,
        className: "text-left",
      },
    ];
  }, [paymentData]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
      });
    }, 0);
  }, []);

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
          <DataTable
            ref={tableRef}
            data={paymentData?.data}
            columns={columns}
            footer={paymentDataFooter}
          />
          <div className="flex justify-end gap-3 mt-4">
            <Select
              display={paymentData.data.length > 0 ? "flex" : "none"}
              w={70}
              value={paymentFilter.size?.toString()}
              onChange={handleChangePageSize}
              data={["10", "20", "30", "40", "50"]}
            />
            <PaginationCustom
              value={paymentData.page}
              onChange={handleGoToPage}
              total={paymentData.totalPages}
              color="blue"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
