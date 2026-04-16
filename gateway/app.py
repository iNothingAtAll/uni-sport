from flask import Flask, jsonify
import mysql.connector
import requests

app = Flask(__name__)


def get_connection():
    return mysql.connector.connect(
        host = "db",
        user = "admin",
        password = "admin",
        database = "db",
        port = "3306"
    )


@app.route("/usuarios")
def get_usuarios():
    usuarios = requests.get("http://api-usuarios:5002/usuarios").json()
    return jsonify(usuarios)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)