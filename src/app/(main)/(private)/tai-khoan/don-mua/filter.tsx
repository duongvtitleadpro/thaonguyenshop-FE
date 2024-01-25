"use client";

import { useRecoilState } from "recoil";
import {
  MultiSelect,
  ActionIcon,
  Input,
  CloseButton,
  Tooltip,
} from "@mantine/core";
import {
  PurchaseOrderFilterDefaultValue,
  purchaseOrderFilterState,
} from "@/store/state/purchase-order-filter.atom";
import { AllocationStatus, OrderStatus } from "@/types/order";
import { X } from "lucide-react";
import { QueryKey } from "@/constant/query-key";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "@/api/category";
import React, { forwardRef, useMemo } from "react";
import { getProductColor, getProductSize } from "@/api/product";

type OrderStatusType = {
  value: string;
  label: string;
};

const OrderStatus: OrderStatusType[] = [
  {
    value: "PURCHASED",
    label: "Đã mua",
  },
  {
    value: "NOT_PURCHASED",
    label: "Chưa mua hàng",
  },
  {
    value: "CANCELLED",
    label: "Hủy",
  },
  {
    value: "CUSTOMER_CANCELLED",
    label: "Khách hủy đơn",
  },
];

const AllocationStatus: OrderStatusType[] = [
  {
    value: "ALLOCATED",
    label: "Đã chia",
  },
  {
    value: "SENT",
    label: "Đã xuất",
  },
];

const PurchaseOrderFilter = () => {
  const [keyword, setKeyword] = React.useState("");
  const [purchaseOrderFilter, setPurchaseOrderFilter] = useRecoilState(
    purchaseOrderFilterState
  );

  const { data: productSizeList } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_SIZE],
    queryFn: getProductSize,
  });

  const { data: productColorList } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_COLOR],
    queryFn: getProductColor,
  });

  const handleChangeOrderStatus = (value: string[]) => {
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      orderStatus: value as OrderStatus[],
    }));
  };

  const handleChangeAllocationStatus = (value: string[]) => {
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      allocationStatus: value as AllocationStatus[],
    }));
  };

  const handleChangeSizeFilter = (value: string[]) => {
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      sizeIds: value.map((item) => Number(item)),
    }));
  };

  const handleChangeColorFilter = (value: string[]) => {
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      colorIds: value.map((item) => Number(item)),
    }));
  };

  const sizeList = useMemo(() => {
    if (!productSizeList) return [];
    return productSizeList.data.map((item) => ({
      value: item.id.toString(),
      label: item.title,
    }));
  }, [productSizeList]);

  const colorList = useMemo(() => {
    if (!productColorList) return [];
    return productColorList.data.map((item) => ({
      value: item.id.toString(),
      label: item.title,
    }));
  }, [productColorList]);

  const selectedColorList = useMemo(() => {
    if (!purchaseOrderFilter.colorIds) return [];
    return colorList
      .filter(
        (item) =>
          purchaseOrderFilter.colorIds &&
          purchaseOrderFilter.colorIds.includes(Number(item.value))
      )
      .map((item) => item.value);
  }, [colorList, purchaseOrderFilter.colorIds]);

  const selectedSizeList = useMemo(() => {
    if (!purchaseOrderFilter.sizeIds) return [];
    return sizeList
      .filter(
        (item) =>
          purchaseOrderFilter.sizeIds &&
          purchaseOrderFilter.sizeIds.includes(Number(item.value))
      )
      .map((item) => item.value);
  }, [sizeList, purchaseOrderFilter.sizeIds]);

  const handleSearchKeyword = () => {
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      query: keyword,
    }));
  };

  return (
    <div className="mb-3 flex gap-4 flex-col">
      <div className="w-1/3">
        <Input
          placeholder="Tìm kiếm tên, mã sản phẩm"
          value={keyword}
          onChange={(event) => setKeyword(event.currentTarget.value)}
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => {
                setKeyword("");
                setPurchaseOrderFilter((prev) => ({ ...prev, query: "" }));
              }}
              style={{ display: keyword ? undefined : "none" }}
            />
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSearchKeyword();
          }}
        />
      </div>
      <div className="flex gap-3 items-end">
        <MultiSelect
          label="Tình trạng đơn hàng"
          placeholder="Tình trạng"
          data={OrderStatus}
          value={purchaseOrderFilter.orderStatus}
          onChange={handleChangeOrderStatus}
        />
        <MultiSelect
          label="Trạng thái đơn hàng"
          placeholder="Trạng thái"
          data={AllocationStatus}
          value={purchaseOrderFilter.allocationStatus}
          onChange={handleChangeAllocationStatus}
        />
        <MultiSelect
          label="Mẫu"
          placeholder="Mẫu"
          data={colorList}
          value={selectedColorList}
          onChange={handleChangeColorFilter}
        />
        <MultiSelect
          label="Size"
          placeholder="Size"
          data={sizeList}
          value={selectedSizeList}
          onChange={handleChangeSizeFilter}
        />
        <Tooltip label="Xóa bộ lọc">
          <ActionIcon
            variant="transparent"
            color="blue"
            onClick={() =>
              setPurchaseOrderFilter(PurchaseOrderFilterDefaultValue)
            }
          >
            <X />
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  );
};

export default PurchaseOrderFilter;
