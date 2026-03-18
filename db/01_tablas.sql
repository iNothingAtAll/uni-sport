-- =============================================
-- BASE DE DATOS - E-COMMERCE
-- =============================================
 
CREATE TABLE IF NOT EXISTS productos(
    id               INT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto  VARCHAR(150)  NOT NULL,
    descripcion      TEXT          NOT NULL,
    precio           FLOAT         NOT NULL,
    disponible       BOOLEAN       NOT NULL DEFAULT TRUE
);
 