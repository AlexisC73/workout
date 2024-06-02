import { createBrowserRouter } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import { createStore } from "@/lib/create-store"
import { InMemoryAccountRepository } from "@/lib/auth/infra/in-memory-account.repository"
import { getMeThunk } from "@/lib/auth/usecases/get-me.usecase"
import LoginPage from "./pages/auth/login"
import RegisterPage from "@/pages/auth/register"
import { RequireAuth } from "@/components/middleware/RequireAuth"
import TrainingPage from "./pages/training/training"
import ForgotPasswordPage from "./pages/auth/forgot-password"
import TrainingSessionPage from "./pages/training/training-session/training-session"
import ProfilePage from "./pages/account/profile"

const accountRepository = new InMemoryAccountRepository()
export const store = createStore({accountRepository}, {})

const getMeLoader = async () => {
  return store.dispatch(getMeThunk())
}

export const createRouter = () => {
  return createBrowserRouter([{
    path: "/",
    loader: getMeLoader,
    children: [{
      path: "/",
      index: true,
      element: <HomePage />,
    }, {
      path: "/auth",
      children: [{
        path: "/auth/login",
        Component: LoginPage,
      }, {
        path: "/auth/register",
        Component: RegisterPage
      }, {
        path: "/auth/forgot-password",
        Component: ForgotPasswordPage
      }]
    }, {
      path: "/training",
      children: [{
        path: "/training",
        index: true,
        element: <RequireAuth page={<TrainingPage />} />
      },
      {
        path: "/training/:id",
        element: <RequireAuth page={<TrainingSessionPage />} />
      }]
    }, {
      path: "/account",
      children: [{
        path: "/account/profile",
        element: <RequireAuth page={<ProfilePage />} />
      }]
    }]
  }])
}