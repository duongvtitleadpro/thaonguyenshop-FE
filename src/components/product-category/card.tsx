"use client";
import { AspectRatio, Card, Image, Text } from "@mantine/core";
import classes from "./card.module.css";
import Link from "next/link";
import { currency } from "@/utils/currency";

interface ProductCardProps {
  id: number;
  img: string;
  name: string;
  code: string;
  price: number;
}

const ProductCard = (props: ProductCardProps) => {
  const { id, img, name, code, price } = props;
  return (
    <Link href={`/chi-tiet-san-pham/${id}`}>
      {/* <Card
        key={code}
        p="md"
        radius="md"
        component="a"
        href="#"
        className={classes.card}
      >
        <AspectRatio ratio={4 / 3}>
          <Image
            src={img}
            alt={name}
            radius="md"
            fallbackSrc="https://www.sennheiser.com/images/placeholder.raw.svg"
          />
        </AspectRatio>
        <Text c="dark" size="xs" fw={700} mt="md">
          {`Mã sản phẩm: ${code}`}
        </Text>
        <Text mt={5} className={classes.title}>
          {name}
        </Text>
        <Text c="red">{currency.format(price)}</Text>
      </Card> */}
      <div className="h-full transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <Image
          className="h-48 w-full object-cover object-center"
          src={img}
          alt={name}
          fallbackSrc="https://www.sennheiser.com/images/placeholder.raw.svg"
        />
        <div className="p-4">
          <p className="mb-2 text-sm text-gray-300">{`Mã sản phẩm: ${code}`}</p>
          <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 line-clamp-3">
            {name}
          </h2>
          <div className="flex items-center">
            <p className="mr-2 text-lg font-semibold text-red-600">
              {currency.format(price)}
            </p>
            {/* <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
              $25.00
            </p>
            <p className="ml-auto text-base font-medium text-green-500">
              20% off
            </p> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
