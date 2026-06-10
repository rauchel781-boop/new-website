@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   强制重建并部署到 www.custom-woodenbox.com
echo ================================================
echo.

cd /d "%~dp0"

echo [1/4] 添加触发文件...
git add .rebuild-trigger
git add data/blog.js
echo ✅ 文件已添加
echo.

echo [2/4] 创建新的提交...
git commit -m "Force rebuild: deploy blog post - How to Choose Wood Thickness"
echo ✅ 提交已创建
echo.

echo [3/4] 推送到 GitHub...
git push origin main
echo ✅ 已推送到 GitHub
echo.

echo [4/4] 完成！
echo.

echo ================================================
echo   Git 推送完成！
echo ================================================
echo.
echo 📝 下一步操作：
echo   1. 返回 Coolify 控制面板
echo   2. 点击 "Redeploy" 按钮
echo   3. 这次会看到新的 Git Commit SHA
echo   4. 等待构建完成（3-5分钟）
echo.
echo 🔗 部署后访问：
echo   https://www.custom-woodenbox.com/blog/how-to-choose-wood-thickness-for-custom-wooden-boxes
echo.
pause
