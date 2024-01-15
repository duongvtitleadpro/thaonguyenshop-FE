"use client";

import Image from "next/image";

interface WidgetCardProps {
  srcImg: string;
  title: string;
}

const WidgetCard = (props: WidgetCardProps) => {
  const { srcImg, title } = props;
  return (
    <div className="flex flex-col p-4 border border-[#35A8E0] rounded-xl duration-300 hover:shadow-lg hover:border-none cursor-pointer">
      <div className="w-full flex-1 rounded-lg overflow-clip">
        <img
          src={srcImg}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 duration-300"
        />
      </div>
      <div className="text-center mt-3 mb-1">{title}</div>
    </div>
  );
};

export default WidgetCard;
