"use client";

import { PropsWithChildren, ReactNode } from "react";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";

type Props = PropsWithChildren;

export default function AntdProvider({ children }: Props): ReactNode {
  return <AntdRegistry>{children}</AntdRegistry>;
}
