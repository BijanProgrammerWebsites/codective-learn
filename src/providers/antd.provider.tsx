"use client";

import { PropsWithChildren, ReactNode } from "react";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";

type Props = PropsWithChildren;

export default function AntdProvider({ children }: Props): ReactNode {
  return (
    <AntdRegistry>
      <ConfigProvider>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
