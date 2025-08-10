"use client";

import { ReactNode } from "react";

import { theme } from "antd";

import { Handle, HandleType, Position } from "@xyflow/react";

import { NODE_INLINE_SIZE_PX } from "@/questions/matching/configs/matching.config";

import styles from "./matching.module.css";

type Props = {
  data: { type: HandleType; label: ReactNode; isConnectable?: boolean };
};

export default function NodeComponent({ data }: Props): ReactNode {
  const { token } = theme.useToken();

  return (
    <div
      className={styles.node}
      style={{
        backgroundColor: token.colorBgContainer,
        color: token.colorText,
        inlineSize: NODE_INLINE_SIZE_PX,
        padding: `${token.paddingXS}px ${token.paddingXS * 2}px`,
        border: `1px solid ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
      }}
    >
      {data.label}
      <Handle
        className={styles.handle}
        type={data.type}
        position={data.type === "source" ? Position.Right : Position.Left}
        isConnectable={data.isConnectable !== false}
      />
    </div>
  );
}
