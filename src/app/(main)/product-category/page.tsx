"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SimpleGrid } from "@mantine/core";

import { FilterProduct, ProductCard } from "@/components/product-category";
import { QueryKey } from "@/constant/query-key";
import { getProductList } from "@/api/product";
import { useRecoilValue } from "recoil";
import { filterProductState } from "@/store/state/filter.atom";

export default function ProductPage() {
  const productParam = useRecoilValue(filterProductState);
  const { data: productListData } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_LIST, productParam],
    queryFn: () => getProductList(productParam),
  });

  return (
    <div className="flex">
      <FilterProduct />
      <div className="flex-1 p-4">
        <div>
          {productListData && (
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing="lg"
              verticalSpacing="xl"
            >
              {productListData.data.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  img={
                    item.productImages.length > 0
                      ? item.productImages[0].imageUrl
                      : ""
                  }
                  code={item.productCode}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </SimpleGrid>
          )}
        </div>
      </div>
    </div>
  );
}
