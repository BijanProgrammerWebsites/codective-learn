import { theme } from "antd";

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


