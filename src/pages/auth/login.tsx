import { useAppDispatch, useAppSelector } from "../../lib/store-hook";
import Layout from "../../layout";
import { signinThunk } from "../../lib/auth/usecases/signin.usecase";
import { getAuthUser } from "../../lib/auth/authReducer";
import { Navigate, useLocation } from "react-router-dom";

export default function LoginPage () {

  const dispatch = useAppDispatch()
  const user = useAppSelector(getAuthUser)
  const params = new URLSearchParams(useLocation().search)
  const returnPath = params.get("path") || "/"

  const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    if(!form.has('email') || !form.has('password')) return console.error('Email and password are required')

    dispatch(signinThunk({
      email: form.get("email") as string,
      password: form.get("password") as string,
    }))
  }

  if(user !== null) {
    return <Navigate to={returnPath} />
  }

  return (
    <Layout.WithHeader>
      <LoginForm onSubmit={handleSignin} />
    </Layout.WithHeader>
  )
}

function LoginForm ({ onSubmit }: {onSubmit: (e: React.FormEvent<HTMLFormElement>) => void}){
  return <form onSubmit={ onSubmit }>
    <input type="email" id="email" name="email" placeholder="Username" />
    <input type="password" id="password" name="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
}