"use client";
import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Icons } from "../icons";
import ThaoNguyenLogo from "@images/logo/thao-nguyen-logo.png";
import { NavBarRoute } from "@/constant/route";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import {
  Autocomplete,
  CloseButton,
  Drawer,
  Input,
  UnstyledButton,
} from "@mantine/core";
import { useRecoilState } from "recoil";
import {
  filterProductState,
  FILTER_PRODUCT_DEFAULT,
} from "@/store/state/product-filter.atom";
import LoginModal from "../login-modal";
import { ATOM_KEY } from "@/store/key";
import { Search, Settings } from "lucide-react";
import Image from "next/image";
import { purchaseOrderFilterState } from "@/store/state/purchase-order-filter.atom";
import { authState } from "@/store/state/auth.atom";

const HISTORY_SEARCH_KEY = "history_search";

const Header = () => {
  const router = useRouter();
  const [productParam, setProductParam] = useRecoilState(filterProductState);
  const [purchaseOrderFilter, setPurchaseOrderFilter] = useRecoilState(
    purchaseOrderFilterState
  );
  const [{ user, isAuthenticated }, setAuth] = useRecoilState(authState);
  const keywordIntial =
    typeof window !== "undefined" &&
    JSON.parse(sessionStorage.getItem(ATOM_KEY.FILTER_PRODUCT) || "{}");
  const [keyword, setKeyword] = React.useState(keywordIntial?.keyword || "");
  const pathname = usePathname();
  const path = useMemo(() => pathname.split("/")[1], [pathname]);
  const [onpenedMenu, { open: openMenu, close: closeMenu }] =
    useDisclosure(false);

  const [historySearchList, setHistorySearchList] = useLocalStorage<string[]>({
    key: HISTORY_SEARCH_KEY,
    defaultValue: [],
  });

  const handleChangeKeyword = () => {
    setProductParam((prev) => ({
      ...FILTER_PRODUCT_DEFAULT,
      keyword: keyword,
    }));
    setHistorySearchList((prev) => {
      const searchExistIndex = prev.findIndex((item) => item === keyword);
      if (!keyword) return prev;
      if (searchExistIndex !== -1) {
        const list = prev;
        list.splice(searchExistIndex, 1);
        return [keyword, ...list];
      }
      return [keyword, ...prev];
    });
    if (pathname !== "/san-pham") router.push(`/san-pham?search=${keyword}`);
    closeMenu();
  };

  const handleGotoPurchasedOrder = () => {
    setPurchaseOrderFilter((prev) => ({
      ...prev,
      allocationStatus: ["ALLOCATED"],
    }));
    router.push("/tai-khoan/don-mua");
  };

  const handleClickOptions = (searchItem: string) => {
    setProductParam((prev) => ({
      ...FILTER_PRODUCT_DEFAULT,
      keyword: searchItem,
    }));
    setHistorySearchList((prev) => {
      const searchExistIndex = prev.findIndex((item) => item === searchItem);
      if (!searchItem) return prev;
      if (searchExistIndex !== -1) {
        const list = prev;
        list.splice(searchExistIndex, 1);
        return [searchItem, ...list];
      }
      return [searchItem, ...prev];
    });
    if (pathname !== "/san-pham") router.push(`/san-pham?search=${searchItem}`);
    closeMenu();
  };

  return (
    <>
      <div>
        <div className="hidden lg:block h-11 bg-[#35A8E0]">
          <div className="h-full flex max-w-6xl mx-auto items-center justify-between text-white ">
            <div>
              <h2 className="text-sm">Tổng kho Thao Nguyen</h2>
            </div>
            <LoginModal onClose={closeMenu} />
          </div>
        </div>
        <div>
          <div className="h-full flex lg:gap-11 max-w-6xl mx-auto items-center justify-between relative">
            <div className="flex">
              <Link
                href="/"
                className="w-[100px] lg:w-[147px]"
                onClick={() => setKeyword("")}
              >
                <Image src={ThaoNguyenLogo} alt="Thao Nguyen" />
              </Link>
            </div>

            <div className="hidden lg:flex flex-1 flex-col mt-2">
              <div className="flex items-center justify-between gap-20">
                <div className="flex w-full items-center">
                  <Autocomplete
                    placeholder="Tìm kiếm sản phẩm bạn muốn mua tại đây"
                    className="flex-1 h-full rounded-none"
                    radius="xs"
                    data={historySearchList}
                    value={keyword}
                    onChange={(event) => setKeyword(event)}
                    maxDropdownHeight={150}
                    rightSectionPointerEvents="all"
                    rightSection={
                      <CloseButton
                        aria-label="Clear input"
                        onClick={() => {
                          setKeyword("");
                          setProductParam((prev) => ({ ...prev, keyword: "" }));
                        }}
                        style={{ display: keyword ? undefined : "none" }}
                      />
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleChangeKeyword();
                    }}
                    onOptionSubmit={(value) => {
                      setKeyword(value);
                      handleClickOptions(value);
                    }}
                    comboboxProps={{
                      transitionProps: { transition: "pop", duration: 200 },
                    }}
                  />
                  <Button
                    type="button"
                    className="rounded-none bg-[#35A8E0] h-9"
                    onClick={handleChangeKeyword}
                  >
                    TÌM KIẾM
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.phone color="#35A8E0" />
                  <div>
                    <h1 className="text-[#35A8E0] font-semibold">HOTLINE</h1>
                    <p className="italic text-[#e02020] font-semibold">
                      0921.367.363
                    </p>
                  </div>
                </div>
              </div>
              <Separator className="bg-black h-0.5 mt-4" />
              <div className="flex gap-4">
                {NavBarRoute.map((item, index) => (
                  <Link
                    key={index}
                    href={item.slug}
                    className={cn(
                      "hover:text-[#35A8E0] text-sm leading-[70px] tracking-wide",
                      path === item.slug.split("/")[1] && "text-[#35A8E0]"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:block lg:hidden">
              <div className="flex w-[450px] items-center">
                <Autocomplete
                  placeholder="Tìm kiếm sản phẩm bạn muốn mua tại đây"
                  className="flex-1 h-full rounded-none"
                  radius="xs"
                  data={historySearchList}
                  value={keyword}
                  onChange={(event) => setKeyword(event)}
                  maxDropdownHeight={150}
                  rightSectionPointerEvents="all"
                  rightSection={
                    <CloseButton
                      aria-label="Clear input"
                      onClick={() => {
                        setKeyword("");
                        setProductParam((prev) => ({ ...prev, keyword: "" }));
                      }}
                      style={{ display: keyword ? undefined : "none" }}
                    />
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleChangeKeyword();
                  }}
                  onOptionSubmit={(value) => {
                    setKeyword(value);
                    handleClickOptions(value);
                  }}
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                  }}
                />
                <Button
                  type="button"
                  className="rounded-none bg-[#35A8E0] h-9"
                  onClick={handleChangeKeyword}
                >
                  TÌM KIẾM
                </Button>
              </div>
            </div>
            <div className="flex items-start px-3 gap-2 lg:hidden">
              <Settings
                className="text-slate-700 hover:bg-slate-200 p-2 w-10 h-10 rounded-md cursor-pointer"
                onClick={() => {
                  router.push("/tai-khoan/don-mua");
                }}
              />
              <UnstyledButton
                onClick={openMenu}
                className="hover:bg-slate-200 p-2 rounded-md w-10 h-10 flex items-center justify-center"
              >
                <Icons.menu />
              </UnstyledButton>
              <div>
                <LoginModal
                  onClose={closeMenu}
                  className={cn(!isAuthenticated && "p-2")}
                />
                {user && (
                  <div
                    className="text-red-600 font-semibold px-2 hover:cursor-pointer lg:hidden mt-3"
                    onClick={handleGotoPurchasedOrder}
                  >
                    Hàng đã về ({user?.totalReceivedQuantity})
                  </div>
                )}
              </div>
            </div>

            <Drawer
              opened={onpenedMenu}
              onClose={closeMenu}
              overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
              styles={{
                body: {
                  height: "calc(100% - 60px)",
                },
              }}
            >
              <div className="flex flex-col pt-6 px-4 justify-between h-full">
                <div className="flex flex-col gap-4 ">
                  <div className="flex w-full items-center">
                    <Autocomplete
                      placeholder="Tìm kiếm sản phẩm bạn muốn mua tại đây"
                      className="flex-1 h-full rounded-none"
                      radius="xs"
                      size="lg"
                      data={historySearchList}
                      value={keyword}
                      onChange={(event) => setKeyword(event)}
                      maxDropdownHeight={150}
                      rightSectionPointerEvents="all"
                      rightSection={
                        <CloseButton
                          aria-label="Clear input"
                          onClick={() => {
                            setKeyword("");
                            setProductParam((prev) => ({
                              ...prev,
                              keyword: "",
                            }));
                          }}
                          style={{ display: keyword ? undefined : "none" }}
                        />
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") handleChangeKeyword();
                      }}
                      onOptionSubmit={(value) => {
                        setKeyword(value);
                        handleClickOptions(value);
                      }}
                      comboboxProps={{
                        transitionProps: { transition: "pop", duration: 200 },
                      }}
                    />
                    <Button
                      type="button"
                      className="rounded-none bg-[#35A8E0] h-12"
                      onClick={handleChangeKeyword}
                    >
                      <Search />
                    </Button>
                  </div>
                  {NavBarRoute.map((item, index) => (
                    <Link
                      key={index}
                      href={item.slug}
                      className={cn(
                        "hover:text-[#35A8E0] text-lg tracking-wide text-black",
                        path === item.slug.split("/")[1] && "text-[#35A8E0]"
                      )}
                      onClick={closeMenu}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full h-10 bg-slate-300"></div>

        <div className="flex w-full max-w-[450px] items-center md:hidden  ">
          <Autocomplete
            placeholder="Tìm kiếm sản phẩm bạn muốn mua tại đây"
            className="flex-1 h-full rounded-none"
            radius="xs"
            data={historySearchList}
            value={keyword}
            onChange={(event) => setKeyword(event)}
            maxDropdownHeight={150}
            rightSectionPointerEvents="all"
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => {
                  setKeyword("");
                  setProductParam((prev) => ({ ...prev, keyword: "" }));
                }}
                style={{ display: keyword ? undefined : "none" }}
              />
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") handleChangeKeyword();
            }}
            onOptionSubmit={(value) => {
              setKeyword(value);
              handleClickOptions(value);
            }}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
          />
          <Button
            type="button"
            className="rounded-none bg-[#35A8E0] h-9"
            onClick={handleChangeKeyword}
          >
            TÌM KIẾM
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
