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

  const [rightOrder, setRightOrder] = useState<string[]>(
    question.right.map((i) => i.id),
  );
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatusType>("idle");
  const [validatedOrder, setValidatedOrder] = useState<string[] | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor),
  );

  const rightById = useMemo(() => {
    const map = new Map<string, string>();
    question.right.forEach((r) => map.set(r.id, String(r.text)));
    return map;
  }, [question.right]);

  const handleDragEnd = (event: any): void => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setRightOrder((prev) => {
      const oldIndex = prev.indexOf(active.id);
      const newIndex = prev.indexOf(over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const isAllPlaced = rightOrder.length === question.right.length;

  const handleSubmit = (): void => {
    const isCorrect = question.left.every((item, index) => {
      const rightIdAtIndex = rightOrder[index];
      return rightIdAtIndex === question.right[index].id;
    });
    setValidatedOrder([...rightOrder]);
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
          <div className={styles.col}>
            {question.left.map((item) => (
              <div key={item.id} className={styles.cell}>
                {item.text}
              </div>
            ))}
          </div>
          <div className={styles.col}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={rightOrder}
                strategy={verticalListSortingStrategy}
              >
                {rightOrder.map((id, index) => {
                  const isIdle = validationStatus === "idle";
                  const isCorrect =
                    !isIdle && validatedOrder && id === question.right[index].id;
                  const isIncorrect =
                    !isIdle && validatedOrder && id !== question.right[index].id;

                  return (
                    <SortableItem
                      key={id}
                      id={id}
                      text={rightById.get(id) ?? id}
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


