import { useAppDispatch, useAppSelector } from "../../lib/store-hook";
import { registerThunk } from "../../lib/auth/usecases/register.usecase";
import { getAuthUser } from "../../lib/auth/authReducer";
import { Link, Navigate } from "react-router-dom";
import Input from "@/components/ui/form/input/input";
import Button from "@/components/ui/button/button";

export default function RegisterPage () {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getAuthUser)

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    if(!form.has('email') || !form.has('password')) return console.error('Email and password are required')

    dispatch(registerThunk({
      email: form.get("email") as string,
      password: form.get("password") as string,
      id: new Date().getTime().toString()
    })).then((result) => {
      if(result.type === registerThunk.fulfilled.type) {
        alert('Register success')
      }
    })
  }

  if(user !== null) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex w-full overflow-hidden h-screen">
      <form className="flex flex-col w-full mt-8 p-10 lg:px-20 lg:min-w-150 lg:w-150" onSubmit={handleRegister}>
        <div>
          <h2 className="text-10 max-w-60 font-bold mb-10">Créez vous un compte</h2>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email">Email</label>
            <Input name="email" type="email" />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="password">Mot de passe</label>
            <Input name="password" type="password" />
          </div>
        </div>
        <Button type="submit">Créer mon compte</Button>
        <p className="mt-4">J'ai déjà un compte ? <Link to="/auth/login" className="text-blue-6 rounded-2 font-medium">Me connecter</Link></p>
      </form>
      <img src="https://placehold.co/1200x1500" alt="login" className="hidden lg:block w-full object-cover" />
    </div>
  )
}