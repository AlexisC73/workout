import { Link } from "react-router-dom";
import { ReactNode } from "react";

export default function LinkButton ({children, href, style = "primary"}: {children: ReactNode, href: string, style?: "primary" | "secondary" | "tertiary"}) {
  const defaultButtonStyle = "rounded-2 font-medium p-4 flex justify-center"
  const primaryButtonStyle = "bg-blue-6 text-white"
  const secondaryButtonStyle = "border-blue-6 border text-blue-6"
  const tertiaryButtonStyle = "text-blue-6 bg-blue-1"

  const customStyle = style === "primary" ? primaryButtonStyle : style === "secondary" ? secondaryButtonStyle : tertiaryButtonStyle

  return (
    <Link to={href} className={defaultButtonStyle + " text-center " + customStyle}>{children}</Link>
  )
}