import { useState } from "react"
import logo from "../assets/sin fondo.jpeg"

function LoginForm() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (username === "admin" && password === "1234") {
            alert("Login correcto")
        } else {
            alert("Credenciales incorrectas")
        }
    }

    return (

        <div className="login-container">

            <h2>UniSport</h2>
            <img src={logo} alt="Uni Sport Logo" className="logo" />

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Iniciar sesión
                </button>

            </form>
            {/* Enlace a Registro */}
            <p style={{ color: "#aaa", fontSize: "14px", marginTop: "16px" }}>
                ¿No tienes cuenta?{" "}
                <span
                    onClick={() => window.location.href = "/Registro"}
                    style={{ color: "#f5b700", cursor: "pointer", fontWeight: "bold" }}
                >
                    Regístrate
                </span>
            </p>
        </div>

    )
}

export default LoginForm