import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { getAuthUser } from "../lib/auth/authReducer";
import { signoutThunk } from "../lib/auth/usecases/signout.usecase";

export function WithHeader({children}: {children: ReactNode}) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getAuthUser)

  const handleSignout = () => {
    dispatch(signoutThunk())
  }
  return (
    <div>
      <header>
        <nav>
          <ul className="flex gap-x-10 list-none">
            <li><a href="/">Home</a></li>
            {user !== null ? <button onClick={handleSignout}>Logout</button> 
            : (<>
              <li><a href="/auth/login">Login</a></li>
              <li><a href="/auth/register">Register</a></li>
            </>)}
          </ul>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
    
  )
}