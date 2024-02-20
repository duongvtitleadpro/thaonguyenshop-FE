"use client";

import { placeholderImage } from "@/constant/common";
import { Image } from "@mantine/core";
import Link from "next/link";

interface WidgetCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

const WidgetCard = (props: WidgetCardProps) => {
  const { id, name, imageUrl } = props;
  return (
    <Link
      href="/san-pham"
      className="flex flex-col h-full p-4 border border-[#35A8E0] rounded-xl duration-300 hover:shadow-lg hover:border-none cursor-pointer"
    >
      <div className="w-full flex-1 rounded-lg overflow-clip">
        <Image
          src={imageUrl}
          alt={name}
          fallbackSrc={placeholderImage}
          className="w-full h-full object-cover hover:scale-105 duration-300"
        />
      </div>
      <div className="text-center mt-3 mb-1">{name}</div>
    </Link>
  );
};

export default WidgetCard;
