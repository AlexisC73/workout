import { useState } from "react"
import MenuButton from "../menu-button/menu-button"
import { Link } from "react-router-dom"

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
    </div>
  )
}

function MenuItem ({text, href}: {text: string, href: string}) {
  return (
    <li className="h-12 font-medium border-b-1 flex items-center px-8 hover:bg-blue-1 cursor-pointer lg:h-auto lg:hover:bg-transparent lg:px-2 lg:border-transparent lg:hover:border-b-blue-6 lg:hover:text-blue-6 lg:hover:border-b-2"><Link to={href}>{text}</Link></li>
  )
}