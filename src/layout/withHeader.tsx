import { ReactNode } from "react";

export function WithHeader({children}: {children: ReactNode}) {
  return (
    <div>
      <header>
        <nav>
          <ul className="flex gap-x-10 list-none">
            <li><a href="/">Home</a></li>
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
    
  )
}