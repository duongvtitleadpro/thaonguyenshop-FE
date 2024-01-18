"use client";

import { getUserProfile } from "@/api/auth";
import Header from "@/components/header";
import { authState } from "@/store/state/auth.atom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const UserManagementLayout = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useRecoilState(authState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserProfile();
        setAuth({
          isAuthenticated: true,
          user,
        });
      } catch (error) {
        setAuth({
          isAuthenticated: false,
          user: null,
        });
      }
    };
    if (!auth.isAuthenticated) fetchData();
  }, [auth, setAuth]);
  return (
    <div>
      <div className="h-screen">
        <Header></Header>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default UserManagementLayout;
