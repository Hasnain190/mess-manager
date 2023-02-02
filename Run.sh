@echo off


set "VENV_NAME=env"

cd /d %CD%

call "%VENV_NAME%\Scripts\activate.bat"

python manage.py runserver
