import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [city, setCity] = useState("")

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
      return
    }

    if (data?.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          role: "buyer"
        }
      ])
    }

    setMessage("Регистрация успешна!")
  }

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Вход выполнен!")
    }
  }

  const addProperty = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      setMessage("Сначала войдите в аккаунт")
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
      <h1>Flapy.kz</h1>

      <h2>Вход / Регистрация</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={handleSignUp} style={{ marginRight: 10 }}>
        Зарегистрироваться
      </button>

      <button onClick={handleSignIn}>
        Войти
      </button>

      <hr style={{ margin: "40px 0" }} />

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

      <button onClick={addProperty}>
        Добавить объект
      </button>

      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  )
}
