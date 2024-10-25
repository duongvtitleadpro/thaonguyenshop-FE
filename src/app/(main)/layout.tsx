"use client";

import { getUserProfile } from "@/api/auth";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { QueryKey } from "@/constant/query-key";
import { authState } from "@/store/state/auth.atom";
import { clearToken, getToken } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const UserManagementLayout = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const { data: userData } = useQuery({
    queryKey: [QueryKey.GET_USER_PROFILE],
    queryFn: getUserProfile,
    // enabled: !auth.isAuthenticated,
    retry: 3,
    retryDelay(failureCount) {
      return 1000 * failureCount;
    },
  });
  useEffect(() => {
    if (userData) {
      setAuth({
        isAuthenticated: true,
        user: userData,
      });
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
      });
    }
  }, [userData]);
  return (
    <div>
      <div className="h-screen">
        <Header></Header>
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default UserManagementLayout;
