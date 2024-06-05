import { signoutThunk } from "@/lib/auth/usecases/signout.usecase";
import Button from "../../button/button";
import { useAppDispatch, useAppSelector } from "@/lib/store-hook";
import { getAuthUser } from "@/lib/auth/authReducer";
import { useState } from "react";
import { AccountIcon, SettingIcon } from "@/assets/icons";
import LogoutButton from "../../button/auth/logout-button";
import Separator from "../../separator/separator";
import Avatar from "../../account/avatar";
import DropdownMenu from "../../dropdown/dropdown";
import DropdownMenuItem from "../../dropdown/item/DropdownMenuItem";

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
          <div className="w-20">
            <Avatar />
          </div>
          <p>{auth?.email}</p>
        </div>
        <Button type="button" onCickAction={handleLogout}>Me déconnecter</Button>
      </div>
      <div onClick={toggleMenu} className="hidden lg:block relative">
        <div className="h-10 w-10 cursor-pointer  rounded-full">
          <div className="rounded-full border-2 border-blue-6 hover:border-blue-3">
            <Avatar />
          </div>
        </div>
        {menuOpen && (
          <div className="absolute top-11 flex flex-col w-60">
            <DropdownMenu>
              <DropdownMenuItem type="link" to="/account/profile">
                <AccountIcon className="text-5" />
                <span>Mon compte</span>
              </DropdownMenuItem>
              <DropdownMenuItem type="link" to="/settings">
                <SettingIcon className="text-5" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <Separator />
              <div>
                <LogoutButton />
              </div>
            </DropdownMenu>
          </div>
        )}
      </div>
    </>
  )
}

