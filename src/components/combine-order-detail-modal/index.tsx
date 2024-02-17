"use client";

import { Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { getCombineOrderDetail } from "@/api/order";
import { useRecoilValue } from "recoil";
import { authState } from "@/store/state/auth.atom";
import { format } from "date-fns";
import DataTable from "../table/data-table";
import { columns } from "./columns";

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
          <div>
            <h1 className="font-semibold">{`Tên khách hàng: ${auth.user?.name}`}</h1>
            <h2 className="mb-4">{`Ngày giờ xuất đơn: ${format(
              new Date(combineOrderData.createdAt),
              "HH:mm:ss MM/dd/yyyy"
            )}`}</h2>
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
