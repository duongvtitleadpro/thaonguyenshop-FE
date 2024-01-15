"use client";

import { Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";

const LoginModal = () => {
  const [onpenedLogin, { open: openLogin, close: closeLogin }] =
    useDisclosure(false);
  const router = useRouter();
  const signupForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.length >= 6 ? null : "Username should be at least 6 characters",
      password: (value) =>
        value.length >= 6 ? null : "Password should be at least 6 characters",
    },
  });
  // const mutation = useMutation({
  //   mutationFn: async (data: SignInBody) => await signinRequest(data),
  //   onSuccess: (data) => {
  //     setToken(TOKEN_KEY.ACCESS, data.accessToken);
  //     setToken(TOKEN_KEY.REFRESH, data.refreshToken);
  //     router.push(ROUTE.GET_STARTED);
  //   },
  //   onError: (error) => {
  //     signupForm.setFieldError("email", (error as any).response.data.message);
  //     signupForm.setFieldError(
  //       "password",
  //       (error as any).response.data.message
  //     );
  //   },
  // });
  return (
    <div className="cursor-pointer">
      <div className="flex gap-2" onClick={openLogin}>
        <Icons.user />
        <span>Đăng nhập</span>
      </div>
      <Modal opened={onpenedLogin} onClose={closeLogin} title="Log In" centered>
        <form
          onSubmit={signupForm.onSubmit((data) => console.log(data))}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <TextInput
            type="text"
            size="md"
            placeholder="Tên đăng nhập"
            {...signupForm.getInputProps("username")}
          />
          <PasswordInput
            size="md"
            placeholder="Mật khẩu"
            {...signupForm.getInputProps("password")}
          />
          <Button type="submit" className="uppercase">
            Đăng nhập
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default LoginModal;
