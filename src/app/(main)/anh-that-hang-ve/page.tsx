"use client";

import { getStockProductImage } from "@/api/product";
import EmblaCarousel from "@/components/embla-carousel/embla-carousel";
import { placeholderImage } from "@/constant/common";
import { QueryKey } from "@/constant/query-key";
import { authState } from "@/store/state/auth.atom";
import { StockProductImageParam } from "@/types/product";
import { Button, SimpleGrid, Image, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

const AboutPage = () => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [stockParam, setStockParam] = useState<StockProductImageParam>({
    page: 1,
    size: 50,
  });
  const { data: stockImageList } = useQuery({
    queryKey: [QueryKey.GET_STOCK_PRODUCT_IMAGE],
    queryFn: () => getStockProductImage(stockParam),
  });

  const [auth, setAuth] = useRecoilState(authState);
  const [isDisplayed, setIsDisplayed] = useState(false);
  useEffect(() => {
    const timeId = setTimeout(() => setIsDisplayed(true), 2000);
    return () => clearTimeout(timeId);
  }, []);

  const getMoreImage = () => {
    setStockParam({ ...stockParam, page: stockParam.page + 1 });
  };

  return (
    <>
      {!auth.isAuthenticated ? (
        isDisplayed && (
          <div className="w-full max-w-6xl mx-auto mt-12">
            <h1 className="text-center font-semibold text-2xl">
              Yêu cầu đăng nhập để xem.
            </h1>
            <p className="text-center mt-3">
              Nếu chưa có tài khoản liên hệ Admin (zalo:{" "}
              <a href="tel:0921367363" className="text-blue-600">
                0921.367.363
              </a>
              ) để được cấp tài khoản
            </p>
          </div>
        )
      ) : (
        <div>
          <div className="w-full h-10 bg-slate-300"></div>
          <div className="w-full max-w-6xl mx-auto mt-12 p-4">
            <h1 className="font-semibold text-3xl text-center mb-10">
              Ảnh thật hàng về
            </h1>
            {stockImageList && (
              <>
                <SimpleGrid
                  cols={{ base: 2, sm: 4, md: 5, lg: 6 }}
                  spacing="lg"
                  verticalSpacing="xl"
                >
                  {stockImageList.data.map((item, key) => (
                    <Image
                      key={item.id}
                      alt={item.url}
                      src={item.url}
                      fit="contain"
                      // onClick={open}
                      className="w-full h-[250px] hover:scale-110 transition-all duration-300 rounded-sm shadow-2xl"
                    />
                  ))}
                </SimpleGrid>
                {stockParam.page < stockImageList.totalPages && (
                  <Button onClick={() => getMoreImage()}>Tải thêm</Button>
                )}
                {/* <Modal
                  opened={opened}
                  onClose={close}
                  withCloseButton={false}
                  styles={{
                    body: {
                      padding: 0,
                    },
                  }}
                  centered
                >
                  <EmblaCarousel
                    images={
                      stockImageList.data.length > 0
                        ? stockImageList.data.map((item) => item.url)
                        : [""]
                    }
                  />
                </Modal> */}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AboutPage;
