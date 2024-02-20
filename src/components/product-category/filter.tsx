"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  Checkbox,
  Collapse,
  ScrollArea,
  Tabs,
  UnstyledButton,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { Plus, Minus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { getProductSize } from "@/api/product";
import { QueryKey } from "@/constant/query-key";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { filterProductState } from "@/store/state/product-filter.atom";
import { getAllCategory } from "@/api/category";
import { WarehouseStatus } from "@/types/product";
import { ATOM_KEY } from "@/store/key";
import { Icons } from "../icons";
import { Drawer, DrawerTrigger, DrawerContent } from "../ui/drawer";

const FilterProduct = () => {
  const [keyword, setKeyword] = React.useState("");
  const [debounced] = useDebouncedValue(keyword, 500);
  const [productParam, setProductParam] = useRecoilState(filterProductState);
  const [openedSize, { toggle: toggleSize }] = useDisclosure(false);
  const [openedOrderProduct, { toggle: toggleOrderProduct }] =
    useDisclosure(true);
  const [openedReadyProduct, { toggle: toggleReadyProduct }] =
    useDisclosure(true);
  const { data: productSizeList } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_SIZE],
    queryFn: getProductSize,
  });

  const { data: categoryListData } = useQuery({
    queryKey: [QueryKey.GET_ALL_CATEGORY],
    queryFn: getAllCategory,
  });

  const orderCategoryListData = useMemo(() => {
    if (!categoryListData) return null;
    return categoryListData.data.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.categoryImages.find(
        (item) => item.categoryStatus === "ORDER"
      )?.imageUrl,
    }));
  }, [categoryListData]);

  const readyCategoryListData = useMemo(() => {
    if (!categoryListData) return null;
    return categoryListData.data.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.categoryImages.find(
        (item) => item.categoryStatus === "READY"
      )?.imageUrl,
    }));
  }, [categoryListData]);
  useEffect(() => {
    setProductParam((prev) => ({
      ...prev,
      keyword: debounced,
    }));
  }, [debounced, setProductParam]);

  const saveParamState = useCallback(() => {
    sessionStorage.setItem(
      ATOM_KEY.FILTER_PRODUCT,
      JSON.stringify(productParam)
    );
  }, [productParam]);

  useEffect(() => {
    window.addEventListener("beforeunload", saveParamState);
    return () => {
      window.removeEventListener("beforeunload", saveParamState);
    };
  }, [saveParamState]);

  const handleChangeSizeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setProductParam((prev) => ({
        ...prev,
        sizes: [...prev.sizes, Number(e.target.value)],
      }));
    } else {
      setProductParam((prev) => ({
        ...prev,
        sizes: prev.sizes.filter((item) => item !== Number(e.target.value)),
      }));
    }
  };

  const handleChangeCategoryFilter = (
    warehouseStatus?: WarehouseStatus,
    categoryId?: number
  ) => {
    setProductParam((prev) => {
      let param = { ...prev };
      warehouseStatus
        ? (param.warehouseStatus = warehouseStatus)
        : delete param.warehouseStatus;
      categoryId ? (param.category = categoryId) : delete param.category;
      return {
        ...param,
        page: 1,
      };
    });
  };
  return (
    <>
      <div className="sm:w-52 lg:w-72 p-4 hidden sm:block ">
        <div>
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
                      value={item.id}
                      checked={productParam.sizes.includes(item.id)}
                      onChange={handleChangeSizeFilter}
                      className="text-sm"
                    />
                  ))}
                </div>
              )}
            </Collapse>
          </div>
          <Separator className="my-3" />
          <UnstyledButton onClick={() => handleChangeCategoryFilter()}>
            <span
              className={cn(
                !productParam?.warehouseStatus &&
                  !productParam.category &&
                  "font-semibold underline text-blue-600"
              )}
            >
              Tất cả sản phẩm
            </span>
          </UnstyledButton>
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
              {orderCategoryListData && (
                <div className="flex flex-col gap-2 p-4">
                  {/* All product */}
                  <UnstyledButton
                    onClick={() => handleChangeCategoryFilter("ORDER")}
                  >
                    <span
                      className={cn(
                        productParam?.warehouseStatus === "ORDER" &&
                          !productParam.category &&
                          "font-semibold underline text-blue-600"
                      )}
                    >
                      Tất cả sản phẩm
                    </span>
                  </UnstyledButton>
                  {/* Order Catergory */}
                  {orderCategoryListData.map((item, index) => (
                    <UnstyledButton
                      key={index}
                      onClick={() =>
                        handleChangeCategoryFilter("ORDER", item.id)
                      }
                    >
                      <span
                        className={cn(
                          productParam.warehouseStatus === "ORDER" &&
                            productParam.category === item.id &&
                            "font-semibold underline text-blue-600"
                        )}
                      >
                        {item.name}
                      </span>
                    </UnstyledButton>
                  ))}
                </div>
              )}
            </Collapse>
          </div>

          <Separator className="my-3" />
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={toggleReadyProduct}
            >
              <h2 className="text-base uppercase">Hàng Có Sẵn</h2>
              {openedReadyProduct ? <Minus /> : <Plus />}
            </div>
            <Collapse in={openedReadyProduct}>
              {readyCategoryListData && (
                <div className="flex flex-col gap-2 p-4">
                  {/* All product */}
                  <UnstyledButton
                    onClick={() => handleChangeCategoryFilter("READY")}
                  >
                    <span
                      className={cn(
                        productParam?.warehouseStatus === "READY" &&
                          !productParam.category &&
                          "font-semibold underline text-blue-600"
                      )}
                    >
                      Tất cả sản phẩm
                    </span>
                  </UnstyledButton>
                  {/* Ready Catergory */}
                  {readyCategoryListData.map((item, index) => (
                    <UnstyledButton
                      key={index}
                      onClick={() =>
                        handleChangeCategoryFilter("READY", item.id)
                      }
                    >
                      <span
                        className={cn(
                          productParam.warehouseStatus === "READY" &&
                            productParam.category === item.id &&
                            "font-semibold underline text-blue-600"
                        )}
                      >
                        {item.name}
                      </span>
                    </UnstyledButton>
                  ))}
                </div>
              )}
            </Collapse>
          </div>
        </div>
      </div>
      <div className="fixed z-10 bottom-3 right-3 block sm:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Icons.filter className="w-12 h-12 cursor-pointer hover:opacity-80" />
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <div className="py-8">
                <Tabs defaultValue="size">
                  <Tabs.List>
                    <Tabs.Tab value="size">Size</Tabs.Tab>
                    <Tabs.Tab value="all">Tất cả</Tabs.Tab>
                    <Tabs.Tab value="order">Hàng Order</Tabs.Tab>
                    <Tabs.Tab value="ready">Hàng Có Sẵn</Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="size">
                    {productSizeList && (
                      <ScrollArea h={250}>
                        <div className="flex flex-col gap-2 p-4">
                          {productSizeList.data.map((item, index) => (
                            <Checkbox
                              key={index}
                              label={item.title}
                              value={item.id}
                              checked={productParam.sizes.includes(item.id)}
                              onChange={handleChangeSizeFilter}
                              className="text-sm"
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </Tabs.Panel>
                  <Tabs.Panel value="all">
                    {productSizeList && (
                      <ScrollArea h={250}>
                        <div className="p-4">
                          <UnstyledButton
                            onClick={() => handleChangeCategoryFilter()}
                          >
                            <span
                              className={cn(
                                !productParam?.warehouseStatus &&
                                  !productParam.category &&
                                  "font-semibold underline text-blue-600"
                              )}
                            >
                              Tất cả sản phẩm
                            </span>
                          </UnstyledButton>
                        </div>
                      </ScrollArea>
                    )}
                  </Tabs.Panel>

                  <Tabs.Panel value="order">
                    <ScrollArea h={250}>
                      {orderCategoryListData && (
                        <div className="flex flex-col gap-2 p-4">
                          {/* All product */}
                          <UnstyledButton
                            onClick={() => handleChangeCategoryFilter("ORDER")}
                          >
                            <span
                              className={cn(
                                productParam?.warehouseStatus === "ORDER" &&
                                  !productParam.category &&
                                  "font-semibold underline text-blue-600"
                              )}
                            >
                              Tất cả sản phẩm
                            </span>
                          </UnstyledButton>
                          {/* Order Catergory */}
                          {orderCategoryListData.map((item, index) => (
                            <UnstyledButton
                              key={index}
                              onClick={() =>
                                handleChangeCategoryFilter("ORDER", item.id)
                              }
                            >
                              <span
                                className={cn(
                                  productParam.warehouseStatus === "ORDER" &&
                                    productParam.category === item.id &&
                                    "font-semibold underline text-blue-600"
                                )}
                              >
                                {item.name}
                              </span>
                            </UnstyledButton>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </Tabs.Panel>

                  <Tabs.Panel value="ready">
                    <ScrollArea h={250}>
                      {readyCategoryListData && (
                        <div className="flex flex-col gap-2 p-4">
                          {/* All product */}
                          <UnstyledButton
                            onClick={() => handleChangeCategoryFilter("READY")}
                          >
                            <span
                              className={cn(
                                productParam?.warehouseStatus === "READY" &&
                                  !productParam.category &&
                                  "font-semibold underline text-blue-600"
                              )}
                            >
                              Tất cả sản phẩm
                            </span>
                          </UnstyledButton>
                          {/* Ready Catergory */}
                          {readyCategoryListData.map((item, index) => (
                            <UnstyledButton
                              key={index}
                              onClick={() =>
                                handleChangeCategoryFilter("READY", item.id)
                              }
                            >
                              <span
                                className={cn(
                                  productParam.warehouseStatus === "READY" &&
                                    productParam.category === item.id &&
                                    "font-semibold underline text-blue-600"
                                )}
                              >
                                {item.name}
                              </span>
                            </UnstyledButton>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </Tabs.Panel>
                </Tabs>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default FilterProduct;
