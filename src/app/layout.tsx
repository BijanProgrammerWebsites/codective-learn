import { PropsWithChildren, ReactNode } from "react";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Codective Learn",
  description: "Codective Learn",
};

type Props = PropsWithChildren;

export default function RootLayout({ children }: Props): ReactNode {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
