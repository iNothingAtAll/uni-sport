from sqlmodel import create_engine, Session, SQLModel
from pathlib import Path
from dotenv import load_dotenv
import os


# Cargar variables de entorno desde el archivo .env en el directorio padre
load_dotenv(dotenv_path=Path(__file__).parent / '.env')


# Se extrae toda la informacion para conectarse a la base de datos
DB_PASSWORD = os.getenv("MYSQL_PASSWORD")
DB_USER = os.getenv("MYSQL_USER")
DB_HOST = os.getenv("PMA_HOST")
DB_PORT = os.getenv("PMA_PORT")
DB_NAME = os.getenv("MYSQL_DATABASE")


# Genera el motor para gestionar la base de datos 
engine = create_engine(f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")


# Esta funcion genera una sesión de base de datos para cada peticion
def get_session():
    with Session(engine) as session:
        yield session
        

# Inicialisa la base de datos y crea las tablas
def init_db():
    SQLModel.metadata.create_all(engine)


# Termina la conexion con la base de datos
def close_db_connection():
    engine.dispose()