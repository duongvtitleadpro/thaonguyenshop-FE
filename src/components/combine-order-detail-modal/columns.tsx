"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import { currency } from "@/utils/currency";
import { CombinedOrderDetail } from "@/types/order";
import { TableCell } from "../ui/table";

export const columns: ColumnDef<CombinedOrderDetail>[] = [
  {
    accessorKey: "productCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã sản phẩm" />
    ),
    cell: ({ row }) => <div>{row.original?.order?.product?.productCode}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên sản phẩm" />
    ),
    cell: ({ row }) => (
      <div className="font-semibold">{row.original?.order?.product?.name}</div>
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
      const colorList = row.original?.order.orderDetails.map(
        (detail) => detail.color?.title || "-"
      );
      return (
        <div className="flex flex-col">
          {colorList.map((item, index) => (
            <div key={index}>{item}</div>
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
      const sizeList = row.original?.order.orderDetails.map(
        (detail) => detail.size?.title || "-"
      );
      return (
        <div className="flex flex-col">
          {sizeList.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SL đặt" />
    ),
    cell: ({ row }) => {
      const quantityList = row.original?.order.orderDetails.map(
        (detail) => detail.quantity
      );
      return (
        <div className="flex flex-col">
          {quantityList.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "receivedQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SL về" />
    ),
    cell: ({ row }) => {
      const receivedQuantityList = row.original?.order.orderDetails.map(
        (detail) => detail.receivedQuantity
      );
      return (
        <div className="flex flex-col">
          {receivedQuantityList.map((item, index) => (
            <div key={index}>{item}</div>
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
      <div>{currency.format(row.original?.order?.product?.price)}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thành tiền" />
    ),
    cell: ({ row }) => {
      const quantityList = row.original?.order.orderDetails.map(
        (detail) => detail.quantity
      );
      return (
        <div className="flex flex-col">
          {quantityList.map((item, index) => (
            <div key={index}>
              {currency.format(row.original?.order?.product?.price * item)}
            </div>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ghi chú" />
    ),
    cell: ({ row }) => <div>{row.original?.order?.note}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vị trí" />
    ),
    cell: ({ row }) => <div>{row.original?.order?.location}</div>,
    enableSorting: false,
    enableHiding: false,
  },
];
