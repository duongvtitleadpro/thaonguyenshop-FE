"use client";

import { WidgetCard, WidgetWrapper } from "@/components/widget";

const data = [
  {
    srcImg:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    title: "Sản phẩm 1",
  },
  {
    srcImg:
      "https://us.123rf.com/450wm/photochicken/photochicken2008/photochicken200800065/153425631-pritty-jeune-photographe-asiatique-fille-adolescente-voyage-avec-appareil-photo-prendre-une-photo-de.jpg?ver=6",
    title: "Sản phẩm 2",
  },
  {
    srcImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLHAJh2MySmGUS6Lcf8QMNs1AV6zaO3gxNQa62pUCu3tDTvk9XR0pVVfsLt1CQpShl-c&usqp=CAU",
    title: "Sản phẩm 3",
  },
  {
    srcImg:
      "https://thumbs.dreamstime.com/b/young-male-tourist-stand-steps-take-pictures-woman-holds-blue-camera-hands-man-serious-concentrated-130183917.jpg",
    title: "Sản phẩm 4",
  },
  {
    srcImg:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    title: "Sản phẩm 1",
  },
  {
    srcImg:
      "https://us.123rf.com/450wm/photochicken/photochicken2008/photochicken200800065/153425631-pritty-jeune-photographe-asiatique-fille-adolescente-voyage-avec-appareil-photo-prendre-une-photo-de.jpg?ver=6",
    title: "Sản phẩm 2",
  },
  {
    srcImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLHAJh2MySmGUS6Lcf8QMNs1AV6zaO3gxNQa62pUCu3tDTvk9XR0pVVfsLt1CQpShl-c&usqp=CAU",
    title: "Sản phẩm 3",
  },
  {
    srcImg:
      "https://thumbs.dreamstime.com/b/young-male-tourist-stand-steps-take-pictures-woman-holds-blue-camera-hands-man-serious-concentrated-130183917.jpg",
    title: "Sản phẩm 4",
  },
];

export default function Home() {
  return (
    <>
      <div className="w-full h-10 bg-slate-300"></div>
      <div className="w-full max-w-6xl mx-auto mt-12">
        <WidgetWrapper headTitle="Hàng order ">
          {data.map((item, index) => (
            <WidgetCard key={index} {...item} />
          ))}
        </WidgetWrapper>
      </div>
      <div className="w-full max-w-6xl mx-auto mt-12">
        <WidgetWrapper headTitle="Hàng order ">
          {data.map((item, index) => (
            <WidgetCard key={index} {...item} />
          ))}
        </WidgetWrapper>
      </div>
    </>
  );
}
