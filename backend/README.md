correr el servidor:

Primero se activa la carpeta de venv
python -m venv venv

source venv/Scripts/activate

luego se modifican variables de entorno

y luego se corre el proyecto
uvicorn main:app --reload