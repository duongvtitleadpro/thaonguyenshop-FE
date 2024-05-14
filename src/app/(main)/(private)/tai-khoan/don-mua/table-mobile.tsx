"use client";

import DataTableRowActions from "./row-action";
import { placeholderImage } from "@/constant/common";
import {
  OrderStateColor,
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
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { Fragment, useMemo } from "react";

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
        size="80%"
      >
        <div>
          <Image src={orderImage.url} alt="note-img" />
          <Button
            className="mt-2 ml-auto"
            onClick={() => handleDownloadFile(orderImage.url)}
            bg="blue"
          >
            Tải về
          </Button>
        </div>
      </Modal>
      <Image src={orderImage.url} alt="note-img" w={50} h={50} onClick={open} />
    </div>
  );
};

const PurchaseOrderTableMobile = (props: PurchaseOrderTableMobileProps) => {
  const { data, className } = props;
  const [editOrderValue, setEditOrderValue] = useRecoilState(editOrderState);
  const { height, width } = useViewportSize();

  const dataMerge = useMemo(() => {
    const result: any[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i !== 0 && data[i].productId === data[i - 1].productId) {
        result[result.length - 1].mergeOrder.push(data[i]);
      } else {
        result.push({
          ...data[i],
          mergeOrder: [{ ...data[i] }],
        });
      }
    }
    return result;
  }, [data]);

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {dataMerge.map((order, index) => {
        return (
          <div
            key={order.id}
            className={cn(
              "relative py-6",
              index !== dataMerge.length - 1 && "border-b border-slate-700"
            )}
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
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
                </div>
                <Image
                  w={100}
                  h={100}
                  src={
                    order.product?.productImages?.length > 0
                      ? order.product?.productImages[0]?.imageUrl
                      : placeholderImage
                  }
                  alt={order.product.name}
                />
              </div>

              <div className="mt-6">
                <strong>Chi tiết: </strong>
                <Table.ScrollContainer minWidth={width - 32}>
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                  >
                    <Table.Thead>
                      <Table.Tr>
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
                      {order.mergeOrder.map((mergeItem: OrderResponse) => {
                        const orderId = mergeItem.id;
                        const productId = mergeItem.productId;
                        const canEditOrder =
                          mergeItem.orderStatus === "NOT_PURCHASED";
                        const canDeleteOrder =
                          mergeItem.orderStatus === "NOT_PURCHASED";
                        const orderDetailClone = mergeItem.orderDetails[0];
                        const orderNote = mergeItem.note;
                        const orderDetail: EditOrderDetail = {
                          id: orderDetailClone.id,
                          productId: productId,
                          colorId: orderDetailClone.color?.id || null,
                          sizeId: orderDetailClone.size?.id || null,
                          quantity: orderDetailClone.quantity,
                        };
                        const orderNoteFile = mergeItem.orderImages;
                        const isEditOrder =
                          editOrderValue.orderId === mergeItem.id;

                        return (
                          <Fragment key={mergeItem.id}>
                            <Table.Tr>
                              <Table.Td>
                                {isEditOrder ? (
                                  <EditOrderColorRow orderData={mergeItem} />
                                ) : (
                                  <span>
                                    {mergeItem?.orderDetails[0]?.color?.title ||
                                      "-"}
                                  </span>
                                )}
                              </Table.Td>
                              <Table.Td>
                                {isEditOrder ? (
                                  <EditOrderSizeRow orderData={mergeItem} />
                                ) : (
                                  <span>
                                    {mergeItem?.orderDetails[0]?.size?.title ||
                                      "-"}
                                  </span>
                                )}
                              </Table.Td>
                              <Table.Td>
                                {isEditOrder ? (
                                  <EditOrderQuantityRow orderData={mergeItem} />
                                ) : (
                                  <span>
                                    {mergeItem?.orderDetails[0]?.quantity}
                                  </span>
                                )}
                              </Table.Td>
                              <Table.Td>
                                {mergeItem?.orderDetails[0]?.receivedQuantity}
                              </Table.Td>
                              <Table.Td>
                                {currency.format(
                                  mergeItem.product.price *
                                    mergeItem.orderDetails[0].receivedQuantity
                                )}
                              </Table.Td>
                              <Table.Td>
                                <span
                                  className={`w-32 font-semibold ${
                                    OrderStatusColor[mergeItem.orderStatus]
                                  }`}
                                >
                                  {OrderStatusTitle[mergeItem.orderStatus]}
                                </span>
                              </Table.Td>
                              <Table.Td>
                                <span
                                  className={`font-semibold ${
                                    OrderStateColor[mergeItem.allocationStatus]
                                  }`}
                                >
                                  {OrderStateTitle[mergeItem.allocationStatus]}
                                </span>
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td colSpan={8}>
                                <div className="relative">
                                  {isEditOrder ? (
                                    <EditOrderNoteRow orderData={mergeItem} />
                                  ) : (
                                    <div className="mr-16 gap-2">
                                      <div className="mt-2 flex-1">
                                        <div className="mt-2 flex gap-2 text-xs">
                                          <strong className="w-16">
                                            Ghi chú:
                                          </strong>
                                          <span className="flex-1">
                                            <p>{mergeItem?.note}</p>
                                          </span>
                                        </div>
                                        <div>
                                          {mergeItem?.orderImages?.length > 0 &&
                                            mergeItem?.orderImages.map(
                                              (item: any) => (
                                                <ViewImageModal
                                                  key={item.id}
                                                  orderImage={item}
                                                />
                                              )
                                            )}
                                        </div>
                                        {mergeItem?.adminNote && (
                                          <div className="mt-2 flex gap-2 text-xs">
                                            <strong className="w-16">
                                              Admin note:
                                            </strong>{" "}
                                            <span className="flex-1">
                                              <p className="text-red-600 font-semibold">
                                                {mergeItem?.adminNote}
                                              </p>
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  <div
                                    style={{
                                      position: "absolute",
                                      bottom: 0,
                                      left: width - 120,
                                    }}
                                  >
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
                              </Table.Td>
                            </Table.Tr>
                          </Fragment>
                        );
                      })}
                    </Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PurchaseOrderTableMobile;
