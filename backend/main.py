from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import authRoutes, movieRoutes, reviewRoutes
from database import create_db_and_tables

app = FastAPI()

# Permitir conexiones desde frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()



@app.get("/")
def read_root():
    return {"message": "Backend funcionando correctamente"}


# Cargar rutas
app.include_router(authRoutes.router)
app.include_router(movieRoutes.router)
app.include_router(reviewRoutes.router)
