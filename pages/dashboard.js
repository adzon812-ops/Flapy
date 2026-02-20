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

      // Запрашиваем данные профиля
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single() // Мы ищем одну конкретную строку

      if (error) {
        console.log("Profile fetch error:", error.message)
      }

      if (data) {
        setProfile(data)
      }

      setLoading(false)
    }

    loadData()
  }, [router])

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

      <p><strong>Email:</strong> {user?.email}</p>
      {/* Теперь здесь будет отображаться правильная роль из базы */}
      <p><strong>Role from DB:</strong> {profile?.role || "загрузка роли..."}</p>
      <p><strong>User ID:</strong> {user?.id}</p>
      <p><strong>Profile ID:</strong> {profile?.id || "нет профиля"}</p>

      <button onClick={handleSignOut} style={{ marginTop: 20 }}>Выйти</button>
    </div>
  )
}
