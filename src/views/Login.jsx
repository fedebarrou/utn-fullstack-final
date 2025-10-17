import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/images/logo.png"

const Login = () => {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const PASS = "pepe123"

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn === "true") {
      navigate("/chat")
    }
  }, [navigate])

  const validatePassword = () => {
    setMessage(null)
    setError(null)

    if (password === PASS) {
      localStorage.setItem("isLoggedIn", "true")
      setMessage("Contraseña válida, serás redirigido.")
      setTimeout(() => {
        navigate("/chat")
      }, 3000)
    } else {
      setError("Contraseña inválida, intentelo nuevamente")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validatePassword()
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // 🔻 Nuevo: limpiar sólo la key 'users'
  const handleClearUsers = () => {
    setMessage(null)
    setError(null)
    try {
      localStorage.removeItem("users")
      setMessage("Se eliminó la key 'users' del localStorage.")
    } catch (e) {
      setError("No se pudo eliminar la key 'users'.")
    }
  }

  return (
    <main className="login-main">
      <img width={100} src={logo} alt="logo de whatsapp" />

      <form onSubmit={handleSubmit}>
        <label>Contraseña de acceso</label>
        <input
          placeholder="Ingrese la contraseña"
          type={showPassword ? "text" : "password"}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="button" onClick={handleShowPassword}>
          <i className="fa fa-eye" aria-hidden="true"></i>
        </button>

        <button type="submit">Acceder</button>

        {message && <p style={{ color: "blue" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>



      <p className="text-info">Acceso restringido • Contenido privado</p>

      {/* 🔻 Botón “bottom” para limpiar localStorage (users) */}
      <footer className="login-footer">
        <button type="button" onClick={handleClearUsers}>
          Remover key users de localStorage
        </button>
      </footer>
    </main>
  )
}

export { Login }
