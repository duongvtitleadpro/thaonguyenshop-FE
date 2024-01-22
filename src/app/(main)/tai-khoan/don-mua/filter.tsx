"use client";

import { useRecoilState } from "recoil";
import { MultiSelect, ActionIcon } from "@mantine/core";
import {
  PurchaseOrderFilterDefaultValue,
  purchaseOrderFilterState,
} from "@/store/state/purchase-order-filter.atom";
import { AllocationStatus, OrderStatus } from "@/types/order";
import { X } from "lucide-react";

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
  const [purchaseOrderFilter, setPurchaseOrderFilter] = useRecoilState(
    purchaseOrderFilterState
  );

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

  return (
    <div className="my-3">
      <div className="flex gap-3 items-end">
        <MultiSelect
          label="Tình trạng"
          placeholder="Tình trạng"
          data={OrderStatus}
          value={purchaseOrderFilter.orderStatus}
          onChange={handleChangeOrderStatus}
        />
        <MultiSelect
          label="Trạng thái"
          placeholder="Trạng thái"
          data={AllocationStatus}
          value={purchaseOrderFilter.allocationStatus}
          onChange={handleChangeAllocationStatus}
        />
        <MultiSelect
          label="Mẫu"
          placeholder="Mẫu"
          data={OrderStatus}
          value={purchaseOrderFilter.orderStatus}
          onChange={handleChangeOrderStatus}
        />
        <MultiSelect
          label="Size"
          placeholder="Size"
          data={OrderStatus}
          value={purchaseOrderFilter.orderStatus}
          onChange={handleChangeOrderStatus}
        />
        <ActionIcon
          variant="transparent"
          color="blue"
          onClick={() =>
            setPurchaseOrderFilter(PurchaseOrderFilterDefaultValue)
          }
        >
          <X />
        </ActionIcon>
      </div>
    </div>
  );
};

export default PurchaseOrderFilter;
