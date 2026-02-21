import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Dashboard() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [city, setCity] = useState("")
  const [message, setMessage] = useState("")

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

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single()

      setProfile(data)
      setLoading(false)
    }

    loadData()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleAddProperty = async () => {
    if (profile.role !== "realtor") {
      setMessage("Только риэлтор может добавлять объявления")
      return
    }

    const { error } = await supabase.from("properties").insert([
      {
        agent_id: user.id,
        title,
        description,
        price,
        city,
      },
    ])

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Объявление добавлено")
      setTitle("")
      setDescription("")
      setPrice("")
      setCity("")
    }
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
      <p><strong>Роль:</strong> {profile?.role}</p>

      {profile?.role === "realtor" && (
        <>
          <hr style={{ margin: "30px 0" }} />
          <h2>Добавить объект</h2>

          <input
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ display: "block", marginBottom: 10 }}
          />

          <input
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ display: "block", marginBottom: 10 }}
          />

          <input
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ display: "block", marginBottom: 10 }}
          />

          <input
            placeholder="Город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ display: "block", marginBottom: 20 }}
          />

          <button onClick={handleAddProperty}>
            Добавить объект
          </button>

          <p style={{ marginTop: 15 }}>{message}</p>
        </>
      )}

      <br />
      <button onClick={handleSignOut} style={{ marginTop: 20 }}>
        Выйти
      </button>
    </div>
  )
}
