from fastapi import FastAPI
from contextlib import asynccontextmanager

from api.config import init_db, close_db_connection
from api.routes import productos


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


api.include_router(productos.router)