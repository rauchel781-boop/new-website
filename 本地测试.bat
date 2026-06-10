@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   本地测试新文章
echo ================================================
echo.

cd /d "%~dp0"

echo 正在启动开发服务器...
echo.
echo 请在浏览器中访问：
echo   http://localhost:3000/blog
echo.
echo 查找新文章：
echo   How to Choose Wood Thickness for Custom Wooden Boxes
echo.
echo 如果在本地能看到，说明代码没问题，问题在Coolify部署
echo 如果在本地也看不到，说明代码有语法错误
echo.
echo 按 Ctrl+C 停止服务器
echo.

npm run dev
