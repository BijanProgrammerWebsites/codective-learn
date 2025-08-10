"use client";

import { ReactNode, useState } from "react";

import { Button, Card, theme } from "antd";

import { TrueFalseQuestionType } from "@/types/quiz.type";

import styles from "./true-false.module.css";

type ValidationStatusType = "idle" | "correct" | "incorrect";

type Props = {
  question: TrueFalseQuestionType;
};

export default function TrueFalseQuestion({ question }: Props): ReactNode {
  const {
    token: { colorSuccess, colorError },
  } = theme.useToken();

  const [selected, setSelected] = useState<Array<boolean | null>>(
    question.items.map(() => null),
  );
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatusType>("idle");

  const handleSelect = (index: number, value: boolean): void => {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = (): void => {
    const allAnswered = selected.every((v) => v !== null);
    if (!allAnswered) {
      setValidationStatus("incorrect");
      return;
    }

    const isCorrect = selected.every((v, i) => v === question.items[i].answer);
    setValidationStatus(isCorrect ? "correct" : "incorrect");
  };

  return (
    <div className={styles["true-false"]}>
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
        <div className={styles.list}>
          {question.items.map((item, index) => {
            const current = selected[index];
            const showSuccess =
              validationStatus !== "idle" && item.answer === current;
            const showError =
              validationStatus !== "idle" && current !== null && !showSuccess;

            return (
              <div
                key={index}
                className={styles.row}
                style={{
                  borderColor: showSuccess
                    ? colorSuccess
                    : showError
                    ? colorError
                    : undefined,
                }}
              >
                <div className={styles.text}>{item.text}</div>
                <div className={styles.actions}>
                  <Button
                    color={current === true ? "primary" : undefined}
                    variant={current === true ? "solid" : "outlined"}
                    onClick={() => handleSelect(index, true)}
                    disabled={validationStatus === "correct"}
                  >
                    True
                  </Button>
                  <Button
                    color={current === false ? "primary" : undefined}
                    variant={current === false ? "solid" : "outlined"}
                    onClick={() => handleSelect(index, false)}
                    disabled={validationStatus === "correct"}
                  >
                    False
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}


