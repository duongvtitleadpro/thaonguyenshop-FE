"use client";

import { authState } from "@/store/state/auth.atom";
import { useRecoilState } from "recoil";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useRecoilState(authState);

  return (
    <div>
      {!auth.isAuthenticated ? (
        <>
          <div className="w-full h-10 bg-slate-300"></div>
          <div className="w-full h-40 flex justify-center items-center text-2xl font-semibold">
            Vui lòng đăng nhập
          </div>
        </>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default PrivateLayout;
