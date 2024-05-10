"use client";

import DataTableColumnHeader from "@components/table/data-table-column-header";
import {
  OrderStateTitle,
  OrderStatusColor,
  OrderStatusTitle,
} from "@/constant/product";
import { currency } from "@/utils/currency";
import { EditOrder, EditOrderDetail, OrderResponse } from "@/types/order";
import DataTableRowActions from "./row-action";
import Link from "next/link";
import { TableCell } from "@/components/ui/table";
import {
  ActionIcon,
  Button,
  ComboboxItem,
  FileButton,
  Image,
  Modal,
  NumberInput,
  Select,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { placeholderImage } from "@/constant/common";
import { useRecoilState } from "recoil";
import { editOrderState } from "@/store/state/edit-order.atom";
import { uniqBy, first } from "lodash";
import SelectCustom from "@/components/select";
import { useMemo, useState } from "react";
import { Icons } from "@/components/icons";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { deleteFileRequest } from "@/api/file";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { X } from "lucide-react";

type EditOrderColorRowProps = {
  orderData: OrderResponse;
};

type EditOrderSizeRowProps = {
  orderData: OrderResponse;
};

type EditOrderQuantityRowProps = {
  orderData: OrderResponse;
};

type EditOrderNoteRowProps = {
  orderData: OrderResponse;
};

export const EditOrderColorRow = (props: EditOrderColorRowProps) => {
  const { orderData } = props;
  const [editOrderValue, setEditOrderValue] = useRecoilState(editOrderState);
  const isEditOrder = editOrderValue.orderId === orderData.id;
  const colorDetail = orderData?.orderDetails.map(
    (detail) => detail.color?.title || "-"
  );
  const isExistColorList = orderData?.product?.details?.every(
    (item) => item.color
  );

  if (isEditOrder) {
    const colorCurrentInNoLongerList =
      !!first(orderData.orderDetails)?.color && !isExistColorList;
    if (colorCurrentInNoLongerList) {
      return <span></span>;
    }
  }

  if (isEditOrder && isExistColorList) {
    const detailsListRaw = orderData?.product?.details;
    const isExistSizeList = detailsListRaw.every((item) => item.size);

    const colorListRaw = detailsListRaw.map((item) => item.color);
    const colorList = uniqBy(colorListRaw, (item) => item.id);
    const colorOptions = colorList.map((item) => ({
      label: item.title,
      value: item.id.toString(),
    }));

    const handleChangeColor = (
      selectColorId: string | null,
      _option: ComboboxItem
    ) => {
      if (!selectColorId) return;
      const sizeListRaw = detailsListRaw
        .filter((item) => item.color.id === Number(selectColorId))
        .map((item) => item.size);
      const sizeList: any = isExistSizeList
        ? uniqBy(sizeListRaw, (item: any) => item?.id)
        : [];
      const isSelectedSizeExistInNewSizeList = sizeList.find(
        (item: any) => item.id === editOrderValue.orderDetails[0].sizeId
      );
      setEditOrderValue({
        ...editOrderValue,
        orderDetails: [
          {
            ...editOrderValue.orderDetails[0],
            colorId: parseInt(selectColorId || "0"),
            sizeId: isExistSizeList
              ? isSelectedSizeExistInNewSizeList
                ? editOrderValue.orderDetails[0].sizeId || null
                : sizeList[0].id
              : null,
          },
        ],
      });
    };
    return (
      <div className="w-20">
        <SelectCustom
          data={colorOptions}
          value={editOrderValue.orderDetails[0].colorId?.toString() || ""}
          onChange={handleChangeColor}
          allowDeselect={false}
          withCheckIcon={false}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col hover:cursor-pointer">
      {colorDetail.map((item, index) => (
        <div key={index} className="border-none">
          {item}
        </div>
      ))}
    </div>
  );
};

export const EditOrderSizeRow = (props: EditOrderSizeRowProps) => {
  const { orderData } = props;
  const [editOrderValue, setEditOrderValue] = useRecoilState(editOrderState);
  const isEditOrder = editOrderValue.orderId === orderData.id;
  const isExistSizeList = orderData?.product.details?.every(
    (item) => (item as any).size
  );
  const sizeList = orderData?.orderDetails.map(
    (detail) => detail.size?.title || "-"
  );

  if (isEditOrder) {
    const sizeCurrentInNoLongerList =
      !!first(orderData.orderDetails)?.size && !isExistSizeList;

    if (sizeCurrentInNoLongerList) {
      return <span></span>;
    }
  }

  if (isEditOrder && isExistSizeList) {
    const isExistColorList = orderData?.product.details?.every(
      (item) => item.color
    );

    const colorCurrentInNoLongerList =
      !!first(orderData?.orderDetails)?.color && !isExistColorList;
    const colorSelected = !colorCurrentInNoLongerList
      ? editOrderValue?.orderDetails[0]?.colorId
        ? editOrderValue?.orderDetails[0]
        : null
      : null;

    const detailsListRaw = orderData?.product?.details;
    const sizeListRaw: any = detailsListRaw
      .filter((item) => item?.color?.id === colorSelected?.colorId)
      .map((item) => item.size);
    const sizeList = uniqBy(sizeListRaw, (item: any) => item?.id);

    const sizeOptions = sizeList.map((item) => ({
      label: item.title,
      value: item.id.toString(),
    }));

    const handleChangeSize = (
      selectSizeId: string | null,
      _option: ComboboxItem
    ) => {
      setEditOrderValue({
        ...editOrderValue,
        orderDetails: [
          {
            ...editOrderValue.orderDetails[0],
            colorId: !colorCurrentInNoLongerList
              ? editOrderValue.orderDetails[0].colorId
              : null,
            sizeId: parseInt(selectSizeId || "0"),
          },
        ],
      });
    };

    return (
      <div className="w-20">
        <SelectCustom
          data={sizeOptions}
          value={editOrderValue.orderDetails[0].sizeId?.toString() || ""}
          onChange={handleChangeSize}
          allowDeselect={false}
          withCheckIcon={false}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col hover:cursor-pointer">
      {sizeList.map((item, index) => (
        <div key={index} className=" border-none">
          {item}
        </div>
      ))}
    </div>
  );
};

export const EditOrderQuantityRow = (props: EditOrderQuantityRowProps) => {
  const { orderData } = props;
  const [editOrderValue, setEditOrderValue] = useRecoilState(editOrderState);
  const isEditOrder = editOrderValue.orderId === orderData.id;
  const quantityList = orderData?.orderDetails.map((detail) => detail.quantity);
  return (
    <>
      {isEditOrder ? (
        <div className="w-16">
          <NumberInput
            value={editOrderValue.orderDetails[0].quantity}
            onChange={(event) =>
              setEditOrderValue((prev) => ({
                ...prev,
                orderDetails: [
                  {
                    ...prev.orderDetails[0],
                    quantity: Number(event),
                  },
                ],
              }))
            }
            allowNegative={false}
            allowDecimal={false}
          />
        </div>
      ) : (
        <div className="flex flex-col hover:cursor-pointer">
          {quantityList.map((item, index) => (
            <div key={index} className="text-center  border-none">
              {item}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export const EditOrderNoteRow = (props: EditOrderNoteRowProps) => {
  const { orderData } = props;
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [opened, { open, close }] = useDisclosure(false);
  const [editOrderValue, setEditOrderValue] = useRecoilState(editOrderState);
  const isEditOrder = editOrderValue.orderId === orderData.id;
  const loadedAvatarUrl = useMemo(() => {
    if (editOrderValue?.orderFileNote) {
      return URL.createObjectURL(editOrderValue?.orderFileNote);
    }
    if (orderData.orderImages.length > 0) {
      return orderData.orderImages[0].url;
    }
    return "";
  }, [editOrderValue.orderFileNote, orderData.orderImages]);

  const handleChangeFile = (file: File | null) => {
    handleDeleteFile();
    setEditOrderValue((prev) => ({
      ...prev,
      orderFileNote: file,
    }));
  };

  const handleDeleteFile = () => {
    setEditOrderValue((prev) => ({
      ...prev,
      orderFileNote: null,
    }));
    if (orderData.orderImages.length > 0) {
      deleteFileRequest({
        id: orderData.orderImages[0].id,
        fileType: "ORDER_IMAGE",
      });
    }
    queryClient.refetchQueries({
      queryKey: [QueryKey.GET_PURCHASE_ORDER],
    });
  };
  async function toDataURL(url: string) {
    const blob = await fetch(url).then((res) => res.blob());
    return URL.createObjectURL(blob);
  }

  const handleDownloadFile = async (url: string) => {
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = "note-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      {isEditOrder ? (
        <div role="group">
          <div className="flex items-center gap-2 p-2">
            <Textarea
              minRows={3}
              maxRows={4}
              value={editOrderValue.note}
              onChange={(event) =>
                setEditOrderValue((prev) => ({
                  ...prev,
                  note: event.currentTarget.value,
                }))
              }
            />
            <FileButton
              onChange={handleChangeFile}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <ActionIcon variant="light" aria-label="Upload" {...props}>
                  <Icons.fileUpload />
                </ActionIcon>
              )}
            </FileButton>
          </div>
          {loadedAvatarUrl && (
            <>
              <Modal
                centered
                opened={opened}
                onClose={close}
                size="70%"
                overlayProps={{
                  backgroundOpacity: 0.55,
                  blur: 3,
                }}
              >
                <div>
                  <Image src={loadedAvatarUrl} alt="note-img" />
                  <Button
                    className="mt-2 ml-auto"
                    onClick={() => handleDownloadFile(loadedAvatarUrl)}
                  >
                    Tải về
                  </Button>
                </div>
              </Modal>
              <div className="relative w-[150px] sm:w-full">
                <Image
                  src={loadedAvatarUrl}
                  alt="note-img"
                  className="p-3 object-cover"
                  onClick={open}
                  style={{
                    width: isMobile ? "150px" : "100%",
                  }}
                />
                <Button
                  variant="subtle"
                  p={4}
                  c="red"
                  size="sm"
                  radius="100"
                  onClick={handleDeleteFile}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    transform: "translate(6px, -6px)",
                  }}
                  className="absolute top-1 right-1"
                >
                  <X className="w-5 h-5 text-red-700" />
                </Button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="w-32">
          <p className="whitespace-pre-line">{orderData?.note}</p>
          {orderData?.adminNote && (
            <p className="text-red-600 font-semibold">{`Admin note: ${orderData?.adminNote}`}</p>
          )}
          {orderData?.orderImages?.length > 0 &&
            orderData?.orderImages.map((item) => (
              <div key={item.id}>
                <Modal
                  centered
                  opened={opened}
                  onClose={close}
                  size="70%"
                  overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                  }}
                >
                  <div>
                    <Image src={item.url} alt="note-img" />
                    <Button
                      className="mt-2 ml-auto"
                      onClick={() => handleDownloadFile(item.url)}
                    >
                      Tải về
                    </Button>
                  </div>
                </Modal>
                <div className="relative">
                  <Image
                    src={item.url}
                    alt="note-img"
                    className="p-3"
                    onClick={open}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

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
    Cell: ({ row }: any) => <EditOrderColorRow orderData={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessor: "size",
    Header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    Cell: ({ row }: any) => <EditOrderSizeRow orderData={row.original} />,
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
    Cell: ({ row }: any) => <EditOrderQuantityRow orderData={row.original} />,
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
    Cell: ({ row }: any) => <EditOrderNoteRow orderData={row.original} />,
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
      const orderDetailClone = row.original.orderDetails[0];
      const orderNote = row.original.note;
      const orderDetail: EditOrderDetail = {
        id: orderDetailClone.id,
        productId: productId,
        colorId: orderDetailClone.color?.id || null,
        sizeId: orderDetailClone.size?.id || null,
        quantity: orderDetailClone.quantity,
      };
      const orderNoteFile = row.original.orderImages;
      return (
        <DataTableRowActions
          orderId={orderId}
          productId={productId}
          canEditOrder={canEditOrder}
          canDeleteOrder={canDeleteOrder}
          editOrderNote={orderNote}
          editOrderDetail={orderDetail}
          orderNoteFile={orderNoteFile}
        />
      );
    },
  },
];
