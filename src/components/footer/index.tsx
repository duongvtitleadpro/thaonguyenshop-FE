import { List, Input, Button } from "@mantine/core";
import classes from "./index.module.css";
import Image from "next/image";
import FacebookPage from "@images/footer/facebook-page.png";
import { Icons } from "../icons";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 p-4 lg:p-0 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <div className={classes.logo}>
            <h1 className="text-[#FFFC00] text-2xl font-bold">
              TỔNG KHO THẢO NGUYÊN
            </h1>

            <List
              spacing="xs"
              size="sm"
              center
              className="w-full text-white"
              mt={8}
            >
              <List.Item icon={<MapPin className="w-4 h-4" />}>
                Địa chỉ: Huyện Thanh Hà – Tỉnh Hải Dương
              </List.Item>
              <List.Item icon={<Phone className="w-4 h-4" />}>
                0921.367.363
              </List.Item>
              <List.Item icon={<Mail className="w-4 h-4" />}>
                phuongthaohd2507@gmail.com
              </List.Item>
              <List.Item icon={<Globe className="w-4 h-4" />}>
                Website: https://tongkhothaonguyen.com
              </List.Item>
            </List>
          </div>
          <div className="mt-12">
            <h1 className="text-[#FFFC00] text-2xl font-bold">
              ĐĂNG KÝ NHẬN BẢN TIN
            </h1>
            <div className="flex flex-col gap-3 mt-6">
              <Input placeholder="Họ và tên" />
              <Input placeholder="Email" />
              <Button c="yellow">Đăng ký</Button>
            </div>
          </div>
        </div>
        <div className="google-map-code">
          <iframe
            src="https://maps.google.com/maps?q=Huy%E1%BB%87n%20Thanh%20H%C3%A0%20%E2%80%93%20T%E1%BB%89nh%20H%E1%BA%A3i%20D%C6%B0%C6%A1ng&t=m&z=10&output=embed&iwloc=near"
            className="w-full h-96"
            style={{ border: 0 }}
          />
        </div>
        <div>
          <div>
            <h1 className="text-[#FFFC00] text-2xl font-bold">FACEBOOK</h1>
            <div className="mt-3">
              <Image
                src={FacebookPage}
                alt="Facebook Page"
                className="w-full h-40 object-cover"
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 items-center absolute left-4 bottom-6">
        <Icons.facebook className="border rounded-full bg-blue-300 hover:animate-pulse cursor-pointer" />
        <Icons.zalo className="border rounded-full bg-blue-300 hover:animate-pulse cursor-pointer" />
        <Icons.phoneLogo className="border rounded-full bg-blue-300 hover:animate-pulse cursor-pointer" />
      </div>
    </footer>
  );
}
