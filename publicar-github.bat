@echo off
setlocal EnableDelayedExpansion
REM Sube la invitacion a GitHub. GitHub Pages la publica en https://USUARIO.github.io/REPOSITORIO/
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
  echo.
  echo  No se encontro Git. Instalalo con:  winget install Git.Git
  echo  Luego cierra esta ventana y vuelve a abrir este archivo.
  echo.
  pause
  exit /b
)

if not exist ".git" (
  git init -b main
)

git remote get-url origin >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Pega la URL de tu repositorio de GitHub, por ejemplo:
  echo    https://github.com/tu-usuario/invitacion-isabel-gerardo.git
  echo.
  set /p REPO=URL: 
  git remote add origin "!REPO!"
)

git add -A
git commit -m "Actualizar invitacion %date% %time%"
git push -u origin main

echo.
echo  Listo. Si es la primera vez, activa Pages en GitHub:
echo    Settings ^> Pages ^> Branch: main / (root) ^> Save
echo  Los cambios tardan 1 o 2 minutos en verse publicados.
echo.
pause
