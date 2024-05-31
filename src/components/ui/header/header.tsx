import { useState } from "react"
import MenuButton from "../menu-button/menu-button"
import { Link } from "react-router-dom"
import { useAppSelector } from "@/lib/store-hook"
import { getAuthUser } from "@/lib/auth/authReducer"
import LinkButton from "../button/link-button"
import HeaderProfile from "./header-profile/header-profile"

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
    <header className="flex w-full h-13 items-center shadow justify-end lg:justify-between">
      <div className="flex max-w-245 mx-auto items-center px-12.5 w-full justify-end lg:justify-between">
        <div className="lg:hidden">
          <MenuButton onClickAction={toggleMenu} />
        </div>
        <Menu menuOpen={menuOpen} />
      </div>
    </header>
  )
}

function Menu ({menuOpen}: {menuOpen?: boolean}) {
  return (
    <div className={`top-13 bottom-0 left-0 right-0 absolute bg-white flex flex-col lg:static lg:flex-row lg:justify-between lg:w-full ${menuOpen ? "" : "max-lg-hidden"}`}>
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
  const auth = useAppSelector(getAuthUser)

  if(!auth) {
    return (
      <>
        <div className="lg:hidden px-8 py-4 flex flex-col gap-y-4">
          <LinkButton href="/auth/login">Me connecter</LinkButton>
          <LinkButton href="/auth/register" style="secondary">M'inscrire</LinkButton>
        </div>
        <div className="flex items-center">
          <p className="hidden lg:block text-3.25"><Link to="/auth/login" className="hover:text-blue-6 hover:underline">Me connecter</Link> / <Link to="/auth/register" className="hover:text-blue-6 hover:underline">M'inscrire</Link></p>
        </div>
      </>
    )
  }
  
  return <HeaderProfile />
}