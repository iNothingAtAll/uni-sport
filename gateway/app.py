from flask import Flask, jsonify, request
from flask_cors import CORS 
import mysql.connector
import requests


app = Flask(__name__)
CORS(app)

def get_connection():
    return mysql.connector.connect(
        host = "db",
        user = "admin",
        password = "admin",
        database = "db",
        port = "3306"
    )


@app.route("/")
def get_info():
    transacciones = requests.get("http://api-transacciones:5001").json()
    usuarios = requests.get("http://api-usuarios:5002").json()

    return jsonify({
        "api-usuarios": usuarios, 
        "api-transacciones": transacciones
    })


@app.route("/usuarios")
def get_usuarios():
    usuarios = requests.get("http://api-usuarios:5002/usuarios").json()
    return jsonify(usuarios)


@app.route("/usuario/<int:usuario_id>")
def get_usuario(usuario_id):
    usuarios = requests.get(f"http://api-usuarios:5002/usuario/{usuario_id}").json()
    return jsonify(usuarios)


@app.route("/transacciones")
def get_transacciones():
    usuarios = requests.get(f"http://api-transacciones:5001/transacciones").json()
    return jsonify(usuarios)


@app.route("/transaccion/<int:transaccion_id>")
def get_transaccion(transaccion_id):
    usuarios = requests.get(f"http://api-transacciones:5001/transaccion/{transaccion_id}").json()
    return jsonify(usuarios)


@app.route("/transacciones/usuario/<int:usuario_id>")
def get_transacciones_usuario(usuario_id):
    usuarios = requests.get(f"http://api-transacciones:5001/transacciones/usuario/{usuario_id}").json()
    return jsonify(usuarios)


@app.route("/usuario/auth", methods=["POST"])
def auth():
    data = request.get_json()
    if data is None:
        return jsonify({"error": "Invalid JSON"}), 400

    resp = requests.post("http://api-usuarios:5002/auth", json=data)

    return jsonify(resp.json()), resp.status_code

@app.route("/modules")
def modules():
    resp = requests.get("http://api-modules:5003/modules")
    return jsonify(resp.json()), resp.status_code

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)