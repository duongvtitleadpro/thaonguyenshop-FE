"use client";

import { authState } from "@/store/state/auth.atom";
import { currency } from "@/utils/currency";
import { useRecoilValue } from "recoil";

const UserPage = () => {
  const auth = useRecoilValue(authState);
  return (
    <>
      <h1>Tài khoản</h1>
      <div className="mt-3">
        {auth.user && (
          <div className="flex flex-col">
            <p>
              <span className="font-semibold w-32 inline-block">
                Tiền hàng:
              </span>{" "}
              <span>{currency.format(auth.user.paid)}</span>
            </p>
            <p>
              <span className="font-semibold w-32 inline-block">
                Thanh toán:
              </span>{" "}
              <span>{currency.format(auth.user?.totalCost)}</span>
            </p>
            <p>
              <span className="font-semibold w-32 inline-block">Công nợ:</span>{" "}
              <span className="text-red-700">
                {currency.format(auth.user?.debt)}
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
