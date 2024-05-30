import { Link } from "react-router-dom";
import { defaultButtonStyle, primaryButtonStyle, secondaryButtonStyle } from "./vars";
import { ReactNode } from "react";

export default function LinkButton ({children, href, style = "primary"}: {children: ReactNode, href: string, style?: "primary" | "secondary"}) {
  const customStyle = style === "primary" ? primaryButtonStyle : secondaryButtonStyle

  return (
    <Link to={href} className={defaultButtonStyle + " text-center " + customStyle}>{children}</Link>
  )
}