import { SimpleGrid } from "@mantine/core";
import EmblaCarousel from "@/components/embla-carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";
import { promises as fs } from "fs";
import path from "path";
import { Data } from "@/app/(main)/product-category/schema";

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

async function getData(id: number) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/(main)/product-category/data.json")
  );

  const exportData: Data[] = JSON.parse(data.toString()).data;

  return exportData.find((item) => item.id === id);
}
const DetailProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = await getData(Number(slug));

  return (
    <div className="p-4">
      <div className="w-full max-w-6xl mx-auto mt-12">
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <div>
            <EmblaCarousel images={images} options={OPTIONS} />
          </div>
          <div>{JSON.stringify(data)}</div>
        </SimpleGrid>
      </div>
    </div>
  );
};

export default DetailProductPage;
