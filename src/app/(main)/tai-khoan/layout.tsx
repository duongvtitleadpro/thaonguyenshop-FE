"use client";

import { SidebarNav } from "@/components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Đơn mua",
    href: "/tai-khoan/don-mua",
  },
  {
    title: "Đơn xuất",
    href: "/tai-khoan/don-xuat",
  },
  {
    title: "Trả hàng",
    href: "/tai-khoan/tra-hang",
  },
  {
    title: "Thanh toán",
    href: "/tai-khoan/thanh-toan",
  },
  {
    title: "Tài khoản",
    href: "/tai-khoan/me",
  },
];

const UserManagementLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SidebarNav items={sidebarNavItems} className="w-72 p-4" />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default UserManagementLayout;
