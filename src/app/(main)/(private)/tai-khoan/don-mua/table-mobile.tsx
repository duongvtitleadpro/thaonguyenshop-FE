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
import { EditOrderDetail, OrderResponse } from "@/types/order";
import { currency } from "@/utils/currency";
import { Image, Table } from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import { useRecoilState } from "recoil";
import {
  EditOrderColorRow,
  EditOrderNoteRow,
  EditOrderQuantityRow,
  EditOrderSizeRow,
} from "./columns";

type PurchaseOrderTableMobileProps = {
  className?: string;
  data: OrderResponse[];
};

const PurchaseOrderTableMobile = (props: PurchaseOrderTableMobileProps) => {
  const { data, className } = props;
  const [editOrderValue, setEditOrderValue] = useRecoilState(editOrderState);
  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {data.map((order, index) => {
        const orderId = order.id;
        const productId = order.productId;
        const canEditOrder = order.orderStatus === "NOT_PURCHASED";
        const canDeleteOrder = order.orderStatus === "NOT_PURCHASED";
        const isSamePreviousOrder =
          order.productId === data[index - 1]?.productId;
        const orderDetailClone = order.orderDetails[0];
        const orderNote = order.note;
        const orderDetail: EditOrderDetail = {
          id: orderDetailClone.id,
          productId: productId,
          colorId: orderDetailClone.color?.id || null,
          sizeId: orderDetailClone.size?.id || null,
          quantity: orderDetailClone.quantity,
        };
        const isEditOrder = editOrderValue.orderId === order.id;
        return (
          <div
            key={order.id}
            className={cn(
              "relative py-3",
              !isSamePreviousOrder && index && "border-t border-slate-700"
            )}
          >
            <div>
              {!isSamePreviousOrder && (
                <div>
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
              )}
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
