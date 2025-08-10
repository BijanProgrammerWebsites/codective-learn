"use client";

import { ReactNode } from "react";

import { theme } from "antd";
import { Handle, Position } from "@xyflow/react";

import { buildFullSizeHandleStyle, buildNodeContainerStyle } from "./node.styles";

type Props = { data: { label: ReactNode; isConnectable?: boolean } };

export default function PromptNode({ data }: Props): ReactNode {
  const { token } = theme.useToken();

  return (
    <div style={buildNodeContainerStyle(token)}>
      {data.label}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={buildFullSizeHandleStyle()}
        isConnectable={data.isConnectable !== false}
      />
    </div>
  );
}


