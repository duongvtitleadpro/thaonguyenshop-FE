"use client";

import DataTableRowActions from "./row-action";
import { placeholderImage } from "@/constant/common";
import {
  OrderStateTitle,
  OrderStatusColor,
  OrderStatusTitle,
} from "@/constant/product";
import { cn } from "@/lib/utils";
import { editOrderState } from "@/store/state/edit-order.atom";
import { EditOrderDetail, OrderImage, OrderResponse } from "@/types/order";
import { currency } from "@/utils/currency";
import { Button, Image, Modal, Table } from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import { useRecoilState } from "recoil";
import {
  EditOrderColorRow,
  EditOrderNoteRow,
  EditOrderQuantityRow,
  EditOrderSizeRow,
} from "./columns";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";

type PurchaseOrderTableMobileProps = {
  className?: string;
  data: OrderResponse[];
};
type ViewImageModalProps = {
  orderImage: OrderImage;
};
const ViewImageModal = (props: ViewImageModalProps) => {
  const { orderImage } = props;
  const [opened, { open, close }] = useDisclosure(false);
  async function toDataURL(url: string) {
    const blob = await fetch(url).then((res) => res.blob());
    return URL.createObjectURL(blob);
  }

  const handleDownloadFile = async (url: string) => {
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = "note-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div>
      <Modal
        centered
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        size="100%"
      >
        <div>
          <Image src={orderImage.url} alt="note-img" />
          <Button
            className="mt-2 ml-auto"
            onClick={() => handleDownloadFile(orderImage.url)}
          >
            Tải về
          </Button>
        </div>
      </Modal>
      <Image
        src={orderImage.url}
        alt="note-img"
        w={150}
        className="w-32"
        onClick={open}
      />
    </div>
  );
};

const PurchaseOrderTableMobile = (props: PurchaseOrderTableMobileProps) => {
  const { data, className } = props;
  const [editOrderValue, setEditOrderValue] = useRecoilState(editOrderState);

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {data.map((order) => {
        const orderId = order.id;
        const productId = order.productId;
        const canEditOrder = order.orderStatus === "NOT_PURCHASED";
        const canDeleteOrder = order.orderStatus === "NOT_PURCHASED";
        const orderDetailClone = order.orderDetails[0];
        const orderNote = order.note;
        const orderDetail: EditOrderDetail = {
          id: orderDetailClone.id,
          productId: productId,
          colorId: orderDetailClone.color?.id || null,
          sizeId: orderDetailClone.size?.id || null,
          quantity: orderDetailClone.quantity,
        };
        const orderNoteFile = order.orderImages;
        const isEditOrder = editOrderValue.orderId === order.id;

        return (
          <div
            key={order.id}
            className="relative py-3 border-b border-slate-700"
          >
            <div>
              <div>
                <strong>Ngày đặt hàng:</strong>{" "}
                <span>
                  {`${format(
                    new Date(order.orderDate),
                    "MM/dd/yyyy HH:mm:ss"
                  )}`}
                </span>
              </div>
              <div>
                <strong>Mã sản phẩm:</strong>{" "}
                <span>{order.product.productCode}</span>
              </div>
              <div>
                <strong>Tên sản phẩm:</strong>{" "}
                <Link
                  href={`/chi-tiet-san-pham/${order.productId}`}
                  className="text-base font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  {order.product.name}
                </Link>
              </div>
              <div>
                <strong>Đơn giá:</strong>{" "}
                <span>{currency.format(order.product.price)}</span>
              </div>
              <div>
                <strong>Chi tiết: </strong>
                <Table
                  striped
                  highlightOnHover
                  withTableBorder
                  withColumnBorders
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Ảnh</Table.Th>
                      <Table.Th>Màu</Table.Th>
                      <Table.Th>Size</Table.Th>
                      <Table.Th>SL đặt</Table.Th>
                      <Table.Th>SL về</Table.Th>
                      <Table.Th>Tiền</Table.Th>
                      <Table.Th>Tình trạng</Table.Th>
                      <Table.Th>Trạng thái</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Image
                          src={
                            order.product?.productImages?.length > 0
                              ? order.product?.productImages[0]?.imageUrl
                              : placeholderImage
                          }
                          alt={order.product.name}
                        />
                      </Table.Td>
                      <Table.Td>
                        {isEditOrder ? (
                          <EditOrderColorRow orderData={order} />
                        ) : (
                          <span>
                            {order?.orderDetails[0]?.color?.title || "-"}
                          </span>
                        )}
                      </Table.Td>
                      <Table.Td>
                        {isEditOrder ? (
                          <EditOrderSizeRow orderData={order} />
                        ) : (
                          <span>
                            {order?.orderDetails[0]?.size?.title || "-"}
                          </span>
                        )}
                      </Table.Td>
                      <Table.Td>
                        {isEditOrder ? (
                          <EditOrderQuantityRow orderData={order} />
                        ) : (
                          <span>{order?.orderDetails[0]?.quantity}</span>
                        )}
                      </Table.Td>
                      <Table.Td>
                        {order?.orderDetails[0]?.receivedQuantity}
                      </Table.Td>
                      <Table.Td>
                        {currency.format(
                          order.product.price *
                            order.orderDetails[0].receivedQuantity
                        )}
                      </Table.Td>
                      <Table.Td>
                        <span
                          className={`w-32 font-semibold ${
                            OrderStatusColor[order.orderStatus]
                          }`}
                        >
                          {OrderStatusTitle[order.orderStatus]}
                        </span>
                      </Table.Td>
                      <Table.Td>
                        {OrderStateTitle[order.allocationStatus]}
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </div>
              <div className="mt-2">
                <strong>Ghi chú:</strong>{" "}
                {isEditOrder ? (
                  <EditOrderNoteRow orderData={order} />
                ) : (
                  <span>
                    <p className="whitespace-pre-line">{order?.note}</p>
                    {order?.orderImages?.length > 0 &&
                      order?.orderImages.map((item) => (
                        <ViewImageModal key={item.id} orderImage={item} />
                      ))}
                  </span>
                )}
              </div>
              <div>
                <strong>Admin note:</strong>{" "}
                <span>
                  <p className="text-red-600 font-semibold">
                    {order?.adminNote}
                  </p>
                </span>
              </div>
              <div className="absolute bottom-2 right-0">
                <DataTableRowActions
                  orderId={orderId}
                  productId={productId}
                  canEditOrder={canEditOrder}
                  canDeleteOrder={canDeleteOrder}
                  editOrderNote={orderNote}
                  editOrderDetail={orderDetail}
                  orderNoteFile={orderNoteFile}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PurchaseOrderTableMobile;
