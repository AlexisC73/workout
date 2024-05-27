import { signinThunk } from "@/lib/auth/usecases/signin.usecase"
import { useAppDispatch } from "@/lib/store-hook"
import { Link } from "react-router-dom"

export default function SigninForm () {
  const dispatch = useAppDispatch()

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    if (!email || !password) return
    dispatch(signinThunk({email, password}))
  }

  return (
    <>
        <form className="p-5 flex flex-col gap-y-4" onSubmit={handleSignIn}>
          <div className="flex flex-col">
            <label className="text-3.5" htmlFor="email">Email</label>
            <input className="border-b py-3 px-2.5 rounded-0 text-4" type="email" id="email" name="email" placeholder="Entrez votre adresse email" />
          </div>
          <div className="flex flex-col">
            <label className="text-3.5" htmlFor="password">Mot de passe</label>
            <input className="border-b py-3 px-2.5 rounded-0 text-4" type="password" id="password" name="password" placeholder="Entrez votre mot de passe" />
            <Link to="/auth/forget" className="text-blue-7 underline mt-2">Mot de passe oublié ?</Link>
          </div>
          <button type="submit" className="h-12 bg-blue-1 rounded-2 text-blue-9 font-medium">Me connecter</button>
        </form>
        <p className="px-4 text-gray-7 py-2">Je n'ai pas de compte ? <Link to="/auth/register" className="text-blue-7 underline">M'inscrire</Link></p>
      </>
  )
}