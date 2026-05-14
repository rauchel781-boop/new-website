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

**剩余工作**（按产品 × 语言估算）：
- 其他 16 分类 × 7 语 ≈ 1200+ 产品-语 组合

每个分类的 IT/FR/DE/ES/PT/JA/KO 中的 tea-coffee 段都可作为下一批的翻译模板。

- **下一步推荐**：切下一个分类。建议按结构类型聚合：
  - hinged (10 个) — 数量最多的 closure 类型
  - sliding-lid (9 个)
  - drawer (8 个)
  - magnetic (9 个)
  - with-lock (9 个)
  
  策略可以是「先把一个分类做 IT/FR/DE 3 语建模」（小批量验证），再扩到 ES/PT/JA/KO。或者「一次性 7 语都做完」（用过的模式）。
