# 🛒 UniStore — E-Commerce

Este es un Diagrama representativo de como están conectados los servicios lanzados con docker y como este interactúa con el usuario.

![ ](/imagenes/diagrama.png)

Este repositorio contiene una aplicación compuesta por cuatro servicios:

- **API**: backend con endpoints `/productos` y `/docs`.
- **Web**: frontend (puede ser una aplicación estática o dinámica).
- **MariaDB**: base de datos relacional.
- **phpMyAdmin**: interfaz gráfica para administrar MariaDB.

Todos los servicios se orquestan mediante **Docker Compose**.


## Requisitos previos

- Docker instalado ([docker.com](https://docker.com))
- Docker Compose instalado (generalmente incluido en Docker Desktop)


## Configuración

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. **Levanta los servicios**
    ```bash
    docker-compose up -d
    ```
3. **Accede a la aplicación**

    - Web: http://localhost:3000
    - API: http://localhost:8000
    - phpMyAdmin: http://localhost:8080

> Nota: El usuario y contraseña de phpMyAdmin es `admin`

## Uso de la API

Listado de Endpoints:
- Obtener producto:  http://localhost:8000/producto/\<id\>
- Info de los endpoint: http://localhost:8000/docs


## Detener y eliminar contenedores

```bash
docker-compose down
```

## Para eliminar también los volúmenes

```bash
docker-compose down -v
```