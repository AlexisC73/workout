import Layout from "../layout";
import { useAppSelector } from "../lib/store-hook";
import { getAuthUser } from "../lib/auth/authReducer";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button/button";

export default function HomePage () {
  const user = useAppSelector(getAuthUser)

  return (
    <Layout.WithHeader>
      <div>
        <h1>Home</h1>
        <p>Bonjour, {user?.email ? user.email : "vous n'êtes pas connecté"}</p>
        <Link to={"/exercises"}><Button>Voir les exercices</Button></Link>
      </div>
    </Layout.WithHeader>
  
  )
}
