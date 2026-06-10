@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   部署新文章到 www.custom-woodenbox.com
echo ================================================
echo.

cd /d "%~dp0"

echo [1/5] 检查 Git 状态...
git status
echo.

echo [2/5] 添加修改的文件到 Git...
git add data/blog.js
echo ✅ blog.js 已添加
echo.

echo [3/5] 创建提交...
git commit -m "Add new blog post: How to Choose Wood Thickness for Custom Wooden Boxes"
echo ✅ 提交已创建
echo.

echo [4/5] 推送到 GitHub...
git push origin main
echo ✅ 已推送到 GitHub
echo.

echo [5/5] 完成！
echo.

echo ================================================
echo   部署完成！
echo ================================================
echo.
echo 📝 新文章信息：
echo   标题: How to Choose Wood Thickness for Custom Wooden Boxes: A Buyer's Guide
echo   分类: Buyer Guides
echo   日期: 2026-06-10
echo   阅读时间: 16 min read
echo   字数: ~2,800 words
echo   图片数量: 12张
echo   表格数量: 3个
echo.
echo 🔗 新文章链接：
echo   https://www.custom-woodenbox.com/blog/how-to-choose-wood-thickness-for-custom-wooden-boxes
echo.
echo 📊 文章亮点：
echo   - 3mm到15mm完整厚度指南
echo   - 5种木盒类型详细推荐
echo   - 6种材料厚度对比
echo   - 盖子/底部/分隔板厚度说明
echo   - LOGO工艺对厚度要求
echo   - 成本/MOQ/运输影响分析
echo.
echo ⏰ 预计5-10分钟后文章将上线！
echo.
pause
