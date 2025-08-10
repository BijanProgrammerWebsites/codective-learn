import { useMemo } from "react";

import type { Node } from "@xyflow/react";

import type { MatchingQuestionType } from "@/types/quiz.type";

import {
  LEFT_COLUMN_X,
  NODE_VERTICAL_GAP_PX,
  RIGHT_COLUMN_X,
} from "../configs/matching.config";

export function useNodesHook(question: MatchingQuestionType): Node[] {
  return useMemo(() => {
    const promptNodes: Node[] = question.prompts.map((prompt, index) => ({
      id: `prompt-${prompt.id}`,
      type: "prompt",
      position: { x: LEFT_COLUMN_X, y: index * NODE_VERTICAL_GAP_PX },
      data: { type: "source", label: prompt.text, isConnectable: true },
    }));

    const responseNodes: Node[] = question.responses.map((response, index) => ({
      id: `response-${response.id}`,
      type: "response",
      position: { x: RIGHT_COLUMN_X, y: index * NODE_VERTICAL_GAP_PX },
      data: { type: "target", label: response.text, isConnectable: true },
    }));

    return [...promptNodes, ...responseNodes];
  }, [question]);
}
