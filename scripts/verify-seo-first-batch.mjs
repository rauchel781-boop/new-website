// Verify rendered production output, not just source strings.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const locales=['en','de','es','fr','it','pt','ja','ko'];
const origin='https://www.custom-woodenbox.com';
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"');
let titles=0,articles=0,images=0;
for(const locale of locales){
  const root=path.join('.next/server/app',locale);
  for(const page of ['products','capabilities','wood-fabrication','contact','blog','material-guide']){
    const html=fs.readFileSync(path.join(root,`${page}.html`),'utf8');
    const title=decode(html.match(/<title>(.*?)<\/title>/)?.[1]||'');
    assert.equal((title.match(/CHIC/g)||[]).length,1,`${locale}/${page}: one brand in title`);
    if(locale==='en')assert.ok(title.length>=50&&title.length<=60,`${page}: ${title.length} title characters`);
    assert.equal([...html.matchAll(/<h1\b/g)].length,1,`${locale}/${page}: one H1`);titles++;
  }
  for(const file of fs.readdirSync(path.join(root,'blog')).filter(f=>f.endsWith('.html'))){
    const html=fs.readFileSync(path.join(root,'blog',file),'utf8');
    const schema=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
    const article=schema.find(s=>s['@type']==='Article');
    assert.ok(article,`${locale}/${file}: Article schema`);
    const canonical=decode(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]||'');
    assert.equal(article.mainEntityOfPage['@id'],canonical,`${locale}/${file}: schema matches canonical`);
    assert.ok(canonical.startsWith(`${origin}/${locale}/blog/`));articles++;
    for(const m of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)){
      let src=decode(m[1]);if(!src.startsWith('/'))continue;
      if(src.startsWith('/_next/image?'))src=new URL(src,origin).searchParams.get('url');
      assert.ok(fs.existsSync(path.join('public',decodeURIComponent(src))),`${locale}/${file}: missing ${src}`);images++;
    }
  }
}
console.log(`PASS: ${titles} page titles, ${articles} localized article canonical/schema pairs, ${images} rendered image references.`);
