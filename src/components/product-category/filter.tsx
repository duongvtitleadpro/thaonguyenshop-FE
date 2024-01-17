"use client";
import React from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@mantine/hooks";
import { Checkbox, Collapse } from "@mantine/core";
import { Plus, Minus } from "lucide-react";
import { getProductSize } from "@/api/product";
import { QueryKey } from "@/constant/query-key";
import { useQuery } from "@tanstack/react-query";

const SIZE_FILTER = [
  {
    title: "L",
    value: "L",
  },
  {
    title: "M",
    value: "M",
  },
  {
    title: "S",
    value: "S",
  },
  {
    title: "XL",
    value: "XL",
  },
  {
    title: "XXL",
    value: "XXL",
  },
];

const ORDER_PRODUCT = [
  {
    name: "Giày Dép Người Lớn",
    id: "giay-dep-nguoi-lon",
  },
  {
    name: "Giày Dép Trẻ Em",
    id: "giay-dep-tre-em",
  },
  {
    name: "Phụ Kiện Người Lớn",
    id: "phu-kien-nguoi-lon",
  },
  {
    name: "Phụ Kiện Trẻ Em",
    id: "phu-kien-tre-em",
  },
  {
    name: "Quần Áo Bé Gái",
    id: "quan-ao-be-gai",
  },
  {
    name: "Quần Áo Bé Trai",
    id: "quan-ao-be-trai",
  },
  {
    name: "Sản Phẩm Khác",
    id: "san-pham-khac",
  },
];

const FilterProduct = () => {
  const [openedSize, { toggle: toggleSize }] = useDisclosure(false);
  const [openedOrderProduct, { toggle: toggleOrderProduct }] =
    useDisclosure(false);
  const { data: productSizeList } = useQuery({
    queryKey: [QueryKey.GET_ALL_CATEGORY],
    queryFn: getProductSize,
  });
  return (
    <div className="w-72 p-4">
      <div>
        <Input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="rounded-none focus-visible:ring-0"
        />
        <Separator className="my-3" />
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={toggleSize}
          >
            <h2 className="text-base uppercase">size</h2>
            {openedSize ? <Minus /> : <Plus />}
          </div>
          <Collapse in={openedSize}>
            {productSizeList && (
              <div className="flex flex-col gap-2 p-4">
                {productSizeList.data.map((item, index) => (
                  <Checkbox
                    key={index}
                    label={item.title}
                    className="text-sm"
                  />
                ))}
              </div>
            )}
          </Collapse>
        </div>
        <Separator className="my-3" />
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={toggleOrderProduct}
          >
            <h2 className="text-base uppercase">Hàng Order</h2>
            {openedOrderProduct ? <Minus /> : <Plus />}
          </div>
          <Collapse in={openedOrderProduct}>
            <div className="flex flex-col gap-2 p-4">
              {ORDER_PRODUCT.map((item, index) => (
                <Link
                  key={index}
                  href={`/product-category/hang-order/${item.id}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
