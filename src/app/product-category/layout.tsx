"use client";
import React from "react";
import { FilterProduct } from "@/components/product-category";

const ProductCategoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <FilterProduct />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ProductCategoryLayout;
