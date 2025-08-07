"use client";

import { ReactNode } from "react";

import Image from "next/image";

import { Card, List, Typography } from "antd";

import styles from "./page.module.css";

export default function Page(): ReactNode {
  const items = [
    {
      icon: "/assets/logo/vscode.svg",
      title: "Development Environment Setup",
    },
    {
      icon: "/assets/logo/javascript.svg",
      title: "JavaScript as a Programming Language",
    },
    {
      icon: "/assets/logo/html.svg",
      title: "Developing Static Pages - HTML Fundamentals",
    },
    {
      icon: "/assets/logo/css.svg",
      title: "Developing Static Pages - CSS Fundamentals",
    },
  ];

  return (
    <div className={styles.page}>
      <Typography.Title>Codective Learn</Typography.Title>
      <div className={styles.quizzes}>
        <Card title="Quiz 1">
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Image src={item.icon} alt="" width={24} height={24} />
                  }
                  title={item.title}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
}
