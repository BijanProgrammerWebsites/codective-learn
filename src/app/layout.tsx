import { PropsWithChildren, ReactNode } from "react";

import type { Metadata } from "next";

import FooterComponent from "@/components/footer/footer.component";
import HeaderComponent from "@/components/header/header.component";

import AntdProvider from "@/providers/antd.provider";

import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Codective Learn",
  description: "Codective Learn",
};

type Props = PropsWithChildren;

export default function RootLayout({ children }: Props): ReactNode {
  return (
    <html lang="en">
      <body>
        <AntdProvider>
          <div className={styles.layout}>
            <HeaderComponent />
            <main>{children}</main>
            <FooterComponent />
          </div>
        </AntdProvider>
      </body>
    </html>
  );
}
