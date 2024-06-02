import { ReactNode } from "react";

export default function Label ({children, htmlFor}: {children?: ReactNode, htmlFor: string}) {
  return <label htmlFor={htmlFor}>{children}</label>
}
