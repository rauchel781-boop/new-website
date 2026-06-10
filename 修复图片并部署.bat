@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   修复Hero图片并重新部署
echo ================================================
echo.

cd /d "%~dp0"

echo [1/3] 添加修改的文件...
git add data/blog.js
echo ✅ 文件已添加
echo.

echo [2/3] 创建提交...
git commit -m "Fix hero image path for wood thickness blog post"
echo ✅ 提交已创建
echo.

echo [3/3] 推送到 GitHub...
git push origin main
echo ✅ 已推送到 GitHub
echo.

echo ================================================
echo   修复完成！
echo ================================================
echo.
echo 📝 修改内容：
echo   ✅ 修复了新文章的hero图片路径
echo   从: /gift-boxes/keepsake-box/main.jpg (不存在)
echo   改为: /storage-box/wooden-desktop-storage/three-layer-wooden-organizer-1.jpg (存在)
echo.
echo 🎯 下一步操作：
echo   1. 返回 Coolify 控制面板
echo   2. 点击 "Redeploy" 按钮
echo   3. 等待部署完成（约2-3分钟）
echo   4. 访问新文章查看效果
echo.
echo 🔗 文章链接：
echo   https://www.custom-woodenbox.com/blog/how-to-choose-wood-thickness-for-custom-wooden-boxes
echo.
pause
