"use client";

import {
  PurchaseOrderFilterDefaultValue,
  purchaseOrderFilterState,
} from "@/store/state/purchase-order-filter.atom";
import { ISummaryOrderFilter } from "@/types/common";
import {
  AllocationStatus,
  OrderStatus,
  SummaryOrderStatus,
} from "@/types/order";
import { currency } from "@/utils/currency";
import { ActionIcon, Input, Table, Tooltip } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";

type OrderStatusType = {
  value: string;
  label: string;
  summaryField: keyof SummaryOrderStatus;
  totalQuantity?: number;
};

interface PurchaseOrderFilterProps {
  summaryOrderFilter?: ISummaryOrderFilter;
  totalQuantity?: number;
  totalReceivedQuantity?: number;
  totalReceivedPrice?: number;
}

const PurchaseOrderFilter = ({
  summaryOrderFilter,
  totalQuantity,
  totalReceivedQuantity,
  totalReceivedPrice,
}: PurchaseOrderFilterProps) => {
  const [keyword, setKeyword] = React.useState("");
  const [keywordDebounced] = useDebouncedValue(keyword, 500);
  const [purchaseOrderFilter, setPurchaseOrderFilter] = useRecoilState(
    purchaseOrderFilterState
  );

  const handleChangeOrderStatus = (value: OrderStatus) => {
    if (purchaseOrderFilter.orderStatus?.includes(value)) {
      return;
    }
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      allocationStatus: [],
      orderStatus: [value] as OrderStatus[],
    }));
  };

  const AllocationStatusOptions: OrderStatusType[] = useMemo(
    () => [
      {
        value: "ALLOCATED",
        label: "Hàng đã về",
        summaryField: "totalAllocated",
        totalQuantity: summaryOrderFilter?.totalAllocated || 0,
      },
      {
        value: "SENT",
        label: "Hàng đã gửi",
        summaryField: "totalSent",
        totalQuantity: summaryOrderFilter?.totalSent || 0,
      },
    ],
    [summaryOrderFilter?.totalAllocated, summaryOrderFilter?.totalSent]
  );

  const OrderStatusOptions: OrderStatusType[] = useMemo(
    () => [
      {
        value: "PURCHASED",
        label: "Đã mua",
        summaryField: "totalPurchased",
        totalQuantity: summaryOrderFilter?.totalPurchased || 0,
      },
      {
        value: "NOT_PURCHASED",
        label: "Chưa mua hàng",
        summaryField: "totalUnPurchased",
        totalQuantity: summaryOrderFilter?.totalNotPurchased || 0,
      },
      {
        value: "CANCELLED",
        label: "Hủy",
        summaryField: "totalCancelled",
        totalQuantity: summaryOrderFilter?.totalCancelled || 0,
      },
      {
        value: "CUSTOMER_CANCELLED",
        label: "Khách hủy đơn",
        summaryField: "totalCustomerCancelled",
        totalQuantity: summaryOrderFilter?.totalCustomerCancelled || 0,
      },
    ],
    [
      summaryOrderFilter?.totalCancelled,
      summaryOrderFilter?.totalCustomerCancelled,
      summaryOrderFilter?.totalNotPurchased,
      summaryOrderFilter?.totalPurchased,
    ]
  );
  const handleChangeAllocationStatus = (value: AllocationStatus) => {
    if (purchaseOrderFilter.allocationStatus?.includes(value)) {
      return;
    }
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      orderStatus: [],
      allocationStatus: [value] as AllocationStatus[],
    }));
  };

  const handleSearchKeyword = () => {
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      query: keyword,
    }));
  };

  const handleClearFilter = () => {
    setPurchaseOrderFilter(PurchaseOrderFilterDefaultValue);
    setKeyword("");
  };

  const checkActiveFilterAllocationStatus = useCallback(
    (value: AllocationStatus) =>
      purchaseOrderFilter.allocationStatus?.includes(value),
    [purchaseOrderFilter.allocationStatus]
  );
  const checkActiveFilterOrderStatus = useCallback(
    (value: OrderStatus) => purchaseOrderFilter.orderStatus?.includes(value),
    [purchaseOrderFilter.orderStatus]
  );

  useEffect(() => {
    console.log("keywordDebounced", keywordDebounced);
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      query: keywordDebounced,
    }));
  }, [keywordDebounced, setPurchaseOrderFilter]);

  return (
    <div className="mb-3 flex gap-4 flex-col">
      <div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3  gap-4">
        <div className="col-span-2 md:col-span-1">
          <Input
            placeholder="Tìm kiếm tên, mã sản phẩm"
            className="h-full"
            value={keyword}
            onChange={(event) => setKeyword(event.currentTarget.value)}
            rightSectionPointerEvents="all"
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSearchKeyword();
            }}
          />
        </div>
        <Tooltip label="Xóa bộ lọc">
          <ActionIcon
            variant="transparent"
            color="blue"
            onClick={handleClearFilter}
            className="my-auto"
          >
            <X />
          </ActionIcon>
        </Tooltip>
      </div>
      <div className="flex gap-4 flex-wrap justify-center md:justify-start">
        {AllocationStatusOptions.map((item, index) => (
          <div
            onClick={() => {
              handleChangeAllocationStatus(item.value as AllocationStatus);
            }}
            className={`w-fit cursor-pointer text-sm ${
              checkActiveFilterAllocationStatus(
                item.value as AllocationStatus
              ) && "border-b-[2px] font-bold border-red-600 text-red-600"
            }`}
            key={index}
          >
            <span>{item.label}</span>
            <span className="ml-1">{`(${item.totalQuantity})`}</span>
          </div>
        ))}
        {OrderStatusOptions.map((item, index) => (
          <div
            onClick={() => {
              handleChangeOrderStatus(item.value as OrderStatus);
            }}
            className={`w-fit cursor-pointer text-sm  ${
              checkActiveFilterOrderStatus(item.value as OrderStatus) &&
              "border-b-[2px] font-bold border-red-600 text-red-600"
            }`}
            key={index}
          >
            <span>{item.label}</span>
            <span className="ml-1">{`(${item.totalQuantity})`}</span>
          </div>
        ))}
      </div>
      <div className="w-full md:w-[500px]">
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>SL đặt</Table.Th>
              <Table.Th>SL về</Table.Th>
              <Table.Th>Thành tiền</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Tổng</Table.Td>
              <Table.Td>{totalQuantity}</Table.Td>
              <Table.Td>{totalReceivedQuantity}</Table.Td>
              <Table.Td>{`${currency.format(
                totalReceivedPrice || 0
              )}`}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseOrderFilter;
