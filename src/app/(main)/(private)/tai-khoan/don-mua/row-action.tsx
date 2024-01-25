"use client";

import { cancelOrder, getOrder } from "@/api/order";
import { Button } from "@/components/ui/button";
import { QueryKey } from "@/constant/query-key";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { purchaseOrderFilterState } from "@/store/state/purchase-order-filter.atom";
import { useRecoilValue } from "recoil";

interface DataTableRowActionsProps {
  orderId: number;
  productId: number;
  canEditOrder: boolean;
  canDeleteOrder: boolean;
}

const DataTableRowActions = (props: DataTableRowActionsProps) => {
  const purchaseOrderFilter = useRecoilValue(purchaseOrderFilterState);
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
        size="sm"
        disabled={!canEditOrder}
        onClick={() =>
          router.push(`/chi-tiet-don-mua/${productId}?order=${orderId}`)
        }
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        disabled={!canDeleteOrder}
        onClick={handleCancelOrder}
        className="disabled:cursor-not-allowed"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default DataTableRowActions;
