@echo off
echo Configurando entorno para MovieHub Backend...

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python no está instalado o no está en el PATH
    echo Por favor instala Python 3.8+ desde https://python.org
    pause
    exit /b 1
)

REM Crear entorno virtual si no existe
if not exist "venv" (
    echo Creando entorno virtual...
    python -m venv venv
)

REM Activar entorno virtual
echo Activando entorno virtual...
call venv\Scripts\activate

REM Instalar dependencias
echo Instalando dependencias...
pip install -r requirements.txt

REM Verificar si existe .env, si no crearlo desde .env.example
if not exist ".env" (
    echo Creando archivo .env desde .env.example...
    copy .env.example .env
    echo.
    echo ¡IMPORTANTE! 
    echo Por favor edita el archivo .env con tu configuración de base de datos
    echo.
)

echo.
echo ================================================
echo     MovieHub Backend configurado exitosamente!
echo ================================================
echo.
echo Para ejecutar el servidor:
echo   1. Asegúrate de tener PostgreSQL corriendo
echo   2. Configura las variables en el archivo .env
echo   3. Ejecuta: python main.py
echo.
echo La API estará disponible en: http://localhost:8000
echo Documentación: http://localhost:8000/docs
echo.
pause
