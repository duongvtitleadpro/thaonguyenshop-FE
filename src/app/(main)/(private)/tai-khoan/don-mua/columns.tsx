"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import { format } from "date-fns";
import {
  OrderStateTitle,
  OrderStatusColor,
  OrderStatusTitle,
} from "@/constant/product";
import { currency } from "@/utils/currency";
import { OrderResponse } from "@/types/order";
import DataTableRowActions from "./row-action";
import Link from "next/link";
import { TableCell } from "@/components/ui/table";
import { Image, Tooltip } from "@mantine/core";
import { placeholderImage } from "@/constant/common";

export const columns: ColumnDef<OrderResponse>[] = [
  {
    accessorKey: "imageProduct",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hình ảnh" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-20">
          <Image
            src={
              row.original.product?.productImages?.length > 0
                ? row.original.product?.productImages[0]?.imageUrl
                : placeholderImage
            }
            alt={row.original.product.name}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã sản phẩm" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.product.productCode}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên sản phẩm" />
    ),
    cell: ({ row }) => (
      <div className="w-32 flex">
        <Link
          href={`/chi-tiet-san-pham/${row.original.productId}`}
          className="text-base font-semibold text-blue-600 hover:underline cursor-pointer"
        >
          {row.original.product.name}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mẫu" />
    ),
    cell: ({ row }) => {
      const colorList = row.original?.orderDetails.map(
        (detail) => detail.color?.title || "-"
      );
      return (
        <div role="group" className="flex flex-col hover:cursor-pointer">
          {colorList.map((item, index) => (
            <TableCell key={index} className="  border-none">
              {item}
            </TableCell>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => {
      const sizeList = row.original?.orderDetails.map(
        (detail) => detail.size?.title || "-"
      );
      return (
        <div className="flex flex-col hover:cursor-pointer">
          {sizeList.map((item, index) => (
            <TableCell key={index} className=" border-none">
              {item}
            </TableCell>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderQuantity",
    accessorFn: (row) =>
      row.orderDetails.reduce((acc, cur) => acc + cur.quantity, 0),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SL đặt" />
    ),
    cell: ({ row }) => {
      const quantityList = row.original?.orderDetails.map(
        (detail) => detail.quantity
      );
      return (
        <div className="flex flex-col hover:cursor-pointer">
          {quantityList.map((item, index) => (
            <TableCell key={index} className="text-center  border-none">
              {item}
            </TableCell>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "receivedQuantity",
    accessorFn: (row) =>
      row.orderDetails.reduce((acc, cur) => acc + cur.receivedQuantity, 0),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SL về" />
    ),
    cell: ({ row }) => {
      const receivedQuantityList = row.original?.orderDetails.map(
        (detail) => detail.receivedQuantity
      );
      return (
        <div className="flex flex-col hover:cursor-pointer">
          {receivedQuantityList.map((item, index) => (
            <TableCell key={index} className="text-center  border-none">
              {item}
            </TableCell>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "unitPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đơn giá" />
    ),
    cell: ({ row }) => (
      <div>{`${currency.format(row.original.product.price)}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalCost",
    accessorFn: (row) =>
      row.product.price *
      row.orderDetails.reduce((acc, cur) => acc + cur.quantity, 0),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thành tiền" />
    ),
    cell: ({ row }) => {
      const quantityList = row.original?.orderDetails.map(
        (detail) => detail.receivedQuantity
      );
      return (
        <div className="flex flex-col hover:cursor-pointer">
          {quantityList.map((item, index) => (
            <TableCell key={index} className=" border-none bor">
              {currency.format(row.original.product.price * item)}
            </TableCell>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tình trạng đơn hàng" />
    ),
    cell: ({ row }) => (
      <div
        className={`w-32 font-semibold ${
          OrderStatusColor[row.original.orderStatus]
        }`}
      >
        {OrderStatusTitle[row.original.orderStatus]}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderState",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái đơn hàng" />
    ),
    cell: ({ row }) => (
      <div className="w-24">
        {OrderStateTitle[row.original.allocationStatus]}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày đặt hàng" />
    ),
    cell: ({ row }) => (
      <div>{`${format(
        new Date(row.original.orderDate),
        "MM/dd/yyyy HH:mm:ss"
      )}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ghi chú" />
    ),
    cell: ({ row }) => (
      <div className="w-32">
        <p className="whitespace-pre-line">{row.original?.note}</p>
        {row.original?.adminNote && (
          <p className="text-red-600 font-semibold">{`Admin note: ${row.original?.adminNote}`}</p>
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // {
  //   accessorKey: "location",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Vị trí" />
  //   ),
  //   cell: ({ row }) => <div>{row.original.productId}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  // {
  //   accessorKey: "orderPicker",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Nhân viên chia hàng" />
  //   ),
  //   cell: ({ row }) => <div>{row.original.productId}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    id: "actions",
    cell: ({ row }) => {
      const orderId = row.original.id;
      const productId = row.original.productId;
      const canEditOrder = row.original.orderStatus === "NOT_PURCHASED";
      const canDeleteOrder = row.original.orderStatus === "NOT_PURCHASED";
      return (
        <DataTableRowActions
          orderId={orderId}
          productId={productId}
          canEditOrder={canEditOrder}
          canDeleteOrder={canDeleteOrder}
        />
      );
    },
  },
];
