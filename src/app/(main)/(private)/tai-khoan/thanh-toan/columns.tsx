"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@components/table/data-table-column-header";
import { format } from "date-fns";
import { PaymentDetail } from "@/types/payment";
import { currency } from "@/utils/currency";

export const columns: ColumnDef<PaymentDetail>[] = [
  {
    accessorKey: "paymentCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã thanh toán" />
    ),
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("paymentCode")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày giờ tạo" />
    ),
    cell: ({ row }) => (
      <div>{`${format(
        new Date(row.getValue("createdAt")),
        "MM:dd:yyyy HH:mm:ss"
      )}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "content",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nội dung" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("content")}</div>;
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
      return <div>{`${currency.format(row.getValue("amount"))}`}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
