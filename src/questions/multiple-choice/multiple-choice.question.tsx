import { ReactNode, useState } from "react";

import { Button, Card } from "antd";

import { MultipleChoiceQuestionType } from "@/types/quiz.type";

import styles from "./multiple-choice.module.css";

type Props = {
  question: MultipleChoiceQuestionType;
};

export default function MultipleChoiceQuestion({ question }: Props): ReactNode {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const handleButtonClick = (index: number): void => {
    setSelectedChoice(index);
  };

  return (
    <div className={styles["multiple-choice"]}>
      <Card title={question.title}>
        <div className={styles.choices}>
          {question.choices.map((choice, index) => (
            <Button
              key={index}
              color={
                selectedChoice !== null
                  ? index === question.correctChoiceIndex
                    ? "green"
                    : "danger"
                  : "primary"
              }
              variant={selectedChoice === index ? "solid" : "filled"}
              disabled={
                selectedChoice !== null &&
                index !== selectedChoice &&
                index !== question.correctChoiceIndex
              }
              onClick={() => handleButtonClick(index)}
            >
              {choice}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
