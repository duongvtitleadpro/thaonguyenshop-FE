"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import { format } from "date-fns";
import { OrderStateTitle, OrderStatusTitle } from "@/constant/product";
import { currency } from "@/utils/currency";
import { OrderResponse } from "@/types/order";
import DataTableRowActions from "./row-action";
import Link from "next/link";

export const columns: ColumnDef<OrderResponse>[] = [
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
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sản phẩm" />
    ),
    cell: ({ row }) => (
      <div className="w-40">
        <Link
          href={`/chi-tiet-san-pham/${row.original.productId}`}
          className="text-base font-semibold text-blue-600 hover:underline cursor-pointer"
        >
          {row.original.product.name}
        </Link>
        <h2 className="text-xs text-gray-400">{`Mã SP: ${row.original.product.productCode}`}</h2>
        <ul className="ml-4 space-y-1 list-disc list-inside text-sm">
          {row.original.orderDetails.map((orderDetail, index) => {
            const colorTitle = orderDetail.color
              ? `Mẫu: ${orderDetail.color.title};`
              : "";
            const sizeTitle = orderDetail.size
              ? `Size: ${orderDetail.size.title};`
              : "";
            const quantityTitle = `(SL: ${orderDetail.quantity})`;
            return (
              <li key={index}>
                {`${colorTitle} ${sizeTitle} `}
                <b>{quantityTitle}</b>
              </li>
            );
          })}
        </ul>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "color",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Mẫu" />
  //   ),
  //   cell: ({ row }) => <div>{row.original.orderDetailColor?.title || "-"}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "size",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Size" />
  //   ),
  //   cell: ({ row }) => <div>{row.original.orderDetailSize?.title || "-"}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "orderQuantity",
    accessorFn: (row) =>
      row.orderDetails.reduce((acc, cur) => acc + cur.quantity, 0),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng đặt" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("orderQuantity")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "receivedQuantity",
    accessorFn: (row) =>
      row.orderDetails.reduce((acc, cur) => acc + cur.receivedQuantity, 0),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng về" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("receivedQuantity")}</div>
    ),
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
    cell: ({ row }) => (
      <div>{`${currency.format(row.original.totalPrice)}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tình trạng đơn hàng" />
    ),
    cell: ({ row }) => (
      <div className="w-32">{OrderStatusTitle[row.original.orderStatus]}</div>
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
    accessorKey: "orderState",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày chia" />
    ),
    cell: ({ row }) => (
      <>
        {row.original.allocatedDate && (
          <div>{`${format(
            new Date(row.original.allocatedDate),
            "MM/dd/yyyy HH:mm:ss"
          )}`}</div>
        )}
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },

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
