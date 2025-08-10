"use client";

import { ReactNode, useMemo, useState } from "react";

import { Button, Card, theme } from "antd";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { MatchingQuestionType } from "@/types/quiz.type";

import SortableItem from "./sortable-item";
import styles from "./matching.module.css";

type ValidationStatusType = "idle" | "correct" | "incorrect";

type Props = {
  question: MatchingQuestionType;
};

export default function MatchingQuestion({ question }: Props): ReactNode {
  const {
    token: { colorSuccess, colorError },
  } = theme.useToken();

  const [responsesOrder, setResponsesOrder] = useState<string[]>(
    question.responses.map((i) => i.id),
  );
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatusType>("idle");
  const [validatedOrder, setValidatedOrder] = useState<string[] | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor),
  );

  const responsesById = useMemo(() => {
    const map = new Map<string, string>();
    question.responses.forEach((r) => map.set(r.id, String(r.text)));
    return map;
  }, [question.responses]);

  const handleDragEnd = (event: any): void => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setResponsesOrder((prev) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const isAllPlaced = responsesOrder.length === question.responses.length;

  const handleSubmit = (): void => {
    const isCorrect = question.prompts.every((item, index) => {
      const responseIdAtIndex = responsesOrder[index];
      return responseIdAtIndex === question.responses[index].id;
    });
    setValidatedOrder([...responsesOrder]);
    setValidationStatus(isCorrect ? "correct" : "incorrect");
  };

  return (
    <div className={styles.matching}>
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
        <div className={styles.grid}>
          <div className={styles.list}>
            {question.prompts.map((item) => (
              <div key={item.id} className={styles.cell}>
                {item.text}
              </div>
            ))}
          </div>
          <div className={styles.list}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={responsesOrder}
                strategy={verticalListSortingStrategy}
              >
                {responsesOrder.map((id, index) => {
                  const isIdle = validationStatus === "idle";
                  const isCorrect =
                    !isIdle && validatedOrder && id === question.responses[index].id;
                  const isIncorrect =
                    !isIdle && validatedOrder && id !== question.responses[index].id;

                  return (
                    <SortableItem
                      key={id}
                      id={id}
                      text={responsesById.get(id) ?? id}
                      style={{
                        borderColor: isCorrect
                          ? colorSuccess
                          : isIncorrect
                          ? colorError
                          : undefined,
                      }}
                      disabled={validationStatus === "correct"}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </Card>
    </div>
  );
}


