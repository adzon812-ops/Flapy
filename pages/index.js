import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Link from "next/link"

export default function Home() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        setUser(session.user)
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setProperties(data)
      }

      setLoading(false)
    }

    loadData()
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Flapy.kz</h1>

        {user ? (
          <Link href="/dashboard">Личный кабинет</Link>
        ) : (
          <Link href="/login">Войти</Link>
        )}
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h2>Объявления</h2>

      {loading && <p>Загрузка...</p>}

      {!loading && properties.length === 0 && (
        <p>Пока нет объявлений</p>
      )}

      {properties.map((property) => (
        <div
          key={property.id}
          style={{
            border: "1px solid #ddd",
            padding: 20,
            marginBottom: 15,
            borderRadius: 8,
          }}
        >
          <h3>{property.title}</h3>
          <p>{property.description}</p>
          <p><strong>Город:</strong> {property.city}</p>
          <p><strong>Цена:</strong> {property.price} ₸</p>
        </div>
      ))}
    </div>
  )
}
