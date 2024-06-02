import { getAuthUser } from "@/lib/auth/authReducer"
import { useAppSelector } from "@/lib/store-hook"

export default function Avatar () {
  const auth = useAppSelector(getAuthUser)
  if(!auth) return null
  return <img className="rounded-full w-full height-full" src={auth.avatarUrl || "https://placehold.co/75x75"} alt="avatar" />
}