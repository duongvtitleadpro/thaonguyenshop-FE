"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SimpleGrid } from "@mantine/core";

import { FilterProduct, ProductCard } from "@/components/product-category";
import { QueryKey } from "@/constant/query-key";
import { ProductParam } from "@/types/product";
import { getProductList } from "@/api/product";

export default function ProductPage() {
  const [productParam, setProductParam] = useState<ProductParam>({
    page: 1,
    limit: 10,
  });
  const { data: productListData } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_LIST, productParam],
    queryFn: () => getProductList(productParam),
  });
  console.log("😻 ~ ProductPage ~ data:", productListData);
  return (
    <div className="flex">
      <FilterProduct />
      <div className="flex-1">
        <div>
          <button
            onClick={() =>
              setProductParam((prev) => ({ ...prev, page: prev.page + 1 }))
            }
          >
            next
          </button>
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
                  img={item.productImages[0].imageUrl}
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
