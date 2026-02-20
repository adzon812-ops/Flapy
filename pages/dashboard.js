import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Dashboard() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      const currentUser = session.user
      setUser(currentUser)

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)

      if (error) {
        console.log("Profile fetch error:", error)
      }

      if (data && data.length > 0) {
        setProfile(data[0])
      } else {
        console.log("Profile not found for id:", currentUser.id)
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return <div style={{ padding: 40 }}>Загрузка...</div>
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Личный кабинет</h1>

      <Link href="/">На главную</Link>

      <br /><br />

      <p>Email: {user?.email}</p>
      <p>Role from DB: {profile?.role || "не найдена"}</p>
      <p>User ID: {user?.id}</p>
      <p>Profile ID: {profile?.id || "нет профиля"}</p>

      <button onClick={handleSignOut}>Выйти</button>
    </div>
  )
}
