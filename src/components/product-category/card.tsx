"use client";
import { Image } from "@mantine/core";
import Link from "next/link";
import { currency } from "@/utils/currency";
import { useRecoilValue } from "recoil";
import { authState } from "@/store/state/auth.atom";
import { ProductStatus } from "@/types/product";
import { useRouter } from "next/navigation";
import { ProductStatusColor, ProductStatusTitle } from "@/constant/product";

interface ProductCardProps {
  id: number;
  img: string;
  name: string;
  code: string;
  price: number;
  status: ProductStatus | null;
  origin: string;
}

const ProductCard = (props: ProductCardProps) => {
  const auth = useRecoilValue(authState);
  const router = useRouter();
  const { id, img, name, code, price, status, origin } = props;
  return (
    <div className="h-full transform overflow-hidden rounded-lg border bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <Image
        className="h-32 md:h-56 w-full cursor-pointer"
        fit="fill"
        src={img}
        alt={name}
        fallbackSrc="https://www.sennheiser.com/images/placeholder.raw.svg"
        onClick={() => router.push(`/chi-tiet-san-pham/${id}`)}
      />
      <div className="p-2 md:p-4">
        <p className="mb-2 text-sm text-gray-900">{`Mã sản phẩm: ${code}`}</p>
        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 line-clamp-3">
          {name}
        </h2>
        <p className="mb-2 text-sm text-gray-700">Nguồn gốc: {origin}</p>
        {auth.isAuthenticated &&
          (status ? (
            <p className={`text-sm ${ProductStatusColor[status]} italic`}>
              {ProductStatusTitle[status]}
            </p>
          ) : (
            <p
              className={`text-sm ${ProductStatusColor["UNPURCHASED"]} italic`}
            >
              {ProductStatusTitle["UNPURCHASED"]}
            </p>
          ))}

        <div className="flex items-center">
          {auth.isAuthenticated ? (
            <p className="mr-2 text-lg font-semibold text-red-600">
              {currency.format(price)}
            </p>
          ) : (
            <p className="mr-2 text-lg font-semibold text-red-600">
              Đăng nhập để xem
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
