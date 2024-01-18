"use client";
import { MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const client = new QueryClient();
export default function App({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <MantineProvider>{children} </MantineProvider>
        <Toaster />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
