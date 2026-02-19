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
    getUser()
  }, [])

  const getUser = async () => {
    const { data: authData } = await supabase.auth.getUser()

    if (!authData?.user) {
      router.push("/login")
      return
    }

    setUser(authData.user)

    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)

    if (error) {
      console.log("Profile error:", error)
    }

    if (profileData && profileData.length > 0) {
      setProfile(profileData[0])
    }

    setLoading(false)
  }

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
      <p>Роль: {profile?.role || "не найдена"}</p>

      <button onClick={handleSignOut}>Выйти</button>
    </div>
  )
}
