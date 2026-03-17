from sqlmodel import Session
from fastapi import APIRouter, Depends, HTTPException

from api.config import get_session
from api.models import Producto
from api.services import ProductosService


router = APIRouter()


def get_user_service(session: Session = Depends(get_session)):
    return ProductosService(session)


# Se define un endpoint para obtener información de un producto específico por su ID
@router.get("/producto/{producto_id}")
def obtener_producto(producto_id: int, product_service: Producto = Depends(get_user_service)):
    producto = product_service.get_producto(producto_id)
   
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    return producto
