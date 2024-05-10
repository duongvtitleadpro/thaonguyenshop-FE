"use client";

import { Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { exportOrder, getCombineOrderDetail } from "@/api/order";
import { useRecoilValue } from "recoil";
import { authState } from "@/store/state/auth.atom";
import { format } from "date-fns";
import DataTable from "../table/data-table";
import { columns } from "./columns";
import saveFile from "@/utils/common";
import Print from "../widget/Print";

interface CombineOrderDetailModalProps {
  id: number;
}

const CombineOrderDetailModal = (props: CombineOrderDetailModalProps) => {
  const { id } = props;
  const auth = useRecoilValue(authState);
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data: combineOrderData } = useQuery({
    queryKey: [QueryKey.GET_COMBINE_ORDER_DETAIL, id],
    queryFn: () => getCombineOrderDetail(id),
  });

  const { mutate: exportOrderMutate } = useMutation({
    mutationFn: exportOrder,
    onSuccess: (data) => {
      saveFile({
        fileName: `Chi tiết đơn xuất #` + combineOrderData?.code,
        format: "xlsx",
        response: data.data,
      });
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <h1 className="font-bold text-2xl">
            Chi tiết đơn xuất {combineOrderData?.code}
          </h1>
        }
        centered
        size="70%"
        fullScreen={isMobile}
      >
        {combineOrderData && (
          <div className="w-full">
            <div className="flex w-full">
              <div className="justify-between w-full">
                <h1 className="font-semibold">{`Tên khách hàng: ${auth.user?.name}`}</h1>
                <h2 className="mb-4">{`Ngày giờ xuất đơn: ${format(
                  new Date(combineOrderData.createdAt),
                  "HH:mm:ss MM/dd/yyyy"
                )}`}</h2>
              </div>
              <div className="flex gap-4">
                <Print
                  content={
                    <DataTable
                      columns={columns}
                      data={combineOrderData.combinedOrderDetails}
                    />
                  }
                />
                <Button
                  variant="outline"
                  onClick={() => exportOrderMutate({ id })}
                  color="blue"
                >
                  Xuất file
                </Button>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={combineOrderData.combinedOrderDetails}
            />
          </div>
        )}
      </Modal>
      <Button variant="ghost" size="sm" onClick={open}>
        <FileSearch className="w-4 h-4" />
      </Button>
    </>
  );
};

export default CombineOrderDetailModal;
