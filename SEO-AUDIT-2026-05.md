# SEO 优化报告 — custom-woodenbox.com

日期：2026-05-22 · 范围：Google 关心的 18 个维度核查 + 修复 + 性能/缓存增强

---

## 一、总体结论

网站 SEO 底子非常扎实。对照真实代码逐项核查后，18 项里 **14 项完全属实、无需改动**，其余 4 项做了增强（均非 bug，属锦上添花）。基础设施层面（sitemap / hreflang / canonical / 结构化数据 / 多语言）是同类 B2B 站点里少见的规范。

随后做了一轮「超出 18 项」的深挖：核实后大多数候选项要么已实现（产品详情页早已带 Product + BreadcrumbList 结构化数据）、要么收益偏低/有重构风险。落地了六项真正高价值且低风险的增强：**⑤ 联系页 FAQPage**、**⑥ 缓存优化**、**⑦ 表单/搜索框可访问性**、**⑧ 减少动态效果偏好**、**⑨ 标签页 ARIA**、**⑩ 信息页 FAQ 扩展（内容创作）**。

---

## 二、18 维度核查结果（对照真实代码）

| # | 维度 | 核查结论 | 证据 / 备注 |
|---|------|----------|-------------|
| 1 | robots.txt | 属实 | `app/robots.js` 仅屏蔽 `/api/`、`/_next/`，sitemap/host 指向 www 规范域 |
| 2 | sitemap | 属实 | `app/sitemap.js` 无重复，8 语言 + x-default + 图片条目齐全；17 个产品分类全部纳入 |
| 3 | canonical | 属实 | `i18n/seo.js` 自引用 canonical；首页由 locale layout 统一设置（已确认无遗漏） |
| 4 | 重定向链 | 属实 | `next.config.js` 非 www→www 单跳 301，无双重跳转 |
| 5 | hreflang | 属实 | 8 语言 + x-default 双向，metadataBase 解析为绝对 URL |
| 6 | title / desc | 属实 | 13 个页面均有 generateMetadata，长度在推荐区间 |
| 7 | H1 层级 | 属实 | 每页恰好 1 个 h1，无跳级 |
| 8 | 结构化数据 | 属实 | Organization/Service/LocalBusiness/Breadcrumb/ItemList/FAQ/Article/Product；**无伪造 offers/评分** |
| 9 | 内链 | 属实 | 页眉/页脚/面包屑/产品网格全连通，无孤岛 |
| 10 | URL 结构 | 属实 | 全部语义化 kebab-case slug |
| 11 | OG / Twitter | **已增强** | 产品总览页与 5 个静态页此前只用全站默认卡 → 已补各自专属 OG 卡 |
| 12 | 关键词本地化 | 属实 | de/ja 等抽查为真翻译，非英文兜底 |
| 13 | LCP | **已增强** | preload 此前指向背景图，而高优先级标记在另一张拼图图上 → 已按视口对齐 |
| 14 | CLS | 属实 | 图片均有 width/height 或 aspect-ratio，字体 display:swap |
| 15 | INP | **已增强 + 待实测** | Clarity 由 afterInteractive 降为 lazyOnload；线上实测仍待补（见末节） |
| 16 | 移动端 | 属实 | viewport 已设，Tailwind 响应式，未锁缩放（合规） |
| 17 | HTTPS | 属实 | 全站 https，无硬编码 http://，Coolify Let's Encrypt |
| 18 | 图片 SEO | 属实 | alt 齐全、文件名语义化、image sitemap 已接入 |

---

## 三、本次所做的修改

### ① INP — Clarity 降级
- `components/ClarityAnalytics.jsx`：`strategy="afterInteractive"` → `"lazyOnload"`。
  Clarity 是纯观测脚本（热图/录屏），对首屏与交互无贡献，延后到浏览器空闲再加载，给早期易卡顿窗口让出主线程。

### ② LCP — 预加载按视口对齐
- `app/[locale]/page.js`：英雄区有两个 LCP 候选，按断点拆分预加载，避免两张图同时抢占带宽：
  - `≤959px`（移动/平板，拼图堆叠在长文本下方）→ 预加载全幅背景图 `chic-factory-*.webp`。
  - `≥960px`（桌面，拼图主图与文字并排且明亮）→ 预加载拼图主图 `production.webp`。
  - 同时移除拼图主图上的 blanket `fetchpriority="high"`，改由视口级 preload 决定优先级。

### ③ OG / Twitter — 各页专属分享卡
- 新增 `lib/og-card.js`：共享的品牌化 1200×630 OG 卡生成器（与全站默认卡视觉一致，参数化标题）。
- 新增 6 个 `opengraph-image.js`：`products`、`about`、`capabilities`、`material-guide`、`wood-fabrication`、`contact`，各配专属文案。

### ④ 产品图改 next/image
- `package.json` + `package-lock.json`：新增并锁定依赖 `sharp@^0.33.5`（Next 14 自托管做图片优化必需）。
- `next.config.js`：`images.formats: ['image/avif','image/webp']`，开启 AVIF 协商。
- `components/ProductGrid.js`、`components/ProductGallery.js`：原生 `<img>` → `next/image`（`fill` + 精确 `sizes`），PDP 主图加 `priority`。

### ⑤ 联系页补 FAQPage 结构化数据
- `app/[locale]/contact/page.js`：服务端注入 `FAQPage` JSON-LD，镜像可见的 8 条 FAQ（`contact.faq` 翻译，q1/a1…q8/a8），8 语言本地化。有机会拿到 Google 的 FAQ 富媒体结果。

### ⑥ 缓存优化（静态资源 + 优化图）
- `next.config.js`：
  - `images.minimumCacheTTL: 604800`：经 `next/image` 优化的图片缓存从默认 60 秒提到 7 天（与 ④ 配套，直接惠及产品图）。
  - 新增 `Cache-Control` 头规则，匹配 `/public` 下的 `jpg/jpeg/png/gif/svg/ico/webp/avif/woff/woff2`：`public, max-age=604800, stale-while-revalidate=86400`。Next 默认对这些静态文件是 `max-age=0`，回头客每次重下大图；7 天缓存（不加 `immutable`，因文件名非内容哈希）显著加快重复访问，同时不会在换图时长期返回旧图。
  - source 匹配规则已用 Next 自带的 `path-to-regexp` 校验：能匹配静态图/字体、且不会误伤 `/en/products`、`/sitemap.xml` 等路由。

---

### ⑦ 可访问性（a11y）— 表单/搜索框可访问名 + 状态播报
- `components/NewsletterForm.js`、`components/Footer.js`、`components/SearchModal.jsx`：三处输入框此前只有 `placeholder`、没有可访问名（屏幕阅读器不会把 placeholder 当作字段名，违反 WCAG 4.1.2 / 3.3.2）。已补 `aria-label`（复用现有本地化字符串，**无任何视觉变化**，8 语言自动跟随）。
- 两处订阅表单的状态消息（成功/失败）加了 `role="status" aria-live="polite"`，让屏幕阅读器在提交后能朗读结果。

---

### ⑧ 可访问性 — 尊重「减少动态效果」偏好
- `app/globals.css`：新增 `@media (prefers-reduced-motion: reduce)` 全局规则，对设置了系统级「减少动态」的用户把动画/过渡收敛到近乎瞬时、并关掉平滑滚动。主要消除英雄区那条 18 秒无限循环背景动画与各处淡入，对前庭功能敏感人群更友好；其余用户不受影响。

### ⑨ 可访问性 — 产品详情标签页补 ARIA 角色
- `components/ProductTabs.js`：标签页此前无任何 ARIA。已补 `role="tablist"/"tab"/"tabpanel"`、`aria-selected`、`aria-controls`/`aria-labelledby`，让屏幕阅读器正确识别「这是一组标签页、当前选中哪个」。**刻意不改 tabindex/键盘行为**（按钮本就可聚焦、可 Tab/回车操作），属纯语义增强、零视觉与行为变化。

---

### ⑩ 信息页 FAQ 扩展（独特内容 + FAQPage schema）
- 新增 `data/page-faqs/`（en.js + index.js，结构对齐 `data/category-faqs`）与 `components/PageFaq.jsx`（自带样式的服务端组件，原生 `<details>` 手风琴 + FAQPage JSON-LD）。
- 为三个信息页各写了 8 条**独特、关键词导向**的英文 FAQ（与各分类页 FAQ 无重复）：
  - **材料指南** `/material-guide`：选材类长尾（泡桐 vs 松木、竹子、耐久性、实木 vs MDF、FSC/CARB 认证…）。
  - **木作工艺** `/wood-fabrication`：工艺类长尾（CNC/激光刻字/闭合方式/OEM vs ODM/表面处理/内衬/QC…）。
  - **产品总览** `/products`：下单类长尾（产品类型/MOQ/交期/打样/全球发货/报价/全定制/出口包装…）。
- 事实性声明基于站内数据（15,000㎡ 工厂、OEM/ODM、五种木材、闭合方式、FSC/CARB/REACH/ISO 9001）；**MOQ、交期、打样费、可达国家等具体数字已用 `[待你确认]` 标注**，需你核对真实值后再上线。
- **目前仅英文（/en）生效**：`getPageFaqs` 对未翻译的语言返回 null、页面不渲染该 FAQ，避免在非英文页出现英文内容（混合语言伤 SEO）。其余 7 语言待翻译后逐个接入。
- 附带修复：`material-guide/page.js` 文件尾部有 264 个 NUL 垃圾字节（历史损坏），已清除。

---

## 四、验证情况与待办（需你这边确认/执行）

**已验证：** 全部改动文件通过 TypeScript/JSX 语法解析；`next.config.js` 能加载、其 `headers()`/`redirects()` 的 source 均通过 `path-to-regexp` 编译校验；`package.json`/`package-lock.json` 合法且已锁定 sharp；a11y 改动经 git 暂存内容解析校验通过。

**未能在本环境完成的：** 完整的 8 语言生产构建——隔离沙箱内存不足（编译阶段 SIGBUS）且单命令有 45 秒上限，无法跑完。这是环境限制，非代码问题。

**请你执行 / 确认：**
1. 本地或 Coolify 跑一次 `npm install && npm run build` 确认通过（lock 已含 sharp，`npm ci` 亦可）。
2. **INP 实测**：本环境网络白名单屏蔽了 PageSpeed Insights API。请到 https://pagespeed.web.dev 对线上站点跑一次 mobile 测量，把 INP 数字补进第 15 项。
3. **LCP 改动复核**：第 ② 项的「桌面/移动端 LCP 元素」是基于布局推断；建议用上面那次 PSI 实测确认每个断点真正的 LCP 元素，必要时微调 preload 的 `media` 断点。
4. **缓存验证**：部署后用浏览器开发者工具的 Network 面板，点开任一产品图，确认响应头里出现 `Cache-Control: public, max-age=604800...`（若 Coolify 反向代理另设了缓存策略，以代理为准）。


---

## 五、线上实测结果（2026-05-25 · PageSpeed 手机端）

测试条件：Moto G Power · Lighthouse 13.0.1 · 低速 4G 节流（较严苛的实验环境）。规范域名 https://www.custom-woodenbox.com/en 。

| 指标 | 数值 | 评级 |
|------|------|------|
| 性能 Performance | 84 | 良（橙）|
| 无障碍 Accessibility | 97 | 优 |
| 最佳做法 Best Practices | 100 | 满分 |
| SEO | 100 | 满分 |
| FCP 首次内容绘制 | 1.4 s | ✅ 优 |
| **LCP 最大内容绘制** | **4.1 s** | ⚠️ 偏慢（Google「差」阈值 >4s）|
| TBT 总阻塞时间 | 20 ms | ✅ 优（INP 的实验代理指标）|
| CLS 累积布局偏移 | 0 | ✅ 满分 |
| Speed Index | 4.6 s | 一般 |

**第 15 项 INP — 判定达标。** 实验环境不直接产出 INP，但其代理指标 TBT 仅 20 ms（极佳），交互延迟风险确实很低；真实用户 INP 待 CrUX 数据积累（当前「无任何数据」，新站常见）。

**唯一明显短板：LCP 4.1 s（手机端）。** 其余指标（CLS 0、TBT 20 ms、a11y 97、最佳做法/SEO 满分）都很好。LCP 在低速 4G 实验环境下偏慢，是下一步性能优化最该针对的点——需深入排查英雄区真正的 LCP 元素加载（预加载是否命中、字体/JS 是否阻塞渲染、图片尺寸与优先级）。FCP 1.4 s 但 LCP 4.1 s，二者差距大，说明 LCP 元素在首次绘制后很久才出现，值得专门定位。
