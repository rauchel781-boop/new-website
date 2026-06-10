@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   触发配置变化 - 强制重建
echo ================================================
echo.

cd /d "%~dp0"

echo [1/4] 添加所有修改的文件...
git add next.config.js
git add data/blog.js
git add .rebuild-trigger
echo ✅ 文件已添加
echo.

echo [2/4] 创建新的提交（配置变化）...
git commit -m "Update config: force rebuild for blog post deployment"
echo ✅ 提交已创建
echo.

echo [3/4] 推送到 GitHub...
git push origin main
echo ✅ 已推送到 GitHub
echo.

echo [4/4] 完成！
echo.

echo ================================================
echo   配置已更新并推送！
echo ================================================
echo.
echo 📝 修改内容：
echo   ✅ next.config.js - 添加了部署注释
echo   ✅ data/blog.js - 新博客文章
echo   ✅ .rebuild-trigger - 触发文件
echo.
echo 🎯 下一步操作：
echo   1. 返回 Coolify 控制面板
echo   2. 点击 "Redeploy" 按钮
echo   3. 这次会检测到 next.config.js 配置变化
echo   4. Coolify 将强制重新构建（不再跳过）
echo   5. 等待构建完成（3-5分钟）
echo.
echo 🔗 部署后访问：
echo   https://www.custom-woodenbox.com/blog/how-to-choose-wood-thickness-for-custom-wooden-boxes
echo.
echo ⚠️  关键：这次修改了 next.config.js 配置文件
echo    Coolify 应该会识别为"配置变化"并重新构建！
echo.
pause
