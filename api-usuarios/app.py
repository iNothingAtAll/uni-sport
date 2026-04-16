from flask import Flask, jsonify
import mysql.connector


app = Flask(__name__)


def get_connection():
    return mysql.connector.connect(
        host = "db",
        user = "admin",
        password = "admin",
        database = "db",
        port = "3306"
    )


@app.route("/")
def info():
    return jsonify({
        "endpont": [
            "http://localhost:5002",
            "http://localhost:5002/usuarios",
            "http://localhost:5002/usuario/<int:usuario_id>",
        ]
    })


@app.route("/usuarios")
def get_usuarios():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT 
            nombre, 
            nickname, 
            correo, 
            telefono,
            saldo
        FROM usuarios 
    """)
    usuarios = cursor.fetchall()
    conn.close()
    return usuarios


@app.route("/usuario/<int:usuario_id>")
def get_usuario(usuario_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(f"""
        SELECT 
            nombre, 
            nickname, 
            correo, 
            telefono,
            saldo 
        FROM usuarios
        WHERE id = {usuario_id}"""
    )
    usuario = cursor.fetchall()
    conn.close()
    return usuario


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)