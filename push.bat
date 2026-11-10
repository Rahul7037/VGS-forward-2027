@echo off
REM Upload your changes to GitHub (Rahul7037/VGS-forward-2027).
REM Pulls first so you never overwrite newer changes, then commits and pushes.
cd /d "%~dp0"
set GIT=git -c credential.helper= -c credential.helper="!gh auth git-credential"

%GIT% pull --rebase --autostash origin main
if errorlevel 1 (
  echo.
  echo Pull failed - fix the problem above, then run push.bat again.
  pause
  exit /b 1
)

git add -A
set /p MSG=Commit message (Enter for "Update website"):
if "%MSG%"=="" set MSG=Update website
git commit -m "%MSG%"

%GIT% push origin main
echo.
echo Live site: https://rahul7037.github.io/VGS-forward-2027/
pause
