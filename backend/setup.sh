#!/bin/bash

echo "Configurando entorno para MovieHub Backend..."

# Verificar si Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 no está instalado"
    echo "Por favor instala Python 3.8+ desde https://python.org"
    exit 1
fi

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
    echo "Creando entorno virtual..."
    python3 -m venv venv
fi

# Activar entorno virtual
echo "Activando entorno virtual..."
source venv/bin/activate

# Instalar dependencias
echo "Instalando dependencias..."
pip install -r requirements.txt

# Verificar si existe .env, si no crearlo desde .env.example
if [ ! -f ".env" ]; then
    echo "Creando archivo .env desde .env.example..."
    cp .env.example .env
    echo
    echo "¡IMPORTANTE!"
    echo "Por favor edita el archivo .env con tu configuración de base de datos"
    echo
fi

echo
echo "================================================"
echo "     MovieHub Backend configurado exitosamente!"
echo "================================================"
echo
echo "Para ejecutar el servidor:"
echo "  1. Asegúrate de tener PostgreSQL corriendo"
echo "  2. Configura las variables en el archivo .env"
echo "  3. Ejecuta: python main.py"
echo
echo "La API estará disponible en: http://localhost:8000"
echo "Documentación: http://localhost:8000/docs"
echo
