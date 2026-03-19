from models import Producto


class ProductosService:
    def __init__(self, session):
        self.session = session

    def get_producto(self, producto_id: int):
        return self.session.query(Producto).filter(Producto.id == producto_id).first()
