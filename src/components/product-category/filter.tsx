"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@mantine/hooks";
import { Checkbox, Collapse } from "@mantine/core";
import { Plus, Minus } from "lucide-react";

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

const FilterProduct = () => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div className="w-64">
      <div>
        <Input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="rounded-none focus-visible:ring-0"
        />
        <Separator />
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={toggle}
          >
            <h2 className="text-base uppercase">size</h2>
            {opened ? <Minus /> : <Plus />}
          </div>
          <Collapse in={opened}>
            <div className="flex flex-col gap-2 p-4">
              {SIZE_FILTER.map((item, index) => (
                <Checkbox key={index} label={item.title} className="text-sm" />
              ))}
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
