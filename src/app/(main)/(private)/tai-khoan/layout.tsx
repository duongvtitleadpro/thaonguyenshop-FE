"use client";

import { SidebarNav } from "@/components/sidebar-nav";

const sidebarNavItems = [
  {
    id: 1,
    title: "Đơn mua",
    href: "/tai-khoan/don-mua",
  },
  {
    id: 2,
    title: "Đơn xuất",
    href: "/tai-khoan/don-xuat",
  },
  {
    id: 3,
    title: "Trả hàng",
    href: "/tai-khoan/tra-hang",
  },
  {
    id: 4,
    title: "Thanh toán",
    href: "/tai-khoan/thanh-toan",
  },
  {
    id: 5,
    title: "Tài khoản",
    href: "/tai-khoan/me",
  },
];

const UserManagementLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row ">
      <SidebarNav items={sidebarNavItems} className="w-72 p-4" />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default UserManagementLayout;
