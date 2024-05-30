import { ReactNode } from "react";

export default function Button ({children, type = "button", style = "primary"}: {children: ReactNode, type?: "button" | "submit" | "reset", style?: "primary" | "secondary"}) {
  const defaultStyle = "rounded-2 mt-10 font-medium p-4"
  const customStyle = style === "primary" ? "bg-blue-6 text-white" : "border-blue-6 text-blue-6"
  return (
    <button type={type} className={defaultStyle + " " + customStyle}>{children}</button>
  )
}