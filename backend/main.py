from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes import authRoutes, movieRoutes, reviewRoutes

# Crear la aplicación FastAPI
app = FastAPI(
    title="MovieHub API",
    description="API para catálogo de películas favoritas con opiniones",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas
app.include_router(authRoutes.router)
app.include_router(movieRoutes.router)
app.include_router(reviewRoutes.router)


@app.on_event("startup")
def on_startup():
    """Inicializar la base de datos al arrancar la aplicación"""
    init_db()


@app.get("/")
def read_root():
    """Endpoint de bienvenida"""
    return {
        "message": "¡Bienvenido a MovieHub API! 🎬",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    """Endpoint para verificar el estado de la API"""
    return {"status": "healthy", "message": "API is running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
