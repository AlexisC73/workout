import { ReactNode } from "react";
import { defaultButtonStyle, primaryButtonStyle, secondaryButtonStyle } from "./vars";

export default function Button ({children, onCickAction, type = "button", style = "primary"}: {children: ReactNode, type?: "button" | "submit" | "reset", onCickAction?: () => void, style?: "primary" | "secondary"}) {
  const customStyle = style === "primary" ? primaryButtonStyle : secondaryButtonStyle

  return (
    <button type={type} onClick={onCickAction} className={defaultButtonStyle + " " + customStyle}>{children}</button>
  )
}