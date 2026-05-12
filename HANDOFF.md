# CHIC 木盒 B2B 网站 — 项目交接文档

> 给下一个 Claude / AI 助手看的。把这份文档完整贴进去，再说你要做什么。

---

## 一、项目基本信息

- **公司**：Xiamen Chic Homeware（CHIC）
- **业务**：定制木盒 B2B，对外贸客户卖各种木盒（材质 / 用途 / 结构三大类）
- **域名**：https://custom-woodenbox.com
- **本地路径**：`D:\new-website`
- **GitHub 仓库**：`rauchel781-boop/new-website`，主分支 `main`
- **部署平台**：Coolify on Netcup VPS，GitHub webhook 自动部署
- **Coolify 镜像 UUID**：`ametws0l193macas5jrf9lbj`（部署日志里能看到）

## 二、技术栈

- **框架**：Next.js 14.2.5 App Router
- **i18n**：next-intl 3.26.5（**不要升级到 4.x**，会和 Next 14 冲突）
- **路由结构**：
  - 8 语言：`en`（默认）/ `es` / `fr` / `de` / `it` / `pt` / `ja` / `ko`
  - 路径：`app/[locale]/...`
  - 产品分类页：`/[locale]/products/[slug]`（slug = 分类名，如 `wine-whisky`）
  - 产品详情页：`/[locale]/products/[slug]/[product]`
- **聊天**：Tawk.to（3 秒延迟加载）
- **字体**：Google Fonts via `next/font/google`（3 个权重，砍过的）
- **图片**：全部 WebP，Hero 图 3 个响应式尺寸 + image-set + preload

## 三、核心文件结构

```
D:\new-website\
├── app/
│   ├── [locale]/
│   │   ├── page.js                          # 首页
│   │   ├── about/page.js
│   │   ├── capabilities/page.js
│   │   ├── material-guide/page.js
│   │   ├── products/page.js                 # 产品总览
│   │   ├── products/[slug]/page.js          # 分类页（async function）
│   │   ├── products/[slug]/[product]/page.js # 产品详情（async function）
│   │   └── blog/[slug]/page.js
│   ├── robots.js
│   ├── sitemap.js                           # 自动遍历 + hreflang + image:image
│   ├── fonts.js                             # next/font 配置
│   └── layout.js
├── components/
│   ├── ProductGrid.js                       # 'use client', useMemo 本地化
│   ├── JsonLd.jsx                           # 通用结构化数据组件
│   └── TawkChat.jsx                         # 延迟 3s 加载
├── data/
│   ├── site-config.js                       # siteUrl 单一来源
│   ├── categories.js                        # 17 分类 + tagline/intro 7 语
│   ├── home/{locale}.js                     # 首页 8 语
│   ├── about/{locale}.js                    # About 页 8 语
│   ├── material-guide/{locale}.js           # 材质指南 8 语
│   ├── products/
│   │   ├── {category}.js                    # 17 个分类产品数据（英文源数据）
│   │   └── translations/
│   │       ├── index.js                     # 派发器 + getProductTranslation 函数
│   │       ├── en.js                        # 空（英文是源数据）
│   │       ├── es.js / fr.js / de.js / it.js / pt.js / ja.js / ko.js
│   │       └── （每个产品翻译 4 字段：name / closure / tagline / intro）
└── i18n/
    ├── request.js                           # 用新版 await requestLocale API
    ├── navigation.js                        # Link 等
    └── seo.js                               # alternates 辅助
```

## 四、产品翻译机制

**核心模式**：翻译覆盖（translation overlay）

```js
// 英文（源数据）
const productRaw = PRODUCTS_BY_CATEGORY[slug].find(p => p.slug === productSlug);

// 多语言（覆盖在英文上面）
const product = { ...productRaw, ...getProductTranslation(productRaw.slug, locale) };
```

`getProductTranslation(productSlug, locale)` 在 `data/products/translations/index.js`：
- 根据 locale 读对应的 `{locale}.js`
- 找 productSlug 对应的翻译对象 `{ name, closure, tagline, intro }`
- 没找到就返回空对象（fallback 到英文）

**翻译文件格式**（紧凑一行一产品，已验证稳定）：

```js
const TRANSLATIONS = {
  // === CATEGORY-NAME ===
  'product-slug': { name: '...', closure: '...', tagline: '...', intro: '...' },
  'another-slug': { name: '...', closure: '...', tagline: '...', intro: '...' },
  ...
};
export default TRANSLATIONS;
```

## 五、翻译进度：186/186 = **100%** ✅

**全 17 个分类全部完成 7 语翻译**：

| 分类组 | 分类名 | 产品数 | 状态 |
|---|---|---|---|
| 材质类 | paulownia / pine / bamboo / acacia / walnut | 68 | ✅ |
| 用途类 | gift-packaging / watch-jewelry / wine-whisky / kitchen-dining / garden-seed / storage | 44 | ✅ |
| 用途类 | tea-coffee | 29 | ✅ |
| 结构类 | hinged / sliding-lid / drawer / magnetic / with-lock | 45 | ✅ |
| **总计** | | **186** | **100%** |

翻译总条数：186 × 7 语 × 4 字段 = 5208 字段。

**closure 类型译名对照表**（已稳定，复用即可）：

| Source | es | fr | de | it | pt | ja | ko |
|---|---|---|---|---|---|---|---|
| Magnetic | Magnética | Magnétique | Magnetisch | Magnetica | Magnética | マグネット式 | 자석식 |
| Hinged | Con Bisagra | À Charnière | Mit Scharnier | Con Cerniera | Com Dobradiça | 蝶番式 | 경첩식 |
| Sliding | Tapa Deslizante | Couvercle Coulissant | Schiebedeckel | Coperchio Scorrevole | Tampa Deslizante | スライド蓋 | 슬라이딩 뚜껑 |
| Drawer | Cajón | Tiroir | Schublade | Cassetto | Gaveta | ドロワー | 서랍 |
| Open | Abierta | Ouverte | Offen | Aperta | Aberta | オープントップ | 오픈탑 |
| Lift-off | Tapa Removible | Couvercle Amovible | Abnehmbar | Coperchio Estraibile | Tampa Removível | 取り外し蓋 | 분리식 뚜껑 |
| Lock | Con Cerradura | Avec Serrure | Mit Schloss | Con Serratura | Com Fechadura | ロック付き | 잠금식 |

## 六、已踩过的坑（重要）

### 坑 1：virtiofs mount 缓存截断
**症状**：从 Claude 沙盒 bash 读 `D:\new-website` 的文件，可能看到只有原始内容（截断在某行），而 Read tool（走 Windows fs）看到的是完整内容。
**结论**：Windows fs 是真实数据源；GitHub Desktop 在 Windows 读，提交的内容是完整的。bash 看不全不要慌。
**验证方式**：
- 用 Read tool 读文件末尾几行
- 或者 commit + push 后，去 GitHub 网页看那个 commit 的 diff
- bash `node --check` 报错时，先用 Read 看真实文件再判断

### 坑 2：重 Unicode 分隔符
`═══` 这种重 unicode 字符会触发 byte-boundary bug，让 Edit 操作截断。**只用 ASCII**，比如 `// === SECTION ===`。

### 坑 3：JS 转义
**优先用 U+2019 弯撇号 `'`** 代替 ASCII 直撇号 `'`，避免转义问题：
- `l'opzione` → 写 `l'opzione`（弯撇号，无需转义）
- `aujourd'hui` → 写 `aujourd'hui`
- 这同时也是更正确的西式排版

如果非要用直撇号，单引号字符串里要写 `\'`（不是 `\\'`）。

### 坑 4：批次大小
**单次 Edit 加 73 个产品（约 400+ 行）会触发截断**。验证过的安全批量：**44 个产品 / ~50 行**。

实战验证过的批次：
- tea-coffee 29 个 ✅
- hinged 10 + sliding-lid 9 = 19 个 ✅
- drawer 8 + magnetic 9 + with-lock 9 = 26 个 ✅

### 坑 5：next-intl 版本
**不要装 4.x**，会和 Next 14.2.5 冲突。锁定在 3.26.5。

### 坑 6：Coolify webhook 偶尔不触发
**症状**：push 完 5 分钟还没看到新部署。
**解决**：Coolify 后台 → 你的应用 → Deployments 页 → 右上角点 **Redeploy** 手动触发。
**根因待查**：GitHub Settings → Webhooks → Recent Deliveries 看 Coolify 的 webhook 调用是否 200。

### 坑 7：根目录的 .xlsx 工作文件
**症状**：用户在 `D:\new-website\` 根目录放了一堆 `样本_xxx.xlsx`（发票、装箱单、样品单），每次 GitHub Desktop commit 都会列出来当作 untracked 新文件。
**解决**：`.gitignore` 已加规则屏蔽 `*.xlsx` / `*.xls` / `样本_*`，下次不会再出现。

## 七、本次已完成的非翻译工作

### BreadcrumbList JSON-LD 本地化（2026-05-12）
**之前的 bug**：
- `app/[locale]/products/[slug]/page.js` 和 `[product]/page.js` 的 BreadcrumbList itemListElement 写死 `'Home'` / `'Products'` 等英文名
- `item` URL 没有 locale 前缀（`https://custom-woodenbox.com/products` → 走中间件重定向才到 `/en/products`，1 跳 hop 浪费）

**修复后**：
- `name` 走 `nav.home` / `nav.products` / `categories.${slug}` 的本地化值
- `item` URL 加上 `${localePrefix}` 前缀
- 产品详情页里 `productLd.url` 和 `productLd.category` 也跟着本地化
- 分类页的 ItemList JSON-LD 用 `getProductTranslation` 拉本地化产品名
- 产品详情页 `export default function` 改成 `async function` 以 await `getTranslations`

副作用：把 `getProductTranslation` 添加为 `[slug]/page.js` 的 import，把 `getTranslations` 添加为 `[product]/page.js` 的 import。

## 八、网站当前性能 / SEO 状态

按 Google 18 个 SEO 维度核查的现状（详见之前对话的核对结果）：

- ✅ robots.txt：干净
- ✅ sitemap：432 条无重复 + 含图片
- ✅ canonical：self-ref
- ✅ 重定向链：一跳直达
- ✅ hreflang：8 语言 + x-default 双向（blog 是 EN-only，所有 locale canonical 到 /en/blog）
- ✅ title / desc：在推荐字符范围
- ✅ H1 层级：每页 1 个
- ✅ 结构化数据：Org（首页）+ Product+Breadcrumb（产品页，**已本地化**）+ Article+Breadcrumb（博客）+ ItemList（分类页）
- ✅ 内链：无孤岛
- ✅ URL：全部语义化
- ✅ OG / Twitter：每页齐
- ✅ 关键词布局：8 语言已本地化（产品 name/closure/tagline/intro 都译了；**但参见第九节待办** — 产品详情页还有大量页面字符串是英文写死）
- ✅ LCP：Hero preload 已加
- ✅ CLS：所有 img 加 width/height 防 CLS
- ⚠️ INP：未实测（风险低）
- ✅ 移动端：响应式 + viewport
- ✅ HTTPS：Coolify Let's Encrypt
- ✅ 图片 SEO：alt + 文件名 + image sitemap

## 九、剩余待办（按优先级排）

### 高优先级

1. **产品详情页正文 i18n 大改造**（最大块的活）
   翻译 overlay 只覆盖了 name / closure / tagline / intro 4 个字段。但 `[product]/page.js` 渲染时还有大量英文硬编码：
   - `specs` 表格的 key（"Closure Type" / "Material" / "Surface Finish" / "Lead Time" / "MOQ" / "Branding"）和 value
   - `customization` 数组（每个产品 6 条左右）
   - `packaging` 段落
   - `useCases` 数组
   - Trust badges：「FSC Certified / EU REACH / SGS Tested / 20+ Years Export」（line 486-491）
   - Inquiry banner：「Ready to Order X? / Send us your specs... / Email Us Now → / Chat on WhatsApp」（line 526-534）
   - Related products 区块标题（line 542-543）
   - `ProductTabs.js` 的 4 个 tab label（Description / Specifications / Customization / Packaging & Shipping）+ 两段套话（line 114-118, 146-151）
   
   工作量：远超翻译产品名。需要先把这些字符串抽到 `next-intl` messages namespace，再翻 7 语。建议分模块做（先抽 trust badges + inquiry banner 这种短的，再做 specs/customization 这种数据驱动的）。

2. **INP 实测**
   GSC → Core Web Vitals 看实地数据；PSI → 跑 lab INP；潜在大户：`TawkChat`（第三方）、`ProductGallery`（client component）。

### 中优先级

3. **博客 8 语化**
   现在博客 EN-only，所有 locale canonical 到 `/en/blog`。如果要翻：要写新的 blog 内容数据结构（按 locale 分），改 sitemap 把博客也按 locale 输出，改 page-level metadata 的 alternates。

4. **FAQ schema / HowTo schema**
   - FAQ schema → 加在 capabilities 页和 material-guide 页（B2B 询盘问 FAQ 多）
   - HowTo schema → 加在 material-guide 的「选材步骤」上

### 低优先级 / 可选

5. **OG 图升级**：现在 `layout.js:48` 用 `/logo.png` 当 1200×630 OG card，实际文件可能不是这个尺寸。做个专门的 social card 图。

6. **产品图 alt 微调**：`ProductGallery.js:102` 的 alt 是 `${name} — view ${idx + 1}`，「view」这词在所有语言都是英文。改成 `t('imageView', { idx: idx + 1 })` 之类。

7. **加阿拉伯语 / 俄语 / 越南语** 等新市场（如果业务有需求）。

## 十、和用户沟通的风格备注

- 用户是中文母语，倾向中英混用沟通
- 喜欢「小批量验证」的工作方式，不喜欢一次堆几百行后才发现错
- 提交都用 **GitHub Desktop**（Windows 端），不在沙盒里直接 git commit
- 部署后会让用户用**无痕浏览器**验证（避开缓存）
- Coolify webhook 偶尔不触发，记得提醒用户去手动 Redeploy
- 出问题先让用户**按 F12 看 Console** 报错
- bash 看到的文件长度可能是 virtiofs 缓存的，Read tool 是真实数据源
- 根目录有一堆 `样本_*.xlsx` 是用户自己的工作文件，已在 `.gitignore` 屏蔽

---

**最后状态**（2026-05-12 verified）：
- 整站翻译：**186/186 = 100% ✅**（8 语全部覆盖）
- 上次大改：commit `fee12a3` BreadcrumbList 本地化 + tea-coffee 29 翻译
- 之后又跟了：hinged+sliding-lid 19 翻译、drawer+magnetic+with-lock 26 翻译
- 用户已浏览器验证：「可以了」
- 下一步：第九节待办中选一项继续（推荐先做「产品详情页正文 i18n 改造」或「INP 实测」）
