import { ReactNode } from "react";
import { getAuthUser } from "../../lib/auth/authReducer";
import { useAppSelector } from "../../lib/store-hook";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({page}: {page: ReactNode}) {
  const user = useAppSelector(getAuthUser)
  const location = useLocation()
  const returnPath = location.pathname !== "/" ? "?path=" + location.pathname : ""

  return !user ? <Navigate to={`/auth/login${returnPath}`} /> : page

}