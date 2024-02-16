"use client";
import React, { useCallback, useEffect } from "react";
import { Checkbox, Collapse, UnstyledButton } from "@mantine/core";
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
    <div className="w-72 p-4">
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
            {categoryListData && (
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
                {categoryListData.data.map((item, index) => (
                  <UnstyledButton
                    key={index}
                    onClick={() => handleChangeCategoryFilter("ORDER", item.id)}
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
            {categoryListData && (
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
                {categoryListData.data.map((item, index) => (
                  <UnstyledButton
                    key={index}
                    onClick={() => handleChangeCategoryFilter("READY", item.id)}
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
  );
};

export default FilterProduct;
