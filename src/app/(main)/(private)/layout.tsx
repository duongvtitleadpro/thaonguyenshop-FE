"use client";

import { authState } from "@/store/state/auth.atom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [isDisplayed, setIsDisplayed] = useState(false);
  useEffect(() => {
    const timeId = setTimeout(() => setIsDisplayed(true), 2000);
    return () => clearTimeout(timeId);
  }, []);

  return (
    <div>
      {!auth.isAuthenticated ? (
        isDisplayed && (
          <>
            <div className="w-full h-10 bg-slate-300"></div>
            <div className="w-full h-40 flex justify-center items-center text-2xl font-semibold">
              Vui lòng đăng nhập
            </div>
          </>
        )
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default PrivateLayout;
