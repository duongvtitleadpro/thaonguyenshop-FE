"use client";

import { AspectRatio, Card, Image, Text } from "@mantine/core";
import classes from "./card.module.css";

interface ProductCardProps {
  img: string;
  name: string;
  code: string;
}

const ProductCard = (props: ProductCardProps) => {
  const { img, name, code } = props;
  return (
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
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {code}
      </Text>
      <Text mt={5} className={classes.title}>
        {name}
      </Text>
    </Card>
  );
};

export default ProductCard;
