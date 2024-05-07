"use client";
import { useQuery } from "@tanstack/react-query";
import { Button, SimpleGrid } from "@mantine/core";

import { FilterProduct, ProductCard } from "@/components/product-category";
import { QueryKey } from "@/constant/query-key";
import { getProductList } from "@/api/product";
import { useRecoilState } from "recoil";
import {
  FILTER_PRODUCT_DEFAULT,
  filterProductState,
} from "@/store/state/product-filter.atom";
import { useEffect, useRef } from "react";
import { ATOM_KEY } from "@/store/key";
import { useSearchParams, usePathname } from "next/navigation";
import PaginationCustom from "@/components/pagination";

export default function ProductPage() {
  const [productParam, setProductParam] = useRecoilState(filterProductState);
  const searchParams = useSearchParams();
  const isRedirectToProduct = useRef(false);
  const pageRef = useRef<HTMLDivElement | null>(null);
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

    return () => {
      if (isRedirectToProduct.current) {
        return;
      }
      setProductParam(FILTER_PRODUCT_DEFAULT);
      sessionStorage.removeItem(ATOM_KEY.FILTER_PRODUCT);
    };
  }, []);

  // useEffect(() => {
  //   if (pageRef.current) {
  //     console.log("window", window);
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [pageRef]);

  const { data: productListData, isFetched } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_LIST, productParam],
    queryFn: () => getProductList(productParam),
  });

  const handleChangePage = (page: number) => {
    setProductParam((prev) => ({
      ...prev,
      page: page,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
      });
    }, 0);
  }, []);

  return (
    <div className="flex relative">
      <FilterProduct />
      <div className="flex-1 p-4">
        {productListData && (
          <>
            <span ref={pageRef}></span>
            <div className="max-w-[1300px] mx-auto">
              <SimpleGrid
                cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 5 }}
                spacing="lg"
                verticalSpacing="xl"
              >
                {productListData.data.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => (isRedirectToProduct.current = true)}
                  >
                    <ProductCard
                      id={item.id}
                      img={
                        item.productImages.length > 0
                          ? item.productImages[0].imageUrl
                          : ""
                      }
                      code={item.productCode}
                      name={item.name}
                      price={item.price}
                      status={item.productStatus}
                      origin={item.origin}
                    />
                  </div>
                ))}
              </SimpleGrid>
            </div>
            {productListData.data.length > 0 ? (
              <PaginationCustom
                total={productListData.totalPage}
                value={productListData.page}
                onChange={handleChangePage}
                className="mt-4"
                color="blue"
              />
            ) : (
              <div className="text-center">Không có sản phẩm nào</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
