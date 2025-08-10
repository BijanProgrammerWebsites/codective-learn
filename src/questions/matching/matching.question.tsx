"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";

import { Button, Card, theme } from "antd";

import { type Connection, type Edge, type OnConnect, ReactFlow, addEdge, useEdgesState, useNodesState } from "@xyflow/react";

import { MatchingQuestionType } from "@/types/quiz.type";

import "@xyflow/react/dist/style.css";
import { CANVAS_BLOCK_SIZE_PX } from "./components/layout.constants";
import { buildInitialNodes } from "./components/build-initial-nodes.util";
import PromptNode from "./components/prompt-node.component";
import ResponseNode from "./components/response-node.component";
import { MatchingConnectContext } from "./components/connect-context";

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
  const [lockedSources, setLockedSources] = useState<Set<string>>(new Set());
  const [lockedTargets, setLockedTargets] = useState<Set<string>>(new Set());

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
      if (validationStatus === "correct") {
        return;
      }

      const source = params.source ?? "";
      const target = params.target ?? "";
      if (lockedSources.has(source) || lockedTargets.has(target)) {
        return;
      }

      setEdges((previousEdges) => {
        const filteredEdges = previousEdges.filter((edge) => {
          return edge.source !== source && edge.target !== target;
        });
        return addEdge({ ...params, animated: false }, filteredEdges);
      });
    },
    [validationStatus, lockedSources, lockedTargets, setEdges],
  );

  const handleSubmit = useCallback((): void => {
    if (!allAnswered) {
      return;
    }

    const nextLockedSources = new Set<string>();
    const nextLockedTargets = new Set<string>();
    for (const edge of edges) {
      const isEdgeCorrect = correctMap.get(edge.source) === edge.target;
      if (isEdgeCorrect) {
        nextLockedSources.add(edge.source);
        nextLockedTargets.add(edge.target);
      }
    }
    const isAllCorrect = edges.every((edge) => correctMap.get(edge.source) === edge.target);

    setValidationStatus(isAllCorrect ? "correct" : "incorrect");
    setLockedSources(nextLockedSources);
    setLockedTargets(nextLockedTargets);

    // Reflect connectability on node data so handles are disabled on locked nodes
    setNodes((prev) =>
      prev.map((node) => {
        const isLocked =
          (node.id.startsWith("prompt-") && nextLockedSources.has(node.id)) ||
          (node.id.startsWith("response-") && nextLockedTargets.has(node.id));
        return {
          ...node,
          data: { ...node.data, isConnectable: !isLocked },
        } as typeof node;
      }),
    );

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

  const isConnectionAllowed = useCallback(
    (edgeOrConnection: Edge | Connection): boolean => {
      const source = (edgeOrConnection as Connection).source ?? "";
      const target = (edgeOrConnection as Connection).target ?? "";
      if (lockedSources.has(source) || lockedTargets.has(target)) {
        return false;
      }
      return true;
    },
    [lockedSources, lockedTargets],
  );

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
      <MatchingConnectContext.Provider value={{
        isConnectionAllowed,
        lockedSources,
        lockedTargets,
      }}>
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
          autoPanOnConnect={false}
          autoPanOnNodeDrag={false}
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
            isValidConnection={isConnectionAllowed}
          />
        </div>
      </MatchingConnectContext.Provider>
    </Card>
  );
}

 
