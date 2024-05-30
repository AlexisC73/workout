import { useAppDispatch, useAppSelector } from "../../lib/store-hook";
import { signinThunk } from "../../lib/auth/usecases/signin.usecase";
import { getAuthUser } from "../../lib/auth/authReducer";
import { Link, Navigate, useLocation } from "react-router-dom";
import Input from "@/components/ui/form/input/input";
import Button from "@/components/ui/button/button";
import { ArrowIcon } from "@/assets/icons";

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
      <div className="flex flex-col w-full mt-8 p-10 lg:px-20 lg:min-w-150 lg:w-150">
        <Link to="/" className="flex items-center gap-x-1 mb-5 font-medium"><ArrowIcon className="text-5 -mt-0.5" /> Page d'accueil</Link>
        <div className="flex flex-col">
          <h2 className="text-10 max-w-80 font-bold mb-10">Connectez vous à votre compte</h2>
        </div>
        <form onSubmit={handleSignin}>
          <div className="flex flex-col gap-y-4 mb-10">
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
          <Button type="submit">Me Connecter</Button>
        </form>
        <p className="mt-4">Je n'ai pas de compte ? <Link to="/auth/register" className="text-blue-6 rounded-2 font-medium">Créer mon compte</Link></p>
      </div>
      
      <img src="https://placehold.co/1200x1500" alt="login" className="hidden lg:block w-full object-cover lg:max-h-screen" />
    </div>
  )
}