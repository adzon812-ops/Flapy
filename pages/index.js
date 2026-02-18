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
  </div>
)
