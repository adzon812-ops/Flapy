import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Link from "next/link"

export default function Home() {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })

    setProperties(data || [])
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Flapy.kz</h1>

      <Link href="/login">Войти / Регистрация</Link>

      <hr />

      <h2>Объявления</h2>

      {properties.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><strong>Цена:</strong> {item.price}</p>
          <p><strong>Город:</strong> {item.city}</p>
        </div>
      ))}
    </div>
  )
}
