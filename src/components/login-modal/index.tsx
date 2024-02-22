"use client";

import {
  Button,
  Menu,
  Modal,
  PasswordInput,
  TextInput,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icons } from "../icons";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { SignInBody } from "@/types/auth";
import { signinRequest } from "@/api/auth";
import { clearToken, setToken } from "@/utils";
import { TOKEN_KEY } from "@/constant/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/store/state/auth.atom";
import { Settings, LogOut, Settings2, LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginModalProps {
  customButton?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const LoginModal = (props: LoginModalProps) => {
  const { customButton, onClose, className } = props;
  const [{ isAuthenticated, user }, setAuth] = useRecoilState(authState);
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
        value.length > 0 ? null : "Vui lòng nhập tên đăng nhập",
      password: (value) => (value.length > 0 ? null : "Vui lòng nhập mật khẩu"),
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: SignInBody) => await signinRequest(data),
    onSuccess: (data) => {
      setToken(TOKEN_KEY.ACCESS, data.accessToken);
      setToken(TOKEN_KEY.REFRESH, data.refreshToken);
      router.refresh();
      setAuth({
        isAuthenticated: true,
        user: data.user,
      });
      signupForm.reset();
      closeLogin();
      onClose?.();
    },
    onError: (error) => {
      signupForm.setFieldError(
        "password",
        (error as any).response.data.message
      );
    },
  });

  const handleLogout = () => {
    clearToken(TOKEN_KEY.ACCESS);
    clearToken(TOKEN_KEY.REFRESH);
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    router.refresh();
    onClose?.();
  };
  return (
    <div className={cn("cursor-pointer", className)}>
      {!customButton ? (
        isAuthenticated ? (
          <>
            <div className="lg:items-center gap-2 hidden lg:flex">
              <Menu
                shadow="md"
                width={200}
                trigger="hover"
                openDelay={100}
                closeDelay={400}
              >
                <Menu.Target>
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={user?.avatarUrl}
                      color="white"
                      variant="light"
                    />
                    <div>Xin chào, {user?.name}</div>
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>{user?.name}</Menu.Label>
                  <Menu.Item
                    leftSection={<Settings />}
                    onClick={() => router.push("/tai-khoan/don-mua")}
                  >
                    Tài khoản
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<LogOut />}
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
            <div className="flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-2">
                <Avatar
                  src={user?.avatarUrl}
                  color="white"
                  variant="light"
                  size="sm"
                />
                <div className="text-sm">{user?.name}</div>
              </div>
              <div className="flex gap-4">
                <LogOutIcon
                  className="text-slate-700 hover:bg-slate-200 p-2 w-10 h-10 rounded-md "
                  onClick={() => handleLogout()}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-2" onClick={openLogin}>
            <Icons.user />
            <span>Đăng nhập</span>
          </div>
        )
      ) : (
        <div onClick={openLogin}>{customButton}</div>
      )}
      <Modal
        opened={onpenedLogin}
        onClose={closeLogin}
        title="Đăng nhập"
        centered
      >
        <form
          onSubmit={signupForm.onSubmit((data) => mutation.mutateAsync(data))}
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
          <Button type="submit" className="uppercase" c="white" bg="blue">
            Đăng nhập
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default LoginModal;
