import { LogoutIcon } from "@/assets/icons"
import { signoutThunk } from "@/lib/auth/usecases/signout.usecase"
import { useAppDispatch } from "@/lib/store-hook"

export default function LogoutButton () {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(signoutThunk())
  }
  return (
    <button onClick={handleLogout} className="flex items-center p-2 w-full gap-x-2 text-3.5 hover:bg-gray-1 rounded-1 font-medium text-3.5 text-red-7">
      <LogoutIcon className="text-5" />
      <span>Me déconnecter</span>
    </button>
  )
}