"use client";

import { Fragment, ReactNode } from "react";

import NotFound from "next/dist/client/components/builtin/not-found";

import { Typography } from "antd";

import { quizzes } from "@/quizzes";

import MultipleChoiceQuestion from "@/questions/multiple-choice/multiple-choice.question";

import styles from "./quiz.module.css";

type Props = {
  id: string;
};

export default function QuizComponent({ id }: Props): ReactNode {
  const quiz = quizzes[Number(id) - 1];

  if (!quiz) {
    return <NotFound />;
  }

  return (
    <div className={styles.quiz}>
      <div className={styles.questions}>
        {quiz.questions.map((question, index) => (
          <div key={index} className={styles.question}>
            <Typography.Title level={2} className={styles.number}>
              {index + 1}
            </Typography.Title>
            {question.category === "multiple-choice" ? (
              <MultipleChoiceQuestion question={question} />
            ) : (
              <>Something went wrong!</>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
