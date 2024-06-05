import { ReactNode } from "react";

export default function DropdownMenu({children}: {children: ReactNode}) {
  return <ul className="flex flex-col gap-y-2 pb-2 shadow right-0 bg-white border p-2 rounded-1">
    {children}
  </ul>
}