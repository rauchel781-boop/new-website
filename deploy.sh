#!/bin/bash
# Git 部署脚本 - 适用于 Git Bash

cd "D:/new-website"

echo "正在添加修改的文件..."
git add data/blog.js

echo "创建提交..."
git commit -m "Add new blog post: How to Choose Wood Thickness for Custom Wooden Boxes"

echo "推送到 GitHub..."
git push origin main

echo "部署完成！"
echo "新文章将在5-10分钟后上线："
echo "https://www.custom-woodenbox.com/blog/how-to-choose-wood-thickness-for-custom-wooden-boxes"
