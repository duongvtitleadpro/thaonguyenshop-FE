"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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

  const { data: combineOrderData } = useQuery({
    queryKey: [QueryKey.GET_COMBINE_ORDER_DETAIL, id],
    queryFn: () => getCombineOrderDetail(id),
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`Chi tiết đơn xuất ${combineOrderData?.code}`}
        centered
        size="70%"
      >
        {combineOrderData && (
          <div>
            <h1 className="font-semibold">{`Tên khách hàng: ${auth.user?.name}`}</h1>
            <h2>{`Tên khách hàng: ${format(
              new Date(combineOrderData.createdAt),
              "MM-dd-yyyy HH:mm:ss"
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
