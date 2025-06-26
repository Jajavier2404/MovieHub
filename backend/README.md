# MovieHub Backend

API REST para una aplicación de catálogo de películas con sistema de reseñas.

## Características

- ✅ Autenticación JWT
- ✅ CRUD de películas
- ✅ Sistema de reseñas y calificaciones
- ✅ Base de datos PostgreSQL
- ✅ Documentación automática con Swagger

## Tecnologías

- FastAPI
- SQLModel
- PostgreSQL
- JWT
- Pydantic

## Instalación y Configuración

### Prerrequisitos

1. Python 3.8+
2. PostgreSQL
3. pip

### Pasos para ejecutar

1. **Clonar y navegar al directorio**
```bash
cd backend
```

2. **Crear entorno virtual**
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

4. **Configurar base de datos**
- Crear base de datos PostgreSQL llamada `moviehub`
- Copiar `.env.example` a `.env` y configurar variables

5. **Ejecutar la aplicación**
```bash
python main.py
```

La API estará disponible en: http://localhost:8000

## Documentación

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints Principales

### Autenticación
- POST `/auth/register` - Registrar usuario
- POST `/auth/login` - Iniciar sesión
- GET `/auth/me` - Información del usuario actual

### Películas
- GET `/movies/` - Listar películas
- GET `/movies/{id}` - Obtener película por ID
- POST `/movies/` - Crear película (requiere auth)

### Reseñas
- POST `/reviews/` - Crear reseña (requiere auth)
- GET `/reviews/movie/{movie_id}` - Obtener reseñas de una película
