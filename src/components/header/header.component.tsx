"use client";

import type { ReactNode } from "react";

import { Typography, theme } from "antd";

import styles from "./header.module.css";

export default function HeaderComponent(): ReactNode {
  const {
    token: { colorBorder },
  } = theme.useToken();

  return (
    <header
      className={styles.header}
      style={{ borderBlockEnd: `1px solid ${colorBorder}` }}
    >
      <Typography.Title>Codective Learn</Typography.Title>
    </header>
  );
}
