@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   强制清除Next.js缓存并重新部署
echo ================================================
echo.

cd /d "%~dp0"

echo [1/5] 删除本地.next缓存...
if exist ".next" (
    rmdir /s /q .next
    echo ✅ .next目录已删除
) else (
    echo ℹ️  .next目录不存在
)
echo.

echo [2/5] 删除node_modules/.cache...
if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache"
    echo ✅ node_modules\.cache已删除
) else (
    echo ℹ️  node_modules\.cache不存在
)
echo.

echo [3/5] 添加修改的文件...
git add data/blog.js
echo ✅ 文件已添加
echo.

echo [4/5] 创建提交...
git commit -m "Force rebuild: clear cache and regenerate static pages for new blog post"
echo ✅ 提交已创建
echo.

echo [5/5] 推送到GitHub...
git push origin main
echo ✅ 已推送到GitHub
echo.

echo ================================================
echo   准备完成！
echo ================================================
echo.
echo 🎯 下一步关键操作：
echo.
echo   在Coolify中必须执行以下步骤：
echo.
echo   1. 点击 "Stop" 停止当前容器
echo   2. 点击 "Advanced" 下拉菜单
echo   3. 点击 "Remove Build Cache" 清除构建缓存
echo   4. 点击 "Redeploy"
echo   5. 等待完整构建（约5-10分钟）
echo.
echo ⚠️  重要：必须清除Coolify的构建缓存！
echo    否则Next.js会继续使用旧的静态页面
echo.
echo 🔗 构建完成后访问：
echo   https://www.custom-woodenbox.com/blog/how-to-choose-wood-thickness-for-custom-wooden-boxes
echo.
pause
