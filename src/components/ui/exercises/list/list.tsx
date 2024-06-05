import { ReactNode } from "react";

export function ExercisesList ({children}: {children?: ReactNode}) {
  return <ul className="flex flex-col gap-y-3">
    {children}
  </ul>
}