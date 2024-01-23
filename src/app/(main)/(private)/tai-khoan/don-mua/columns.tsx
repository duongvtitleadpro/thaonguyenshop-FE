"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import DataTableRowActions from "@components/table/data-table-row-actions";
import { Image } from "@mantine/core";
import Link from "next/link";
import { format } from "date-fns";
import { OrderStateTitle, OrderStatusTitle } from "@/constant/product";
import { currency } from "@/utils/currency";
import { PurchasedOrder } from "@/types/order";

export const columns: ColumnDef<PurchasedOrder>[] = [
  {
    accessorKey: "order",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STT" />
    ),
    cell: ({ row }) => <div className="w-4">{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên khách hàng" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.user.name}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã sản phẩm" />
    ),
    cell: ({ row }) => <div>{row.original.product.productCode}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên sản phẩm" />
    ),
    cell: ({ row }) => <div>{row.original.product.name}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mẫu" />
    ),
    cell: ({ row }) => <div>{row.original.orderDetailColor?.title || "-"}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => <div>{row.original.orderDetailSize?.title || "-"}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng đặt" />
    ),
    cell: ({ row }) => <div>{row.original.orderDetailQuantity}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "receivedQuantity",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Số lượng về" />
  //   ),
  //   cell: ({ row }) => <div>{row.original.productId}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thành tiền" />
    ),
    cell: ({ row }) => (
      <div>{`${currency.format(
        row.original.product.price * row.original.orderDetailQuantity
      )}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tình trạng đơn hàng" />
    ),
    cell: ({ row }) => <div>{OrderStatusTitle[row.original.orderStatus]}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderState",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái đơn hàng" />
    ),
    cell: ({ row }) => (
      <div>{OrderStateTitle[row.original.allocationStatus]}</div>
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
  // {
  //   accessorKey: "orderState",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Ngày chia" />
  //   ),
  //   cell: ({ row }) => <div>{row.original.productId}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ghi chú" />
    ),
    cell: ({ row }) => <div>{row.original?.note}</div>,
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
