"use client";

import { CSSProperties, ReactNode } from "react";

import { theme } from "antd";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import styles from "./matching.module.css";

type Props = {
  id: string;
  text: ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
};

export default function SortableItem({
  id,
  text,
  style,
  disabled,
}: Props): ReactNode {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const {
    token: { colorBorder, colorFillTertiary },
  } = theme.useToken();

  const finalStyle: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    border: `1px solid ${colorBorder}`,
    background: isDragging ? colorFillTertiary : undefined,
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      style={finalStyle}
      className={styles.cell}
      {...attributes}
      {...listeners}
    >
      {text}
    </div>
  );
}
