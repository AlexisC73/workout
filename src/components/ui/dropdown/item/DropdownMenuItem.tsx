import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function DropdownMenuItem (props: {children?: React.ReactNode, type: "link", to: string} | {children?: ReactNode, type: "button", onClick: () => void}) {
  const defaultClassName = "flex items-center p-2 w-full gap-x-2 text-3.5 hover:bg-gray-1 rounded-1 font-medium"
  
  if(props.type === "button") {
    return (<li><button className={defaultClassName} onClick={props.onClick}>{props.children}</button></li>)
  }
  
  return (
    <li>
      <Link to={props.to} className={defaultClassName}>
        {props.children}
      </Link>
    </li>
  )
}