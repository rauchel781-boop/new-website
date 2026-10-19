// Validate source link coverage and the actual localized production HTML.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd();
const {POSTS}=await import(pathToFileURL(path.join(root,'data/blog.js')).href);
const locales=['en','de','es','fr','it','pt','ja','ko'];
const markdownLinks=body=>[...JSON.stringify(body).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(m=>m[1]);
const incoming=new Map(POSTS.map(p=>[p.slug,new Set()]));
const summary=[];
for(const post of POSTS){
  const links=markdownLinks(post.body).filter(href=>href.startsWith('/'));
  assert.ok(links.length>=10&&links.length<=15,`${post.slug}: ${links.length} contextual internal links`);
  assert.equal(new Set(links).size,links.length,`${post.slug}: no repeated internal destinations`);
  assert.ok(markdownLinks([post.body[0]]).some(href=>href.startsWith('/')),'Opening paragraph includes a contextual link');
  assert.match(post.updated,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(links.includes('/contact#inquiry'),`${post.slug}: inquiry link`);
  for(const href of links.filter(href=>href.startsWith('/blog/'))){
    const target=href.slice('/blog/'.length);assert.notEqual(target,post.slug);assert.ok(incoming.has(target),href);incoming.get(target).add(post.slug);
  }
  summary.push({slug:post.slug,internalLinks:links.length});
}
for(const row of summary){row.incomingArticles=incoming.get(row.slug).size;assert.ok(row.incomingArticles>=3,`${row.slug}: ${row.incomingArticles} contextual incoming articles`);}
if(!process.argv.includes('--source-only')){
  let total=0;
  const decode=s=>s.replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"');
  for(const locale of locales)for(const post of POSTS){
    const file=path.join('.next/server/app',locale,'blog',`${post.slug}.html`);
    const html=fs.readFileSync(file,'utf8');
    const body=html.split('<div class="body">')[1]?.split('<div class="post-foot">')[0];
    assert.ok(body,`${locale}/${post.slug}: article body present`);
    const links=[...body.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)].map(m=>decode(m[1])).filter(href=>href.startsWith('/'));
    assert.equal(links.length,summary.find(s=>s.slug===post.slug).internalLinks,`${locale}/${post.slug}: rendered/source link counts match`);
    for(const href of links){
      assert.ok(href.startsWith(`/${locale}/`),`${locale}/${post.slug}: wrong locale ${href}`);
      const url=new URL(href,'https://www.custom-woodenbox.com');
      const targetFile=path.join('.next/server/app',decodeURIComponent(url.pathname)+'.html');
      assert.ok(fs.existsSync(targetFile),`${locale}/${post.slug}: missing target ${href}`);
      const target=fs.readFileSync(targetFile,'utf8');
      assert.ok(!/<meta name="(?:robots|googlebot)" content="[^"]*noindex/.test(target),`Target must be indexable: ${href}`);
      if(url.hash)assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Missing fragment ${href}`);
      total++;
    }
  }
  const sitemap=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8');
  const entries=[...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>m[1]);
  for(const locale of locales)for(const post of POSTS){
    const url=`https://www.custom-woodenbox.com/${locale}/blog/${post.slug}`;
    const entry=entries.find(e=>e.includes(`<loc>${url}</loc>`));
    assert.ok(entry?.includes(`<lastmod>${post.updated}T00:00:00.000Z</lastmod>`),`Sitemap revision date: ${url}`);
  }
  fs.mkdirSync('audits/seo-2026-10-17',{recursive:true});
  fs.writeFileSync('audits/seo-2026-10-17/second-batch-link-checks.json',JSON.stringify({articles:16,localizedArticles:128,renderedInternalLinks:total,sitemapRevisionEntries:128,summary},null,2));
  console.log(`PASS: 128 localized articles, ${total} rendered links; correct language, existing indexable targets and valid fragments.`);
}
console.log(JSON.stringify(summary,null,2));
