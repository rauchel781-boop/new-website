@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   终极解决方案 - 直接在GitHub验证
echo ================================================
echo.

cd /d "%~dp0"

echo [1/3] 显示最新commit信息...
git log --oneline -1
echo.

echo [2/3] 检查blog.js是否包含新文章...
findstr /C:"how-to-choose-wood-thickness" data\blog.js >nul
if %errorlevel%==0 (
    echo ✅ 新文章存在于本地blog.js中
) else (
    echo ❌ 新文章不在blog.js中！
)
echo.

echo [3/3] 检查远程GitHub状态...
git fetch origin
git status
echo.

echo ================================================
echo   诊断结果
echo ================================================
echo.
echo 请检查上面的输出：
echo.
echo 1. 最新commit是否包含 "blog post" 或 "wood thickness"？
echo 2. git status 是否显示 "Your branch is up to date"？
echo.
echo 如果显示 "Your branch is ahead"，说明代码还没推送！
echo 如果显示 "Your branch is behind"，说明远程有新提交！
echo.
pause
