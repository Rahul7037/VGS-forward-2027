@echo off
REM Download the latest website files from GitHub (Rahul7037/VGS-forward-2027)
cd /d "%~dp0"
git -c credential.helper= -c credential.helper="!gh auth git-credential" pull --rebase origin main
echo.
pause
