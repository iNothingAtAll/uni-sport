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

        </div>

    )
}

export default LoginForm