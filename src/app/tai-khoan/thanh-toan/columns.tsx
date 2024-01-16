"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@components/table/data-table-column-header";
import DataTableRowActions from "@components/table/data-table-row-actions";
import { Data } from "./schema";
import { format } from "date-fns";
const currency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{`TT00${row.getValue("id")}`}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => (
      <div>{`${format(
        new Date(row.getValue("created_at")),
        "MM:dd:yyyy HH:mm:ss"
      )}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "trade_content",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nội dung giao dịch"
        className="text-right"
      />
    ),
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("trade_content")}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tổng tiền"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right">{`${currency.format(
          row.getValue("amount")
        )}`}</div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
