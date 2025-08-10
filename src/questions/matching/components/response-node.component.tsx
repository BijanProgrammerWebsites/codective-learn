"use client";

import { ReactNode } from "react";

import { theme } from "antd";
import { Handle, Position } from "@xyflow/react";

import { buildFullSizeHandleStyle, buildNodeContainerStyle } from "./node.styles";

type Props = { data: { label: ReactNode; isConnectable?: boolean } };

export default function ResponseNode({ data }: Props): ReactNode {
  const { token } = theme.useToken();

  return (
    <div style={buildNodeContainerStyle(token)}>
      {data.label}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={buildFullSizeHandleStyle()}
        isConnectable={data.isConnectable !== false}
      />
    </div>
  );
}


