"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import DataTableRowActions from "@components/table/data-table-row-actions";
import { Image } from "@mantine/core";
interface PurchaseOrderColumns {
  id: string;
  img: string;
  product: string;
  quantity: number;
  date: string;
  status: string;
  situation: string;
  price: string;
  note: string;
}

export const columns: ColumnDef<PurchaseOrderColumns>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "img",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ảnh" />
    ),
    cell: ({ row }) => {
      console.log(row.getValue("img"));
      return <Image src={row.getValue("img")} w={56} h={56} alt="" />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="San pham" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("product")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="So luong" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue("quantity")}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngay len don" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue("date")}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trang thai" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue("status")}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "situation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tinh trang" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue("situation")}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tong tien" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue("price")}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ghi chu" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue("note")}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
