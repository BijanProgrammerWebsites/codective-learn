"use client";

import { ReactNode, useMemo, useState } from "react";

import { Button, Card, Input } from "antd";

import { FillInTheBlankQuestionType } from "@/types/quiz.type";

import styles from "./fill-in-the-blank.module.css";

type Props = {
  question: FillInTheBlankQuestionType;
};

export default function FillInTheBlankQuestion({ question }: Props): ReactNode {
  const [value, setValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = useMemo(() => {
    const normalized = value.trim().toLowerCase();
    return question.correctAnswers.some(
      (answer) => normalized === answer.trim().toLowerCase(),
    );
  }, [value, question.correctAnswers]);

  const handleSubmit = (): void => {
    setIsSubmitted(true);
  };

  return (
    <div className={styles["fill-in-the-blank"]}>
      <Card title={question.title}>
        <div className={styles.inline}>
          <span className={styles.text}>{question.textBefore}</span>
          <Input
            className={styles.blank}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            status={isSubmitted && !isCorrect ? "error" : undefined}
          />
          <span className={styles.text}>{question.textAfter}</span>
          <Button
            className={styles.check}
            color={isSubmitted ? (isCorrect ? "green" : "danger") : "primary"}
            variant={isSubmitted ? "solid" : "filled"}
            onClick={handleSubmit}
          >
            Check
          </Button>
        </div>
      </Card>
    </div>
  );
}


