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
      <Card
        key={code}
        p="md"
        radius="md"
        component="a"
        href="#"
        className={classes.card}
      >
        <AspectRatio ratio={4 / 3}>
          <Image src={img} alt={name} radius="md" />
        </AspectRatio>
        <Text c="dark" size="xs" fw={700} mt="md">
          {`Mã sản phẩm: ${code}`}
        </Text>
        <Text mt={5} className={classes.title}>
          {name}
        </Text>
        <Text c="red">{currency.format(price)}</Text>
      </Card>
    </Link>
  );
};

export default ProductCard;
