import { writeFileSync } from 'node:fs';
import { POSTS } from './data/blog.js';
const p = POSTS.find(x => x.slug === 'wooden-box-closure-types-compared');
if (!p) { console.error('NOT FOUND'); process.exit(1); }
const out = { title: p.title, excerpt: p.excerpt, category: p.category, readTime: p.readTime, body: p.body, faqs: p.faqs };
writeFileSync('closure-en.json', JSON.stringify(out, null, 1));
console.log('blocks:', p.body.length, 'faqs:', p.faqs.length, 'bytes:', JSON.stringify(out).length);
