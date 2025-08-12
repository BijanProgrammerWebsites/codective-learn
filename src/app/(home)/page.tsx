"use client";

import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { Card, List } from "antd";

import { ROADMAP_URL } from "@/constants/url.constants";
import { quizzes } from "@/quizzes";

import styles from "./page.module.css";

export default function Page(): ReactNode {
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
              dataSource={[quiz.chapter]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Image src={item.icon} alt="" width={24} height={24} />
                    }
                    title={item.title}
                  />
                  <a
                    className={styles.tag}
                    href={`${ROADMAP_URL}/#${item.tag}`}
                    target="_blank"
                  >
                    Roadmap
                  </a>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
