# Documentación del Proyecto Cinemática - Frontend

## Descripción del Proyecto

**Cinemática** es una plataforma web moderna para descubrir, explorar y compartir películas. La aplicación permite a los usuarios navegar por un catálogo de películas, ver detalles específicos, agregar nuevas películas y escribir reseñas con calificaciones.

### Características Principales

- 🎬 Exploración y búsqueda de películas
- 📝 Sistema de reseñas y calificaciones
- ➕ Funcionalidad para agregar nuevas películas
- 🔐 Sistema de autenticación de usuarios
- 📱 Diseño responsive con interfaz moderna
- 🎨 Efectos visuales con glassmorphism y animaciones

---

## Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19 | Librería principal para la construcción de la interfaz de usuario |
| **React Router DOM** | 7 | Gestión de rutas de navegación en la SPA |
| **Tailwind CSS** | 4 | Framework CSS utility-first para estilizado rápido y responsive |
| **@tailwindcss/vite** | - | Plugin para integrar Tailwind CSS con Vite |
| **Lucide React** | - | Librería de iconos ligeros y personalizables |
| **Vite** | 7 | Bundler de próxima generación para desarrollo frontend |
| **ESLint** | - | Herramienta para linting de código |

---

## Estructura del Proyecto

```
cinematica-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/                     # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── components/                 # Componentes reutilizables
│   │   ├── MovieCard.jsx          # Tarjeta de película individual
│   │   └── ReviewForm.jsx         # Formulario de envío de reseñas
│   ├── pages/                      # Vistas principales de la aplicación
│   │   ├── MovieList.jsx          # Página principal con listado de películas
│   │   ├── MovieDetail.jsx        # Página de detalle de película específica
│   │   ├── AddMovie.jsx           # Página para agregar nueva película
│   │   └── Login.jsx              # Página de inicio de sesión
│   ├── routes/                     # Configuración de rutas
│   │   └── AppRoutes.jsx          # Definición de las rutas de la aplicación
│   ├── App.css                    # Estilos CSS específicos de la aplicación
│   ├── App.jsx                    # Componente raíz de la aplicación
│   ├── auth.js                    # Lógica de autenticación
│   ├── index.css                  # Archivo CSS global (incluye directivas de Tailwind)
│   └── main.jsx                   # Punto de entrada de la aplicación React
├── .gitignore                     # Archivos y carpetas ignorados por Git
├── eslint.config.js               # Configuración de ESLint
├── index.html                     # Plantilla HTML principal
├── package-lock.json              # Bloqueo de versiones de dependencias
├── package.json                   # Metadatos del proyecto y dependencias
├── README.md                      # Descripción del proyecto
└── vite.config.js                 # Configuración de Vite
```

---

## Arquitectura de Rutas

### `src/routes/AppRoutes.jsx`

Configuración centralizada de las rutas de la aplicación utilizando React Router DOM.

```javascript
import { Routes, Route } from "react-router-dom";
import MovieList from "../pages/MovieList";
import Login from "../pages/login";
import AddMovie from "../pages/addMovie";
import MovieDetail from "../pages/movieDetail";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
    )
}
```

### Rutas Disponibles

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `MovieList` | Página principal con listado de películas |
| `/login` | `Login` | Página de inicio de sesión |
| `/add` | `AddMovie` | Formulario para agregar nueva película |
| `/movie/:id` | `MovieDetail` | Página de detalle de película específica |

---

## Componentes Principales

### 📄 `src/pages/MovieList.jsx`

**Página principal de la aplicación** que muestra el catálogo de películas con funcionalidades avanzadas de navegación y filtrado.

#### Funcionalidades

- **Carga de Datos**: Obtiene películas desde `http://localhost:8000/movies`
- **Estado de Carga**: Indicador visual animado durante la carga
- **Búsqueda**: Filtrado por título o descripción en tiempo real
- **Ordenamiento**: Por título (alfabético) o fecha (más recientes)
- **Modo de Vista**: Alternancia entre vista de cuadrícula y lista
- **Estado Vacío**: Mensaje amigable cuando no hay películas
- **Navegación**: Botón para agregar nueva película

#### Características de Diseño

- ✨ Efectos de glassmorphism con `backdrop-filter`
- 🎯 Formas flotantes animadas en el fondo
- 📱 Diseño completamente responsive
- 🎨 Interfaz moderna con Tailwind CSS

#### Estados del Componente

```javascript
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const [sortBy, setSortBy] = useState('title');
const [viewMode, setViewMode] = useState('grid');
```

---

### 📄 `src/pages/MovieDetail.jsx`

**Página de detalle** que muestra información completa de una película específica y su sistema de reseñas.

#### Funcionalidades

- **Carga de Datos**: Obtiene película y reseñas usando `Promise.all`
  - Película: `http://localhost:8000/movies/:id`
  - Reseñas: `http://localhost:8000/reviews/movie/:id`
- **Manejo de Errores**: Mensaje de "Película no encontrada" para IDs inválidos
- **Calificación Promedio**: Cálculo automático basado en reseñas
- **Sistema de Estrellas**: Visualización de calificaciones con `StarDisplay`
- **Sección de Reseñas**: Lista de reseñas existentes
- **Formulario de Reseña**: Integración con `ReviewForm`

#### Subcomponentes

- **StarDisplay**: Componente para mostrar calificaciones en estrellas
- **ReviewForm**: Formulario para enviar nuevas reseñas

#### Estructura de Datos

```javascript
// Estructura esperada de película
const movie = {
  id: number,
  title: string,
  year: number,
  description: string,
  // ... otros campos
};

// Estructura esperada de reseña
const review = {
  id: number,
  movieId: number,
  rating: number,
  comment: string,
  // ... otros campos
};
```

---

### 🎴 `src/components/MovieCard.jsx`

**Componente reutilizable** para mostrar información de película en formato de tarjeta.

#### Props

```javascript
MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']).isRequired
};
```

#### Funcionalidades Esperadas

- Adaptación visual según `viewMode` (grid/list)
- Navegación a página de detalle al hacer clic
- Información clave: título, año, descripción
- Diseño responsive y accesible

---

### 📝 `src/components/ReviewForm.jsx`

**Formulario interactivo** para que los usuarios envíen reseñas de películas.

#### Props

```javascript
ReviewForm.propTypes = {
  movieId: PropTypes.number.isRequired,
  onReviewSubmitted: PropTypes.func
};
```

#### Funcionalidades Esperadas

- Campo de calificación (sistema de estrellas)
- Área de texto para comentarios
- Validación de entrada
- Estados de envío (loading, success, error)
- Integración con API de reseñas

---

### 📄 `src/pages/AddMovie.jsx`

**Formulario para agregar nuevas películas** al catálogo.

#### Funcionalidades Esperadas

- Formulario con campos: título, año, descripción, género, etc.
- Validación de entrada con feedback visual
- Envío de datos a `http://localhost:8000/movies`
- Estados de carga y confirmación
- Redirección tras éxito

#### Campos del Formulario

```javascript
const [formData, setFormData] = useState({
  title: '',
  year: '',
  description: '',
  genre: '',
  director: '',
  // ... otros campos
});
```

---

### 🔐 `src/pages/Login.jsx`

**Página de autenticación** para el acceso de usuarios.

#### Funcionalidades Esperadas

- Formulario de login (email/usuario y contraseña)
- Validación de credenciales
- Manejo de estados de autenticación
- Integración con `auth.js`
- Redirección post-login

---

## API y Backend

### Endpoints Utilizados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/movies` | Obtener lista de todas las películas |
| `GET` | `/movies/:id` | Obtener detalles de película específica |
| `POST` | `/movies` | Agregar nueva película |
| `GET` | `/reviews/movie/:id` | Obtener reseñas de una película |
| `POST` | `/reviews` | Enviar nueva reseña |

### Base URL

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

---

## Scripts Disponibles

### Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linting
npm run lint
```

### Descripción de Scripts

| Script | Descripción |
|--------|-------------|
| `dev` | Inicia servidor de desarrollo con hot-reload |
| `build` | Compila aplicación optimizada para producción |
| `preview` | Sirve build de producción localmente |
| `lint` | Ejecuta ESLint para mantener calidad de código |

---

## Configuración y Archivos de Soporte

### `vite.config.js`
Configuración del bundler Vite para desarrollo y build.

### `eslint.config.js`
Reglas de linting para mantener consistencia en el código.

### `tailwind.config.js`
Configuración personalizada de Tailwind CSS.

### `index.css`
Estilos globales y directivas de Tailwind CSS.

---

## Características de Diseño

### Glassmorphism
- Efectos de vidrio con `backdrop-filter: blur()`
- Bordes sutiles y sombras suaves
- Fondos semi-transparentes

### Animaciones
- Formas flotantes en el fondo
- Transiciones suaves entre estados
- Efectos hover interactivos

### Responsive Design
- Mobile-first approach
- Breakpoints de Tailwind CSS
- Adaptación automática de layouts

---

## Consideraciones de Desarrollo

### Estado de la Aplicación
- Uso de `useState` para estado local
- `useEffect` para efectos secundarios
- Context API para estado global (si aplica)

### Manejo de Errores
- Try-catch blocks para llamadas API
- Estados de error en componentes
- Feedback visual para usuarios

### Performance
- Lazy loading de componentes
- Optimización de re-renders
- Caching de datos cuando sea necesario

### Accesibilidad
- Semantic HTML
- ARIA labels donde sea necesario
- Navegación por teclado
- Contraste de colores adecuado

---

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Backend API ejecutándose en `http://localhost:8000`

### Instalación

```bash
# Clonar repositorio
git clone [url-del-repositorio]

# Navegar al directorio
cd cinematica-frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Cinemática
```

---

## Próximos Pasos y Mejoras

### Funcionalidades Pendientes
- [ ] Sistema de favoritos
- [ ] Filtros avanzados por género/año
- [ ] Paginación de resultados
- [ ] Perfil de usuario
- [ ] Sistema de comentarios en reseñas

### Optimizaciones Técnicas
- [ ] Implementar React Query para cache de datos
- [ ] Lazy loading de imágenes
- [ ] Service Worker para funcionalidad offline
- [ ] Tests unitarios y de integración

---

## Contribución

### Estándares de Código
- Seguir las reglas de ESLint configuradas
- Usar componentes funcionales con hooks
- Nomenclatura en camelCase para JavaScript
- Clases de Tailwind ordenadas alfabéticamente

### Proceso de Desarrollo
1. Crear branch feature desde main
2. Desarrollar funcionalidad
3. Ejecutar tests y linting
4. Crear Pull Request
5. Code review y merge

---

*Documentación generada para el proyecto Cinemática Frontend - Versión 1.0*