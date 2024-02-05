"use client";
import { Image } from "@mantine/core";
import Link from "next/link";
import { currency } from "@/utils/currency";
import { useRecoilValue } from "recoil";
import { authState } from "@/store/state/auth.atom";
import { ProductStatus } from "@/types/product";

interface ProductCardProps {
  id: number;
  img: string;
  name: string;
  code: string;
  price: number;
  status: ProductStatus | null;
}

const ProductCard = (props: ProductCardProps) => {
  const auth = useRecoilValue(authState);
  const { id, img, name, code, price, status } = props;
  return (
    <Link href={`/chi-tiet-san-pham/${id}`}>
      <div className="h-full transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
        <Image
          className="h-48 w-full object-cover object-center"
          src={img}
          alt={name}
          fallbackSrc="https://www.sennheiser.com/images/placeholder.raw.svg"
        />
        <div className="p-4">
          <p className="mb-2 text-sm text-gray-300">{`Mã sản phẩm: ${code}`}</p>
          <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900 line-clamp-3">
            {name}
          </h2>
          {status === "BOUGHT" && (
            <p className="text-sm text-blue-600 italic">Đã mua hàng</p>
          )}
          <div className="flex items-center">
            {auth.isAuthenticated ? (
              <p className="mr-2 text-lg font-semibold text-red-600">
                {currency.format(price)}
              </p>
            ) : (
              <p className="mr-2 text-lg font-semibold text-red-600">
                Vui lòng đăng nhập để xem giá
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
