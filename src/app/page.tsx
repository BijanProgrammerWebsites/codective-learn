import { ReactNode } from "react";

import styles from "./page.module.css";

export default function Page(): ReactNode {
  return <div className={styles.page}>Hello, friend!</div>;
}
