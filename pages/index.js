import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Регистрация успешна! Проверьте email.")
    }
  }

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Вход выполнен!")
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

      <p>{message}</p>
    </div>
  )
}
