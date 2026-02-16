export default function Home() {
  return (
    <div style={{
      fontFamily: 'Arial',
      background: '#f4f7fb',
      minHeight: '100vh',
      padding: '40px'
    }}>
      
      <h1 style={{color: '#2563eb'}}>
        Flapy.kz
      </h1>

      <p>
        Платформа недвижимости нового поколения
      </p>

      <button style={{
        padding: '12px 20px',
        background: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}>
        Войти
      </button>

      <button style={{
        padding: '12px 20px',
        background: 'white',
        color: '#2563eb',
        border: '1px solid #2563eb',
        borderRadius: '8px',
        marginLeft: '10px',
        cursor: 'pointer'
      }}>
        Регистрация
      </button>

    </div>
  )
}
