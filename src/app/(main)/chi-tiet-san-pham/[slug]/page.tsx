"use client";
import { SimpleGrid, List, NumberInput, UnstyledButton } from "@mantine/core";
import EmblaCarousel from "@/components/embla-carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { getProductDetail } from "@/api/product";
import { currency } from "@/utils/currency";
import { useMemo, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Ruler, ShoppingBag } from "lucide-react";
import { addOrder } from "@/api/order";
import { OrderDetail } from "@/types/order";
import { toast } from "sonner";

const OPTIONS: EmblaOptionsType = {};

const DetailProductPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data: productDetailData } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_DETAIL, slug],
    queryFn: () => getProductDetail(Number(slug)),
  });

  const [color, setColor] = useState<number | null>(null);
  const [cart, setCart] = useState<OrderDetail[]>([]);

  const listSizeByColor = useMemo(() => {
    if (!productDetailData) return [];
    const listSize = productDetailData.details.find(
      (detail) => detail.color.id === color
    );
    return listSize ? listSize.size : [];
  }, [productDetailData, color]);

  const handleChangeCart = (
    value: number | string,
    sizeId: number,
    colorId: number
  ) => {
    console.log("😻 ~ DetailProductPage ~ value:", value);
    if (!productDetailData) return;
    const newCart = [...cart];
    const index = newCart.findIndex(
      (product) => product.sizeId === sizeId && product.colorId === colorId
    );
    if (index !== -1) {
      if (Number(value) > 0) {
        newCart[index].quantity = Number(value);
      } else {
        newCart.splice(index, 1);
      }
    } else {
      newCart.push({
        productId: productDetailData.id,
        colorId,
        sizeId,
        quantity: Number(value),
      });
    }
    setCart(newCart);
  };

  const handleBuyProduct = async () => {
    console.log(cart);

    if (!productDetailData) return;
    try {
      const order = await addOrder({
        productId: productDetailData.id,
        orderDetails: cart,
      });
      toast("Đơn hàng tạo thành công", {
        description: (
          <div className="w-full">
            <p>Bạn đã mua:</p>
            <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 ml-2 mt-1">
              {order.orderDetails.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <ShoppingBag size={16} color="#35a8e0" />
                  <span>{`${item.color.title} - ${item.size.title}: ${item.quantity} cái`}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-lg">
              Tổng tiền:{" "}
              <span className="font-bold">
                {currency.format(order.totalPrice)}
              </span>
            </p>
          </div>
        ),
      });
      setCart([]);
    } catch (error) {
      toast("Đã có lỗi xảy ra", {
        description: "Vui lòng thử lại sau",
      });
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <div className="w-full max-w-6xl mx-auto mt-12">
        {productDetailData && (
          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <div>
              <EmblaCarousel
                images={
                  productDetailData.productImages.length > 0
                    ? productDetailData.productImages.map(
                        (item) => item.imageUrl
                      )
                    : [""]
                }
                options={OPTIONS}
              />
            </div>
            <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl first-letter:capitalize">
                  {productDetailData.name}
                </h1>
              </div>

              <div className="mt-4">
                <h2 className="sr-only">Chi tiết sản phẩm</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {currency.format(productDetailData.price)}
                </p>

                <div className="mt-10">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Màu sắc
                      </h3>
                      {cart.length > 0 && (
                        <UnstyledButton
                          onClick={() => {
                            setCart([]);
                            setColor(null);
                          }}
                          className="text-sm font-medium text-[#35a8e0] hover:text-[#35a8e0]"
                        >
                          Xóa đơn hàng
                        </UnstyledButton>
                      )}
                    </div>
                    <RadioGroup
                      value={color}
                      onChange={setColor}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {productDetailData.details.map((detail, index) => (
                          <RadioGroup.Option
                            key={index}
                            value={detail.color.id}
                            className={({ active }) =>
                              cn(
                                active ? "ring-2 ring-[#35a8e0]" : "",
                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {detail.color.title}
                                </RadioGroup.Label>

                                <span
                                  className={cn(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-[#35a8e0]"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                    </div>
                    {color && (
                      <List spacing="md" mt={4}>
                        {listSizeByColor.map((size, index) => (
                          <List.Item key={index} icon={<Ruler />}>
                            <div className="flex gap-3 items-center">
                              <span className="w-24 font-semibold">
                                {size.title}
                              </span>
                              <NumberInput
                                width={100}
                                placeholder="0"
                                min={0}
                                value={
                                  cart.find(
                                    (product) =>
                                      product.sizeId === size.id &&
                                      product.colorId === color
                                  )?.quantity || 0
                                }
                                onChange={(value) =>
                                  handleChangeCart(value, size.id, color)
                                }
                              />
                            </div>
                          </List.Item>
                        ))}
                      </List>
                    )}
                  </div>

                  <button
                    disabled={cart.length === 0}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#35a8e0] px-8 py-3 text-base font-medium text-white hover:bg-[#35a8e0] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleBuyProduct}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
              <div>
                <p className="text-2xl tracking-tight text-gray-900 py-4 text-right">
                  Tổng tiền:{" "}
                  {currency.format(
                    cart.reduce((acc, cur) => acc + cur.quantity, 0) *
                      productDetailData.price
                  )}
                </p>
              </div>
              <div className="py-10">
                <div>
                  <h3 className="text-lg font-semibold">Mô tả:</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {productDetailData.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SimpleGrid>
        )}
      </div>
    </div>
  );
};

export default DetailProductPage;
