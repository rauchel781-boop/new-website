import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {getProductTranslation} from '../data/products/translations/index.js';
import {buildProductInquiryLinks, readProductInquiry, prefillProductInquiry} from '../lib/product-inquiry.js';
import {SITE} from '../data/site-config.js';

const locales = ['en','de','es','fr','it','pt','ja','ko'];
const live = process.argv.includes('--live');
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1].toLowerCase(), decode(m[2])]));
const products = [];
for (const file of fs.readdirSync('data/products').filter(f => f.endsWith('.js'))) {
  const {PRODUCTS} = await import(pathToFileURL(path.resolve('data/products', file)).href);
  for (const product of Object.values(PRODUCTS)) products.push({category: file.slice(0, -3), product});
}
let checkedProducts = 0, checkedImages = 0, checkedCorePages = 0;
const routes = [];
for (const locale of locales) {
  const messages = JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8'));
  const form = {name: '', email: '', company: '', country: '', subject: messages.contact.form.subjectGeneral, message: ''};
  const seen = new Set();
  for (const {category, product: raw} of products) {
    const product = {...raw, ...getProductTranslation(raw.slug, locale)};
    const productPath = `/products/${category}/${product.slug}`;
    const links = buildProductInquiryLinks(product.name, productPath, locale);
    const context = readProductInquiry(new URLSearchParams(links.formHref.query), locale);
    assert.equal(context?.name, product.name);
    assert.equal(context.url, `${SITE.siteUrl}/${locale}${productPath}`);
    const filled = prefillProductInquiry(form, context, messages.contact.form.subjectQuote, messages.contact.form.subjectGeneral);
    assert.equal(filled.subject, messages.contact.form.subjectQuote);
    assert.equal(filled.message, `${product.name}\n${context.url}\n\n`);
    assert.equal(filled.name, ''); assert.equal(filled.email, '');
    const draft = {...filled, message: 'Existing buyer draft with dimensions'};
    assert.equal(prefillProductInquiry(draft, context, 'Quote', 'General'), draft, 'Never overwrite a buyer draft');
    const first = !seen.has(category); seen.add(category);
    routes.push({locale, product, productPath, representative: locale === 'en' || first});
  }
  for (const query of [
    {product: 'Box', reference: 'https://example.invalid/box'},
    {product: 'Box', reference: '//example.invalid/box'},
    {product: 'Box', reference: '/products/gift-packaging/../../contact'},
    {product: 'Box\nInjected line', reference: '/products/gift-packaging/box'},
    {product: 'Box', reference: '/products/gift-packaging/box?redirect=external'},
  ]) assert.equal(readProductInquiry(new URLSearchParams(query), locale), null);
  const contact = fs.readFileSync(`.next/server/app/${locale}/contact.html`, 'utf8');
  assert.match(contact, /<textarea[^>]*id="cp-message"/, 'Form remains in static HTML');
  assert.ok(contact.includes(`href="${SITE.siteUrl}/${locale}/contact"`), 'Contact canonical has no inquiry query');
  for (const page of ['', '/about', '/contact']) {
    const route = `/${locale}${page}`;
    let html;
    if (live) {
      const response = await fetch(SITE.siteUrl + route, {signal: AbortSignal.timeout(60000)});
      assert.equal(response.status, 200, route); html = await response.text();
    } else html = fs.readFileSync(`.next/server/app/${locale}${page}.html`, 'utf8');
    assert.ok(!html.includes('info@xmchichomeware.com'), `${route}: public email consistent`);
    assert.ok(html.includes(`mailto:${SITE.email}`), `${route}: primary email present`);
    if (page === '/contact') {
      assert.match(html, /<textarea[^>]*id="cp-message"/);
      assert.ok(html.includes(`href="${SITE.siteUrl}/${locale}/contact"`));
    }
    checkedCorePages++;
  }
}
async function check(row) {
  const route = `/${row.locale}${row.productPath}`;
  let html;
  if (live) {
    const response = await fetch(SITE.siteUrl + route, {signal: AbortSignal.timeout(60000)});
    assert.equal(response.status, 200, route); html = await response.text();
  } else html = fs.readFileSync(`.next/server/app${route}.html`, 'utf8');
  const hero = html.match(/<div class="pdp-cta">([\s\S]*?)<\/div>/)[1];
  const ctas = [...hero.matchAll(/<a\b[^>]*>/g)].map(m => attrs(m[0]));
  const cta = ctas.find(a => a.href.startsWith('https://wa.me/'));
  const heroMail = new URL(ctas.find(a => a.href.startsWith('mailto:')).href);
  assert.equal(heroMail.pathname, SITE.email);
  assert.equal(heroMail.searchParams.get('subject'), row.product.name);
  assert.ok(heroMail.searchParams.get('body').includes(`${SITE.siteUrl}${route}`));
  const url = new URL(cta.href, SITE.siteUrl);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, `/${SITE.whatsapp.number}`);
  const context = {name: row.product.name, url: `${SITE.siteUrl}${route}`};
  assert.equal(url.searchParams.get('text'), `${context.name}\n${context.url}`);
  const banner = html.match(/<section class="pdp-inquiry">([\s\S]*?)<\/section>/)[1];
  const anchors = [...banner.matchAll(/<a\b[^>]*>/g)].map(m => attrs(m[0]));
  const mail = new URL(anchors.find(a => a.href.startsWith('mailto:')).href);
  assert.equal(mail.pathname, SITE.email);
  assert.equal(mail.searchParams.get('subject'), row.product.name);
  assert.ok(mail.searchParams.get('body').includes(context.url));
  assert.equal(new URL(anchors.find(a => a.href.startsWith('https://wa.me/')).href).searchParams.get('text'), `${row.product.name}\n${context.url}`);
  const main = attrs(html.match(/<div class="gal-main">(<img[^>]*>)/)[1]);
  assert.equal(main.fetchpriority, 'high');
  assert.notEqual(main.loading, 'lazy');
  assert.ok(main.sizes.includes('max-width: 1100px'), 'Account for full-width tablet layout');
  for (const tag of html.matchAll(/<div class="pdp-rel-img">(<img[^>]*>)/g)) {
    const img = attrs(tag[1]);
    assert.ok(img.src.startsWith('/_next/image?'));
    assert.ok(img.srcset && img.sizes);
    assert.equal(img.loading, 'lazy');
    assert.ok(img.alt); checkedImages++;
  }
  checkedProducts++;
}
const selected = live ? routes.filter(r => r.representative) : routes;
for (let i = 0; i < selected.length; i += 6) await Promise.all(selected.slice(i, i + 6).map(check));
const report = {checkedAt: new Date().toISOString(), live, sourceContexts: routes.length, productPages: checkedProducts, relatedImages: checkedImages, corePages: checkedCorePages, staticContactPages: 8, invalidQueryCases: 40, messagesSent: 0};
fs.writeFileSync(`audits/seo-2026-10-19/product-inquiry-${live ? 'live' : 'local'}.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
