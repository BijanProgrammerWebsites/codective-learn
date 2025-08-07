"use client";

import type { ReactNode } from "react";

import { Typography } from "antd";

import styles from "./footer.module.css";

export default function FooterComponent(): ReactNode {
  const year = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <Typography.Text>Copyright © {year} codective.ir</Typography.Text>
    </div>
  );
}
