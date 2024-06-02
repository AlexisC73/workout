import { signoutThunk } from "@/lib/auth/usecases/signout.usecase";
import Button from "../../button/button";
import { useAppDispatch, useAppSelector } from "@/lib/store-hook";
import { getAuthUser } from "@/lib/auth/authReducer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AccountIcon, SettingIcon } from "@/assets/icons";
import LogoutButton from "../../button/auth/logout-button";
import Separator from "../../separator/separator";

export default function HeaderProfile() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const auth = useAppSelector(getAuthUser)

  const handleLogout = () => {
    dispatch(signoutThunk())
  }

  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <>
      <div className="flex w-full flex-col py-5 px-6 gap-y-1 lg:hidden">
        <p>Profile</p>
        <div className="flex items-center gap-x-4 py-4">
          <img src="https://placehold.co/75x75" className="rounded-full" alt="Profile picture" />
          <p>{auth?.email}</p>
        </div>
        <Button type="button" onCickAction={handleLogout}>Me déconnecter</Button>
      </div>
      <div onClick={toggleMenu} className="hidden lg:block relative">
        <div className="h-10 w-10 cursor-pointer  rounded-full">
          <img src="https://placehold.co/75x75" className="rounded-full border-2 border-blue-6 hover:border-blue-3" alt="Profile picture" />
        </div>
        {menuOpen && (
          <div className="absolute top-11 flex flex-col shadow right-0 bg-white border p-2 w-60 rounded-1">
            <ul className="flex flex-col gap-y-2 pb-2">
              <MenuItem to="/account/profile">
                <AccountIcon className="text-5" />
                <span>Mon compte</span>
              </MenuItem>
              <MenuItem to="/settings">
                <SettingIcon className="text-5" />
                <span>Paramètres</span>
              </MenuItem>
            </ul>
            <Separator />
            <div className="mt-2">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function MenuItem ({children, to}: {children?: React.ReactNode, to: string}) {
  return (
    <li>
      <Link to={to} className="flex items-center p-2 w-full gap-x-2 text-3.5 hover:bg-gray-1 rounded-1 font-medium">
        {children}
      </Link>
    </li>
  )
}