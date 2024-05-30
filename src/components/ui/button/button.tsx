import { ReactNode } from "react";

export default function Button ({children, onCickAction, type = "button", style = "primary"}: {children: ReactNode, type?: "button" | "submit" | "reset", onCickAction?: () => void, style?: "primary" | "secondary" | "tertiary"}) {
  const defaultButtonStyle = "rounded-2 font-medium p-4 w-full"
  const primaryButtonStyle = "bg-blue-6 text-white"
  const secondaryButtonStyle = "border-blue-6 border text-blue-6"
  const tertiaryButtonStyle = "text-blue-6 bg-black-1"
  
  const customStyle = style === "primary" ? primaryButtonStyle : style === "secondary" ? secondaryButtonStyle : tertiaryButtonStyle

  return (
    <button type={type} onClick={onCickAction} className={defaultButtonStyle + " " + customStyle}>{children}</button>
  )
}