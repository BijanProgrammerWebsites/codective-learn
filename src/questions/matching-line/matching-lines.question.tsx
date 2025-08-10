"use client";

import { ReactNode, useMemo, useState } from "react";

import { Button, Card, theme } from "antd";

import {
  Handle,
  type Edge,
  type Node,
  Position,
  ReactFlow,
  addEdge,
  type OnConnect,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import { MatchingQuestionType } from "@/types/quiz.type";

import "@xyflow/react/dist/style.css";

type ValidationStatusType = "idle" | "correct" | "incorrect";

type Props = {
  question: MatchingQuestionType;
};

function PromptNode({ data }: { data: { label: ReactNode } }): ReactNode {
  const {
    token: { colorBgContainer, colorBorder, colorText, borderRadiusLG, paddingXS },
  } = theme.useToken();

  return (
    <div
      style={{
        position: "relative",
        background: colorBgContainer,
        border: `1px solid ${colorBorder}`,
        borderRadius: borderRadiusLG,
        color: colorText,
        padding: `${paddingXS}px ${paddingXS * 2}px`,
        userSelect: "none",
        pointerEvents: "auto",
      }}
    >
      {data.label}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
          border: "none",
          borderRadius: 0,
          boxShadow: "none",
          opacity: 0,
          pointerEvents: "auto",
          width: "100%",
          height: "100%",
          transform: "none",
        }}
      />
    </div>
  );
}

function ResponseNode({ data }: { data: { label: ReactNode } }): ReactNode {
  const {
    token: { colorBgContainer, colorBorder, colorText, borderRadiusLG, paddingXS },
  } = theme.useToken();

  return (
    <div
      style={{
        position: "relative",
        background: colorBgContainer,
        border: `1px solid ${colorBorder}`,
        borderRadius: borderRadiusLG,
        color: colorText,
        padding: `${paddingXS}px ${paddingXS * 2}px`,
        userSelect: "none",
        pointerEvents: "auto",
      }}
    >
      {data.label}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
          border: "none",
          borderRadius: 0,
          boxShadow: "none",
          opacity: 0,
          pointerEvents: "auto",
          width: "100%",
          height: "100%",
          transform: "none",
        }}
      />
    </div>
  );
}

export default function MatchingLinesQuestion({ question }: Props): ReactNode {
  const {
    token: { colorSuccess, colorError, colorPrimary, colorBorder },
  } = theme.useToken();

  const [validationStatus, setValidationStatus] =
    useState<ValidationStatusType>("idle");

  const initialNodes: Node[] = useMemo(() => {
    const left: Node[] = question.prompts.map((p, i) => ({
      id: `prompt-${p.id}`,
      type: "prompt",
      position: { x: 0, y: i * 80 },
      data: { label: p.text },
    }));
    const right: Node[] = question.responses.map((r, i) => ({
      id: `response-${r.id}`,
      type: "response",
      position: { x: 400, y: i * 80 },
      data: { label: r.text },
    }));
    return [...left, ...right];
  }, [question.prompts, question.responses]);

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

  const onConnect: OnConnect = (params): void => {
    if (validationStatus !== "idle") {
      return;
    }
    // Ensure one-to-one: remove any previous edge that uses source or target
    setEdges((eds) => {
      const filtered = eds.filter(
        (e) => e.source !== params.source && e.target !== params.target,
      );
      return addEdge({ ...params, animated: false }, filtered);
    });
  };


  const handleSubmit = (): void => {
    if (!allAnswered) {
      return;
    }
    const isCorrect = edges.every((e) => correctMap.get(e.source) === e.target);
    setValidationStatus(isCorrect ? "correct" : "incorrect");
    // Color edges
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        style: {
          stroke:
            correctMap.get(e.source) === e.target ? colorSuccess : colorError,
          strokeWidth: 2,
        },
        animated: false,
      })),
    );
  };

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
      <div style={{ blockSize: 320 }}>
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
