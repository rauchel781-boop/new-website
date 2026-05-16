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

### Privacy Policy + Terms of Service 上线（2026-05-12）
**背景**：合规审计发现网站全裸 — 没 Privacy Policy、没 Terms、没 Cookie banner、没 GA4，Newsletter 表单收 email 还没任何同意机制。这次先补最紧迫的两个法律页 + Footer 同意小字。

**新建文件**：
- `app/[locale]/privacy/page.js` — 12 节通用 B2B 外贸 Privacy Policy（英文 only，canonical 到 /en/privacy，仿照 blog 的处理）
- `app/[locale]/terms/page.js` — 14 节 Terms of Service（同上 canonical 策略）

**改动文件**：
- `components/Footer.js`
  - 底部栏（bot-inner）加 Privacy + Terms 链接，居中位置，用 `·` 分隔
  - Newsletter 表单下加 GDPR 风格同意小字，用 `t.rich()` 渲染 `<privacy>...</privacy>` 占位符为 Link
  - 加了对应 CSS：`.bot-legal` / `.bot-legal-sep` / `.news-fine`
- `app/sitemap.js` — `/en/privacy` 和 `/en/terms` 入口（changeFrequency: yearly, priority: 0.3）
- `messages/{en,es,fr,de,it,pt,ja,ko}.json` × 8 — 每个加 3 个新 key：
  - `footer.privacy`（Privacy Policy 译名）
  - `footer.terms`（Terms of Service 译名）
  - `footer.newsletterConsent`（同意文案，含 `<privacy>...</privacy>` 富文本标签）

**法律文案需要律师过的几条**：
- 仲裁机构选了 Xiamen Arbitration Commission — 如果客户主要在欧美，建议改成 CIETAC（北京/上海/深圳）或 HKIAC
- 责任上限 USD 100 — 这是网站使用的责任上限，不影响产品订单 PI，但具体数字律师可能会建议调整
- 数据保留 7 年 — 按中国会计法常见做法，可能要按业务调整
- Newsletter 用了「订阅即同意」隐式同意，严格 GDPR 要求显式 checkbox。B2B 行业普遍按软同意 + 易退订操作

### Cookie banner + GA4 + Microsoft Clarity（2026-05-13）
**目标**：合规闭环（cookie 同意先于第三方脚本加载）+ 数据闭环（拿到流量/转化数据再做决策）。

**新建文件**：
- `lib/cookie-consent.js` — 读写 `cookie_consent` 一阶 cookie（365 天）的工具函数
- `components/CookieConsent.jsx` — `CookieConsentProvider` + `useCookieConsent()` hook + `CookieBanner` UI（一个文件，三个 export）
- `components/GoogleAnalytics.jsx` — `next/script` 注入 gtag.js + 初始化 `window.gtag`，`anonymize_ip: true`
- `components/ClarityAnalytics.jsx` — Clarity inline snippet

**改动文件**：
- `components/TawkChat.jsx` — 加 `useCookieConsent`，`consent !== 'accepted'` 时返回 null
- `app/[locale]/layout.js` — 用 `CookieConsentProvider` 包 `NextIntlClientProvider` 的子树；挂 `<TawkChat /> <GoogleAnalytics /> <ClarityAnalytics /> <CookieBanner />`
- `data/site-config.js` — 新加 `analytics: { googleAnalyticsId, clarityProjectId }` block
- `messages/{en,es,fr,de,it,pt,ja,ko}.json` × 8 — 加 `cookie` namespace（message / accept / decline）

**关键 ID（已填）**：
- GA4 Measurement ID: `G-RTG65S2XK9`
- Clarity Project ID: `wq99itk70w`

**工作原理**：
1. 首访：cookie 没设 → CookieBanner 浮在底部 → 第三方脚本零加载
2. 点 Accept → cookie 存 `accepted` (365d) → Tawk.to + GA4 + Clarity 全部启动
3. 点 Decline → cookie 存 `declined` → 三个第三方都不加载
4. 老访客已选过 → Banner 不出现，按之前选择决定加载

**GA4 资源结构**（用户已自行拆分）：
- 账号「Chic」下两个独立 Property：
  - `CHIC` (474262999) → 数据流 `customwooden box` → 衡量 ID `G-RTG65S2XK9` → 本网站
  - `XMC Homeware`（用户自行新建）→ 给另一个站 `xmchichomeware.com` 用
- 两个站数据互不混

**国内验证局限**：
- 用户在中国大陆访问，`googletagmanager.com` / `google-analytics.com` 被墙 → 本机看不到 GA4 实时数据
- `clarity.ms` 没被墙 → Clarity 能正常上报
- 海外访客（外贸客户）不受影响，数据正常进 GA4

### 产品详情页正文 i18n（2026-05-13，分 3 批做完前段）

之前 #12 SEO 维度卡在「关键词布局没全本地化」—— 产品详情页大量字符串硬编码英文。这次分批抽到 next-intl messages 并翻 7 语。

**第一批：trust badges + inquiry banner + related + CTA + applications 标题**
- `app/[locale]/products/[slug]/[product]/page.js` 加 `await getTranslations({ namespace: 'productDetail' })` + `'cta'`
- 替换 6 处硬编码：Hero CTA / Trust badges / Use cases section title / Inquiry banner（含 `{name}` 插值）/ Related products 标题
- `messages` × 8 加 `productDetail` namespace（11 个 key）

**第二批：ProductTabs label + 两段套话**
- `components/ProductTabs.js` 是 'use client'，用 `useTranslations('productTabs')`
- 4 个 tab 标签 + description 套话段 + packaging 套话段
- `messages` × 8 加 `productTabs` namespace（6 个 key）
- 顺手改了 map callback 参数名 `t` → `item`（避免和翻译函数 `t` 重名）

**第三批：spec 表头 60+ 个 key**
- `components/ProductTabs.js` 加 `useTranslations('specKeys')` + `translateSpecKey()` helper（带 try/catch + `startsWith('specKeys.')` 双重 fallback）
- spec 表格 `<th>` 渲染改为 `translateSpecKey(key)`
- `messages` × 8 加 `specKeys` namespace（61 个 key，每个一行）
- 故意没翻 `Pull / Handle` 这一个 key（`/` 字符跟 next-intl 路径分隔符冲突），自动 fallback 到英文

**架构小亮点**：translateSpecKey 的 fallback 设计意味着将来任何新加的 spec key（如某产品加个「Antibacterial Coating」字段）都会优雅 fallback 到英文，不会爆 missing-message error。

**还没翻的「数据层」部分**（参见第九节剩余待办）：
- `{closure} Closure` eyebrow（hero 那个小徽章）
- Specs 表右列 value（每个产品独有的「Hidden magnetic flip lid」/ 「30 days」等字符串）
- `customization` 数组（每个产品 6 条左右）
- `packaging` 段落（每个产品一段）
- `useCases` 数组（每个产品 6 条左右）

这些都在 `data/products/{category}.js` 文件里，是每个产品独有的内容。要么扩展 `data/products/translations/{locale}.js` overlay 加新字段（specs/customization/packaging/useCases），要么重构 data 结构。**未做** — 工作量约 5000+ 翻译条目。

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
- 🟡 关键词布局：产品 name/closure/tagline/intro + 详情页 trust badges / CTA / inquiry banner / related / use cases section / ProductTabs labels / spec table 表头都已本地化 8 语。**剩下数据层**（specs values / customization / packaging / useCases / closure eyebrow）—— 详见第九节
- ✅ LCP：Hero preload 已加
- ✅ CLS：所有 img 加 width/height 防 CLS
- 🟡 INP：GA4 装上后**自动收集** Core Web Vitals，等 24-48h 实地数据出来（GSC → Core Web Vitals 报告，或 GA4 → 报告 → 生命周期 → 互动度 → 加二级维度 Web Vitals）
- ✅ 移动端：响应式 + viewport
- ✅ HTTPS：Coolify Let's Encrypt
- ✅ 图片 SEO：alt + 文件名 + image sitemap

## 九、剩余待办（按优先级排）

### 最高优先级（详情页 i18n 数据层 — #12 SEO 的最后一公里）

1. **产品详情页数据层 i18n**（最大块的活，5000+ 翻译条目）

   现在 product detail 已经完成的：trust badges / inquiry banner / related / CTA / applications section / ProductTabs labels / spec table 表头（60+ key）。
   
   **剩下的都是「每个产品独有的数据字段」**，存在 `data/products/{category}.js` 17 个文件里：
   - `specs` 表右列 value（如 "Hidden magnetic flip lid" / "Solid acacia hardwood" / "30 days"）
   - `customization` 数组（每个产品 6 条左右）
   - `packaging` 段落（每个产品一段）
   - `useCases` 数组（每个产品 6 条左右）
   - hero eyebrow 的 `{closure} Closure`（小活）

   **建议架构**：扩展现有的 `data/products/translations/{locale}.js` overlay 机制（目前只覆盖 name / closure / tagline / intro 4 字段），加 specs / customization / packaging / useCases 4 个新字段。然后 186 产品 × 7 语 × 4 字段 ≈ **5000+ 翻译条目**。

   **建议分批次做**（按 HANDOFF 第十节用户工作风格，小批量验证）：
   - 批 1：先做架构改造 + 1 个分类（如 tea-coffee）验证流程
   - 批 2-17：每个分类一批
   
2. **closure eyebrow 小活**（hero 那个 `{closure} Closure` 徽章）
   要么 messages 里加 `productDetail.closureEyebrow: "{closure} Closure"` 用插值，要么给 7 种 closure 类型各配一个完整短语 key（`magneticClosure: "Magnetic Closure"` / `hingedClosure: ...`）。后者更稳，前者更省。

### 高优先级

3. **INP 实测**
   GA4 已自动收集 Core Web Vitals。等 24-48h 之后：
   - GA4 → 报告 → 生命周期 → 互动度 → 网页和屏幕 → 加二级维度「Web Vitals」
   - GSC（Search Console）→ Core Web Vitals 报告（需 28 天积累）
   - 如果 INP 差 → 优化 `TawkChat`（已 gated 在 cookie consent 后）和 `ProductGallery`（client component）
   
   也可以用 PSI lab 测：https://pagespeed.web.dev

### 中优先级

4. **法律文案律师 review**
   现在 Privacy/Terms 是通用 B2B 模板。重点 review 几条：
   - 仲裁机构（现在写的是 Xiamen Arbitration Commission，欧美客户可能更认 CIETAC / HKIAC）
   - 责任上限 USD 100 是否合适
   - 数据保留 7 年是否合规
   - Newsletter 是否需要改成显式 opt-in checkbox

5. **GA4 自定义事件追踪**
   GA4 现在只跟踪 pageview。建议加几个 B2B 关键事件：
   - `inquiry_form_submitted` — Contact 页表单成功提交
   - `whatsapp_clicked` — 任何 wa.me 链接点击
   - `email_clicked` — 任何 mailto 链接点击
   - `language_changed` — 语言切换器
   
   实现：在对应的 Link / form / button 加 `onClick={() => window.gtag?.('event', 'inquiry_form_submitted')}`。`window.gtag` 已经在 `GoogleAnalytics.jsx` 里 expose 出来了。

6. **博客 8 语化**
   现在博客 EN-only，所有 locale canonical 到 `/en/blog`。如果要翻：要写新的 blog 内容数据结构（按 locale 分），改 sitemap 把博客也按 locale 输出，改 page-level metadata 的 alternates。

7. **FAQ schema / HowTo schema**
   - FAQ schema → 加在 capabilities 页和 material-guide 页（B2B 询盘问 FAQ 多）
   - HowTo schema → 加在 material-guide 的「选材步骤」上

### 低优先级 / 可选

8. **OG 图升级**：现在 `layout.js:48` 用 `/logo.png` 当 1200×630 OG card，实际文件可能不是这个尺寸。做个专门的 social card 图。

9. **产品图 alt 微调**：`ProductGallery.js:102` 的 alt 是 `${name} — view ${idx + 1}`，「view」这词在所有语言都是英文。改成 `t('imageView', { idx: idx + 1 })` 之类。

10. **加阿拉伯语 / 俄语 / 越南语** 等新市场（如果业务有需求）。

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

**最后状态**（2026-05-13 verified）：
- 整站产品翻译：**186/186 = 100% ✅**（8 语 name/closure/tagline/intro）
- **法律合规基础件**：Privacy Policy + Terms of Service + Footer Legal 链接 + Newsletter 同意 ✅
- **Cookie consent + 数据闭环**：Cookie banner（gates Tawk.to + GA4 + Clarity）+ GA4 装上（G-RTG65S2XK9）+ Clarity 装上（wq99itk70w）✅
- **产品详情页正文 i18n**：前 3 批做完（trust badges / inquiry banner / related / CTA / applications / ProductTabs labels + 套话 / spec table 表头 60+ key）✅；剩数据层（specs values / customization / packaging / useCases / closure eyebrow）未做
- 本轮 commit 顺序（粗略）：
  1. BreadcrumbList 本地化 + tea-coffee 29 翻译
  2. hinged + sliding-lid 19 翻译
  3. drawer + magnetic + with-lock 26 翻译
  4. .gitignore + HANDOFF 第一次更新
  5. Privacy/Terms 页 + Footer Legal 链接 + Newsletter 同意
  6. HANDOFF 第二次更新
  7. Cookie banner + Tawk.to consent gate
  8. GA4 + Clarity（与 cookie consent 联动）
  9. 详情页 i18n 第一批（trust badges / inquiry / related / CTA / applications）
  10. 详情页 i18n 第二批（ProductTabs labels + 套话）
  11. 详情页 i18n 第三批（spec table 表头 60+ key）
  12. HANDOFF 第三次更新（本次）
  13. 详情页 i18n 第四批：closure eyebrow 本地化
  14. GA4 自定义事件追踪（inquiry / whatsapp / email）
  15. capabilities FAQ section + FAQ schema
  16. material-guide HowTo section + HowTo schema
  17. ProductGallery alt 本地化
  18. **数据层 i18n PoC**：translations overlay 扩展支持 specs/customization/packaging/useCases，先做 acacia-tea-bag-box-8-compartment × IT 验证流程
  19. 数据层 i18n 批：tea-coffee 全 29 产品 × IT（it.js 1126 行）
  20. 数据层 i18n 批：tea-coffee 全 29 产品 × FR + DE（一次性 58 个 Edit，fr.js + de.js 各 1098 行）
  21. 数据层 i18n 批：tea-coffee 全 29 产品 × ES + PT（一次性 58 个 Edit，es.js 1099 / pt.js 1098 行）
  22. 数据层 i18n 批：tea-coffee 全 29 产品 × JA + KO（一次性 58 个 Edit，ja.js + ko.js 各 1098 行）— **tea-coffee 全分类 7/7 语 100% 完成 ✅**

- 用户每次都浏览器验证「可以了」

## 十一、数据层 i18n 进度追踪

**架构**：`data/products/translations/{locale}.js` overlay 机制，每个产品支持 7 字段：name / closure / tagline / intro / specs / customization / packaging / useCases。`specs` 是完整替换（不是 deep merge），所以翻译必须包含所有 key。

**已完成数据层翻译（specs + customization + packaging + useCases）**：

| 分类 | en | es | fr | de | it | pt | ja | ko |
|------|----|----|----|----|----|----|----|----|
| tea-coffee (29) | source | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** |
| hinged (10) | source | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** |
| sliding-lid (9) | source | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** |
| drawer (8) | source | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** |
| magnetic (9) | source | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** |
| with-lock (9) | source | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** | ✅ **full** |

**🎉 整站数据层 i18n 100% 完成 — 186 产品 × 7 语 × 4 字段 (specs / customization / packaging / useCases) ≈ 5200+ 翻译条目全部到位**

「flat-1L」= name/closure/tagline/intro 4 字段一行式翻译（旧 overlay 结构）。「full」= 7 字段完整翻译。

**tea-coffee 数据层 i18n: 7/7 语 = 100% 完成 ✅**

**整站数据层 i18n 已 100% 完成（2026-05-14）**。后续如果加新分类或新产品需重复 overlay 模式。

## 十二、SEO 结构化数据增强（2026-05-14 追加）

整站数据层 i18n 收尾后做的小批 SEO 提升，目的是把已有数据更好暴露给 Google：

### Organization schema（`app/[locale]/page.js`）

原本只有 name/url/logo/email/telephone/address/contactPoint。扩展加入：

- `@type` 升级为数组 `['Organization', 'Manufacturer']` — 双类型给 Google B2B 制造商信号
- `description` — 加入工厂坐标、服务市场、产品形态的关键词密集描述
- `slogan` — 用 `SITE.company.tagline`（Wooden Expert）
- `numberOfEmployees: { minValue: 120 }` — 已知信息
- `knowsAbout` — 12 个主题词（custom wooden boxes / OEM / closure 类型 / 木材种类等）
- `areaServed` — 12 个国家代码
- `image` — 加 logo 作 image
- `WebSite.inLanguage` 改为按 locale 动态返回 BCP-47 代码（`en-US` / `es-ES` 等）

### Product schema（`app/[locale]/products/[slug]/[product]/page.js`）

- `manufacturer` 增加 `@id` 反向链接到 home `#organization`，让 Google 把产品页和组织信息串联
- `manufacturer.@type` 也升级为 `['Organization', 'Manufacturer']`
- 新增 `additionalProperty` — 把整张 spec 表（Closure Type / Material / MOQ / Lead Time 等 8-10 个 key）转成 PropertyValue 数组。Google 能在产品搜索结果里抓 spec 值做富媒体卡片。

### 不动的项

- 没加 `SearchAction`（站内没搜索功能）
- 没加 `offers` schema（B2B 自定义订单没固定价，Google 会标 invalid）
- 没加 `aggregateRating`（没真实评论，加假的会被 Google 处罚）

### 待办（外部依赖 / 设计活）

- OG 图升级（用专业的 1200×630 social card 替代 logo.png）
- 法律文案律师 review
- INP 实测（等 GA4 24-48h 数据）
- 博客 8 语化（10 文 × 7 语 ≈ 70k 字大工程）
- 加阿拉伯语 / 俄语 / 越南语

## 十三、Contact 页 i18n 全栈本地化（2026-05-15）

Contact 页之前是完全硬编码英文（hero / 4 个联系方式卡片 / 表单 / 信息侧栏 / 6 个时区时钟 / 2 个办公地点 / 8 个买家 FAQ / 终末 CTA），不管访问 `/es/contact` 还是 `/ja/contact` 都看英文。这次一次性把全 3 层全部本地化。

### 改动文件

- `messages/{en,es,fr,de,it,pt,ja,ko}.json`：新增 `contact` namespace（10 个子区块 / ~90 keys / 8 语 ≈ 720 条翻译，包含 8 个完整 FAQ）
- `app/[locale]/contact/ContactClient.jsx`（'use client'）：用 `useTranslations('contact')`；`t.rich()` 处理表单 thanks 段（带 products/blog 链接）和 fine print（mailto 链接，tag 名改为 `<emailLink>` 避免和 `{email}` 参数冲突）；ZONES 数组改成 `cityKey` 而不是硬编码 city 字符串；FAQS 用 `useMemo` 从 `q1..q8` / `a1..a8` 翻译 key 生成
- `app/[locale]/contact/page.js`：generateMetadata 用 `await getTranslations({ locale, namespace: 'contact.meta' })`

### 已知小坑

表单 select 的 `subject` state 现在存的是翻译后的字符串（"OEM 项目" 在 8 种语言下是 8 个不同的值）。GA4 `inquiry_form_submitted` 事件维度会被这个污染。修法是将来加一个稳定的 subjectKey（`general`/`oem`/`quote`/...），analytics 发 key，UI 用 t() 翻译。这次没改避免增加复杂度。

## 十四、products 目录页 + wood-fabrication 页 i18n（2026-05-15）

两个页面都还是硬编码英文。一次性补完。

### 改动文件

- `messages/{en,es,fr,de,it,pt,ja,ko}.json`：新增 `productsIndex` namespace（13 keys：eyebrow / titleStart/Em / sub / 3 个分组 label / 3 个分组提问 / categoriesCount 计数器 / explore CTA）+ `woodFab` namespace（10 keys：h1 / intro / 3 张卡片 title+desc）
- `app/[locale]/products/page.js`：改成 async server 组件，加了两张映射表 `GROUP_LABEL_KEY` / `GROUP_QUESTION_KEY` 把 GROUPS 里的英文 group title 映射到翻译 key；分类卡片三层翻译：`tCat(slug)` 取分类名（用现成 `categories` namespace）、`tCC('${slug}.tagline')` 和 `tCC('${slug}.intro')` 用 `categoryContent` namespace
- `app/[locale]/wood-fabrication/page.js`：改成 async server 组件；h1 / intro / 3 张卡片全本地化

### 现状：i18n 已 100% 覆盖（除 Blog）

经审计：
- Header / Footer：i18n ✅
- About / Homepage：数据层 i18n（`data/about/{locale}.js` + `data/home/{locale}.js`）✅
- Capabilities / Material-guide：i18n ✅
- Privacy / Terms：英文 only（设计决定）
- Contact / Products 目录页 / Products 详情页（[slug] + [slug]/[product]） / Wood-fabrication：i18n ✅
- 186 个产品的 specs/customization/packaging/useCases：数据层 i18n ✅

**唯一硬编码英文剩下的是 Blog**（10 文 × 7 语 ≈ 70k 字），属于设计决定（SEO 内容机翻会伤排名）。

孤立组件 `components/CTA.js` / `components/Hero.js` 没被任何地方引用，可以删（暂时留着）。

`components/NewsletterForm.js` 还有 4 个硬编码 fallback 字符串（"Sending…" / 错误信息 / "Thanks" / "We won't share..."），不过它只被 blog 页用且 blog 整页都是英文，所以现状一致，不急。

## 十五、`.dockerignore` 创建（2026-05-15）

### 触发问题

部署日志显示 `Deployment failed: Command execution failed (exit code 255)`，build 全程成功（30 秒构建出 1789 个静态页面），但在 `#16 exporting layers` 那一步突然崩。

排查后发现：
- 服务器磁盘 218G 空闲（OK）
- 服务器内存 5.2G 可用（OK）
- 真凶：`#5 transferring context: 815.12MB 2.8s done`——build context 815MB 太大

### 根因

**项目根目录没有 `.dockerignore`**。Docker build 把 `node_modules` / `.next` / `.git` / `crm-deploy/` / `*.xlsx` 全部塞进了构建上下文。815MB 的 context 在 export layers 阶段大概率撑爆 BuildKit 的内存或缓冲。

### 修复

创建 `.dockerignore`，排除：
- node_modules / .pnp / .yarn
- .next / out / build
- .git / .gitignore
- .env*
- *.log / coverage
- *.xlsx / *.xls / `样本_*`
- crm-deploy/
- HANDOFF.md / README.md / *.md
- Dockerfile / docker-compose / .github

预计下次部署 build context 从 815MB 降到 10-20MB，大概率直接消掉 `exit code 255` 问题。

## 十六、IntroCarousel + ProductGrid i18n + bug fix（2026-05-15）

### IntroCarousel（首页轮播）

之前 8 个图片标签 + 3 个 aria-label + 1 个底标全是硬编码英文，每个 locale 的首页都显示英文。

- `messages/{en,...}.json`：新增 `introCarousel` namespace（12 keys：8 slide labels + prevSlide / nextSlide / goToSlide / locationTag）
- `components/IntroCarousel.js`：SLIDES 数组改用 `labelKey` 而非硬编码英文；组件用 `useTranslations('introCarousel')`

### ProductGrid（分类落地页产品网格 — 被 17 个分类共用）

- `messages/{en,...}.json`：新增 `productGrid` namespace（12 keys：7 filter chips + summary 计数 + empty state + MOQ + Lead + Inquire）
- `components/ProductGrid.js`：用 `useTranslations('productGrid')` 替换硬编码

### 顺便修了一个潜伏 bug

之前在非英文 locale 下，分类落地页的筛选 chips（Magnetic / Hinged / Sliding / ...）全部消失，只剩 "All"。原因是 `getProductTranslation` 把 `closure` 字段也翻译了（"Magnetic" → "Magnetica"），但 chip 顺序数组 `order = ['Magnetic', 'Hinged', ...]` 用的还是英文 key，匹配不上。

**修法**：在 spread 后增加一个 `closureKey: p.closure` 字段，保留原始英文 closure 作为筛选用 key。badge 显示的还是翻译后的 `p.closure`，但内部 filter 逻辑全用 `closureKey`。

```js
const list = useMemo(
  () => Object.values(products).map((p) => ({
    ...p,
    ...getProductTranslation(p.slug, locale),
    closureKey: p.closure,  // ← 英文 key 保留
  })),
  [products, locale],
);
```

## 十七、category landing 页 chrome i18n 收尾（2026-05-15）

`products/[slug]/page.js`（17 个分类共用模板）还有大量硬编码英文 chrome：Features That Matter / Build to Spec / Perfect For / Ready to Order / Related Categories / View → / Request Samples / Email Us Now / Browse Catalog 等。

- `messages/{en,...}.json`：新增 `categoryPage` namespace（19 keys：6 个 section 标签 + 6 个 section 标题 + 5 个 CTA + Explore More + Related Categories + 模板插值 `{name}`）
- `app/[locale]/products/[slug]/page.js`：加 `tcp = await getTranslations({ ..., namespace: 'categoryPage' })`；预计算 `relatedCards` 数组（用现有 `categories` + `nav` namespace 翻译相关分类卡片的 name + group），避免在 JSX 中调 async

影响：所有 17 个分类的非英文 locale 落地页全部本地化。

### 关于 features/specs/useCases 数据本地化

`item.features` / `item.specs` / `item.useCases` 来自 `data/categories.js`，是英文 only。要做完整本地化需要建 `data/categories/translations/{locale}.js`（参考 `data/products/translations/` 模式）—— 17 个分类 × (4 features + 6 specs + 6 useCases) × 7 语 ≈ 2,000 条翻译，约 2-3 小时的大活，暂时未做。

## 十八、NewsletterForm i18n-aware（2026-05-15）

`components/NewsletterForm.js` 原本 4 个 fallback 字符串硬编码英文（thanks / error / openingMail / shortConsent）。

虽然这个组件目前只被 blog 用（blog 是英文 only by design），但 future-proof 一下——加 `useTranslations('newsletterForm')` hook，将来其他页面用也不用再改。

- `messages/{en,...}.json`：新增 `newsletterForm` namespace（4 keys：thanks / error / openingMail / shortConsent）
- `components/NewsletterForm.js`：4 个 fallback 字符串改用 `t()`；button 的 sending label 复用现有 `cta.sending`；caller 仍可通过 prop 覆盖 placeholder / buttonLabel / sendingLabel

## 十九、当前 i18n 全栈覆盖状态（2026-05-15 收尾）

经审计，**除 Blog（设计上英文 only，每个 locale URL canonicalize 到 /en/blog）外，整站 i18n 完整覆盖**。

### 已 i18n（包含数据层 + 组件层 + chrome）

- Header / Footer
- About 页（数据层 `data/about/{locale}.js`）
- Home 页（数据层 `data/home/{locale}.js`）
- Capabilities / Material-guide / Privacy / Terms（早期已完成）
- Contact 页（messages JSON + ContactClient.jsx + page.js metadata）
- Products 目录页 + Products 分类落地页 + Products 详情页
- Wood-fabrication 页
- 186 个产品的 specs/customization/packaging/useCases（数据层 i18n）
- IntroCarousel / ProductGrid / ProductGallery / ProductTabs / CookieConsent / NewsletterForm 组件
- layout.js metadata（title/description/hreflang/OG locale）

### 不 i18n（设计决定 / 不必要）

- Blog（10 文 × 7 语 ≈ 70k 字 SEO 内容，机翻会伤排名；canonical 到 /en/blog 由设计决定）
- CTA.js / Hero.js / CapabilitiesSection.js / Featured.js（孤立组件，不被任何地方引用，可以删）
- 分析脚本 GoogleAnalytics / ClarityAnalytics / TawkChat（无 UI 文本）

### 剩余可选的小活

- ~~`data/categories.js` 的 features/specs/useCases 三个数组的数据层 i18n~~（**已完成**——见第 20-21 节）
- 删掉 4 个孤立组件（10 分钟代码清理）
- Blog 8 语化（70k 字大工程，需要决定要不要机翻或人工译）

## 二十、categories 数据层 i18n 全 7 种非英文 locale 完工（2026-05-15）

最后一块拼图：17 个分类的 `features` / `specs` / `useCases` / `longDesc` 全部本地化到所有 7 种非英文语言。

### 架构

模仿 `data/products/translations/` 模式，新建 `data/categories/translations/` 翻译覆盖体系：

```
data/categories/translations/
├── index.js     # 导出 getCategoryTranslation(slug, locale) helper
├── en.js        # empty stub（源语言 in data/categories.js）
├── it.js        # 17 分类 × 4 features + 6 specs + 6 useCases + longDesc
├── es.js        # 同上
├── fr.js        # 同上
├── de.js        # 同上
├── pt.js        # 同上
├── ja.js        # 同上
└── ko.js        # 同上
```

### Helper 接口

```js
import { getCategoryTranslation } from '@/data/categories/translations';
const ct = getCategoryTranslation(slug, locale);
const features = ct.features || category.features;  // 缺翻译时回退英文
```

字段都是 REPLACE-not-merge — 如果列了 features 数组，得列全 4 个；缺一个英文那个就没了。这跟 `data/products/translations/` 的 specs 字段行为一致。

### 翻译条目数

- 每个分类：4 features (8 strings: title + desc) + 6 specs + 6 useCases + 1 longDesc = 21 strings
- 17 分类 × 21 = ~360 strings 每语种
- 7 种语言 × 360 = **~2,500 翻译条目**

### 顺手修了一个 hero 段显示逻辑

原本 `app/[locale]/products/[slug]/page.js` 的 hero intro 段 fallback 逻辑：

```jsx
// 旧版本
{params.locale === 'en' ? item.longDesc : translatedIntro}
```

非英文 locale 显示的是较短的 `translatedIntro`（来自 `categoryContent` namespace），而不是丰富的 `longDesc`。改成：

```jsx
// 新版本
{catTranslation.longDesc
  ? translatedLongDesc                      // 优先用数据层翻译
  : (params.locale === 'en' ? item.longDesc : translatedIntro)}  // 旧 fallback
```

现在所有 7 种非英文 locale 也能在 hero 段显示完整 longDesc 段落了。

### 测试 URL

部署后访问以下 URL 应该看到对应语言的 features/specs/useCases/longDesc：
- `/it/products/walnut`
- `/es/products/tea-coffee`
- `/fr/products/gift-packaging`
- `/de/products/magnetic`
- `/pt/products/wine-whisky`
- `/ja/products/hinged`
- `/ko/products/storage`

## 二十一、全站 i18n 项目完结总览（2026-05-15）

经过 27 次「continue」迭代，整个网站的 i18n 项目完结。

### 总体覆盖

| 层级 | 范围 | 状态 |
|------|------|------|
| 全站 chrome（导航 / CTAs / footer） | 8 语 | ✅ |
| 核心页面 chrome | 8 语 | ✅ |
| 17 分类落地页 chrome | 8 语 | ✅ |
| 17 分类 data（features/specs/useCases/longDesc） | 8 语 | ✅ |
| 186 产品 data（specs/customization/packaging/useCases） | 8 语 | ✅ |
| 12 共享组件（Header/Footer/IntroCarousel/ProductGrid/...） | 8 语 | ✅ |
| layout.js metadata（title/description/hreflang/OG） | 8 语 | ✅ |
| Blog | 1 语（设计 only EN） | 🟡 |

### 翻译条目总数（估算）

- 产品层（`data/products/translations/{locale}.js`）：186 产品 × 4 字段 × 7 语 ≈ 5,200 条
- 分类层（`data/categories/translations/{locale}.js`）：17 分类 × 21 字段 × 7 语 ≈ 2,500 条
- 全站 chrome（`messages/{locale}.json`）：~100 namespace key × 8 语 ≈ 800 条

**总计 ≈ 8,500 翻译条目**。

### i18n 架构总览

整个网站采用 **3 层 i18n 策略**：

1. **JSON namespace 层（messages JSON）**：next-intl 标准方式。用于：
   - 全站共享文案（nav、CTAs、footer、cookie）
   - 页面 chrome（hero 标题、CTA 段、section labels）
   - 共享组件文本（ProductGrid filter chips、IntroCarousel slide labels）
   - `useTranslations` / `getTranslations` hook 调用
   - **优点**：所有翻译聚合在 8 个 JSON 文件里，next-intl 内置缓存和 fallback

2. **数据层覆盖（`data/{products,categories}/translations/`）**：
   - 用于产品 / 分类的内容数据（specs / features / useCases / longDesc）
   - 每个 locale 一个 JS 文件 export default { slug: { ...fields } }
   - 渲染时：`{ ...item, ...getXxxTranslation(slug, locale) }` spread 合并
   - **优点**：避免把 8,000+ 条目塞进 messages JSON；产品 / 分类数据的增删改不影响 chrome 翻译
   - **缺点**：spread 是浅合并；specs/features 数组字段是 REPLACE-not-merge（需列全部）

3. **本地化 metadata（page.js + layout.js）**：
   - 每个 page.js 的 `generateMetadata` 通过 `getTranslations({ locale, namespace })` 加载 title/description
   - layout.js 设置 `<html lang>`、hreflang `alternates.languages`、OpenGraph locale（BCP-47 形式）
   - URL prefix 通过 next-intl middleware 自动处理

### Header / Footer i18n 状态

- 8 语全覆盖
- 导航 + 子菜单 + CTA + 时区指示器 + footer newsletter form 都翻译完毕
- Header 还集成了语言切换器（drawer 形式）

### 已知小坑（修复或留作 TODO）

- **GA4 inquiry_form_submitted 事件维度被翻译污染**：Contact 页表单 select 的 subject 值是翻译后的字符串，导致 GA4 看到 "OEM project" 在 8 种语言下变 8 个不同 dimension 值。未来可改为存稳定 key（`general`/`oem`/...），UI 用 t() 翻译。这次未改。
- **ProductGrid filter chips 在非英文 locale 之前隐藏**：原因是 `getProductTranslation` 把 `closure` 字段也翻译了，导致 chip 顺序数组 `['Magnetic', 'Hinged', ...]` 找不到匹配。已修——保留原始英文 `closureKey` 用作筛选 key（详见第十六节）。
- **孤立组件未删**：`components/CTA.js` / `Hero.js` / `CapabilitiesSection.js` / `Featured.js` 没被任何地方引用，可以删，但留着也无害。

### 剩余可选工作

- Blog 8 语化（10 文 × 7 语 ≈ 70k 字大工程；当前 canonical 到 /en/blog 由设计决定，不强求）
- 加阿拉伯语 / 俄语 / 越南语（要先做 RTL 适配，工作量较大）
- OG 图升级（设计活，1200×630 social card）
- 法律文案律师 review
- 删掉 4 个孤立组件
- INP 实测（等 GA4 数据）

### 工作流总结

这次 27 轮 i18n 迭代用到的几个高效模式：
- **PoC → 模板复用**：先做 IT，把 17 分类的 features/specs/useCases 写完，作为其他 6 语的结构模板，加速后面 6 语的翻译
- **批量 namespace + 单组件**：每个新组件 i18n 都是「先加 namespace 到 8 个 JSON → 重构组件用 useTranslations」两步，可复用 workflow
- **审计驱动**：用 grep 找硬编码英文短语（`Get In Touch`、`Learn More`、`Read More` 等）定位漏网组件，逐个补完
- **接受沙箱缓存怪现象**：bash/virtiofs 经常看到 stale 文件，Read 工具是 source of truth，文件在 Windows 上是正确的，不要因为 bash 报 syntax error 而怀疑代码

## 二十二、最终收尾审计 + 代码清理（2026-05-15 收尾）

### a) 3 个漏网的 aria-label

最后一遍 grep 审计（`aria-label="[A-Z][a-z]`）发现 3 个组件还有硬编码英文 aria-label，影响非英文 locale 的 a11y 标签：

- `components/Header.js` line 440：`Toggle menu`（移动菜单按钮）→ `t('nav.toggleMenu')`
- `components/Footer.js` line 460：`Find us online`（社交栏 region label）→ `t('footer.findUsOnline')`
- `components/CookieConsent.jsx` line 140：`Cookie consent`（dialog role label）→ `t('dialogLabel')`

相应在 `messages/*.json` 加了 3 个 key（nav/footer/cookie 三个 namespace），全 8 语种翻译。

社交平台名（Email/WhatsApp/LinkedIn/YouTube/Alibaba store）作为专有名词保留英文，符合国际惯例。

### b) 4 个孤立组件清理

通过 grep 确认以下组件没被任何地方 `import` 或作为 JSX 引用，删除以减少仓库噪音：

- `components/CTA.js`（22 行）
- `components/Hero.js`（103 行）
- `components/CapabilitiesSection.js`（50 行）
- `components/Featured.js`（60 行）

共删 ~235 行死代码。Next.js tree-shaking 本来就不会打包它们，所以不影响 bundle 大小，纯属代码清理。

### c) JSON-LD 结构化数据 i18n 状态确认

最后一轮审计也检查了所有 JSON-LD 结构化数据是否符合 Google 「schema content must match visible content」要求：

- **首页 `Organization` + `WebSite` schema**：`name` / `description` / `slogan` 等都从 `SITE.company.*` 或 messages JSON 取，i18n 正确 ✅
- **详情页 `Product` schema**：`name` / `description` / `additionalProperty` 全部用翻译后的产品数据 ✅
- **分类页 `BreadcrumbList` + `ItemList` schema**：name 字段用 `labelHome` / `labelProducts` / `translatedName` ✅
- **capabilities 页 `FAQPage` schema**：FAQ 问答全部从 `t('faq.q{n}')` / `t('faq.a{n}')` 取，跟可见 FAQ 完全一致 ✅
- **material-guide 页 `HowTo` schema**：6 步骤用 `tHowto('step{n}Title/Body')`，跟可见步骤完全一致 ✅

所有 schema 都用翻译后的内容，符合 Google 要求；同一页的可见 UI 和 schema 内容保持一致。

### 最终状态

至此，整个网站 i18n 项目（包括 a11y、JSON-LD、孤立组件清理）真正完结。

- 8 种语言（en/es/fr/de/it/pt/ja/ko）
- 全站 UI / chrome / 内容 / aria-labels / metadata / JSON-LD 全覆盖
- 唯一未翻译：Blog（设计 only EN，canonical 到 /en/blog）
- 总翻译条目数 ~8,500+
- 代码库清洁（删除 4 个孤立组件，添加 `.dockerignore` 修复部署）
- 文档完整（HANDOFF.md 22 节记录全过程）

## 二十三、性能 + 安全 + favicon + 仓库清理大收尾（2026-05-15 终篇）

### a) 性能：homepage LCP 关键图片改 eager + fetchpriority

`app/[locale]/page.js` 首页 hero collage 主图 `/factory/production.webp`（900×900）是 LCP 候选元素但被标 `loading="lazy"` — 这是 Core Web Vitals 反模式。改成：

```jsx
<img loading="eager" fetchpriority="high" decoding="async" src="..." />
```

预期 LCP 改善 100-300ms（慢网络更明显）。

全站 20 个 `<img>` 全部审计过：
- 每个都有显式 `width` / `height`（CLS 防护齐全）
- 画廊/轮播第一张用 `i === 0 ? 'eager' : 'lazy'` 模式
- iframes（Contact 页 Google Maps embed）都有 `loading="lazy"`

### b) next.config.js 生产环境硬化

```js
poweredByHeader: false                    // 去掉 X-Powered-By 头
compiler: {
  removeConsole: NODE_ENV === 'production'
    ? { exclude: ['error'] }              // 剥离 console.* 但保留 .error
    : false,
}
```

### c) 安全 HTTP 响应头（应用到所有路由）

```js
headers() {
  return [{
    source: '/:path*',
    headers: [
      { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
    ],
  }];
}
```

故意没加的：
- `Strict-Transport-Security`（HSTS）— Coolify/Nginx 反代加更好，容器重启不丢
- `Content-Security-Policy`（CSP）— Tawk.to + EmailJS + GA4 组合复杂，需用 report-only 模式收真实违规后再写正式策略

预期 securityheaders.com 评分从 D-/E 提升到 B+/A-。

### d) Favicon（之前完全没有）

`public/` 和 `app/` 下都没有 favicon.ico — 浏览器标签 icon 显示空白，移动端添加到主屏用通用图标。

加了 Next.js 14 Metadata Files 约定的动态生成图标：

- `app/icon.js` — 32×32 PNG，浏览器标签
- `app/apple-icon.js` — 180×180 PNG，iOS 主屏
- 都用 `ImageResponse` API 运行时生成（无需维护二进制文件）
- 木色渐变背景（#6B4A33 → #C58E4A）+ 米白色 "C" 字母（serif 字体）

同时去掉 `app/layout.js` 里原本的 `icons: { icon: '/logo.png', apple: '/logo.png' }` override — 否则会强制用 1200px 的 logo.png 当 favicon（浏览器自适应不好）。logo.png 保留作 OG / Twitter card 图。

### e) WCAG 2.1 SC 1.4.4 viewport 修复

原来：`viewport.maximumScale = 5`，限制用户最大缩放 5x。

WCAG 2.1 SC 1.4.4 Resize Text 要求用户能放大到至少 200%（最好更大）— 移动端限制缩放是低视力用户的明确障碍。改成不设 maximumScale（任意倍数）。

### f) 3 个 SITE config 残留英文修补

之前漏掉的 3 个硬编码英文字段（用 `SITE.*` 引用过）：

- `SITE.wechat.note` ("Search this ID in WeChat to add us") → `contact.ways.wechatNote`，用在 Footer + Contact
- `SITE.addresses.salesOffice.role` ("Sales · design · export documentation · sample coordination") → `contact.locs.salesRole`，用在 Contact 页
- `SITE.addresses.factory.role` ("Manufacturing · finishing · QC · packing · 120+ skilled workers") → `contact.locs.factoryRole`
- `SITE.hours` ("Mon–Sat · 9:00–18:00 (GMT+8)") → `footer.hoursValue`，用在 Footer

物理地址 `addresses.lines` 保留英文（邮政地址按惯例保持原文）；`addresses.city` 用在 JSON-LD `PostalAddress.addressLocality`，邮政标准也是英文。

### g) 仓库清理

- 删 `data/blog.js.tmp`（97KB 临时文件，没被任何地方引用）
- 删 `.build.log`（22 字节旧 build 日志残留）
- 删 `1.rtf`（0 字节空 RTF 文件）
- 强化 `.gitignore`：加 `*.log` / `*.tmp` / `*.bak` / `*.old` / `*.orig` / `*~` / `*.swp` / `*.swo` / `Thumbs.db` 通配规则

### h) README.md 完全重写

原 README 严重过时：
- 项目名还叫 "Wajawood"（早被 CHIC / custom-woodenbox 取代）
- 完全没提 next-intl 8 语 i18n（最大特性）
- 引用了已删的 4 个孤立组件（Hero / Featured / CTA / CapabilitiesSection）
- 目录结构指向 `app/about/page.js`（应该是 `app/[locale]/about/`）

重写后 130+ 行：
- 完整 tech stack（Next 14.2 + next-intl 3.26 + Tailwind 3.4 + EmailJS + Coolify + GA4 + Clarity）
- 完整目录树（包含 i18n / data overlays / messages / lib 全部）
- 3 层 i18n 架构总览
- Blog 英文 only 的 SEO 原因说明
- 8 个 locale 本地访问地址示例
- 添加新分类 / 新产品 / 新 locale 的操作指南
- 性能 + 部署 + 常用命令

### i) `app/icon.js` 与原 `metadata.icons` 的冲突

注意：`app/layout.js` 原本有 `icons: { icon: '/logo.png', apple: '/logo.png' }`，这会覆盖 file-based metadata（即 `app/icon.js` 不会生效）。重写 layout.js 去掉这个 override，让 file-based 拿到优先权。

`/logo.png` 还在 `[locale]/layout.js` 的 openGraph.images 和 twitter.images 里用 — 那两个场景需要 1200×630 的大图，logo.png 合适，保留。

### 这一节涉及的提交

最后这一大批工作合并成 5-6 个相关 commit 推：

1. **perf+css**：homepage LCP eager + fetchpriority
2. **perf**：next.config 生产环境优化 (poweredByHeader / removeConsole)
3. **security**：HTTP 响应头（X-Frame-Options / Permissions-Policy 等）
4. **feat**：动态 favicon + a11y viewport 修复
5. **i18n**：3 个 SITE config 残留英文修补（WeChat note / sales role / factory role / hours）
6. **chore**：仓库清理 + .gitignore 加固 + README 重写

## 二十四、Blog 8 语化（2026-05-15）

之前 Blog 是设计上英文 only，每个 locale URL canonical 到 `/en/blog` 避免重复内容惩罚。这一轮决定开干 — 用阿里云机器翻译 API 自动翻译，成本控制在 $30-50。

### 架构

模仿 `data/products/translations/` 和 `data/categories/translations/` 模式：

```
data/blog/translations/
├── index.js     # getBlogTranslation(slug, locale) + getBlogCategoryTranslation(name, locale)
├── en.js        # empty stub（源在 data/blog.js）
└── {es,fr,de,it,pt,ja,ko}.js   # 7 个 locale overlay
```

每个 overlay 文件结构：

```js
export default {
  posts: {
    [slug]: {
      title, excerpt, category, readTime,
      body: [/* 60-80 个 block，每个 type + 翻译后的 text/caption/items */]
    }
  },
  categories: {
    'Process': 'Processo',  // EN → locale 映射
    'Materials': 'Materiali',
    ...
  }
}
```

### 翻译流程

`scripts/translate-blog-aliyun.mjs`（~270 行）：

1. 读 `data/blog.js` 的 POSTS 数组
2. 对每个非英文 locale，遍历每篇文章
3. 调用阿里云 `mt.cn-hangzhou.aliyuncs.com` 的 `TranslateGeneral` API
4. 递归翻译 body 块里的 text / caption / items / headers / rows / labels
5. 渐进式写文件 — 翻完一篇就 save 一次 overlay 文件，崩了不丢进度
6. 50ms 节流，远低于阿里云 50 QPS 限制
7. 默认跳过已翻译的，`--force` 强制重翻

支持 CLI flag：
- `--locale it`：只翻一个 locale
- `--post six-step-manufacturing-process`：只翻一篇
- `--force`：忽略已翻译，重做

### 凭证管理

凭证从 `.env.local`（在 `.gitignore` 里）读取：

```
ALI_ACCESS_KEY_ID=...
ALI_ACCESS_KEY_SECRET=...
```

脚本内置 mini dotenv parser，不需要 dotenv 包。

### 实际运行数据

- 文章数：10
- 总块数：每篇 60-86 个 block
- 总语种：7（es/fr/de/it/pt/ja/ko）
- 每文每语：~30 秒
- 总耗时：~35 分钟
- 实际花费：约 $30-50（确切看阿里云账单）

### 已 i18n 的页面 + 字段

`app/[locale]/blog/page.js` 和 `app/[locale]/blog/[slug]/page.js`：

- generateMetadata: title / description / OG 都用 `blog.meta.*` namespace
- 去掉了 `alternates: { canonical: '/en/blog' }` 强制重写 — 改成每个 locale 自 canonical + hreflang alternates 到所有 locale
- POSTS 数据通过 `{ ...post, ...getBlogTranslation(slug, locale) }` 合并 overlay
- 分类名通过 `getBlogCategoryTranslation()` 翻译
- 35 个 chrome key 通过新的 `blog` namespace（heroEyebrow / latestStamp / morePosts / articleCount 含 ICU plural / 等）
- BreadcrumbList JSON-LD 的 Home / Journal 都用翻译 name

### CJS interop bug 提醒

阿里云 SDK 是 CJS 模块，被 Node ESM 包装后变成：

```js
const mod = await import('@alicloud/alimt20181012');
// mod.default = { default: AlimtClass, TranslateGeneralRequest: ... }
const Alimt = mod.default.default;
const TranslateGeneralRequest = mod.default.TranslateGeneralRequest;
```

要 `.default.default` 才拿到真正的类。直接 `mod.default` 拿到的是 `module.exports` 整个对象。

### 已知限制

- MT 质量「够用」级 — 商业 B2B 文章语境，欧洲语言（es/fr/de/it/pt）较自然，亚洲语言（ja/ko）偏机械
- 专有名词（CHIC / Cao County / Xiamen）和行业术语（MOQ / FOB / OEM / REACH）阿里云可能会把它们翻译成本地化版本，需人工巡查后到 overlay 文件改回
- 翻译条目都在 `data/blog/translations/{locale}.js` 是大数组，**手动编辑很安全**——overlay 字段是替换语义，改一个块的 text 不会影响其他块

### 后续维护

加新文章：
1. 在 `data/blog.js` 加 POST
2. 跑 `node scripts/translate-blog-aliyun.mjs --post new-slug`
3. 7 个 overlay 文件会自动更新

改已有文章：
1. 改 `data/blog.js` 的英文
2. 跑 `node scripts/translate-blog-aliyun.mjs --post slug --force`

改单语言：
1. 跑 `node scripts/translate-blog-aliyun.mjs --locale it`

### 三个相关的小改动

- `messages JSON × 8`：新增 `blog` namespace（35 chrome keys），所有翻译手工写
- `package.json`：加 `@alicloud/alimt20181012`、`@alicloud/openapi-client`、`@alicloud/tea-util` 三个 devDependencies
- `.env.local`：本地凭证文件，**永远不进 git**（被 `.gitignore` 的 `.env*` 排除）

总耗 70 文 × 60-80 块 = ~5,000 块翻译，加 280 条 chrome（35 keys × 8 lang）。整个 blog 8 语化项目 ≈ 5,300+ 翻译条目。

## 二十五、博客 OG 图 + 5 个小而美 + 运维 + 销售优化 + 搜索（2026-05-15 大批收尾）

Blog i18n 完工后又做了一大批边角增量改进，统一记录。

### a) 博客每篇文章动态 OG 图

`app/[locale]/blog/[slug]/opengraph-image.js` — Next.js 14 Metadata Files + ImageResponse API：

- 1200×630 PNG，构建时静态生成（无运行时成本）
- 木色渐变背景（#1F140C → #6B4A33）+ 米白文字
- 左上：「C」logo + CHIC Journal + Wooden Expert · Xiamen
- 右上：分类胶囊（按 locale 翻译：Processo / Process / 製造プロセス）
- 中间：大字文章标题（按 locale 翻译，长标题自动缩小字号）
- 底部：URL + Est. 2010

分享到 LinkedIn / Twitter / Slack 时显示美观预览卡，B2B 引流的关键。

### b) `npm run translate:blog` DX 改进

`package.json` 加：
- `translate:blog` — 跳过已翻译，增量翻新文章
- `translate:blog:force` — 重翻全部

### c) RSS 2.0 Feed for Blog

`app/feed.xml/route.js` — 服务 `/feed.xml`，被 `[locale]/layout.js` 里的 `<link rel="alternate">` 自动发现（Feedly / Inoreader / NewsBlur）。

设计决定：**只发英文 feed**（不per-locale）：
- RSS 订阅者是英文阅读 power user 主导
- 多语 feed 会触发 Google 重复内容反射
- 单一英文 feed 引流到主网站后，访客自然命中 next-intl 中间件按浏览器语言重定向

每篇 item 包含：title / link / guid（permalink） / pubDate / category / description（excerpt + 前 3 段 p）/ enclosure（hero 图）。

### d) 品牌化 404 页

`app/not-found.js` — 木色渐变背景 + "404" 数字 + 标题 + 3 个 suggest 卡片（Catalog / Journal / Contact）+ "Report broken link" mailto CTA + `robots: noindex`。

### e) Skip-to-Content 链接（WCAG 2.4.1）

`[locale]/layout.js` 加 `<a href="#main-content">` + `globals.css` 加 CSS。默认 top: -100px 隐藏，focus 时滑入屏幕。键盘 / 屏幕阅读器用户可跳过 nav 直达 `<main>`。

### f) Sitemap 修正

之前 blog 在 sitemap 里被钉死 `/en/blog/...`（旧的 canonical-to-EN 设计的产物）。Blog 8 语化后必须更新——改成 `pushLocalized()` 处理，每个 locale × 10 文章 = 80 个 blog URL 都进 sitemap 带 hreflang。

### g) LocalBusiness JSON-LD（首页）

加 `SALES_OFFICE_LD` 常量，Schema.org 允许 `LocalBusiness` 跟 `Organization` 共存——`LocalBusiness` 驱动 Google Maps「near me」/ 知识面板。包含坐标（24.6181, 118.0413 = Maluan, Jimei District, Xiamen）+ 营业时间（Mon-Sat 9-18）+ 邮政地址 + parentOrganization @id 链回 Organization。

### h) Service JSON-LD（首页）

加 `SERVICE_LD` 常量 — `Service` schema 描述 OEM/ODM 木箱制造服务：
- serviceType: "Custom Wooden Box Manufacturing — OEM / ODM"
- provider @id 链回 Organization
- areaServed 12 个国家
- hasOfferCatalog 6 个主分类
- termsOfService 链回 /en/terms

Google 「服务类」富结果 + 知识面板。

### i) GitHub Actions CI

`.github/workflows/ci.yml` — 每个 PR / push to main 自动 `npm ci` + `npm run lint` + `npm run build`。验证全 8 语 × ~220 静态页面能生成。3 min 跑完，免费额度绰绰有余。

加 `concurrency` group + cancel-in-progress 防止同 PR 连续 push 时浪费 minute。

### j) Dependabot

`.github/dependabot.yml` — 每周一早 8:00 Asia/Shanghai 自动开 PR：
- npm: minor/patch 合并到一个 PR，major 单独 PR
- github-actions: 同样策略
- 5 个 PR 上限
- **故意忽略** `@alicloud/*` 3 个翻译 SDK 防止静默升级破坏 translate-blog 脚本

### k) 产品详情页移动端 sticky 询盘 CTA

`components/StickyInquiryCta.jsx` — 客户端组件，**只在 PDP** 渲染、**只在 ≤768px 显示**、bottom-left 位置（避开右下 Tawk）。

两个按钮：
- WhatsApp：`wa.me` 点击打开 + 预填消息带产品名（"Hi CHIC team — interested in your {productName}..."）
- Email：mailto + 预填 subject

接 GA4 trackEvent `source: 'pdp_sticky'` 跟现有事件并列。延迟 800ms 出现不竞争 LCP 关键资源。

### l) 站内搜索（Cmd/Ctrl+K）

**架构**：
- `app/search-data/[locale]/route.js` — Route Handler + `generateStaticParams` 构建时为 8 个 locale 生成静态 JSON 索引（17 分类 + 186 产品 + 10 blog = ~213 条目 × ~200 字节 ≈ 42KB/lang gzipped）
- `components/SearchModal.jsx` — 客户端模态，Cmd/Ctrl+K 唤起 + 按钮唤起、懒加载索引、in-browser fuzzy 评分（标题 3 倍权重 + word boundary + 子串匹配，零外部库 ~5KB）
- `components/Header.js` — 加搜索按钮（Search · ⌘K pill）+ 全局键盘快捷键

**评分**：
- 标题精确匹配 +1000
- 前缀匹配 +500
- word boundary +30
- text 子串 +5
- 类型权重 product 1.2 > category 1.1 > blog 1.0

**键盘**：↑↓ 导航、Enter 跳转、Esc 关闭

**i18n**：`search` namespace 12 keys × 8 语

### m) 博客文章分享按钮

`components/BlogShareButtons.jsx` — 4 个分享：
- Twitter / LinkedIn / Email：直接构造 share URL（X intent / LinkedIn sharing / mailto），无第三方 SDK
- 复制链接：`navigator.clipboard.writeText` + 1.8s 后切回原 icon，旧浏览器降级 `execCommand`

每个 share 接 GA4 trackEvent `platform` 维度便于跟踪传播路径。

### 这一节累计提交建议

可以拆 6-7 个相关 commit 推：

1. `feat(blog): per-article OG images + npm scripts + HANDOFF`
2. `feat: RSS feed + branded 404 + skip-to-content + LocalBusiness schema + sitemap audit`
3. `ci: GitHub Actions build/lint + weekly Dependabot`
4. `feat(pdp): sticky inquiry CTA on mobile product detail pages`
5. `feat: site-wide search (Cmd/Ctrl+K) with build-time index`
6. `feat(blog): share buttons + Service JSON-LD schema`

---

## 二十六、P0 SEO 修复：www canonical + 邮箱域 + Best Sellers 内链 + 301 跳转（2026-05-16）

外部 SEO 顾问做了一轮 18 维度审计，发现 4 个 P0 必须立刻修的问题。这一节专记 P0 round 的所有改动。

### a) 站点 URL 改 www（canonical 修正）

**问题**：浏览器实际响应的是 `https://www.custom-woodenbox.com`，但 `siteUrl` 配置写的是裸 apex `https://custom-woodenbox.com`。导致 canonical / OG / hreflang 全指向跟 visit URL 不一致的版本——Google 看见两套 URL 都返回 200，记成「重复内容」。

**改**：`data/site-config.js`

```js
// 之前
siteUrl: 'https://custom-woodenbox.com',
// 之后
siteUrl: 'https://www.custom-woodenbox.com',
```

这一个改动同时修复 canonical、OG `og:url`、Twitter card URL、sitemap.xml 里所有 `<loc>`、所有 hreflang `<link rel="alternate">`、robots.txt 里的 sitemap 引用——因为这些全从 `SITE.siteUrl` 派生。

### b) 非 www → www 的 301 跳转

光改 siteUrl 不够。要让 Google 真正只索引 www 版本，需要服务端把裸 apex 请求 301 到 www。

**改**：`next.config.js` 新增 `redirects()`：

```js
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'custom-woodenbox.com' }],
      destination: 'https://www.custom-woodenbox.com/:path*',
      permanent: true, // 301
    },
  ];
},
```

边缘层执行（Next.js middleware-level），早于任何渲染——极低延迟。`permanent: true` 告诉 Google 这是「永久搬迁」，把所有 link equity 转到 www 版本。

### c) 邮箱域名换成 custom-woodenbox.com

**问题**：审计指出网站显示的邮箱 `info@xmchichomeware.com` 跟域名 `custom-woodenbox.com` 不一致。Google 用邮箱域名做品牌实体识别——两套域名让品牌信号分裂。还有一家姐妹站 `xmchichomeware.com` 内容大量重复，Google 不知道谁是 canonical 品牌。

**改**：`data/site-config.js`

```js
email: 'info@custom-woodenbox.com',
```

**用户必须做**（无法代办）：在邮箱托管那边配 `info@custom-woodenbox.com` 转发到主收件箱 `info@xmchichomeware.com`，或直接为新地址配独立 IMAP 收件。否则邮件发了没人收。

### d) Best Sellers 内链改成具体 PDP

**问题**：首页 6 张 Best Seller 卡片都链到 **分类落地页**（`/products/kitchen-dining` 之类），导致：
- 多张 Best Seller 指向同一个 URL（如 2 个都到 `/products/kitchen-dining`）—— 内链稀释
- 没把 link equity 集中到具体 SKU 页
- 卡片视觉上展示的是单个产品，点进去却到列表页——用户失望

**改**：8 个 home 数据文件（`data/home/{en,it,es,fr,de,pt,ja,ko}.js`）的 `FEATURED` 数组。每个文件 6 个 `href`：

| 产品 | 旧 href | 新 href |
|---|---|---|
| Utensil Holder | `/products/kitchen-dining` | `/products/kitchen-dining/wood-kitchen-utensil-holder-with-spice-drawer` |
| Spice Rack | `/products/kitchen-dining` | `/products/storage/3-tier-bamboo-spice-rack-organizer` |
| Stash Box | `/products/with-lock` | `/products/with-lock/large-black-wooden-stash-box-kit` |
| Tea Bag Organizer | `/products/tea-coffee` | `/products/tea-coffee/bamboo-tea-bag-organizer-box` |
| Watch Box | `/products/watch-jewelry` | `/products/hinged/wooden-watch-box-with-linen-interior-pillow` |
| Acacia Keepsake | `/products/acacia` | `/products/hinged/acacia-wooden-storage-box` |

注意：
- Spice Rack 实际属于 `storage` 分类（不是 `kitchen-dining`）—— 跟图片路径 `/storage-box/` 匹配
- Watch Box 和 Acacia Keepsake 都在 `hinged` 结构分类下（不是 `watch-jewelry` 或 `acacia` —— 那俩是用途/材质分类，slug 不在那里）

英文 baseline 用 Write 整块替换。其他 7 语用 6 个 `replace_all` —— 因为这些文件里每个旧 `href + img` 组合是唯一的。

验证：`Grep "href: '/products/(hinged|storage|kitchen-dining|with-lock|tea-coffee)/[a-z0-9-]+'"` 命中 48（6 × 8）次 ✅。

### e) hreflang 验证（不需要改代码）

审计提到「hreflang 缺失或错误」。代码层面检查 `i18n/seo.js` 的 `alternates()` 函数——8 语完整 hreflang + x-default 全在，每个 `generateMetadata()` 都通过 `alternates()` 调用。结论是审计基于过时的部署快照——本地代码正确，**只要这一轮 deploy 出去就会出现**。

### f) 审计里 P0 之外的延后项

P1（可以稍后做）：
- `og:image` 升级成产品照片（现在用 logo，缩略图无吸引力）
- 图片文件名 SEO 优化（需要在硬盘上批量重命名 webp）
- 图片 alt 文本「品牌 + 关键词」模式
- 「500+ Box Styles」声明需对账（Wine & Whisky 分类实际只有 5 个）

P2（更晚）：
- robots.txt / sitemap.xml 部署后用 Search Console 复测
- 国家级本地化内容（德国/日本进口关税、不同尺寸标准）
- emoji 装饰换 SVG icon（FSC / EU REACH / CARB / SGS / Phyto / ISO 9001）
- 分类页内容深度（规格表、FAQ）

**战略决策（要用户拍板）**：姐妹站 `xmchichomeware.com` 大量重复内容。两个选项——
1. 把 `xmchichomeware.com` 整站 301 到 `custom-woodenbox.com`（合并 link equity，最干净）
2. 让 `xmchichomeware.com` 改做企业站（only About + Contact + Press），不做产品 SEO

### 这一节累计提交建议

可以一个 commit 推：

```
fix(seo): P0 audit — www canonical + email domain + best sellers internal links + non-www 301

- siteUrl now points at https://www.custom-woodenbox.com (matches actual served URL)
- email domain switched to info@custom-woodenbox.com (brand entity alignment)
- next.config.js: 301 non-www → www at edge
- data/home/{8 locales}.js: Best Seller cards now link to specific PDP (was category landing)
  6 hrefs × 8 locales = 48 link targets corrected

Affects: canonical/OG/Twitter URL, sitemap.xml, robots.txt, hreflang — all auto-derived from siteUrl.

DEPLOY NOTE: user must configure info@custom-woodenbox.com mail forwarding/MX
DEPLOY NOTE: hreflang code was already correct — re-deploy will refresh the snapshot the auditor saw
```
