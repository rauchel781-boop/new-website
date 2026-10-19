import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {SITE} from '../data/site-config.js';

const locales = ['en','de','es','fr','it','pt','ja','ko'];
const live = process.argv.includes('--live');
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1].toLowerCase(), decode(m[2])]));
function files(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => entry.isDirectory()
    ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
}
const core = ['', '/products', '/products/gift-packaging', '/products/gift-packaging/luxury-magnetic-gift-box',
  '/blog', '/blog/wooden-box-closure-types-compared', '/material-guide', '/about', '/contact',
  '/capabilities', '/wood-fabrication', '/privacy', '/terms'];
const routes = live ? locales.flatMap(locale => core.map(p => `/${locale}${p}`))
  : locales.flatMap(locale => [`/${locale}`, ...files(`.next/server/app/${locale}`).filter(p => p.endsWith('.html'))
      .map(p => '/' + path.relative('.next/server/app', p).replaceAll('\\', '/').replace(/\.html$/, ''))]);
let pages = 0, primaryButtons = 0, backupForms = 0;
async function check(route) {
  let html;
  if (live) {
    const response = await fetch(SITE.siteUrl + route, {signal: AbortSignal.timeout(60000)});
    assert.equal(response.status, 200, route); html = await response.text();
  } else html = fs.readFileSync(`.next/server/app${route}.html`, 'utf8');
  assert.ok(!/tawk|sticky-cta/i.test(html), `${route}: no old chat integration`);
  const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map(m => attrs(m[0]));
  const floating = anchors.filter(a => a.class === 'whatsapp-chat');
  assert.equal(floating.length, 1, `${route}: one global chat button`);
  const mainClasses = new Set(['cta','drawer-cta','pdp-btn-primary','cat-btn-primary','mg-btn-pri','about-btn-primary','final-btn']);
  const main = anchors.filter(a => mainClasses.has(a.class));
  assert.ok(main.some(a => a.class === 'cta') && main.some(a => a.class === 'drawer-cta'));
  for (const anchor of [...floating, ...main]) {
    const url = new URL(anchor.href);
    assert.equal(url.origin, 'https://wa.me', `${route}: primary contact is WhatsApp`);
    assert.equal(url.pathname, `/${SITE.whatsapp.number}`);
    assert.ok(url.searchParams.get('text').includes(SITE.siteUrl + route), `${route}: page context`);
    assert.equal(anchor.target, '_blank');
    assert.ok(anchor.rel.includes('noopener'));
  }
  assert.ok(anchors.some(a => a.href.startsWith(`mailto:${SITE.email}`)), `${route}: email backup`);
  if (route.endsWith('/contact')) {
    assert.match(html, /<textarea[^>]*id="cp-message"/);
    assert.match(html, /<button type="submit" class="form-btn"/); backupForms++;
  }
  primaryButtons += main.length; pages++;
}
for (let i=0; i<routes.length; i+=6) await Promise.all(routes.slice(i,i+6).map(check));
let scriptBundles = 0;
if (!live) {
  for (const file of files('.next/static/chunks').filter(p => p.endsWith('.js'))) {
    assert.ok(!/embed\.tawk\.to|Tawk_API|Tawk_LoadStart/.test(fs.readFileSync(file,'utf8')), `${file}: no Tawk loader`); scriptBundles++;
  }
  for (const locale of locales) {
    const m = JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8'));
    assert.ok(m.cta.whatsappMessage.includes('{url}'));
    assert.ok(!/chat widget|chat-widget|widget de chat|widget di chat|チャットウィジェット|채팅 위젯/i.test(m.cookie.message));
  }
}
const report = {checkedAt:new Date().toISOString(), live, pages, primaryButtons, floatingButtons:pages, backupForms, scriptBundles, whatsappNumber:SITE.whatsapp.number, messagesSent:0};
fs.writeFileSync(`audits/seo-2026-10-19/whatsapp-${live?'live':'local'}.json`, JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
