import Layout from "../layout";
import { useAppSelector } from "../hooks/store";
import { getAuthUser } from "../lib/auth/authReducer";

export default function HomePage () {
  const user = useAppSelector(getAuthUser)

  return (
    <Layout.WithHeader>
      <div>
        <h1>Home</h1>
        <p>Bonjour, {user?.email ? user.email : "vous n'êtes pas connecté"}</p>
      </div>
    </Layout.WithHeader>
  
  )
}
