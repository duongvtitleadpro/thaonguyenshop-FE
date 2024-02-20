"use client";

import { getAllCategory } from "@/api/category";
import { placeholderImage } from "@/constant/common";
import { QueryKey } from "@/constant/query-key";
import { authState } from "@/store/state/auth.atom";
import { Image, SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

const AboutPage = () => {
  const { data: category } = useQuery({
    queryKey: [QueryKey.GET_ALL_CATEGORY],
    queryFn: getAllCategory,
  });

  const categoryListData = useMemo(() => {
    if (!category) return null;
    const orderData = category.data.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.categoryImages.find(
        (item) => item.categoryStatus === "ORDER"
      )?.imageUrl,
    }));

    const readyData = category.data.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.categoryImages.find(
        (item) => item.categoryStatus === "READY"
      )?.imageUrl,
    }));

    return [...orderData, ...readyData];
  }, [category]);

  const [auth, setAuth] = useRecoilState(authState);
  const [isDisplayed, setIsDisplayed] = useState(false);
  useEffect(() => {
    const timeId = setTimeout(() => setIsDisplayed(true), 2000);
    return () => clearTimeout(timeId);
  }, []);

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
            {categoryListData && (
              <SimpleGrid
                cols={{ base: 2, sm: 4, md: 5, lg: 6 }}
                spacing="lg"
                verticalSpacing="xl"
              >
                {categoryListData.map((item, key) => (
                  <Image
                    key={key}
                    alt={item.name}
                    src={item.imageUrl}
                    fallbackSrc={placeholderImage}
                    className="w-full h-full hover:scale-110 transition-all duration-300 rounded-sm"
                  />
                ))}
              </SimpleGrid>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AboutPage;
