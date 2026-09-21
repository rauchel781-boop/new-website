import { writeFileSync } from 'node:fs';
import { POSTS } from './data/blog.js';
const slug = process.argv[2];
const p = POSTS.find((x) => x.slug === slug);
if (!p) { console.error('not found:', slug); process.exit(1); }
const out = { title: p.title, excerpt: p.excerpt, category: p.category, readTime: p.readTime, body: p.body };
if (p.faqs) out.faqs = p.faqs;
writeFileSync(`tmp-i18n/${slug}-en.json`, JSON.stringify(out, null, 1));
const types = {}; p.body.forEach((b) => (types[b.type] = (types[b.type] || 0) + 1));
console.log('blocks:', p.body.length, '| types:', JSON.stringify(types), '| faqs:', p.faqs?.items?.length ?? 0, '| bytes:', JSON.stringify(out).length);
