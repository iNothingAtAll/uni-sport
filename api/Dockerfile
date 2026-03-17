# Imagen base
FROM python:3.13.12-slim


# Establece el directorio de trabajo
WORKDIR /usr/src/app


COPY . .


# Se deja especificado que se esta usando el puerto 8000
EXPOSE 8000


# Instala las dependencias
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt


# Se ejecuta la api usando uvicorn
CMD ["uvicorn", "main:api", "--host", "0.0.0.0"]