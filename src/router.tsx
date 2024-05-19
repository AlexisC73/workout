import { createBrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { createStore } from "./lib/create-store"
import { InMemoryUserRepository } from "./lib/auth/infra/in-memory-user.repository"
import { getMeThunk } from "./lib/auth/usecases/get-me.usecase"

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
    }]
  }])
}