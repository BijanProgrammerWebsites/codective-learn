"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";

import { Button, Card, theme } from "antd";

import { type Edge, type OnConnect, ReactFlow, addEdge, useEdgesState, useNodesState } from "@xyflow/react";

import { MatchingQuestionType } from "@/types/quiz.type";

import "@xyflow/react/dist/style.css";
import { CANVAS_BLOCK_SIZE_PX } from "./components/layout.constants";
import { buildInitialNodes } from "./components/build-initial-nodes.util";
import PromptNode from "./components/prompt-node.component";
import ResponseNode from "./components/response-node.component";

type ValidationStatusType = "idle" | "correct" | "incorrect";

type Props = {
  question: MatchingQuestionType;
};


export default function MatchingQuestion({ question }: Props): ReactNode {
  const {
    token: { colorSuccess, colorError, colorPrimary },
  } = theme.useToken();

  const [validationStatus, setValidationStatus] =
    useState<ValidationStatusType>("idle");

  const initialNodes = useMemo(() => buildInitialNodes(question), [question]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const correctMap = useMemo(() => {
    const map = new Map<string, string>();
    question.prompts.forEach((p, i) => {
      map.set(`prompt-${p.id}`, `response-${question.responses[i]?.id ?? ""}`);
    });
    return map;
  }, [question.prompts, question.responses]);

  const allAnswered = useMemo(() => {
    const connectedPrompts = new Set(edges.map((e) => e.source));
    return question.prompts.every((p) =>
      connectedPrompts.has(`prompt-${p.id}`),
    );
  }, [edges, question.prompts]);

  const onConnect: OnConnect = useCallback(
    (params): void => {
      if (validationStatus !== "idle") {
        return;
      }

      setEdges((previousEdges) => {
        const filteredEdges = previousEdges.filter((edge) => {
          return edge.source !== params.source && edge.target !== params.target;
        });
        return addEdge({ ...params, animated: false }, filteredEdges);
      });
    },
    [validationStatus, setEdges],
  );

  const handleSubmit = useCallback((): void => {
    if (!allAnswered) {
      return;
    }

    const isCorrect = edges.every((edge) => {
      return correctMap.get(edge.source) === edge.target;
    });

    setValidationStatus(isCorrect ? "correct" : "incorrect");

    setEdges((previousEdges) => {
      return previousEdges.map((edge) => ({
        ...edge,
        style: {
          stroke: correctMap.get(edge.source) === edge.target ? colorSuccess : colorError,
          strokeWidth: 2,
          strokeLinecap: "round",
        },
        animated: false,
      }));
    });
  }, [allAnswered, edges, correctMap, colorSuccess, colorError]);

  return (
    <Card
      title={question.title ?? "Match the Pairs"}
      extra={
        <Button
          color="primary"
          variant="filled"
          disabled={!allAnswered || validationStatus === "correct"}
          onClick={handleSubmit}
        >
          Check
        </Button>
      }
      styles={{ body: { padding: 0 } }}
    >
      <div style={{ blockSize: CANVAS_BLOCK_SIZE_PX }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodesDraggable={false}
          nodesConnectable
          elementsSelectable={false}
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultEdgeOptions={{
            style: {
              stroke: colorPrimary,
              strokeWidth: 2,
              strokeLinecap: "round",
            },
          }}
          nodeTypes={{ prompt: PromptNode, response: ResponseNode }}
          connectOnClick
        />
      </div>
    </Card>
  );
}

 
