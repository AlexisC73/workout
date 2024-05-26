import { ReactNode } from "react";
import Header from "@/components/ui/header/header";

export function WithHeader({children}: {children: ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}