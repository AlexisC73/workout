import { createBrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage"

export const createRouter = () => {
  return createBrowserRouter([{
    path: "/",
    element: <HomePage />
  }])
}