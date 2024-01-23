"use client";
import { Container, Title, Text, Button, SimpleGrid } from "@mantine/core";
import classes from "./NotFoundImage.module.css";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";

export default function NotFoundImage() {
  const router = useRouter();
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Icons.notfound className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>
            Trang bạn truy cập không tồn tại
          </Title>
          <Text c="dimmed" size="lg">
            Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang chủ
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => router.push("/")}
          >
            Quay lại trang chủ
          </Button>
        </div>
        <Icons.notfound className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
