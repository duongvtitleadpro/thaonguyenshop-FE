import { Text, Container, ActionIcon, Group, rem, List } from "@mantine/core";
// import {
//   IconBrandTwitter,
//   IconBrandYoutube,
//   IconBrandInstagram,
// } from "@tabler/icons-react";
import classes from "./index.module.css";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
];

export default function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text size="xl" c="dark" fw={700}>
            TỔNG KHO THẢO NGUYÊN
          </Text>
          <List
            spacing="xs"
            size="sm"
            center
            c="gray"
            className="w-full"
            mt={8}
          >
            <List.Item>Địa chỉ: Huyện Thanh Hà – Tỉnh Hải Dương</List.Item>
            <List.Item>0921.367.363</List.Item>
            <List.Item>phuongthaohd2507@gmail.com</List.Item>
            <List.Item>Website: https://tongkhothaonguyen.com</List.Item>
          </List>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2020 mantine.dev. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
