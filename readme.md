# Documentación Completa del Proyecto Cinemática

## 📋 Tabla de Contenido

1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Arquitectura del Sistema](#-arquitectura-del-sistema)
3. [Stack Tecnológico](#-stack-tecnológico)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Base de Datos](#-base-de-datos)
6. [API Backend](#-api-backend)
7. [Frontend](#-frontend)
8. [Autenticación y Seguridad](#-autenticación-y-seguridad)
9. [Instalación y Configuración](#-instalación-y-configuración)
10. [Guía de Contribución](#-guía-de-contribución)
11. [Testing](#-testing)
12. [Deployment](#-deployment)
13. [Roadmap](#-roadmap)
14. [Monitoreo y Mantenimiento](#-monitoreo-y-mantenimiento)
15. [FAQ](#-faq)
16. [Licencia](#-licencia)

---

## 🎬 Descripción del Proyecto

**Cinemática** es una plataforma web completa para descubrir, explorar y compartir películas. La aplicación permite a los usuarios navegar por un catálogo de películas, ver detalles específicos, agregar nuevas películas y escribir reseñas con calificaciones.

### Características Principales

- 🎯 **Exploración de Películas**: Catálogo completo con búsqueda y filtros
- ⭐ **Sistema de Reseñas**: Calificaciones y comentarios de usuarios
- 👥 **Gestión de Usuarios**: Registro, autenticación y perfiles
- 📱 **Diseño Responsive**: Interfaz moderna adaptable a todos los dispositivos
- 🔐 **Autenticación JWT**: Sistema seguro de tokens
- 🎨 **UI Moderna**: Efectos glassmorphism y animaciones fluidas
- 📊 **API RESTful**: Backend robusto con FastAPI

---

## 🏗️ Arquitectura del Sistema

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React App] --> B[React Router]
        A --> C[Tailwind CSS]
        A --> D[Components]
    end

    subgraph "API Layer"
        E[FastAPI] --> F[Auth Routes]
        E --> G[Movie Routes]
        E --> H[Review Routes]
    end

    subgraph "Business Logic"
        I[JWT Auth] --> J[CRUD Operations]
        J --> K[Data Validation]
    end

    subgraph "Data Layer"
        L[(PostgreSQL)] --> M[Users Table]
        L --> N[Movies Table]
        L --> O[Reviews Table]
    end

    A -.->|HTTP/JSON| E
    E --> I
    I --> J
    J --> L

    style A fill:#61dafb
    style E fill:#009688
    style L fill:#336791
```

### Flujo de Datos

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend React
    participant A as FastAPI Backend
    participant D as PostgreSQL DB

    U->>F: Interacción (clic, formulario)
    F->>A: HTTP Request (GET/POST/PUT/DELETE)
    A->>A: Validación & Autenticación
    A->>D: SQL Query
    D-->>A: Datos
    A-->>F: JSON Response
    F-->>U: UI Actualizada
```

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19 | Librería principal UI |
| **React Router DOM** | 7 | Navegación SPA |
| **Tailwind CSS** | 4 | Framework CSS |
| **Lucide React** | Latest | Iconografía |
| **Vite** | 7 | Build tool |

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **FastAPI** | Latest | Framework web |
| **SQLModel** | Latest | ORM/ODM |
| **PostgreSQL** | Latest | Base de datos |
| **Uvicorn** | Latest | Servidor ASGI |
| **JWT** | Latest | Autenticación |

### DevOps & Tools
| Herramienta | Propósito |
|-------------|-----------|
| **Git** | Control de versiones |
| **ESLint** | Linting JavaScript |
| **Pytest** | Testing Python |
| **Docker** | Containerización |

---

## 📁 Estructura del Proyecto

```
cinematica/
├── backend/                        # API Backend (FastAPI)
│   ├── routes/                     # Módulos de rutas
│   │   ├── authRoutes.py          # Endpoints autenticación
│   │   ├── movieRoutes.py         # Endpoints películas
│   │   └── reviewRoutes.py        # Endpoints reseñas
│   ├── venv/                      # Entorno virtual Python
│   ├── auth.py                    # Lógica JWT
│   ├── crud.py                    # Operaciones CRUD
│   ├── database.py                # Configuración BD
│   ├── main.py                    # Punto entrada API
│   ├── models.py                  # Modelos SQLModel
│   ├── schemas.py                 # Esquemas Pydantic
│   ├── requirements.txt           # Dependencias Python
│   ├── .env                       # Variables entorno
│   └── README.md                  # Docs backend
│
├── frontend/                       # Cliente Web (React)
│   ├── public/                    # Archivos estáticos
│   ├── src/
│   │   ├── assets/                # Recursos (imágenes, etc.)
│   │   ├── components/            # Componentes reutilizables
│   │   │   ├── MovieCard.jsx     # Tarjeta película
│   │   │   └── ReviewForm.jsx    # Formulario reseña
│   │   ├── pages/                 # Vistas principales
│   │   │   ├── MovieList.jsx     # Lista películas
│   │   │   ├── MovieDetail.jsx   # Detalle película
│   │   │   ├── AddMovie.jsx      # Agregar película
│   │   │   └── Login.jsx         # Inicio sesión
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx     # Configuración rutas
│   │   ├── App.jsx               # Componente raíz
│   │   ├── auth.js               # Lógica autenticación
│   │   └── main.jsx              # Punto entrada React
│   ├── package.json              # Dependencias Node.js
│   ├── vite.config.js            # Configuración Vite
│   └── tailwind.config.js        # Configuración Tailwind
│
├── docs/                          # Documentación
├── .gitignore                     # Archivos ignorados Git
└── README.md                      # Documentación principal
```

---

## 🗄️ Base de Datos

### Diagrama Entidad-Relación

```mermaid
erDiagram
    users {
        int id PK "AUTO_INCREMENT"
        string username "UNIQUE, NOT NULL"
        string email "UNIQUE, NOT NULL"
        string password "HASHED, NOT NULL"
        timestamp created_at
        timestamp updated_at
    }
    
    movies {
        int id PK "AUTO_INCREMENT"
        string title "NOT NULL"
        int year "NOT NULL"
        text description "NOT NULL"
        string genre "OPTIONAL"
        string director "OPTIONAL"
        timestamp created_at
        timestamp updated_at
    }
    
    reviews {
        int id PK "AUTO_INCREMENT"
        int rating "NOT NULL, 1-5"
        text comment "NOT NULL"
        int user_id FK "NOT NULL"
        int movie_id FK "NOT NULL"
        timestamp created_at
        timestamp updated_at
    }
    
    users ||--o{ reviews : "writes"
    movies ||--o{ reviews : "receives"
```

### Modelos de Datos

#### User Model
```python
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    password: str  # Hasheado con bcrypt
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relaciones
    reviews: List["Review"] = Relationship(back_populates="user")
```

#### Movie Model
```python
class Movie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    year: int
    description: str
    genre: Optional[str] = None
    director: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relaciones
    reviews: List["Review"] = Relationship(back_populates="movie")
```

#### Review Model
```python
class Review(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    rating: int = Field(ge=1, le=5)  # 1-5 estrellas
    comment: str
    user_id: int = Field(foreign_key="user.id")
    movie_id: int = Field(foreign_key="movie.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relaciones
    user: User = Relationship(back_populates="reviews")
    movie: Movie = Relationship(back_populates="reviews")
```

---

## 🔌 API Backend

### Endpoints Disponibles

#### 🔐 Autenticación (`/auth`)

| Método | Endpoint | Descripción | Auth | Body | Response |
|--------|----------|-------------|------|------|----------|
| `POST` | `/auth/register` | Registrar usuario | ❌ | `UserCreate` | `201 Created` |
| `POST` | `/auth/login` | Iniciar sesión | ❌ | `Credentials` | `JWT Token` |

**Ejemplo - Registro:**
```json
POST /auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123"
}

Response: 201 Created
{
  "message": "User created successfully"
}
```

**Ejemplo - Login:**
```json
POST /auth/login
{
  "username": "john@example.com",
  "password": "securepass123"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### 🎬 Películas (`/movies`)

| Método | Endpoint | Descripción | Auth | Body | Response |
|--------|----------|-------------|------|------|----------|
| `GET` | `/movies/` | Listar películas | ❌ | - | `List[Movie]` |
| `GET` | `/movies/{id}` | Obtener película | ❌ | - | `Movie` |
| `POST` | `/movies/` | Crear película | ❌ | `MovieCreate` | `Movie` |

**Ejemplo - Crear Película:**
```json
POST /movies/
{
  "title": "Inception",
  "year": 2010,
  "description": "A thief who steals corporate secrets...",
  "genre": "Sci-Fi",
  "director": "Christopher Nolan"
}

Response: 201 Created
{
  "id": 1,
  "title": "Inception",
  "year": 2010,
  "description": "A thief who steals corporate secrets...",
  "genre": "Sci-Fi",
  "director": "Christopher Nolan",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### ⭐ Reseñas (`/reviews`)

| Método | Endpoint | Descripción | Auth | Body | Response |
|--------|----------|-------------|------|------|----------|
| `POST` | `/reviews/` | Crear reseña | ✅ | `ReviewCreate` | `Review` |
| `GET` | `/reviews/movie/{id}` | Reseñas de película | ❌ | - | `List[Review]` |

**Ejemplo - Crear Reseña:**
```json
POST /reviews/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "rating": 5,
  "comment": "Absolutely brilliant movie!",
  "movie_id": 1
}

Response: 201 Created
{
  "id": 1,
  "rating": 5,
  "comment": "Absolutely brilliant movie!",
  "user_id": 1,
  "movie_id": 1,
  "created_at": "2024-01-15T14:20:00Z"
}
```

---

## 🎨 Frontend

### Arquitectura de Componentes

```mermaid
graph TD
    A[App.jsx] --> B[AppRoutes.jsx]
    B --> C[MovieList.jsx]
    B --> D[MovieDetail.jsx]
    B --> E[AddMovie.jsx]
    B --> F[Login.jsx]
    
    C --> G[MovieCard.jsx]
    D --> H[ReviewForm.jsx]
    D --> I[StarDisplay.jsx]
    
    J[auth.js] -.-> F
    J -.-> H
    
    style A fill:#61dafb
    style G fill:#4CAF50
    style H fill:#FF9800
```

### Rutas de la Aplicación

| Ruta | Componente | Descripción | Protegida |
|------|------------|-------------|-----------|
| `/` | `MovieList` | Lista de películas | ❌ |
| `/movie/:id` | `MovieDetail` | Detalle de película | ❌ |
| `/add` | `AddMovie` | Agregar película | ❌ |
| `/login` | `Login` | Iniciar sesión | ❌ |

### Flujo de Estados

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Loaded: Datos obtenidos
    Loading --> Error: Fallo en carga
    Loaded --> Filtering: Usuario busca
    Filtering --> Loaded: Limpiar filtros
    Error --> Loading: Reintentar
    Loaded --> [*]: Navegación
```

### Componentes Principales

#### MovieList.jsx
- **Propósito**: Página principal con catálogo de películas
- **Estados**: `movies`, `loading`, `searchTerm`, `sortBy`, `viewMode`
- **Funcionalidades**: Búsqueda, filtrado, ordenamiento, cambio de vista

#### MovieDetail.jsx
- **Propósito**: Detalle específico de película con reseñas
- **Estados**: `movie`, `reviews`, `loading`, `averageRating`
- **Funcionalidades**: Carga de película, listado de reseñas, formulario de reseña

#### MovieCard.jsx
- **Props**: `movie`, `viewMode`
- **Propósito**: Componente reutilizable para mostrar película
- **Variantes**: Vista de cuadrícula y lista

#### ReviewForm.jsx
- **Props**: `movieId`, `onReviewSubmitted`
- **Estados**: `rating`, `comment`, `submitting`
- **Funcionalidades**: Validación, envío, manejo de errores

---

## 🔐 Autenticación y Seguridad

### Flujo de Autenticación JWT

```mermaid
sequenceDiagram
    participant C as Cliente
    participant A as Auth API
    participant DB as Database
    participant P as Protected API

    C->>A: POST /auth/login
    A->>DB: Verificar credenciales
    DB-->>A: Usuario válido
    A->>A: Generar JWT
    A-->>C: {access_token, token_type}
    
    Note over C: Token almacenado en memoria
    
    C->>P: Request con Authorization header
    P->>P: Validar JWT
    P->>DB: Operación autorizada
    DB-->>P: Datos
    P-->>C: Respuesta protegida
```

### Configuración de Seguridad

#### Variables de Entorno JWT
```env
SECRET_KEY=tu_clave_secreta_minimo_32_caracteres_muy_segura
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120
```

#### Hashing de Contraseñas
```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
```

#### Middleware CORS
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- **Python 3.8+**
- **Node.js 16+**
- **PostgreSQL 12+**
- **Git**

### Configuración del Backend

1. **Clonar y preparar entorno**
```bash
git clone https://github.com/tu-usuario/cinematica.git
cd cinematica/backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

2. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

3. **Configurar base de datos**
```sql
-- Conectar a PostgreSQL
psql -U postgres

-- Crear base de datos
CREATE DATABASE peliculas;
CREATE USER cinematica_user WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE peliculas TO cinematica_user;
```

4. **Variables de entorno**
```bash
cp .env.example .env
```

```env
# .env
DATABASE_URL=postgresql://cinematica_user:tu_password@localhost:5432/peliculas
SECRET_KEY=tu_clave_secreta_super_segura_minimo_32_caracteres
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120
```

5. **Ejecutar servidor**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Configuración del Frontend

1. **Navegar al directorio**
```bash
cd ../frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Variables de entorno**
```bash
# .env.local
VITE_API_BASE_URL=http://localhost:8000
```

4. **Ejecutar servidor de desarrollo**
```bash
npm run dev
```

### Verificación de Instalación

- **Backend API**: http://localhost:8000
- **Documentación Swagger**: http://localhost:8000/docs
- **Frontend**: http://localhost:5173

---

## 🤝 Guía de Contribución

### Proceso de Contribución

```mermaid
gitgraph
    commit id: "main"
    branch feature/nueva-funcionalidad
    checkout feature/nueva-funcionalidad
    commit id: "Desarrollo"
    commit id: "Tests"
    commit id: "Documentación"
    checkout main
    merge feature/nueva-funcionalidad
    commit id: "Release"
```

### Estándares de Código

#### Backend (Python)
- **PEP 8**: Seguir guías de estilo de Python
- **Type Hints**: Obligatorio en funciones públicas
- **Docstrings**: Para funciones complejas
- **Tests**: Cobertura mínima del 80%

```python
def create_user(session: Session, user: UserCreate) -> User:
    """
    Crear un nuevo usuario en la base de datos.
    
    Args:
        session: Sesión de base de datos
        user: Datos del usuario a crear
        
    Returns:
        User: Usuario creado
        
    Raises:
        HTTPException: Si el email ya existe
    """
    # Implementación...
```

#### Frontend (JavaScript)
- **ESLint**: Seguir configuración establecida
- **Componentes Funcionales**: Preferir sobre clases
- **PropTypes**: Definir para todos los componentes
- **Naming**: camelCase para JS, PascalCase para componentes

```jsx
import PropTypes from 'prop-types';

const MovieCard = ({ movie, viewMode = 'grid' }) => {
  // Implementación...
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list'])
};

export default MovieCard;
```

### Flujo de Desarrollo

1. **Fork del repositorio**
```bash
git fork https://github.com/original/cinematica.git
git clone https://github.com/tu-usuario/cinematica.git
```

2. **Crear branch feature**
```bash
git checkout -b feature/descripcion-funcionalidad
```

3. **Desarrollo con tests**
```bash
# Backend
pytest tests/
coverage run -m pytest
coverage report

# Frontend
npm run lint
npm run test
```

4. **Commit siguiendo convenciones**
```bash
git commit -m "feat: agregar sistema de favoritos"
git commit -m "fix: corregir validación de email"
git commit -m "docs: actualizar README con nuevas rutas"
```

5. **Push y Pull Request**
```bash
git push origin feature/descripcion-funcionalidad
# Crear PR en GitHub
```

### Tipos de Contribución

#### 🐛 Bug Reports
```markdown
**Descripción del Bug**
Descripción clara del problema

**Pasos para Reproducir**
1. Ir a...
2. Hacer clic en...
3. Ver error

**Comportamiento Esperado**
Lo que debería pasar

**Screenshots**
Si aplica

**Entorno**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 95]
- Versión: [e.g. 1.0.0]
```

#### ✨ Feature Requests
```markdown
**¿La feature está relacionada con un problema?**
Descripción clara del problema

**Solución Deseada**
Descripción clara de lo que quieres que pase

**Alternativas Consideradas**
Otras soluciones consideradas

**Contexto Adicional**
Screenshots, mockups, etc.
```

#### 📝 Documentación
- Mejorar documentación existente
- Agregar ejemplos de código
- Traducir documentación
- Crear tutoriales

---

## 🧪 Testing

### Estructura de Tests

```
tests/
├── backend/
│   ├── test_auth.py           # Tests autenticación
│   ├── test_movies.py         # Tests películas
│   ├── test_reviews.py        # Tests reseñas
│   ├── conftest.py           # Configuración pytest
│   └── fixtures/             # Datos de prueba
├── frontend/
│   ├── components/           # Tests componentes
│   ├── pages/               # Tests páginas
│   ├── utils/               # Tests utilidades
│   └── setup.js             # Configuración Jest
└── e2e/                     # Tests end-to-end
    ├── auth.spec.js
    ├── movies.spec.js
    └── reviews.spec.js
```

### Tests Backend (Python)

```python
# test_movies.py
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_movie():
    """Test crear nueva película"""
    movie_data = {
        "title": "Test Movie",
        "year": 2024,
        "description": "A test movie"
    }
    response = client.post("/movies/", json=movie_data)
    assert response.status_code == 201
    assert response.json()["title"] == "Test Movie"

def test_get_movies():
    """Test obtener lista de películas"""
    response = client.get("/movies/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_movie_not_found():
    """Test película no encontrada"""
    response = client.get("/movies/9999")
    assert response.status_code == 404
```

### Tests Frontend (Jest/React Testing Library)

```jsx
// MovieCard.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  year: 2024,
  description: 'A test movie'
};

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('MovieCard', () => {
  test('renders movie information', () => {
    renderWithRouter(
      <MovieCard movie={mockMovie} viewMode="grid" />
    );
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('A test movie')).toBeInTheDocument();
  });

  test('handles click navigation', () => {
    renderWithRouter(
      <MovieCard movie={mockMovie} viewMode="grid" />
    );
    
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('data-testid', 'movie-card');
  });
});
```

### Comandos de Testing

```bash
# Backend
cd backend
pytest -v                    # Tests verbosos
pytest --cov=.              # Con cobertura
pytest -k "test_auth"       # Tests específicos

# Frontend
cd frontend
npm test                    # Tests interactivos
npm run test:coverage      # Con cobertura
npm run test:ci            # Para CI/CD
```

---

## 🚀 Deployment

### Configuración Docker

#### Backend Dockerfile
```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Exponer puerto
EXPOSE 8000

# Comando de inicio
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci --only=production

# Build aplicación
COPY . .
RUN npm run build

# Servidor de producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: peliculas
      POSTGRES_USER: cinematica_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://cinematica_user:secure_password@postgres:5432/peliculas
      SECRET_KEY: super_secure_production_key
    depends_on:
      - postgres
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    environment:
      VITE_API_BASE_URL: http://localhost:8000
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Deployment en Producción

#### Variables de Entorno Producción
```env
# Backend
DATABASE_URL=postgresql://user:pass@prod-db:5432/cinematica
SECRET_KEY=production_key_very_secure_32_chars_min
ENVIRONMENT=production
DEBUG=false
CORS_ORIGINS=https://cinematica.com,https://www.cinematica.com

# Frontend
VITE_API_BASE_URL=https://api.cinematica.com
VITE_ENVIRONMENT=production
```

#### Comandos de Deployment
```bash
# Construir imágenes
docker-compose build

# Ejecutar en producción
docker-compose -f docker-compose.prod.yml up -d

# Ver logs
docker-compose logs -f

# Actualizar aplicación
docker-compose pull
docker-compose up -d
```

---

## 🗺️ Roadmap

### Versión 1.1 (Próximo mes)
- [ ] **Paginación**: Implementar paginación en lista de películas
- [ ] **Filtros Avanzados**: Por género, año, calificación
- [ ] **Búsqueda Mejorada**: Búsqueda fuzzy y por múltiples campos
- [ ] **Favoritos**: Sistema de películas favoritas por usuario
- [ ] **Perfil de Usuario**: Página de perfil con estadísticas

### Versión 1.2 (2-3 meses)
- [ ] **Upload de Imágenes**: Posters de películas
- [ ] **Sistema de Roles**: Admin, Moderador, Usuario
- [ ] **Notificaciones**: Sistema de notificaciones en tiempo real
- [ ] **Comentarios Anidados**: Respuestas a reseñas
- [ ] **Ordenamiento Avanzado**: Por popularidad, recientes, etc.

### Versión 2.0 (6 meses)
- [ ] **Recomendaciones**: Sistema de recomendaciones basado en ML
- [ ] **API Pública**: Endpoints públicos para terceros
- [ ] **App Móvil**: Aplicación React Native
- [ ] **Integración Externa**: IMDb, TMDB API
- [ ] **Analytics**: Dashboard de métricas y estadís

## Contribución

### Estándares de Código

- **PEP 8**: Seguir guías de estilo de Python
- **Type Hints**: Uso obligatorio de type hints
- **Docstrings**: Documentación en funciones complejas
- **Tests**: Cobertura mínima del 80%

### Proceso de Desarrollo

1. **Fork** del repositorio
2. **Crear branch** feature/nueva-funcionalidad
3. **Desarrollar** con tests incluidos
4. **Ejecutar** tests y linting
5. **Crear** Pull Request
6. **Code Review** y merge

---

*Documentación generada para Cinemática Backend API - Versión 1.0*

*Última actualización: $(27/06/2025)*