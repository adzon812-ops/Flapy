import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/router"

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState("buyer")
  const [message, setMessage] = useState("")

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
      // ИСПОЛЬЗУЕМ UPSERT: это решает проблему 409 Conflict.
      // Если профиль уже создан триггером, мы его просто обновляем.
      const { error: profileError } = await supabase.from("profiles").upsert([
        {
          id: data.user.id,
          full_name: fullName,
          role: role, // Теперь здесь прилетит "realtor" или "buyer"
          is_verified: false
        }
      ])

      if (profileError) {
        console.error("Profile error:", profileError.message)
      }
    }

    router.push("/dashboard")
  }

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h1>Вход / Регистрация</h1>

      <div style={{ marginBottom: 15 }}>
        <input
          style={{ width: "100%", padding: 8 }}
          placeholder="Имя"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <input
          style={{ width: "100%", padding: 8 }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <input
          style={{ width: "100%", padding: 8 }}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <select
          style={{ width: "100%", padding: 8 }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="buyer">Покупатель</option>
          {/* ИСПРАВЛЕНО: значение 'realtor' теперь совпадает с вашей базой данных */}
          <option value="realtor">Риэлтор</option>
        </select>
      </div>

      <button
        style={{ padding: 10, width: "100%", marginBottom: 10 }}
        onClick={handleSignUp}
      >
        Зарегистрироваться
      </button>

      <button
        style={{ padding: 10, width: "100%" }}
        onClick={handleSignIn}
      >
        Войти
      </button>

      <p style={{ marginTop: 20, color: "red" }}>{message}</p>
    </div>
  )
}
