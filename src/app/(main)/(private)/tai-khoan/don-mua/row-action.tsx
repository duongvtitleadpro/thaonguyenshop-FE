"use client";

import { cancelOrder, getOrder } from "@/api/order";
import { QueryKey } from "@/constant/query-key";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { purchaseOrderFilterState } from "@/store/state/purchase-order-filter.atom";
import { useRecoilValue } from "recoil";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface DataTableRowActionsProps {
  orderId: number;
  productId: number;
  canEditOrder: boolean;
  canDeleteOrder: boolean;
}

const DataTableRowActions = (props: DataTableRowActionsProps) => {
  const purchaseOrderFilter = useRecoilValue(purchaseOrderFilterState);
  const [opened, { open, close }] = useDisclosure(false);
  const { refetch } = useQuery({
    queryKey: [QueryKey.GET_PURCHASE_ORDER, purchaseOrderFilter],
    queryFn: () => getOrder(purchaseOrderFilter),
  });
  const { orderId, productId, canEditOrder, canDeleteOrder } = props;
  const router = useRouter();

  const handleCancelOrder = async () => {
    await cancelOrder(orderId);
    refetch();
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        c="blue"
        size="sm"
        disabled={!canEditOrder}
        onClick={() =>
          router.push(`/chi-tiet-san-pham/${productId}?order=${orderId}`)
        }
        className="disabled:cursor-not-allowed disabled:opacity-25"
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        c="blue"
        size="sm"
        disabled={!canDeleteOrder}
        onClick={open}
        className="disabled:cursor-not-allowed disabled:opacity-25"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="w-10 h-10" color="#f03e3e" />
          <h1 className="text-2xl font-semibold">Hủy đơn hàng</h1>
          <p>Bạn có chắc chắn muốn hủy đơn hàng?</p>
          <div className="w-full flex justify-between mt-3">
            <Button variant="outline" onClick={close} color="blue">
              Không, quay lại
            </Button>
            <Button
              variant="filled"
              onClick={handleCancelOrder}
              color="red"
              className="bg-[#f03e3e] text-white"
            >
              Có, hủy đơn hàng
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DataTableRowActions;
