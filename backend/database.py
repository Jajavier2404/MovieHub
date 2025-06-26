from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

load_dotenv()

# URL de conexión a PostgreSQL
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:password@localhost:5432/moviehub"
)

# Crear el engine
engine = create_engine(DATABASE_URL, echo=True)


def init_db():
    """Crear todas las tablas en la base de datos"""
    SQLModel.metadata.create_all(engine)


def get_session():
    """Dependency para obtener una sesión de base de datos"""
    with Session(engine) as session:
        yield session
