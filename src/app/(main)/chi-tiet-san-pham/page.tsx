"use client";

import { SimpleGrid } from "@mantine/core";
import EmblaCarousel from "@/components/embla-carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {};
const images = [
  "https://img.ws.mms.shopee.vn/vn-11134207-7qukw-licisielnh76c4",
  "https://mcdn.coolmate.me/image/November2022/the-nao-la-mot-chiec-ao-thun-nam-chat-luong_410.jpg",
  "https://yeepvn.sgp1.digitaloceanspaces.com/2023/04/8353ca176db52037f00818ec85441ce2.jpg",
  "https://mcdn.coolmate.me/image/April2020/ao-thun-nam.jpg",
  "https://mcdn.coolmate.me/image/May2023/review-cua-hang-coolmate-1810_843.jpg",
  "https://img.ws.mms.shopee.vn/vn-11134207-7qukw-licisielnh76c4",
  "https://mcdn.coolmate.me/image/November2022/the-nao-la-mot-chiec-ao-thun-nam-chat-luong_410.jpg",
  "https://yeepvn.sgp1.digitaloceanspaces.com/2023/04/8353ca176db52037f00818ec85441ce2.jpg",
  "https://mcdn.coolmate.me/image/April2020/ao-thun-nam.jpg",
  "https://mcdn.coolmate.me/image/May2023/review-cua-hang-coolmate-1810_843.jpg",
  "https://img.ws.mms.shopee.vn/vn-11134207-7qukw-licisielnh76c4",
  "https://mcdn.coolmate.me/image/November2022/the-nao-la-mot-chiec-ao-thun-nam-chat-luong_410.jpg",
  "https://yeepvn.sgp1.digitaloceanspaces.com/2023/04/8353ca176db52037f00818ec85441ce2.jpg",
  "https://mcdn.coolmate.me/image/April2020/ao-thun-nam.jpg",
  "https://mcdn.coolmate.me/image/May2023/review-cua-hang-coolmate-1810_843.jpg",
];

const DetailProductPage = () => {
  return (
    <div className="p-4">
      <div className="w-full max-w-6xl mx-auto mt-12">
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <div>
            <EmblaCarousel images={images} options={OPTIONS} />
          </div>
          <div>2</div>
        </SimpleGrid>
      </div>
    </div>
  );
};

export default DetailProductPage;
