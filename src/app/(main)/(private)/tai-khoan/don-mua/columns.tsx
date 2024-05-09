"use client";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import {
  OrderStateTitle,
  OrderStatusColor,
  OrderStatusTitle,
} from "@/constant/product";
import { currency } from "@/utils/currency";
import DataTableRowActions from "./row-action";
import Link from "next/link";
import { Image } from "@mantine/core";
import { placeholderImage } from "@/constant/common";

export const columns: any = [
  {
    accessor: "imageUrlId",
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Hình ảnh" />
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="w-20">
          <Image
            src={
              row.original.product?.productImages?.length > 0
                ? row.original.product?.productImages[0]?.imageUrl
                : placeholderImage
            }
            alt={row.original.product.name}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    enableRowSpan: true,
  },
  {
    accessor: "productId",
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Mã sản phẩm" />
    ),
    Cell: ({ row }: any) => {
      return <div>{row.original.product.productCode}</div>;
    },
    enableSorting: false,
    enableHiding: false,
    enableRowSpan: true,
  },
  {
    accessor: "productNameId",
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Tên sản phẩm" />
    ),
    Cell: ({ row }: any) => (
      <div className="w-32 flex">
        <Link
          href={`/chi-tiet-san-pham/${row.original.productId}`}
          className="text-base font-semibold text-blue-600 hover:underline cursor-pointer"
        >
          {row.original.product.name}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    enableRowSpan: true,
  },
  {
    accessor: "color",
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Mẫu" />
    ),
    Cell: ({ row }: any) => {
      const colorList = row.original?.orderDetails.map(
        (detail: any) => detail.color?.title || "-"
      );
      return (
        <div className="flex flex-col hover:cursor-pointer">
          {colorList.map((item: any, index: any) => (
            <div key={index} className="border-none">
              {item}
            </div>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessor: "size",
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    Cell: ({ row }: any) => {
      const sizeList = row.original?.orderDetails.map(
        (detail: any) => detail.size?.title || "-"
      );
      return (
        <div className="flex flex-col hover:cursor-pointer">
          {sizeList.map((item: any, index: any) => (
            <div key={index} className=" border-none">
              {item}
            </div>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessor: "orderQuantity",
    accessorFn: (row: any) =>
      row.orderDetails.reduce((acc: any, cur: any) => acc + cur.quantity, 0),
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="SL đặt" />
    ),
    Cell: ({ row }: any) => {
      const quantityList = row.original?.orderDetails.map(
        (detail: any) => detail.quantity
      );
      return (
        <div className="flex flex-col hover:cursor-pointer">
          {quantityList.map((item: any, index: any) => (
            <div key={index} className="text-center  border-none">
              {item}
            </div>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessor: "receivedQuantity",
    accessorFn: (row: any) =>
      row.orderDetails.reduce(
        (acc: any, cur: any) => acc + cur.receivedQuantity,
        0
      ),
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="SL về" />
    ),
    Cell: ({ row }: any) => {
      const receivedQuantityList = row.original?.orderDetails.map(
        (detail: any) => detail.receivedQuantity
      );
      return (
        <div className="flex flex-col hover:cursor-pointer">
          {receivedQuantityList.map((item: any, index: any) => (
            <div key={index} className="text-center  border-none">
              {item}
            </div>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessor: "unitPrice",
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Đơn giá" />
    ),
    Cell: ({ row }: any) => (
      <div className="text-right">{`${currency.format(
        row.original.product.price
      )}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessor: "totalCost",
    accessorFn: (row: any) =>
      row.product.price *
      row.orderDetails.reduce((acc: any, cur: any) => acc + cur.quantity, 0),
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Thành tiền" />
    ),
    Cell: ({ row }: any) => {
      const quantityList = row.original?.orderDetails.map(
        (detail: any) => detail.receivedQuantity
      );
      return (
        <div className="flex flex-col hover:cursor-pointer text-right">
          {quantityList.map((item: any, index: any) => (
            <div key={index} className=" border-none bor">
              {currency.format(row.original.product.price * item)}
            </div>
          ))}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessor: "orderStatus",
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Tình trạng đơn hàng" />
    ),
    Cell: ({ row }: any) => (
      <div
        className={`w-32 font-semibold ${
          OrderStatusColor[
            row.original.orderStatus as keyof typeof OrderStatusColor
          ]
        }`}
      >
        {
          OrderStatusTitle[
            row.original.orderStatus as keyof typeof OrderStatusTitle
          ]
        }
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessor: "orderState",
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Trạng thái đơn hàng" />
    ),
    Cell: ({ row }: any) => (
      <div className="w-16">
        {
          OrderStateTitle[
            row.original.allocationStatus as keyof typeof OrderStateTitle
          ]
        }
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // {
  //   accessor: "orderDate",
  //   Header: ({ column }: any) => (
  //     <DataTableColumnHeader column={column} title="Ngày đặt hàng" />
  //   ),
  //   Cell: ({ row }: any) => (
  //     <div>{`${format(
  //       new Date(row.original.orderDate),
  //       "MM/dd/yyyy HH:mm:ss"
  //     )}`}</div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessor: "note",
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Ghi chú" />
    ),
    Cell: ({ row }: any) => (
      <div className="w-32">
        <p className="whitespace-pre-line">{row.original?.note}</p>
        {row.original?.adminNote && (
          <p className="text-red-600 font-semibold">{`Admin note: ${row.original?.adminNote}`}</p>
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    Cell: ({ row }: any) => {
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
