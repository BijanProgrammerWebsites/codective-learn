import type { Node } from "@xyflow/react";

import type { MatchingQuestionType } from "@/types/quiz.type";
import { LEFT_COLUMN_X, NODE_VERTICAL_GAP_PX, RIGHT_COLUMN_X } from "./layout.constants";

export function buildInitialNodes(question: MatchingQuestionType): Node[] {
  const promptNodes: Node[] = question.prompts.map((prompt, index) => ({
    id: `prompt-${prompt.id}`,
    type: "prompt",
    position: { x: LEFT_COLUMN_X, y: index * NODE_VERTICAL_GAP_PX },
    data: { label: prompt.text },
  }));

  const responseNodes: Node[] = question.responses.map((response, index) => ({
    id: `response-${response.id}`,
    type: "response",
    position: { x: RIGHT_COLUMN_X, y: index * NODE_VERTICAL_GAP_PX },
    data: { label: response.text },
  }));

  return [...promptNodes, ...responseNodes];
}


