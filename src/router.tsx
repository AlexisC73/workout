import { createBrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { createStore } from "./lib/create-store"
import { InMemoryUserRepository } from "./lib/auth/infra/in-memory-user.repository"
import { getMeThunk } from "./lib/auth/usecases/get-me.usecase"
import LoginPage from "./pages/auth/login"
import RegisterPage from "./pages/auth/register"

const userRepository = new InMemoryUserRepository()
export const store = createStore({userRepository}, {})

const getMeLoader = async () => {
  return store.dispatch(getMeThunk())
}

export const createRouter = () => {
  return createBrowserRouter([{
    path: "/",
    children: [{
      path: "/",
      index: true,
      Component: HomePage,
      loader: getMeLoader
    }, {
      path: "/auth",
      children: [{
        path: "/auth/login",
        Component: LoginPage,
      }, {
        path: "/auth/register",
        Component: RegisterPage
      }]
    }]
  }])
}