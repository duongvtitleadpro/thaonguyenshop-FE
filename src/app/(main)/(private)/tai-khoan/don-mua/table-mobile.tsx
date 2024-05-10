"use client";

import DataTableRowActions from "./row-action";
import { placeholderImage } from "@/constant/common";
import {
  OrderStateTitle,
  OrderStatusColor,
  OrderStatusTitle,
} from "@/constant/product";
import { cn } from "@/lib/utils";
import { OrderResponse } from "@/types/order";
import { currency } from "@/utils/currency";
import { Image, Table } from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import { Fragment, useMemo } from "react";

type PurchaseOrderTableMobileProps = {
  className?: string;
  data: OrderResponse[];
};

const PurchaseOrderTableMobile = (props: PurchaseOrderTableMobileProps) => {
  const { data, className } = props;

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
              "relative py-3",
              index !== dataMerge.length - 1 && "border-b border-slate-700"
            )}
          >
            <div>
              <div className="flex items-center justify-between">
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
                <Image
                  w={80}
                  src={
                    order.product?.productImages?.length > 0
                      ? order.product?.productImages[0]?.imageUrl
                      : placeholderImage
                  }
                  alt={order.product.name}
                />
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

                      return (
                        <Fragment key={mergeItem.id}>
                          <Table.Tr>
                            <Table.Td>
                              {mergeItem?.orderDetails[0]?.color?.title || "-"}
                            </Table.Td>
                            <Table.Td>
                              {mergeItem?.orderDetails[0]?.size?.title || "-"}
                            </Table.Td>
                            <Table.Td>
                              {mergeItem?.orderDetails[0]?.quantity}
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
                              {OrderStateTitle[mergeItem.allocationStatus]}
                            </Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td colSpan={8}>
                              <div className="flex justify-between items-end">
                                <div>
                                  <div className="mt-2 flex gap-2">
                                    <strong>Ghi chú:</strong>{" "}
                                    <span>
                                      <p>{mergeItem?.note}</p>
                                    </span>
                                  </div>
                                  {mergeItem?.adminNote && (
                                    <div className="mt-2 flex gap-2">
                                      <strong>Admin note:</strong>{" "}
                                      <span>
                                        <p className="text-red-600 font-semibold">
                                          {mergeItem?.adminNote}
                                        </p>
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-2">
                                  <DataTableRowActions
                                    orderId={orderId}
                                    productId={productId}
                                    canEditOrder={canEditOrder}
                                    canDeleteOrder={canDeleteOrder}
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PurchaseOrderTableMobile;
