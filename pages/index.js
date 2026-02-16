export default function Home() {

  const listings = [
    {
      id: 1,
      price: "45 000 000 ₸",
      district: "Есиль",
      rooms: "2-комнатная",
      title: "Современная квартира"
    },
    {
      id: 2,
      price: "32 500 000 ₸",
      district: "Алматы",
      rooms: "1-комнатная",
      title: "Уютная квартира"
    }
  ]

  return (
    <div style={{
      fontFamily: "Arial",
      background: "#f4f7fb",
      minHeight: "100vh",
      padding: "20px"
    }}>

      <div style={{
  display: "flex",
  alignItems: "center",
  marginBottom: "20px"
}}>
  
  <img 
    src="/logo.png" 
    style={{
      height: "40px",
      marginRight: "10px"
    }}
  />

  <h1 style={{
    color: "#2563eb",
    margin: 0
  }}>
    Flapy
  </h1>

</div>

      <p>
        Объекты недвижимости
      </p>

      {listings.map(item => (
        <div key={item.id} style={{
          background: "white",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>

          <h3>{item.title}</h3>

          <p>{item.rooms} • район {item.district}</p>

          <strong style={{color: "#2563eb"}}>
            {item.price}
          </strong>

        </div>
      ))}

    </div>
  )
}
