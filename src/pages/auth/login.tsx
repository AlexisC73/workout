import { useAppDispatch, useAppSelector } from "../../lib/store-hook";
import { signinThunk } from "../../lib/auth/usecases/signin.usecase";
import { getAuthUser } from "../../lib/auth/authReducer";
import { Link, Navigate, useLocation } from "react-router-dom";
import Input from "@/components/ui/form/input/input";

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
    <div className="flex w-full overflow-hidden">
      <form className="flex flex-col w-full mt-8 p-10 lg:px-20 lg:min-w-150 lg:w-150" onSubmit={handleSignin}>
        <div>
          <h2 className="text-10 max-w-80 font-bold mb-10">Connectez vous à votre compte</h2>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email">Email</label>
            <Input name="email" type="email" />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="password">Mot de passe</label>
            <Input name="password" type="password" />
            <Link to="/auth/forgot-password" className="text-blue-6 rounded-2 font-medium self-end mt-1">Mot de passe oublié ?</Link>
          </div>
        </div>
        <button type="submit" className="bg-blue-6 p-4 text-white rounded-2 mt-10 font-medium">Me connecter</button>
        <p className="mt-4">Je n'ai pas de compte ? <Link to="/auth/register" className="text-blue-6 rounded-2 font-medium">Créer mon compte</Link></p>
      </form>
      <img src="https://placehold.co/1200x1500" alt="login" className="hidden lg:block w-full object-cover lg:max-h-screen" />
    </div>
  )
}