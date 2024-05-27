import { useState } from "react"
import MenuButton from "../menu-button/menu-button"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/lib/store-hook"
import { getAuthUser } from "@/lib/auth/authReducer"
import { signinThunk } from "@/lib/auth/usecases/signin.usecase"
import { signoutThunk } from "@/lib/auth/usecases/signout.usecase"

const navLinks: {title: string, href: string}[] = [{
  title: "Home",
  href: "/",
}, {
  title: "Training",
  href: "/training",
}]

export default function Header () {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className="flex w-full h-13 items-center px-12.5 shadow justify-end lg:justify-between">
      <div className="lg:hidden">
        <MenuButton onClickAction={toggleMenu} />
      </div>
      <Menu menuOpen={menuOpen} />
    </header>
  )
}

function Menu ({menuOpen}: {menuOpen?: boolean}) {
  return (
    <div className={`top-13 bottom-0 left-0 right-0 fixed bg-white flex flex-col lg:static lg:flex-row ${menuOpen ? "" : "max-lg-hidden"}`}>
      <ul className="border-y-1 flex-1 lg:flex lg:border-transparent lg:gap-x-4">
        {navLinks.map(({title, href}) => <MenuItem key={title} text={title} href={href} />)}
      </ul>
      <AuthHeader />
    </div>
  )
}

function MenuItem ({text, href}: {text: string, href: string}) {
  return (
    <li className="h-12 font-medium border-b-1 flex items-center px-8 hover:bg-blue-1 cursor-pointer lg:h-auto lg:hover:bg-transparent lg:px-2 lg:border-transparent lg:hover:border-b-blue-6 lg:hover:text-blue-6 lg:hover:border-b-2"><Link to={href}>{text}</Link></li>
  )
}

function AuthHeader() {
  const dispatch = useAppDispatch()

  const auth = useAppSelector(getAuthUser)

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    if (!email || !password) return
    dispatch(signinThunk({email, password}))
  }

  const handleLogout = () => {
    dispatch(signoutThunk())
  }

  if(!auth) {
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
  
  return (
    <div className="flex w-full flex-col py-5 px-6 gap-y-1">
      <p>Profile</p>
      <div className="flex items-center gap-x-4 py-4">
        <img src="https://placehold.co/75x75" className="rounded-full" alt="Profile picture" />
        <p>{auth?.email}</p>
      </div>
      <button onClick={handleLogout} className="h-12 bg-blue-1 rounded-2 text-blue-9 font-medium">Logout</button>
    </div>
  )
}