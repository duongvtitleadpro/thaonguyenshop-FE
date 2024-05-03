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
import { ActionIcon, Input, Tooltip } from "@mantine/core";
import { X } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";

type OrderStatusType = {
  value: string;
  label: string;
  summaryField: keyof SummaryOrderStatus;
  totalQuantity?: number;
};

interface PurchaseOrderFilterProps {
  summaryOrderFilter?: ISummaryOrderFilter;
}

const PurchaseOrderFilter = ({
  summaryOrderFilter,
}: PurchaseOrderFilterProps) => {
  const [keyword, setKeyword] = React.useState("");
  const [purchaseOrderFilter, setPurchaseOrderFilter] = useRecoilState(
    purchaseOrderFilterState
  );

  const handleChangeOrderStatus = (value: OrderStatus) => {
    if (purchaseOrderFilter.orderStatus?.includes(value)) {
      return;
    }
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      orderStatus: [
        ...(purchaseOrderFilter.orderStatus || []),
        value,
      ] as OrderStatus[],
    }));
  };

  const AllocationStatusOptions: OrderStatusType[] = useMemo(
    () => [
      {
        value: "ALLOCATED",
        label: "Hàng đã về",
        summaryField: "totalAllocated",
        totalQuantity: summaryOrderFilter?.totalAllocationStatus,
      },
      {
        value: "SENT",
        label: "Hàng đã gửi",
        summaryField: "totalSent",
        totalQuantity: summaryOrderFilter?.totalSent,
      },
    ],
    [summaryOrderFilter?.totalAllocationStatus, summaryOrderFilter?.totalSent]
  );

  const OrderStatusOptions: OrderStatusType[] = useMemo(
    () => [
      {
        value: "PURCHASED",
        label: "Đã mua",
        summaryField: "totalPurchased",
        totalQuantity: summaryOrderFilter?.totalPurchased,
      },
      {
        value: "NOT_PURCHASED",
        label: "Chưa mua hàng",
        summaryField: "totalUnPurchased",
        totalQuantity: summaryOrderFilter?.totalNotPurchased,
      },
      {
        value: "CANCELLED",
        label: "Hủy",
        summaryField: "totalCancelled",
        totalQuantity: summaryOrderFilter?.totalCancelled,
      },
      {
        value: "CUSTOMER_CANCELLED",
        label: "Khách hủy đơn",
        summaryField: "totalCustomerCancelled",
        totalQuantity: summaryOrderFilter?.totalCustomerCancelled,
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
      allocationStatus: [
        ...(purchaseOrderFilter.allocationStatus || []),
        value,
      ] as AllocationStatus[],
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

  return (
    <div className="mb-3 flex gap-4 flex-col">
      <div className="grid grid-cols-2 gap-4 xl:gap-[400px]">
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
        {/* <DatePickerWithRange date={date} onDateChange={setDate} /> */}
      </div>
      <div className="flex gap-4 flex-wrap justify-center md:justify-start">
        {AllocationStatusOptions.map((item, index) => (
          <div
            onClick={() => {
              handleChangeAllocationStatus(item.value as AllocationStatus);
            }}
            className={`w-fit cursor-pointer ${checkActiveFilterAllocationStatus(item.value as AllocationStatus) && "border-b-[2px] border-red-600 text-red-600"}`}
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
            className={`w-fit cursor-pointer ${checkActiveFilterOrderStatus(item.value as OrderStatus) && "border-b-[2px] border-red-600 text-red-600"}`}
            key={index}
          >
            <span>{item.label}</span>
            <span className="ml-1">{`(${item.totalQuantity})`}</span>
          </div>
        ))}
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

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* <MultiSelect
          label="Tình trạng đơn hàng"
          placeholder="Tình trạng"
          data={OrderStatusOptions}
          value={purchaseOrderFilter.orderStatus}
          onChange={handleChangeOrderStatus}
        /> */}

        {/* <MultiSelect
          label="Trạng thái đơn hàng"
          placeholder="Trạng thái"
          data={AllocationStatusOptions}
          value={purchaseOrderFilter.allocationStatus}
          onChange={handleChangeAllocationStatus}
        />
        <MultiSelect
          label="Mẫu"
          placeholder="Mẫu"
          data={colorList}
          value={selectedColorList}
          onChange={handleChangeColor}
          onDropdownClose={handleChangeColorFilter}
          onDropdownOpen={openColorDropdown}
        />
        <MultiSelect
          label="Size"
          placeholder="Size"
          data={sizeList}
          value={selectedSizeList}
          onChange={handleChangeSize}
          onDropdownClose={handleChangeSizeFilter}
          onDropdownOpen={openSizeDropdown}
        /> */}
      </div>
    </div>
  );
};

export default PurchaseOrderFilter;
