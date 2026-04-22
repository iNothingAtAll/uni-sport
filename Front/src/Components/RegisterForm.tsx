import { useState } from "react"
import logo from "../assets/sin fondo.jpeg"

function RegisterForm() {

    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
        identificacion: "",
        correo: "",
        confirmarCorreo: "",
        password: "",
        confirmarPassword: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const validate = (): Record<string, string> => {
        const e: Record<string, string> = {}
        if (form.nombres.trim().length < 2)
            e.nombres = "Ingresa tus nombres."
        if (form.apellidos.trim().length < 2)
            e.apellidos = "Ingresa tus apellidos."
        if (form.identificacion.trim().length < 4)
            e.identificacion = "Ingresa un número de identificación válido."
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
            e.correo = "Ingresa un correo electrónico válido."
        if (form.confirmarCorreo !== form.correo)
            e.confirmarCorreo = "Los correos no coinciden."
        if (form.password.length < 6)
            e.password = "La contraseña debe tener al menos 6 caracteres."
        if (form.confirmarPassword !== form.password)
            e.confirmarPassword = "Las contraseñas no coinciden."
        return e
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const localErrors = validate()
        if (Object.keys(localErrors).length > 0) {
            setErrors(localErrors)
            return
        }
        // El equipo de backend conecta aquí
        alert("Formulario válido")
    }

    return (
        <div className="login-container">

            <img src={logo} alt="UniSport Logo" className="logo" />
            <h2 style={{ fontSize: "24px", marginBottom: "4px" }}>
                Registro de Nuevo Usuario
            </h2>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>

                <label className="register-label">Nombres</label>
                <input
                    type="text"
                    name="nombres"
                    placeholder="Nombres"
                    value={form.nombres}
                    onChange={handleChange}
                />
                {errors.nombres && <span className="register-error">{errors.nombres}</span>}

                <label className="register-label">Apellidos</label>
                <input
                    type="text"
                    name="apellidos"
                    placeholder="Apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                />
                {errors.apellidos && <span className="register-error">{errors.apellidos}</span>}

                <label className="register-label">Número de Identificación</label>
                <input
                    type="text"
                    name="identificacion"
                    placeholder="Número de Identificación"
                    value={form.identificacion}
                    onChange={handleChange}
                />
                {errors.identificacion && <span className="register-error">{errors.identificacion}</span>}

                <label className="register-label">Correo Electrónico</label>
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo Electrónico"
                    value={form.correo}
                    onChange={handleChange}
                />
                {errors.correo && <span className="register-error">{errors.correo}</span>}

                <label className="register-label">Confirmar Correo</label>
                <input
                    type="email"
                    name="confirmarCorreo"
                    placeholder="Confirmar Correo Electrónico"
                    value={form.confirmarCorreo}
                    onChange={handleChange}
                />
                {errors.confirmarCorreo && <span className="register-error">{errors.confirmarCorreo}</span>}

                <label className="register-label">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                />
                {errors.password && <span className="register-error">{errors.password}</span>}

                <label className="register-label">Confirmar Contraseña</label>
                <input
                    type="password"
                    name="confirmarPassword"
                    placeholder="Confirmar Contraseña"
                    value={form.confirmarPassword}
                    onChange={handleChange}
                />
                {errors.confirmarPassword && <span className="register-error">{errors.confirmarPassword}</span>}

                <button type="submit" style={{ marginTop: "12px" }}>
                    Crear Cuenta
                </button>

            </form>

            <p style={{ color: "#aaa", fontSize: "14px", marginTop: "16px" }}>
                ¿Ya tienes cuenta?{" "}
                <span
                    onClick={() => window.location.href = "/"}
                    style={{ color: "#f5b700", cursor: "pointer", fontWeight: "bold" }}
                >
                    Inicia sesión
                </span>
            </p>

        </div>
    )
}

export default RegisterForm