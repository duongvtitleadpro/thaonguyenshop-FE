"use client";
import { useQuery } from "@tanstack/react-query";

import { ContactCard, WidgetCard, WidgetWrapper } from "@/components/widget";
import { QueryKey } from "@/constant/query-key";
import { getAllCategory } from "@/api/category";
import { useSetRecoilState } from "recoil";
import { filterProductState } from "@/store/state/product-filter.atom";
import { UnstyledButton } from "@mantine/core";
import { WarehouseStatus } from "@/types/product";
import { useEffect, useMemo } from "react";

export default function Home() {
  const setProductParam = useSetRecoilState(filterProductState);
  const { data: categoryListData } = useQuery({
    queryKey: [QueryKey.GET_ALL_CATEGORY],
    queryFn: getAllCategory,
  });
  const handleChangeCategoryFilter = (
    warehouseStatus: WarehouseStatus,
    categoryId: number
  ) => {
    setProductParam((prev) => ({
      ...prev,
      category: categoryId,
      warehouseStatus,
    }));
  };

  const orderCategoryListData = useMemo(() => {
    if (!categoryListData) return null;
    return categoryListData.data.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.categoryImages.find(
        (item) => item?.categoryStatus === "ORDER"
      )?.imageUrl,
    }));
  }, [categoryListData]);

  const readyCategoryListData = useMemo(() => {
    if (!categoryListData) return null;
    return categoryListData.data.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.categoryImages.find(
        (item) => item?.categoryStatus === "READY"
      )?.imageUrl,
    }));
  }, [categoryListData]);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
      });
    }, 0);
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="w-full max-w-6xl mx-auto mt-12 flex flex-col gap-24">
          {orderCategoryListData && (
            <WidgetWrapper headTitle="Hàng order">
              {orderCategoryListData.map((item, index) => (
                <UnstyledButton
                  key={index}
                  onClick={() => handleChangeCategoryFilter("ORDER", item.id)}
                >
                  <WidgetCard
                    id={item.id}
                    imageUrl={item.imageUrl || ""}
                    name={item.name}
                  />
                </UnstyledButton>
              ))}
            </WidgetWrapper>
          )}
          {readyCategoryListData && (
            <WidgetWrapper headTitle="Hàng có sẵn">
              {readyCategoryListData.map((item, index) => (
                <UnstyledButton
                  key={index}
                  onClick={() => handleChangeCategoryFilter("READY", item.id)}
                >
                  <WidgetCard
                    id={item.id}
                    imageUrl={item.imageUrl || ""}
                    name={item.name}
                  />
                </UnstyledButton>
              ))}
            </WidgetWrapper>
          )}
        </div>
        <div className="w-full max-w-6xl mx-auto mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
          {new Array(4).fill(0).map((_, index) => (
            <ContactCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
