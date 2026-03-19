from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import init_db, close_db_connection
from routes import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Inicializando base de datos...")
    init_db()
    
    print("Base de datos lista")
    yield
    
    close_db_connection()


api = FastAPI(
    title="e-commerce API",
    version="1.0.0", 
    lifespan=lifespan
)


# Configuración de CORS para permitir solicitudes desde el frontend
api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


api.include_router(router)