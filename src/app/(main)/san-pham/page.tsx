"use client";
import { useQuery } from "@tanstack/react-query";
import { Pagination, SimpleGrid } from "@mantine/core";

import { FilterProduct, ProductCard } from "@/components/product-category";
import { QueryKey } from "@/constant/query-key";
import { getProductList } from "@/api/product";
import { useRecoilState } from "recoil";
import { filterProductState } from "@/store/state/filter.atom";
import { useEffect } from "react";
import { ATOM_KEY } from "@/store/key";
import { useSearchParams } from "next/navigation";

export default function ProductPage() {
  const [productParam, setProductParam] = useRecoilState(filterProductState);
  const searchParams = useSearchParams();
  useEffect(() => {
    const filterProduct = sessionStorage.getItem(ATOM_KEY.FILTER_PRODUCT);
    if (filterProduct) {
      setProductParam(JSON.parse(filterProduct));
    }
    const keyword = searchParams.get("search");
    if (keyword) {
      setProductParam((prev) => ({
        ...prev,
        keyword,
      }));
    }
  }, []);
  const { data: productListData } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_LIST, productParam],
    queryFn: () => getProductList(productParam),
  });

  const handleChangePage = (page: number) => {
    setProductParam((prev) => ({
      ...prev,
      page: page,
    }));
  };

  return (
    <div className="flex">
      <FilterProduct />
      <div className="flex-1 p-4">
        {productListData && (
          <>
            <div>
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
            </div>
            <Pagination
              total={productListData.totalPage}
              value={productListData.page}
              onChange={handleChangePage}
              className="mt-4"
              color="blue"
            />
          </>
        )}
      </div>
    </div>
  );
}
