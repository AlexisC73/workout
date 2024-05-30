import { useState } from "react"
import MenuButton from "../menu-button/menu-button"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/lib/store-hook"
import { getAuthUser } from "@/lib/auth/authReducer"
import { signoutThunk } from "@/lib/auth/usecases/signout.usecase"
import Button from "../button/button"
import LinkButton from "../button/link-button"

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
    <div className={`top-13 bottom-0 left-0 right-0 absolute bg-white flex flex-col lg:static lg:flex-row ${menuOpen ? "" : "max-lg-hidden"}`}>
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
  
  const handleLogout = () => {
    dispatch(signoutThunk())
  }

  if(!auth) {
    return (
      <div className="lg:hidden px-8 py-4 flex flex-col gap-y-4">
        <LinkButton href="/auth/login">Me connecter</LinkButton>
        <LinkButton href="/auth/register" style="secondary">M'inscrire</LinkButton>
      </div>
    )
  }
  
  return (
    <div className="flex w-full flex-col py-5 px-6 gap-y-1 lg:hidden">
      <p>Profile</p>
      <div className="flex items-center gap-x-4 py-4">
        <img src="https://placehold.co/75x75" className="rounded-full" alt="Profile picture" />
        <p>{auth?.email}</p>
      </div>
      <Button type="button" onCickAction={handleLogout}>Me déconnecter</Button>
    </div>
  )
}