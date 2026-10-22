// Verify the owner-confirmed MOQ in source, built pages and public production.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {CATEGORIES} from '../data/categories.js';
import {getCategoryTranslation} from '../data/categories/translations/index.js';
import {getProductTranslation} from '../data/products/translations/index.js';
import {buildProductFaqs} from '../lib/product-content.js';
import {POSTS} from '../data/blog.js';
import {getBlogTranslation} from '../data/blog/translations/index.js';
const locales=['en','de','es','fr','it','pt','ja','ko'];
const out='audits/seo-2026-10-19';
const products=[];
for(const file of fs.readdirSync('data/products').filter(f=>f.endsWith('.js'))){const{PRODUCTS}=await import(pathToFileURL(path.resolve('data/products',file)).href);for(const p of Object.values(PRODUCTS))products.push({category:file.slice(0,-3),product:p});}
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'").replace(/&nbsp;/g,' ');
const plain=s=>decode(s.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
const routes=[];let sourceProductSpecs=0,sourceCategorySpecs=0;
for(const locale of locales){
 const messages=JSON.parse(fs.readFileSync(`messages/${locale}.json`,'utf8'));
 for(const key of ['capabilities','contact'])assert.ok(messages[key].faq.a1.includes('200'),`${locale}: ${key} policy`);
 const blog=Object.fromEntries(POSTS.map(post=>[post.slug,getBlogTranslation(post.slug,locale)]));
 const first=new Set();
 for(const {category,product:raw} of products){const product={...raw,...getProductTranslation(raw.slug,locale)};assert.match(product.specs.MOQ,/^200(?!\d|\s*[-–〜~])/u,`${locale}/${raw.slug}: MOQ spec`);assert.ok(buildProductFaqs(product,locale)[0].a.includes('200'));sourceProductSpecs++;
  const representative=!first.has(category);first.add(category);routes.push({route:`/${locale}/products/${category}/${raw.slug}`,type:'product',locale,live:locale==='en'||representative});
 }
 for(const[slug,raw]of Object.entries(CATEGORIES)){
  const c={...raw,...getCategoryTranslation(slug,locale)};const spec=c.specs.find(s=>/^MOQ\s*[:：]/.test(s));if(spec)assert.deepEqual(spec.match(/\d+/g),['200']);assert.match(c.seoDescription,/MOQ[^\d]{0,20}200\b/u,`${locale}/${slug}: category policy`);sourceCategorySpecs++;
  routes.push({route:`/${locale}/products/${slug}`,type:'category',locale,live:true});
 }
 for(const p of POSTS){const title=blog[p.slug]?.title||p.title;routes.push({route:`/${locale}/blog/${p.slug}`,type:'blog',locale,title,updated:p.updated,live:true});}
 for(const page of ['','products','contact','capabilities','material-guide'])routes.push({route:`/${locale}${page?'/'+page:''}`,type:'core',locale,live:true});
}
routes.push({route:'/llms.txt',type:'llms',live:true});
function check(row,html){
 const text=plain(html);
 const problems=[];
 if(row.type==='product'){
  const quick=html.match(/<div class="pdp-quick-label">MOQ<\/div>\s*<div class="pdp-quick-value is-highlight">([\s\S]*?)<\/div>/)?.[1];
  if(!quick||!/^200(?!\d|\s*[-–〜~])/u.test(plain(quick)))problems.push(`Product MOQ: ${quick?plain(quick):'missing'}`);
 }
 if(row.type==='category'&&!/MOQ\s*[:：]?\s*200/.test(text))problems.push('Category MOQ spec missing');
 if(row.type==='core'&&!text.includes('200'))problems.push('Core page policy missing');
 if(row.type==='llms'&&!text.includes('MOQ is 200 pieces per design'))problems.push('LLM policy missing');
 if(row.type==='blog'){
  if(!text.includes(row.title))problems.push('Current article title missing');
  const article=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>{try{return JSON.parse(m[1]);}catch{return{};}}).find(s=>s['@type']==='Article');
  if(article?.dateModified!==row.updated)problems.push('Article revision date mismatch');
 }
 if(row.type!=='blog'){
  const bad=text.match(/\bMOQ\s*[:：]?\s*(?:(?:from|of|is)\s+)?(?:100|300|500)\b/gi);
  if(bad)problems.push(`Old MOQ: ${bad.join(', ')}`);
 }
 return problems;
}
fs.mkdirSync(out,{recursive:true});
if(!process.argv.includes('--source-only')){
 let checked=0;const failures=[];
 for(const row of routes){const file=row.type==='llms'?'.next/server/app/llms.txt.body':path.join('.next/server/app',`${row.route}.html`);const problems=check(row,fs.readFileSync(file,'utf8'));if(problems.length)failures.push({route:row.route,problems});checked++;}
 const result={checkedAt:new Date().toISOString(),sourceProductSpecs,sourceCategorySpecs,builtPages:checked,passed:failures.length===0,failures};fs.writeFileSync(`${out}/moq-local-checks.json`,JSON.stringify(result,null,2));assert.equal(failures.length,0,JSON.stringify(failures.slice(0,8)));console.log(`PASS: ${sourceProductSpecs} product specs, ${sourceCategorySpecs} category specs, ${checked} built pages.`);
}
if(process.argv.includes('--live')){
 const targets=routes.filter(x=>x.live);let cursor=0,done=0;const results=[];
 await Promise.all(Array.from({length:4},async()=>{while(cursor<targets.length){const index=cursor++,row=targets[index],url='https://www.custom-woodenbox.com'+row.route;try{const response=await fetch(url,{headers:{'cache-control':'no-cache',pragma:'no-cache'},signal:AbortSignal.timeout(25000)});const problems=check(row,await response.text());if(response.status!==200)problems.push(`HTTP ${response.status}`);results[index]={route:row.route,status:response.status,passed:!problems.length,problems};}catch(error){results[index]={route:row.route,passed:false,problems:[error.message]};}done++;if(done%100===0)console.log(`Production: ${done}/${targets.length}`);}}));
 const result={checkedAt:new Date().toISOString(),checkedAtShanghai:new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',dateStyle:'short',timeStyle:'medium'}).format(new Date()),pages:results.length,matched:results.filter(x=>x.passed).length,passed:results.every(x=>x.passed),scope:'All English products; one product per category in each other locale; every category and article in all locales; core MOQ pages and llms.txt',results};fs.writeFileSync(`${out}/moq-live-checks.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({...result,results:undefined,failures:results.filter(x=>!x.passed)},null,2));if(!result.passed)process.exitCode=1;
}
