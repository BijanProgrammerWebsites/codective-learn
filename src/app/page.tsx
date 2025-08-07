import { ReactNode } from "react";

import { Button } from "antd";

import styles from "./page.module.css";

export default function Page(): ReactNode {
  return (
    <div className={styles.page}>
      Hello, friend!
      <br />
      <Button type="primary">Button</Button>
    </div>
  );
}
