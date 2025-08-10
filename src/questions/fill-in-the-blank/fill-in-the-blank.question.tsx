"use client";

import { ReactNode, useState } from "react";

import { Button, Card, Input, theme } from "antd";

import { FillInTheBlankQuestionType } from "@/types/quiz.type";

import styles from "./fill-in-the-blank.module.css";

type ValidationStatusType = "idle" | "correct" | "incorrect";

type Props = {
  question: FillInTheBlankQuestionType;
};

export default function FillInTheBlankQuestion({ question }: Props): ReactNode {
  const {
    token: { colorSuccess, colorError },
  } = theme.useToken();

  const [value, setValue] = useState("");
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatusType>("idle");

  const handleSubmit = (): void => {
    const normalized = value.trim().toLowerCase();

    const isCorrect = question.correctAnswers.some(
      (answer) => normalized === answer.trim().toLowerCase(),
    );

    setValidationStatus(isCorrect ? "correct" : "incorrect");
  };

  return (
    <div className={styles["fill-in-the-blank"]}>
      <Card
        title={question.title}
        extra={
          <Button
            color="primary"
            variant="filled"
            disabled={validationStatus === "correct"}
            onClick={handleSubmit}
          >
            Check
          </Button>
        }
      >
        <div className={styles.inline}>
          <span className={styles.text}>{question.textBefore}</span>
          <Input
            className={styles.blank}
            style={{
              borderColor:
                validationStatus === "correct"
                  ? colorSuccess
                  : validationStatus === "incorrect"
                    ? colorError
                    : undefined,
            }}
            status={undefined}
            readOnly={validationStatus === "correct"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <span className={styles.text}>{question.textAfter}</span>
        </div>
      </Card>
    </div>
  );
}
