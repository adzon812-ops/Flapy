import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Dashboard() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [city, setCity] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser()

    if (!data?.user) {
      router.push("/login")
      return
    }

    setUser(data.user)

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    setProfile(profileData)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const addProperty = async () => {
    if (!profile || profile.role !== "agent") {
      setMessage("Только риэлтор может добавлять объекты")
      return
    }

    if (!profile.is_verified) {
      setMessage("Аккаунт ещё не подтверждён")
      return
    }

    const { error } = await supabase.from("properties").insert([
      {
        agent_id: user.id,
        title,
        description,
        price,
        city
      }
    ])

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Объект добавлен!")
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Личный кабинет</h1>

      <Link href="/">На главную</Link>

      <br /><br />

      <p>Email: {user?.email}</p>
      <p>Роль: {profile?.role}</p>

      <button onClick={handleSignOut}>Выйти</button>

      {profile?.role === "agent" && profile?.is_verified && (
        <>
          <hr />
          <h2>Добавить объект</h2>

          <input
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            placeholder="Город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <br /><br />

          <button onClick={addProperty}>Добавить объект</button>
        </>
      )}

      {profile?.role === "agent" && !profile?.is_verified && (
        <p style={{ color: "red" }}>
          Аккаунт на проверке администратором
        </p>
      )}

      <p>{message}</p>
    </div>
  )
}
