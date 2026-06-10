@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   紧急回滚 - 恢复blog.js到可用版本
echo ================================================
echo.

cd /d "%~dp0"

echo [1/4] 查看最近的提交历史...
git log --oneline -10
echo.

echo [2/4] 回滚blog.js到添加新文章之前...
git checkout HEAD~5 -- data/blog.js
echo ✅ blog.js已回滚
echo.

echo [3/4] 提交回滚...
git add data/blog.js
git commit -m "ROLLBACK: Revert blog.js to working version - new article broke the blog"
echo ✅ 回滚已提交
echo.

echo [4/4] 推送到GitHub...
git push origin main
echo ✅ 已推送到GitHub
echo.

echo ================================================
echo   回滚完成！
echo ================================================
echo.
echo 🎯 下一步：
echo   1. 在Coolify点击 "Redeploy"
echo   2. 等待部署完成（3-5分钟）
echo   3. 访问 https://www.custom-woodenbox.com/blog
echo   4. 检查旧文章是否恢复正常
echo.
echo ⚠️  新文章将被移除，但博客会恢复正常工作
echo.
pause
