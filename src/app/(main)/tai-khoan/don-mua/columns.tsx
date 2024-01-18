"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import DataTableRowActions from "@components/table/data-table-row-actions";
import { Image } from "@mantine/core";
import { Data } from "./schema";
import Link from "next/link";
import { format } from "date-fns";
import {
  ProductStatusColor,
  ProductStatusTitle,
  ShipmentStatusTitle,
} from "@/constant/product";
import { currency } from "@/utils/currency";

export const columns: ColumnDef<Data>[] = [
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
    accessorKey: "path",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ảnh" />
    ),
    cell: ({ row }) => {
      return (
        <Image
          src={`https://hoachipshop.com.vn/${row.getValue("path")}`}
          w={56}
          h={56}
          alt=""
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sản phẩm" />
    ),
    cell: ({ row }) => (
      <div className="w-40">
        <Link
          href={`chi-tiet-san-pham/${row.getValue("id")}`}
          className="text-blue-600 hover:underline"
        >
          {row.getValue("name")}
        </Link>
        <div>
          <p>
            Mã SP: <b>{row.original.product_code}</b>
          </p>
          <ul className="font-bold ml-4">
            {row.original.options.map((option, index) => (
              <li key={index}>
                {`${option.option_label || ""} (SL: ${option.qty})`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number_of_product",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Số lượng"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right">{row.getValue("number_of_product")}</div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày lên đơn" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[80px]">{`${format(
          new Date(row.getValue("created_at")),
          "MM/dd/yyyy HH:mm:ss"
        )}`}</div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      return (
        <div
          className={`font-semibold ${ProductStatusColor[row.original.status]}`}
        >
          {ProductStatusTitle[row.original.status]}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "shipment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tình trạng" />
    ),
    cell: ({ row }) => {
      return <div>{ShipmentStatusTitle[row.original.shipment_status]}</div>;
    },
  },
  {
    accessorKey: "price",
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
          row.getValue("price")
        )}`}</div>
      );
    },
  },

  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ghi chú" />
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
