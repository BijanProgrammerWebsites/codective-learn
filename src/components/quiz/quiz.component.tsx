"use client";

import { Fragment, ReactNode } from "react";

import NotFound from "next/dist/client/components/builtin/not-found";

import { Typography } from "antd";

import { quizzes } from "@/quizzes";

import MultipleChoiceQuestion from "@/questions/multiple-choice/multiple-choice.question";
import TrueFalseQuestion from "@/questions/true-false/true-false.question";
import MatchingQuestion from "@/questions/matching/matching.question";
import FillInTheBlankQuestion from "@/questions/fill-in-the-blank/fill-in-the-blank.question";

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
            ) : question.category === "fill-in-the-blank" ? (
              <FillInTheBlankQuestion question={question} />
            ) : question.category === "true-false" ? (
              <TrueFalseQuestion question={question} />
            ) : question.category === "matching" ? (
              <MatchingQuestion question={question} />
            ) : (
              <>Something went wrong!</>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
