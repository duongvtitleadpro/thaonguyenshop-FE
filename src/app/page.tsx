"use client";
import { useQuery } from "@tanstack/react-query";

import { ContactCard, WidgetCard, WidgetWrapper } from "@/components/widget";
import { QueryKey } from "@/constant/query-key";
import { getAllCategory } from "@/api/category";

export default function Home() {
  const { data: categoryListData } = useQuery({
    queryKey: [QueryKey.GET_ALL_CATEGORY],
    queryFn: getAllCategory,
  });

  return (
    <div className="p-4">
      <div className="w-full h-10 bg-slate-300"></div>
      {categoryListData && (
        <div className="w-full max-w-6xl mx-auto mt-12 flex flex-col gap-24">
          <WidgetWrapper headTitle="Hàng order">
            {categoryListData.data.map((item, index) => (
              <WidgetCard
                key={index}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
              />
            ))}
          </WidgetWrapper>
          <WidgetWrapper headTitle="Hàng có sẵn">
            {categoryListData.data.map((item, index) => (
              <WidgetCard
                key={index}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
              />
            ))}
          </WidgetWrapper>
        </div>
      )}
      <div className="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {new Array(4).fill(0).map((_, index) => (
          <ContactCard key={index} />
        ))}
      </div>
    </div>
  );
}
