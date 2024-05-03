"use client";

import { cancelOrder, editOrder, getOrder } from "@/api/order";
import { QueryKey } from "@/constant/query-key";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Pencil, Trash2, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { purchaseOrderFilterState } from "@/store/state/purchase-order-filter.atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { EditOrderDetail } from "@/types/order";
import {
  editOrderDefaultValue,
  editOrderState,
} from "@/store/state/edit-order.atom";
import { toast } from "sonner";
import { format } from "date-fns";

interface DataTableRowActionsProps {
  orderId: number;
  productId: number;
  canEditOrder: boolean;
  canDeleteOrder: boolean;
  editOrderNote: string;
  editOrderDetail: EditOrderDetail;
}

const DataTableRowActions = (props: DataTableRowActionsProps) => {
  const purchaseOrderFilter = useRecoilValue(purchaseOrderFilterState);
  const [opened, { open, close }] = useDisclosure(false);
  const [editOrderValue, setEditOrderValue] = useRecoilState(editOrderState);
  const { refetch } = useQuery({
    queryKey: [QueryKey.GET_PURCHASE_ORDER, purchaseOrderFilter],
    queryFn: () => getOrder(purchaseOrderFilter),
  });
  const {
    orderId,
    productId,
    canEditOrder,
    canDeleteOrder,
    editOrderNote,
    editOrderDetail,
  } = props;
  const router = useRouter();

  const handleCancelOrder = async () => {
    await cancelOrder(orderId);
    close();
    refetch();
  };

  const handleFillEditOrder = () => {
    const lastEditText = "\nLần sửa gần nhất: ";
    const indexOfNoteEditTime = editOrderNote?.indexOf(lastEditText);
    const oldNote =
      indexOfNoteEditTime !== -1 && indexOfNoteEditTime !== undefined
        ? editOrderNote.slice(0, indexOfNoteEditTime)
        : editOrderNote;

    setEditOrderValue({
      orderId,
      note: oldNote,
      orderDetails: [editOrderDetail],
    });
  };

  const handleCancelEditOrder = () => {
    setEditOrderValue(editOrderDefaultValue);
  };

  const handleConfirmEditOrder = async () => {
    const lastEditText = "\nLần sửa gần nhất: ";
    const indexOfNoteEditTime = editOrderValue?.note?.indexOf(lastEditText);
    const oldNoteEditTime =
      indexOfNoteEditTime !== -1 && indexOfNoteEditTime !== undefined
        ? editOrderValue?.note?.substring(
            indexOfNoteEditTime + lastEditText.length
          )
        : "";
    const noteEdit =
      indexOfNoteEditTime !== -1 && indexOfNoteEditTime !== undefined
        ? editOrderValue?.note?.replace(
            oldNoteEditTime,
            format(new Date(), "dd/MM/yyyy HH:mm")
          )
        : editOrderValue?.note +
          lastEditText +
          format(new Date(), "dd/MM/yyyy HH:mm");
    try {
      const order = await editOrder({ ...editOrderValue, note: noteEdit });
      toast("Sửa đơn hàng thành công");
      setEditOrderValue(editOrderDefaultValue);
      refetch();
    } catch (error) {
      toast("Đã có lỗi xảy ra", {
        description: "Vui lòng thử lại sau",
      });
    }
  };

  return (
    <div className="w-16 flex gap-1">
      {editOrderValue.orderId === orderId ? (
        <>
          <Button
            variant="subtle"
            p={4}
            c="blue"
            size="sm"
            onClick={handleConfirmEditOrder}
            className="disabled:cursor-not-allowed disabled:opacity-25"
          >
            <Check className="w-5 h-5" />
          </Button>
          <Button
            variant="subtle"
            p={4}
            c="red"
            size="sm"
            onClick={handleCancelEditOrder}
            className="disabled:cursor-not-allowed disabled:opacity-25"
          >
            <X className="w-5 h-5 text-red-700" />
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="subtle"
            p={4}
            size="sm"
            disabled={!canEditOrder}
            onClick={() => handleFillEditOrder()}
            className="disabled:cursor-not-allowed disabled:opacity-25"
          >
            <Pencil className="w-5 h-5" />
          </Button>
          <Button
            variant="subtle"
            color="red"
            p={4}
            size="sm"
            disabled={!canDeleteOrder}
            onClick={open}
            className="disabled:cursor-not-allowed disabled:opacity-25"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </>
      )}
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
