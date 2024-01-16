"use client";

import { CalendarDateRangePicker } from "@/components/date-range-picker";
import DataTable from "@/components/table/data-table";
import { columns } from "./columns";

const data = [
  {
    id: "128341",
    img: "https://cdn.yousport.vn/Media/Products/190421032842511/quan-ao-thu-mon-jp-buffon-cam-1.jpg",
    product: "Quần áo thủ môn JP Buffon",
    quantity: 1,
    date: "20-12-2023 19:24:39",
    status: "Đã Mua Hàng",
    situation: "Hàng Về Đủ",
    price: "1.000.000đ",
    note: "Thuy Lieu",
  },
  {
    id: "1246782",
    img: "https://bizweb.dktcdn.net/100/399/392/files/mua-quan-ao-nam-online-2.jpg?v=1615869590441",
    product: "Quần áo thun nam - bộ quần áo nam hình con gấu phong cách",
    quantity: 4,
    date: "20-12-2023 19:24:39",
    status: "Đã Mua Hàng",
    situation: "Hàng Về Đủ",
    price: "1.000.000đ",
    note: "Thuy Lieu",
  },
  {
    id: "128341",
    img: "https://htsports.com.vn/wp-content/uploads/2022/09/quan-ao-bong-da-thu-mon-iker-do-cam-tm01-1.webp",
    product: "QUẦN ÁO BÓNG ĐÁ THỦ MÔN IKER - TM01",
    quantity: 3,
    date: "20-12-2023 19:24:39",
    status: "Đã Mua Hàng",
    situation: "Hàng Về Đủ",
    price: "1.000.000đ",
    note: "Thuy Lieu",
  },
];

const PurchaseOrderPage = () => {
  return (
    <>
      Đơn mua
      <CalendarDateRangePicker />
      <DataTable data={data} columns={columns} />
    </>
  );
};

export default PurchaseOrderPage;
