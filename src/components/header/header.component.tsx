"use client";

import type { ReactNode } from "react";

import Link from "next/link";

import { Typography, theme } from "antd";

import styles from "./header.module.css";

export default function HeaderComponent(): ReactNode {
  const {
    token: { colorBorder, fontSizeHeading3, lineHeightHeading3 },
  } = theme.useToken();

  return (
    <header
      className={styles.header}
      style={{ borderBlockEnd: `1px solid ${colorBorder}` }}
    >
      <Link className={styles.logo} href="/">
        <Typography.Title
          style={{
            fontSize: fontSizeHeading3,
            lineHeight: lineHeightHeading3,
          }}
        >
          Codective Learn
        </Typography.Title>
      </Link>
    </header>
  );
}
