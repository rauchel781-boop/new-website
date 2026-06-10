@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   最终部署 - 版本号变化强制重建
echo ================================================
echo.

cd /d "%~dp0"

echo [1/4] 添加所有修改的文件...
git add package.json
git add data/blog.js
echo ✅ 文件已添加
echo.

echo [2/4] 创建新的提交（版本号变化）...
git commit -m "Bump version to 0.1.1 - force rebuild for blog post"
echo ✅ 提交已创建
echo.

echo [3/4] 推送到 GitHub...
git push origin main
echo ✅ 已推送到 GitHub
echo.

echo [4/4] 完成！
echo.

echo ================================================
echo   版本号已更新并推送！
echo ================================================
echo.
echo 📝 修改内容：
echo   ✅ package.json - 版本号从 0.1.0 → 0.1.1
echo   ✅ data/blog.js - 新博客文章
echo.
echo 🎯 下一步操作：
echo   1. 返回 Coolify 控制面板
echo   2. 点击 "Stop" 停止当前容器（如果还在运行）
echo   3. 点击 "Advanced" → 清除所有缓存选项
echo   4. 点击 "Force deploy (without cache)" 紫色按钮
echo   5. 这次会识别 package.json 版本变化
echo   6. Coolify 将从零开始重新构建
echo   7. 等待 5-10 分钟（完整构建需要更长时间）
echo.
echo 🔗 部署后访问：
echo   https://www.custom-woodenbox.com/blog
echo.
echo ⚠️  关键：修改了 package.json 版本号
echo    这是 Coolify 最容易识别的配置变化！
echo.
pause
