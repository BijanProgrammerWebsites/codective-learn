"use client";

import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { Card, List } from "antd";

import { quizzes } from "@/quizzes";

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
      <div className={styles.quizzes}>
        {quizzes.map((quiz, index) => (
          <Card
            key={index}
            title={`Quiz ${index + 1}`}
            extra={<Link href={`/q/${index + 1}`}>Start</Link>}
          >
            <List
              itemLayout="horizontal"
              dataSource={quiz.chapters}
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
        ))}
      </div>
    </div>
  );
}
