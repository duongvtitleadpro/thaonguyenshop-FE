"use client";

import { getAllCategory } from "@/api/category";
import { QueryKey } from "@/constant/query-key";
import { Image, SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

const AboutPage = () => {
  const { data: categoryListData } = useQuery({
    queryKey: [QueryKey.GET_ALL_CATEGORY],
    queryFn: getAllCategory,
  });
  return (
    <>
      <div className="w-full h-10 bg-slate-300"></div>
      <div className="w-full max-w-6xl mx-auto mt-12 p-4">
        <h1 className="font-semibold text-3xl text-center mb-10">
          Ảnh thật hàng về
        </h1>
        {categoryListData && (
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing="lg"
            verticalSpacing="xl"
          >
            {categoryListData.data.map((item, key) => (
              <Image
                key={key}
                alt={item.name}
                src={item.imageUrl}
                className="w-full h-full hover:scale-110 transition-all duration-300 rounded-sm"
              />
            ))}
          </SimpleGrid>
        )}
      </div>
    </>
  );
};

export default AboutPage;
