"use client";

import { changePasswordRequest } from "@/api/auth";
import { authState } from "@/store/state/auth.atom";
import { ChangePasswordBody } from "@/types/auth";
import { currency } from "@/utils/currency";
import { Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

const UserPage = () => {
  const auth = useRecoilValue(authState);
  const changePasswordForm = useForm({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validate: {
      password: (value) => (value.length > 0 ? null : "Vui lòng nhập mật khẩu"),
      newPassword: (value) =>
        value.length > 0 ? null : "Vui lòng nhập mật khẩu mới",
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: ChangePasswordBody) =>
      await changePasswordRequest(data),
    onSuccess: (data) => {
      changePasswordForm.reset();
      toast("Đổi mật khẩu thành công", {
        style: {
          backgroundColor: "#35a8e0",
          color: "#fff",
        },
      });
    },
    onError: (error) => {
      changePasswordForm.setFieldError(
        "password",
        (error as any).response.data.message
      );
    },
  });
  return (
    <>
      <div>
        <h1 className="text-xl font-semibold">Tài khoản</h1>
        <div className="mt-3">
          {auth.user && (
            <div className="flex flex-col">
              <p>
                <span className="font-semibold w-32 inline-block">
                  Tiền hàng:
                </span>{" "}
                <span>{currency.format(auth.user.totalCost)}</span>
              </p>
              <p>
                <span className="font-semibold w-32 inline-block">
                  Thanh toán:
                </span>{" "}
                <span>{currency.format(auth.user?.paid)}</span>
              </p>
              <p>
                <span className="font-semibold w-32 inline-block">
                  Công nợ:
                </span>{" "}
                <span className="text-red-700">
                  {currency.format(auth.user?.debt)}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-xl font-semibold">Đổi mật khẩu</h1>
        <div className="mt-4">
          <form
            onSubmit={changePasswordForm.onSubmit((data: ChangePasswordBody) =>
              mutation.mutateAsync(data)
            )}
            className="max-w-md w-full flex flex-col gap-4"
          >
            <PasswordInput
              size="md"
              placeholder="Mật khẩu cũ"
              {...changePasswordForm.getInputProps("password")}
            />
            <PasswordInput
              size="md"
              placeholder="Mật khẩu mới"
              {...changePasswordForm.getInputProps("newPassword")}
            />
            <Button type="submit" className="uppercase" c="white" bg="blue">
              Đổi mật khẩu
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserPage;
