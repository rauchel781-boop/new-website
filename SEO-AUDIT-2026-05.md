# SEO 优化报告 — custom-woodenbox.com

日期：2026-05-22 · 范围：Google 关心的 18 个维度核查 + 修复

---

## 一、总体结论

网站 SEO 底子非常扎实。对照真实代码逐项核查后，18 项里 **14 项完全属实、无需改动**，其余 4 项做了增强（均非 bug，属锦上添花）。基础设施层面（sitemap / hreflang / canonical / 结构化数据 / 多语言）是同类 B2B 站点里少见的规范。

随后又做了一轮「超出 18 项」的深挖扫描，核实后大多数候选项要么已经实现（产品详情页早已带 Product + BreadcrumbList 结构化数据）、要么收益偏低/有重构风险（如把页面内联 CSS 抽成模块）。其中真正高价值且低风险的一项已落地：**⑤ 联系页补 FAQPage 结构化数据**。

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
| 8 | 结构化数据 | 属实 | Organization/Service/LocalBusiness/Breadcrumb/ItemList/FAQ/Article；**无伪造 offers/评分** |
| 9 | 内链 | 属实 | 页眉/页脚/面包屑/产品网格全连通，无孤岛 |
| 10 | URL 结构 | 属实 | 全部语义化 kebab-case slug |
| 11 | OG / Twitter | **已增强** | 产品总览页与 5 个静态页此前只用全站默认卡 → 已补各自专属 OG 卡 |
| 12 | 关键词本地化 | 属实 | de/ja 等抽查为真翻译，非英文兜底 |
| 13 | LCP | **已增强** | preload 此前指向背景图，而高优先级标记在另一张拼图图上 → 已按视口对齐 |
| 14 | CLS | 属实 | 图片均有 width/height 或 aspect-ratio，字体 display:swap |
| 15 | INP | **已增强 + 待实测** | Clarity 由 afterInteractive 降为 lazyOnload；线上实测仍待补（见第四节） |
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
  - 同时移除拼图主图上的 blanket `fetchpriority="high"`，改由视口级 preload 决定优先级，避免在移动端抢占真正的背景 LCP。

### ③ OG / Twitter — 各页专属分享卡
- 新增 `lib/og-card.js`：共享的品牌化 1200×630 OG 卡生成器（与全站默认卡 `app/opengraph-image.js` 视觉一致，参数化标题）。
- 新增 6 个 `opengraph-image.js`（沿用你既有的文件约定，和博客/产品详情页一致）：
  `products`、`about`、`capabilities`、`material-guide`、`wood-fabrication`、`contact`，各配专属文案。

### ⑤ 联系页补 FAQPage 结构化数据
- `app/[locale]/contact/page.js`：服务端注入 `FAQPage` JSON-LD，镜像页面上可见的 8 条 FAQ（取自 `contact.faq` 翻译，q1/a1…q8/a8），8 语言各自本地化。
  联系页本就有 FAQ 折叠面板却缺结构化数据；补上后有机会拿到 Google 的 FAQ 富媒体结果。新增 `JsonLd` 引用，渲染在 `<ContactClient />` 之前。

### ④ 产品图改 next/image
- `package.json`：新增依赖 `sharp@^0.33.5`（Next 14 自托管 `next start` 做图片优化必需，否则线上优化端点会报错）。
- `next.config.js`：`images.formats: ['image/avif','image/webp']`，开启 AVIF 协商。
- `components/ProductGrid.js`、`components/ProductGallery.js`：原生 `<img>` → `next/image`（`fill` + 精确 `sizes`），产品详情主图加 `priority`。自动产出响应式 AVIF/WebP srcset。

---

## 四、验证情况与待办（需你这边确认/执行）

**已验证：** 全部改动文件通过 TypeScript/JSX 语法解析；`next.config.js`、`package.json` 均能正确加载；`package-lock.json` 已锁定 sharp；`sharp` 在隔离环境安装成功。

**未能在本环境完成的：** 完整的 8 语言生产构建——隔离沙箱内存不足（编译阶段 SIGBUS）且单命令有 45 秒上限，无法跑完。这是环境限制，非代码问题。构建已进入编译阶段且未报任何代码错误。

**请你执行 / 确认：**
1. 本地或 Coolify 跑一次 `npm install && npm run build` 确认通过（lock 已含 sharp，`npm ci` 亦可）。
2. **INP 实测**：本环境的网络白名单屏蔽了 PageSpeed Insights API（googleapis.com）。请到 https://pagespeed.web.dev 对线上站点跑一次 mobile 测量，把 INP 数字补进上表第 15 项；或让管理员把 googleapis.com 加进白名单后我来跑。
3. **LCP 改动复核**：第 ② 项里「桌面 LCP 是拼图主图、移动端是背景图」是基于布局推断的；建议用上面那次 PSI 实测确认每个断点真正的 LCP 元素，必要时微调 preload 的 `media` 断点。
