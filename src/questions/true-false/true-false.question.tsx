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
  const [validatedSelection, setValidatedSelection] = useState<
    Array<boolean | null>
  >(question.items.map(() => null));

  const handleSelect = (index: number, value: boolean): void => {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = (): void => {
    const allAnswered = selected.every((v) => v !== null);
    if (!allAnswered) return;

    const isCorrect = selected.every((v, i) => v === question.items[i].answer);
    setValidatedSelection(selected);
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
            disabled={selected.some((v) => v === null) || validationStatus === "correct"}
            onClick={handleSubmit}
          >
            Check
          </Button>
        }
      >
        <div className={styles.list}>
          {question.items.map((item, index) => {
            const current = selected[index];
            const snapshot = validatedSelection[index];
            const isIdle = validationStatus === "idle";
            const isRowCorrect = !isIdle && snapshot !== null && snapshot === item.answer;
            const isRowIncorrect =
              !isIdle && snapshot !== null && snapshot !== item.answer;

            const trueButtonColor = !isIdle && snapshot === true
              ? item.answer === true
                ? "green"
                : "danger"
              : "primary";

            const falseButtonColor = !isIdle && snapshot === false
              ? item.answer === false
                ? "green"
                : "danger"
              : "primary";

            return (
              <div
                key={index}
                className={styles.row}
                style={{
                  borderColor: isRowCorrect
                    ? colorSuccess
                    : isRowIncorrect
                    ? colorError
                    : undefined,
                }}
              >
                <div className={styles.text}>{item.text}</div>
                <div className={styles.actions}>
                  <Button
                    color={trueButtonColor}
                    variant={current === true ? "filled" : "text"}
                    onClick={() => handleSelect(index, true)}
                    disabled={isRowCorrect && snapshot !== true}
                  >
                    True
                  </Button>
                  <Button
                    color={falseButtonColor}
                    variant={current === false ? "filled" : "text"}
                    onClick={() => handleSelect(index, false)}
                    disabled={isRowCorrect && snapshot !== false}
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


