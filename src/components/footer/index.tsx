import { List, Input, Button } from "@mantine/core";
import classes from "./index.module.css";
import Image from "next/image";
import FacebookPage from "@images/footer/facebook-page.png";
import { Icons } from "../icons";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 p-4 lg:p-0 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <div className={classes.logo}>
            <h1 className="text-[#FFFC00] text-2xl font-bold">
              TWENDEE SOFTWARE
            </h1>

            <List
              spacing="xs"
              size="sm"
              center
              className="w-full text-white"
              mt={8}
            >
              <List.Item icon={<MapPin className="w-4 h-4" />}>
                Địa chỉ: 8 Tôn Thất Thuyết, Mỹ Đình, Nam Từ Liêm, Hà Nội
              </List.Item>
              <List.Item icon={<Phone className="w-4 h-4" />}>
                0xxx.xxx.xxx
              </List.Item>
              <List.Item icon={<Mail className="w-4 h-4" />}>
                contact@twendeesoft.com
              </List.Item>
              <List.Item icon={<Globe className="w-4 h-4" />}>
                Website: https://twendeesoft.com/
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1030107750353!2d105.78332850000001!3d21.028563899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cdef48301%3A0x9e3f57b9adf0d78!2zOCBUw7RuIFRo4bqldCBUaHV54bq_dCwgTeG7uSDEkMOsbmgsIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWk!5e0!3m2!1sen!2s!4v1708487337073!5m2!1sen!2s"
            className="w-full h-96"
            style={{ border: 0 }}
          />
        </div>
        <div>
          <div>
            <h1 className="text-[#FFFC00] text-2xl font-bold">FACEBOOK</h1>
            <div className="mt-3">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftwendeesoft%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="340"
                height="300"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 items-center fixed left-4 bottom-6">
        <Icons.facebook className="border rounded-full bg-blue-300 hover:animate-pulse cursor-pointer" />
        <Icons.zalo className="border rounded-full bg-blue-300 hover:animate-pulse cursor-pointer" />
        <Icons.phoneLogo className="border rounded-full bg-blue-300 hover:animate-pulse cursor-pointer" />
      </div>
    </footer>
  );
}
