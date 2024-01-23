"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import DataTableRowActions from "@components/table/data-table-row-actions";
import { Data } from "./schema";
import { format } from "date-fns";
import { currency } from "@/utils/currency";

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{`HD00${row.getValue("id")}`}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{`${format(
        new Date(row.getValue("created_at")),
        "MM/dd/yyyy"
      )}`}</div>
    ),
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
    accessorKey: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Giảm giá"
        className="text-right"
      />
    ),
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("discount")}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tổng sau giảm"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right">{`${currency.format(
          row.getValue("total")
        )}`}</div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
