// ─────────────────────────────────────────────────────────────────────────
// SITE CONFIG — single source of truth for contact, social, and EmailJS.
// Update values here and they propagate to Header, Footer, Contact, Blog, Home CTA.
// ─────────────────────────────────────────────────────────────────────────
// Build marker: 2026-05-09 — perf rebuild trigger (next/font + WebP).

export const SITE = {
  // 站点 URL — SEO/sitemap/robots/canonical/OG/hreflang 全都从这里取。
  // **必须带 www 子域**，因为浏览器实际响应的是 www。Mismatch 会导致
  // canonical 指向一个不同于 visit URL 的版本，伤 SEO。
  // 不要带末尾斜杠。
  siteUrl: 'https://www.custom-woodenbox.com',

  company: {
    legalName: 'Xiamen Chic Homeware Co.,Ltd.',
    brand: 'CHIC',
    tagline: 'Wooden Expert',
  },

  // 网站显示用邮箱。这个域名（custom-woodenbox.com）需要在邮箱托管那边
  // 配 `info@custom-woodenbox.com` 转发到主邮箱 info@xmchichomeware.com，
  // 或者直接收件。让品牌实体匹配一致（Google 用邮箱域名做品牌识别）。
  email: 'info@custom-woodenbox.com',

  whatsapp: {
    // Raw number (no spaces/dashes/+) used to build wa.me link
    number: '8618960098762',
    // Pretty version shown on the page
    display: '+86 189 6009 8762',
    // Click-to-chat URL — opens WhatsApp / WhatsApp Web
    chatUrl: 'https://wa.me/8618960098762',
  },

  wechat: {
    // The user's WeChat ID
    id: '86-18960098762',
    // Note shown next to the ID
    note: 'Search this ID in WeChat to add us',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/105598253',
    youtube:  'https://www.youtube.com/@XiamenChic',
    alibaba:  'https://quke.en.alibaba.com',
  },

  hours: 'Mon–Sat · 9:00–18:00 (GMT+8)',

  addresses: {
    salesOffice: {
      label: 'Sales Office',
      city: 'Xiamen, Fujian',
      lines: [
        '101, No. 8 Houweizhaiding Road, Maluan,',
        'Xinglin, Jimei District, Xiamen,',
        'Fujian, China',
      ],
      role: 'Sales · design · export documentation · sample coordination',
    },
    factory: {
      label: 'Factory · 15,000 m²',
      city: 'Cao County, Shandong',
      lines: [
        'North of the Administration for Market Regulation Office,',
        'Pulianji Village, Pulianji Town, Cao County,',
        'Heze City, Shandong Province, China',
      ],
      role: 'Manufacturing · finishing · QC · packing · 120+ skilled workers',
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  // EmailJS — fill these from your EmailJS dashboard
  // (https://dashboard.emailjs.com → Account → API Keys, and the IDs
  // from the Email Services and Email Templates pages).
  //
  // SETUP:
  //   1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
  //   2. Add an Email Service connected to info@xmchichomeware.com
  //      (Gmail, Outlook, or "Other SMTP" — copy the Service ID)
  //   3. Create TWO Email Templates:
  //        a) "Contact Form"     — variables: name, email, company, message, source
  //        b) "Newsletter Sub"   — variables: email, source
  //      Copy each Template ID.
  //   4. Get your Public Key from Account → API Keys.
  //   5. Replace the YOUR_… placeholders below.
  //
  // While placeholders remain, all forms gracefully fall back to mailto.
  // ─────────────────────────────────────────────────────────────────────
  emailjs: {
    publicKey:           'pRCcl_i5yn6UkOPJR',
    serviceId:           'service_pnqxbpa',
    contactTemplateId:   'template_gua3mo9',
    newsletterTemplateId:'template_51pc4th',
  },

  // ─────────────────────────────────────────────────────────────────────
  // Analytics — Google Analytics 4 + (optional) Microsoft Clarity
  //
  // Both scripts only load AFTER the visitor accepts cookies via the
  // cookie banner (see components/CookieConsent.jsx). Until then they
  // are not requested at all — no network calls, no cookies, no
  // browser fingerprinting.
  //
  // GA4 setup: Admin → Data Streams → click your web stream → top-right
  // shows "Measurement ID" (G-XXXXXXXXXX). Paste it below.
  //
  // Clarity setup: clarity.microsoft.com → your project → Settings →
  // Setup → copy "Project ID" (10-char lowercase alphanumeric).
  // Leave as '' or 'YOUR_…' to disable.
  // ─────────────────────────────────────────────────────────────────────
  analytics: {
    googleAnalyticsId: 'G-RTG65S2XK9',
    clarityProjectId:  'wq99itk70w',
  },
};

// Helper — true while EmailJS still has placeholder values, false once configured.
export function isEmailJSConfigured() {
  const e = SITE.emailjs;
  return !(
    e.publicKey.startsWith('YOUR_') ||
    e.serviceId.startsWith('YOUR_') ||
    e.contactTemplateId.startsWith('YOUR_') ||
    e.newsletterTemplateId.startsWith('YOUR_')
  );
}
