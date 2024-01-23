"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import { format } from "date-fns";
import { currency } from "@/utils/currency";
import { OrderCombineResponse } from "@/types/order";

export const columns: ColumnDef<OrderCombineResponse>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã sản phẩm" />
    ),
    cell: ({ row }) => <div>{row.original.code}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên sản phẩm" />
    ),
    cell: ({ row }) => <div>{row.original.code}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày giờ xuất đơn" />
    ),
    cell: ({ row }) => (
      <div>{`${format(
        new Date(row.getValue("createdAt")),
        "MM-dd-yyyy HH:mm:ss"
      )}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tổng tiền" />
    ),
    cell: ({ row }) => {
      return <div>{`${currency.format(row.getValue("totalPrice"))}`}</div>;
    },
  },
];
