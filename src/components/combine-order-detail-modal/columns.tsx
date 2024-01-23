"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import { format } from "date-fns";
import { currency } from "@/utils/currency";
import { CombinedOrderDetail } from "@/types/order";

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
    cell: ({ row }) => <div>{row.original?.order?.product?.name}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mẫu" />
    ),
    cell: ({ row }) => <div>{row.original?.order?.product?.name}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => <div>{row.original?.order?.product?.name}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SL đặt" />
    ),
    cell: ({ row }) => <div>{row.original?.order?.product?.totalQuantity}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "receivedQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SL về" />
    ),
    cell: ({ row }) => <div>{row.original?.order?.product?.name}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "unitPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đơn giá" />
    ),
    cell: ({ row }) => <div>{row.original?.order?.product?.price}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thành tiền" />
    ),
    cell: ({ row }) => <div>{row.original?.order?.totalPrice}</div>,
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
