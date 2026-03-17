from sqlmodel import SQLModel, Field, Column, Boolean


# Modelo de Producto
class Producto(SQLModel, table=True):
    __tablename__ = "productos"
    
    id: int = Field(default=None, primary_key=True)
    nombre_producto: str
    descripcion: str
    precio: float
    disponible: bool = Field(default=True, sa_column=Column(Boolean, default=True))
