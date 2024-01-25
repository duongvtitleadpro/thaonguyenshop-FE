"use client";
import { SimpleGrid, List, UnstyledButton, Textarea } from "@mantine/core";
import EmblaCarousel from "@/components/embla-carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/constant/query-key";
import { getProductDetail } from "@/api/product";
import { currency } from "@/utils/currency";
import { useEffect, useMemo, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { addOrder, getOrderDetail } from "@/api/order";
import { OrderDetail } from "@/types/order";
import { toast } from "sonner";
import { useRecoilState } from "recoil";
import { authState } from "@/store/state/auth.atom";
import InputNumber from "@/components/input-number";

const OPTIONS: EmblaOptionsType = {};

const DetailProductPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { order: string };
}) => {
  const { slug } = params;
  const { data: productDetailData } = useQuery({
    queryKey: [QueryKey.GET_PRODUCT_DETAIL, slug],
    queryFn: () => getProductDetail(Number(slug)),
  });
  const [auth, setAuth] = useRecoilState(authState);
  const [color, setColor] = useState<number | null>(null);
  const [cart, setCart] = useState<OrderDetail[]>([]);
  const [note, setNote] = useState("");

  const listColor = useMemo(() => {
    if (!productDetailData) return [];
    // No color, no size
    if (productDetailData.details.length === 0) {
      return [];
    }
    // No color, have size
    const listNoColorHaveSize =
      productDetailData.details.length === 1 &&
      productDetailData.details.find(
        (detail) => Object.keys(detail.color).length === 0
      );
    if (listNoColorHaveSize) {
      return [];
    }

    // list color
    const listColorData = productDetailData.details.filter(
      (detail) => Object.keys(detail.color).length > 0
    );
    return listColorData.map((item) => item.color);
  }, [productDetailData]);

  const listSizeByColor = useMemo(() => {
    if (!productDetailData) return [];
    const listSizeNoColor = productDetailData.details.find(
      (detail) =>
        Object.keys(detail.color).length === 0 &&
        productDetailData.details.length === 1
    );
    if (listSizeNoColor) {
      return listSizeNoColor.size;
    }
    const listSize = productDetailData.details.find(
      (detail) => detail.color.id === color
    );
    return listSize ? listSize.size : [];
  }, [productDetailData, color]);

  const handleChangeCart = (
    value: number | string,
    sizeId: number | null,
    colorId: number | null
  ) => {
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
      Number(value) > 0 &&
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
    if (!auth.isAuthenticated) {
      toast("Bạn chưa đăng nhập", {
        description: (
          <p className="text-white">Vui lòng đăng nhập để tiếp tục</p>
        ),
        style: {
          backgroundColor: "#7f1d1d",
          color: "#fff",
        },
      });
      return;
    }
    if (!productDetailData) return;
    try {
      if (searchParams?.order) {
        const order = await addOrder({
          productId: productDetailData.id,
          note,
          orderDetails: cart,
        });
        toast("Sửa đơn hàng thành công", {
          description: (
            <div className="w-full">
              <p className="mt-4 text-lg">
                Tổng tiền:{" "}
                <span className="font-bold">
                  {currency.format(order.totalPrice)}
                </span>
              </p>
            </div>
          ),
        });
      } else {
        const order = await addOrder({
          productId: productDetailData.id,
          note,
          orderDetails: cart,
        });
        toast("Đơn hàng tạo thành công", {
          description: (
            <div className="w-full">
              <p className="mt-4 text-lg">
                Tổng tiền:{" "}
                <span className="font-bold">
                  {currency.format(order.totalPrice)}
                </span>
              </p>
            </div>
          ),
        });
      }

      setCart([]);
      setNote("");
    } catch (error) {
      toast("Đã có lỗi xảy ra", {
        description: "Vui lòng thử lại sau",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchParams?.order) return;
    const orderId = searchParams.order;
    const fetchOrder = async () => {
      try {
        const order = await getOrderDetail(orderId);
        const orderCart = order.orderDetails.map((detail) => ({
          productId: order.product.id,
          colorId: detail?.color?.id || null,
          sizeId: detail?.size?.id || null,
          quantity: detail.quantity,
        }));
        setCart(orderCart);
        setNote(order.note);
      } catch (error) {
        toast("Đã có lỗi xảy ra", {
          description: <p className="text-white">Vui lòng thử lại sau</p>,
          style: {
            backgroundColor: "#7f1d1d",
            color: "#fff",
          },
        });
      }
    };
    fetchOrder();
  }, [searchParams?.order]);

  return (
    <div className="p-4">
      <div className="w-full max-w-6xl mx-auto mt-12">
        {productDetailData && (
          <SimpleGrid cols={{ base: 1, md: 2 }}>
            {/* Slider */}
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

            {/* Product info */}
            <div className="mx-auto w-full max-w-2xl px-4 pb-16 sm:px-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl first-letter:capitalize">
                  {productDetailData.name}
                </h1>
              </div>

              <div className="mt-4">
                <h2 className="sr-only">Chi tiết sản phẩm</h2>
                {auth.isAuthenticated && (
                  <p className="text-3xl tracking-tight text-gray-900">
                    {currency.format(productDetailData.price)}
                  </p>
                )}
                <p className="text-sm xl text-gray-600 mt-4">
                  Nguồn gốc: {productDetailData?.origin}
                </p>

                {auth.isAuthenticated && (
                  <div className="mt-10">
                    {/* Colors */}
                    <div>
                      <div className="flex items-center justify-between">
                        {listColor.length > 0 && (
                          <h3 className="text-sm font-medium text-gray-900">
                            Mẫu/Màu
                          </h3>
                        )}
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
                          Chọn một mẫu
                        </RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {listColor.map((color, index) => {
                            return (
                              <RadioGroup.Option
                                key={index}
                                value={color.id}
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
                                      {color.title}
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
                            );
                          })}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Sizes */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        {listSizeByColor.length > 0 && (
                          <h3 className="text-sm font-medium text-gray-900">
                            Size
                          </h3>
                        )}
                      </div>
                      {/* Size available */}
                      {
                        <List spacing="md" mt={4}>
                          {listSizeByColor.map((size, index) => (
                            <List.Item key={index}>
                              <div className="flex gap-3 items-center">
                                <span className="w-24 font-semibold">
                                  {size.title}
                                </span>
                                <InputNumber
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
                      }
                    </div>
                    {/* No size */}
                    {(productDetailData.details.length === 0 ||
                      (color && listSizeByColor.length === 0)) && (
                      <div className="mt-10 flex gap-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            Số lượng
                          </h3>
                        </div>
                        <div className="flex gap-3 items-center">
                          <InputNumber
                            placeholder="0"
                            min={0}
                            value={
                              cart.find(
                                (product) =>
                                  product.sizeId === null &&
                                  product.colorId === color
                              )?.quantity || 0
                            }
                            onChange={(value) =>
                              handleChangeCart(value, null, color)
                            }
                          />
                        </div>
                      </div>
                    )}

                    <Textarea
                      className="mt-6"
                      label="Ghi chú đơn hàng"
                      placeholder="Viết ghi chú tại đây"
                      value={note}
                      onChange={(event) => setNote(event.currentTarget.value)}
                      autosize
                      minRows={2}
                      maxRows={4}
                    />
                    <button
                      disabled={cart.length === 0}
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#35a8e0] px-8 py-3 text-base font-medium text-white hover:bg-[#35a8e0] disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleBuyProduct}
                    >
                      {searchParams?.order ? "Sửa đơn hàng" : "Mua ngay"}
                    </button>
                  </div>
                )}
              </div>
              {auth.isAuthenticated && (
                <div>
                  <p className="text-2xl tracking-tight text-gray-900 py-4 text-right">
                    Tổng tiền:{" "}
                    {currency.format(
                      cart.reduce((acc, cur) => acc + cur.quantity, 0) *
                        productDetailData.price
                    )}
                  </p>
                </div>
              )}
              <div className="py-10">
                <div>
                  <h3 className="text-lg font-semibold">Mô tả:</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {productDetailData.description}
                    </p>
                  </div>
                </div>
                {!auth.isAuthenticated && (
                  <button
                    disabled={true}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#35a8e0] px-8 py-3 text-base font-medium text-white hover:bg-[#35a8e0] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Vui lòng đăng nhập để mua hàng
                  </button>
                )}
              </div>
            </div>
          </SimpleGrid>
        )}
      </div>
    </div>
  );
};

export default DetailProductPage;
