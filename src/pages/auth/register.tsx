import { useAppDispatch } from "../../hooks/store";
import Layout from "../../layout";
import { registerThunk } from "../../lib/auth/usecases/register.usecase";

export default function RegisterPage () {
  const dispatch = useAppDispatch()

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
  return (
    <Layout.WithHeader>
      <RegisterForm onSubmit={handleRegister} />
    </Layout.WithHeader>
  )
}

function RegisterForm ({ onSubmit }: {onSubmit: (e: React.FormEvent<HTMLFormElement>) => void}) {
  return <form onSubmit={onSubmit}>
    <input type="email" name="email" id="email" placeholder="Username" />
    <input type="password" name="password" id="password" placeholder="Password" />
    <button type="submit">Register</button>
  </form>
}