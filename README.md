# 🛒 UniStore — E-Commerce

Proyecto académico de e-commerce desarrollado con FastAPI, MySQL y HTML/CSS/JS.

---

## 🧱 Tecnologías

| Capa       | Tecnología          |
|------------|---------------------|
| Backend    | Python + FastAPI    |
| ORM        | SQLModel            |
| Base de datos | MySQL            |
| Frontend   | HTML / CSS / JS     |
| Contenedores | Docker + Docker Compose |

---

## 📁 Estructura del proyecto

```
uni-sport/
├── backend/
│   ├── models.py          # Modelos SQLModel
│   ├── main.py            # Rutas FastAPI
│   └── ...
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── db/
│   ├── 01_tabla.sql       # Creación de tablas
│   ├── 02_insert1.sql     # Datos iniciales
│   └── 03_insert2.sql     # Datos adicionales
├── docker-compose.yml
└── Dockerfile
```

---

## 🚀 Cómo correr el proyecto

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd uni-sport
```

### 2. Levantar los servicios con Docker

```bash
docker compose up
```

Esto levanta el backend (FastAPI) y la base de datos (MySQL).

### 3. Verificar que la API esté corriendo

Abre en el navegador:

```
http://localhost:8000/docs
```

## 📌 Endpoints principales

| Método | Endpoint       | Descripción              |
|--------|----------------|--------------------------|
| GET    | `/productos`   | Listar todos los productos |
| GET    | `/docs`        | Documentación automática |

---
