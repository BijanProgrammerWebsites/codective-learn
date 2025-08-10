import { theme } from "antd";
import { NODE_INLINE_SIZE_PX } from "./layout.constants";

export function buildNodeContainerStyle(
  token: ReturnType<typeof theme.useToken>["token"],
): React.CSSProperties {
  return {
    position: "relative",
    background: token.colorBgContainer,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadiusLG,
    color: token.colorText,
    padding: `${token.paddingXS}px ${token.paddingXS * 2}px`,
    inlineSize: NODE_INLINE_SIZE_PX,
    overflow: "hidden",
    userSelect: "none",
    pointerEvents: "auto",
  };
}

export function buildFullSizeHandleStyle(): React.CSSProperties {
  return {
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
  };
}


