import { ReactNode } from "react";

import QuizComponent from "@/components/quiz/quiz.component";

import styles from "./page.module.css";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props): Promise<ReactNode> {
  const { id } = await params;

  return (
    <div className={styles.page}>
      <QuizComponent id={id} />
    </div>
  );
}
