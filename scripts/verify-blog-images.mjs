// Check all localized blog templates and, with --live, real optimized responses.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {POSTS} from '../data/blog.js';
import {BLOG_IMAGE_SIZES} from '../data/blog-image-sizes.js';

const live = process.argv.includes('--live');
const origin = 'https://www.custom-woodenbox.com';
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1].toLowerCase(), decode(m[2])]));
const routes = ['en','de','es','fr','it','pt','ja','ko'].flatMap(locale => [
  `/${locale}/blog`, ...POSTS.map(post => `/${locale}/blog/${post.slug}`),
]);
let images = 0, priorityImages = 0, bodyImages = 0;
async function check(route) {
  let html;
  if (live) {
    const response = await fetch(origin + route, {signal: AbortSignal.timeout(60000)});
    assert.equal(response.status, 200, route);
    html = await response.text();
  } else html = fs.readFileSync(`.next/server/app${route}.html`, 'utf8');
  const isList = route.endsWith('/blog');
  const region = html.match(isList ? /<div class="blg">([\s\S]*?)<\/main>/ : /<article class="bp">([\s\S]*?)<\/main>/)?.[1];
  assert.ok(region, `${route}: blog region`);
  let priorityCount = 0;
  for (const match of region.matchAll(/<img\b[^>]*>/g)) {
    const image = attrs(match[0]);
    if (!image['data-nimg']) continue; // Other components have their own image policy.
    const source = image.src.startsWith('/_next/image?')
      ? new URL(image.src, origin).searchParams.get('url') : image.src;
    assert.ok(fs.existsSync(`public${source}`), `${route}: ${source}`);
    assert.ok('alt' in image, `${route}: alt attribute`);
    if (!isList) assert.ok(image.alt, `${route}: descriptive alt`);
    if (!source.endsWith('.svg')) {
      assert.ok(image.src.startsWith('/_next/image?'), `${route}: optimized raster`);
      assert.ok(image.srcset?.includes('750w'), `${route}: responsive candidates`);
      assert.ok(image.sizes, `${route}: responsive sizes`);
    }
    if (image.fetchpriority === 'high') {
      assert.notEqual(image.loading, 'lazy', `${route}: hero eager`);
      priorityCount++;
    } else assert.equal(image.loading, 'lazy', `${route}: defer non-hero`);
    images++;
  }
  assert.equal(priorityCount, 1, `${route}: one priority hero`);
  assert.match(region, /position: relative;[\s\S]*?aspect-ratio: 16\/8/);
  assert.ok([...html.matchAll(/<link\b[^>]*>/g)].some(m => {
    const link = attrs(m[0]);
    return link.rel === 'preload' && link.as === 'image' && link.fetchpriority === 'high';
  }), `${route}: responsive hero preload`);
  priorityImages += priorityCount;
  for (const match of region.matchAll(/<figure[^>]*>\s*(<img\b[^>]*>)/g)) {
    const image = attrs(match[1]);
    const source = image.src.startsWith('/_next/image?') ? new URL(image.src, origin).searchParams.get('url') : image.src;
    assert.deepEqual({width: Number(image.width), height: Number(image.height)}, BLOG_IMAGE_SIZES[source], `${route}: natural dimensions`);
    bodyImages++;
  }
}
// Bounded concurrency for public production checks.
for (let i = 0; i < routes.length; i += 6) await Promise.all(routes.slice(i, i + 6).map(check));
const samples = [];
if (live) {
  for (const src of ['/folder/5-polishing.jpg','/drawer-wooden-box/set-1/set-1-01.png','/factory/warehouse.webp']) {
    for (const format of ['webp','avif']) {
      const url = `${origin}/_next/image?url=${encodeURIComponent(src)}&w=750&q=75`;
      const response = await fetch(url, {headers: {Accept: `image/${format}`}, signal: AbortSignal.timeout(60000)});
      assert.equal(response.status, 200, url);
      assert.equal(response.headers.get('content-type'), `image/${format}`);
      const data = Buffer.from(await response.arrayBuffer());
      assert.ok(format === 'webp' ? data.toString('ascii', 8, 12) === 'WEBP' : data.toString('ascii', 4, 8) === 'ftyp', 'valid image signature');
      const originalBytes = fs.statSync(`public${src}`).size;
      assert.ok(data.length < originalBytes, `${src}: reduced transfer`);
      samples.push({src, format, width: 750, quality: 75, originalBytes, optimizedBytes: data.length, reductionPercent: Number((100 * (1 - data.length / originalBytes)).toFixed(1))});
    }
  }
}
const report = {checkedAt: new Date().toISOString(), live, pages: routes.length, images, priorityImages, bodyImages, samples};
fs.mkdirSync('audits/seo-2026-10-19', {recursive: true});
fs.writeFileSync(`audits/seo-2026-10-19/blog-images-${live ? 'live' : 'local'}.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
