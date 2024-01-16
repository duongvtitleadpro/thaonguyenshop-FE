"use client";

import { ProductCard } from "@/components/product-category";
import { Container, SimpleGrid } from "@mantine/core";

const data = [
  {
    img: "https://bizweb.dktcdn.net/thumb/1024x1024/100/399/392/products/hi03-t01-1.png",
    name: "Áo thun nam cổ tròn Raglan HI-ELE",
    code: "HI03-T01",
  },
  {
    img: "https://chogym.vn/wp-content/uploads/2019/06/bo-quan-ao-tap-gym-the-thao-tham-hut-mo-hoi-11.jpg",
    name: "Bộ Quần Áo Thun Thể Thao Tập GYM Form Body B-001 - Chợ GYM",
    code: "MQW01-T01",
  },
  {
    img: "https://dothethao.net.vn/wp-content/uploads/2022/01/bo-quan-ao-the-thao-hermod-shine-xanh-den.jpg",
    name: "BỘ QUẦN ÁO THỂ THAO HERMOD SHINE XANH ĐEN - THUN LẠNH DỆT KIM",
    code: "DA01-T01",
  },
  {
    img: "https://districtone.vn/wp-content/uploads/2022/09/ao-thun-trang-phoi-quan-trang-ong-suong-5.jpg",
    name: "Áo thun trắng trơn phối quần trắng dài ống suông thanh lịch - District One Quần áo thun nam - bộ quần áo nam hình con gấu phong cách",
    code: "AD01-T01",
  },
  {
    img: "https://cf.shopee.vn/file/17e2066120dab83b390da02b7875959a",
    name: "Quần áo thun nam - bộ quần áo nam hình con gấu phong cách",
    code: "HI03-T02",
  },
  {
    img: "https://bizweb.dktcdn.net/thumb/1024x1024/100/399/392/products/hi03-t01-1.png",
    name: "Áo thun nam cổ tròn Raglan HI-ELE",
    code: "HI03-T01",
  },
  {
    img: "https://chogym.vn/wp-content/uploads/2019/06/bo-quan-ao-tap-gym-the-thao-tham-hut-mo-hoi-11.jpg",
    name: "Bộ Quần Áo Thun Thể Thao Tập GYM Form Body B-001 - Chợ GYM",
    code: "MQW01-T01",
  },
  {
    img: "https://dothethao.net.vn/wp-content/uploads/2022/01/bo-quan-ao-the-thao-hermod-shine-xanh-den.jpg",
    name: "BỘ QUẦN ÁO THỂ THAO HERMOD SHINE XANH ĐEN - THUN LẠNH DỆT KIM",
    code: "DA01-T01",
  },
  {
    img: "https://districtone.vn/wp-content/uploads/2022/09/ao-thun-trang-phoi-quan-trang-ong-suong-5.jpg",
    name: "Áo thun trắng trơn phối quần trắng dài ống suông thanh lịch - District One",
    code: "AD01-T01",
  },
  {
    img: "https://cf.shopee.vn/file/17e2066120dab83b390da02b7875959a",
    name: "Quần áo thun nam - bộ quần áo nam hình con gấu phong cách",
    code: "HI03-T02",
  },
];
export default function ProductPage() {
  return (
    <div>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="lg"
        verticalSpacing="xl"
      >
        {data.map((item) => (
          <ProductCard key={item.code} {...item} />
        ))}
      </SimpleGrid>
    </div>
  );
}
