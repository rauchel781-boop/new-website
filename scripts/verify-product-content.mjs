// Capture the production HTML before rebuilding; verify substantive buyer-copy
// changes afterward. This reads rendered output, not implementation snapshots.
// node scripts/verify-product-content.mjs --capture
// node scripts/verify-product-content.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const folder = 'audits/seo-2026-10-19';
const baselineFile = `${folder}/content-quality-baseline.json`;
const buildRoot = '.next/server/app';
const locales = ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'ko'];
let excludedRuntimeNotFound = [];
const hash = value => createHash('sha256').update(value).digest('hex');
const decode = value => (value || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#(?:x27|39);/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;|\u00a0/g, ' ').replace(/&#(\d+);/g, (_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([\da-f]+);/gi, (_,n)=>String.fromCodePoint(parseInt(n,16)));
const clean = html => html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<!--[\s\S]*?-->/g, '');
const textOf = html => decode(clean(html).replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attrsOf = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1].toLowerCase(),decode(m[2])]));
const mainOf = html => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
function parse(html) {
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/g)].map(m=>attrsOf(m[0]));
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(m=>attrsOf(m[0]));
  const getMeta = key => metaTags.find(t=>t.name===key || t.property===key)?.content;
  const metadata = Object.fromEntries(['description','robots','googlebot','og:title','og:description','twitter:title','twitter:description'].map(k=>[k,getMeta(k) || null]));
  const jsonLd = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{try{return [JSON.parse(m[1])]}catch{return []}});
  const main = mainOf(html);
  return {
    mainHash: hash(textOf(main)),
    articleCoreHash: hash(textOf(main.replace(/<section\b[^>]*class="related"[^>]*>[\s\S]*?<\/section>/g,''))),
    mainHtmlHash: hash(clean(main).replace(/\s+/g,' ').trim()),
    title: textOf(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ''),
    metadata,
    socialImages: {ogImage:getMeta('og:image') || null,twitterImage:getMeta('twitter:image') || null},
    canonical: links.find(l=>l.rel==='canonical')?.href || null,
    hreflang: links.filter(l=>l.hreflang).map(l=>({lang:l.hreflang,href:l.href})).sort((a,b)=>a.lang.localeCompare(b.lang)),
    htmlLang: html.match(/<html\b[^>]*lang="([^"]+)"/)?.[1] || null,
    productLd: jsonLd.find(x=>x['@type']==='Product') || null,
    organizationLd: jsonLd.find(x=>x['@type']==='Organization' || (Array.isArray(x['@type']) && x['@type'].includes('Organization'))) || null,
    breadcrumbs: jsonLd.find(x=>x['@type']==='BreadcrumbList')?.itemListElement || [],
    contactCards: [...main.matchAll(/class="[^"]*contact-choice[^" ]*(?:\s|[^"])*"/g)].length,
  };
}
function htmlFiles(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?htmlFiles(path.join(dir,entry.name)):entry.name.endsWith('.html')?[path.join(dir,entry.name)]:[]);
}
function readBuild() {
  excludedRuntimeNotFound=[];
  return Object.fromEntries(htmlFiles(buildRoot).sort().flatMap(file=>{
    const route = '/'+path.relative(buildRoot,file).replaceAll('\\','/').replace(/\.html$/,'');
    const page={...parse(fs.readFileSync(file,'utf8')),file};
    const sidecar=file.replace(/\.html$/,'.meta');
    if(route!=='/_not-found' && fs.existsSync(sidecar)) {
      const response=JSON.parse(fs.readFileSync(sidecar,'utf8'));
      // Preview negative-route tests can materialize ISR notFound caches next
      // to generated HTML. They are not newly published content pages. An
      // existing route becoming 404 still fails the baseline route inventory.
      if(response.status===404 && /noindex/.test(page.metadata.robots || '')) {
        excludedRuntimeNotFound.push({route,status:404,robots:page.metadata.robots});
        return [];
      }
    }
    return [[route,page]];
  }));
}
function readSitemap() {
  const file = path.join(buildRoot,'sitemap.xml.body');
  const xml = fs.readFileSync(file,'utf8');
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>({loc:decode(m[1].match(/<loc>([\s\S]*?)<\/loc>/)?.[1]),lastmod:m[1].match(/<lastmod>([\s\S]*?)<\/lastmod>/)?.[1] || null,alternates:[...m[1].matchAll(/<xhtml:link\b[^>]*>/g)].map(x=>attrsOf(x[0]))}));
  return {xml,snapshot:{sha256:hash(xml),entries}};
}
fs.mkdirSync(folder,{recursive:true});
if(process.argv.includes('--capture')) {
  if(fs.existsSync(baselineFile)) throw new Error(`Baseline already exists; refusing to overwrite ${baselineFile}`);
  const pages = readBuild();
  const sitemap = readSitemap();
  const baseline = {capturedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),pages,sitemap:sitemap.snapshot};
  fs.writeFileSync(baselineFile,JSON.stringify(baseline,null,2)+'\n');
  fs.writeFileSync(`${folder}/content-quality-sitemap-baseline.xml`,sitemap.xml);
  console.log(`Captured ${Object.keys(pages).length} rendered pages, ${Object.values(pages).filter(p=>p.productLd).length} products, ${sitemap.snapshot.entries.length} sitemap entries at ${baseline.head}.`);
} else if(process.argv.includes('--capture-social-images')) {
  const baseline = JSON.parse(fs.readFileSync(baselineFile,'utf8'));
  const current = readBuild();
  if(JSON.stringify(Object.keys(current).sort())!==JSON.stringify(Object.keys(baseline.pages).sort())) throw new Error('Build inventory changed; refusing to augment baseline.');
  for(const [route,page] of Object.entries(current)) {
    if(page.mainHash!==baseline.pages[route]?.mainHash || page.title!==baseline.pages[route]?.title) throw new Error(`Build changed before social-image baseline could be added: ${route}`);
    baseline.pages[route].socialImages=page.socialImages;
    baseline.pages[route].articleCoreHash=page.articleCoreHash;
  }
  baseline.socialImagesCapturedAt=new Date().toISOString();
  fs.writeFileSync(baselineFile,JSON.stringify(baseline,null,2)+'\n');
  console.log(`Added social-image metadata to unchanged baseline for ${Object.keys(current).length} pages.`);
} else {
  await verify();
}

async function verify() {
  const before = JSON.parse(fs.readFileSync(baselineFile,'utf8'));
  const after = readBuild();
  const { getProductTranslation } = await import('../data/products/translations/index.js');
  const { getProductSpecTranslation } = await import('../data/products/translations/specs.js');
  const { getProductPageCopy } = await import('../data/product-page-copy.js');
  const { isNonBoxProduct } = await import('../data/non-box-products.js');
  const { SITE } = await import('../data/site-config.js');
  const catalog = {};
  for(const file of fs.readdirSync('data/products').filter(f=>f.endsWith('.js'))) {
    const mod = await import(pathToFileURL(path.resolve('data/products',file)).href);
    if(mod.PRODUCTS) catalog[file.slice(0,-3)] = mod.PRODUCTS;
  }
  const messages = Object.fromEntries(locales.map(l=>[l,JSON.parse(fs.readFileSync(`messages/${l}.json`,'utf8'))]));
  const issues = [];
  let issueCount = 0;
  const ok = (condition,route,test,details) => {
    if(condition) return;
    issueCount++;
    if(issues.length<200) issues.push({route,test,...(details===undefined?{}:{details})});
  };
  const same = (actual,wanted,route,test) => ok(JSON.stringify(actual)===JSON.stringify(wanted),route,test,{actual,wanted});
  same(String(SITE.company.foundingYear),'2021','*','Owner-confirmed company founding year');
  for(const locale of locales) same(after[`/${locale}`]?.organizationLd?.foundingDate,'2021',`/${locale}`,'Organization schema founding date');
  const normalized = s => decode(String(s || '')).replace(/\s+/g,' ').trim();
  const numbers = s => String(s).match(/\d+(?:\.\d+)?/g) || [];
  const articleSlugs = ['eva-vs-epe-vs-velvet-vs-felt-insert-guide','sustainable-sourcing-2026'];
  // The rewritten sourcing title and read times also appear in other articles'
  // related cards. Restore only those card fields to the Git baseline and
  // demand an identical full main-text hash; the rest of each article cannot
  // change unnoticed merely because it links to one of the reviewed articles.
  const oldBlog = await importGitData(before.head,'data/blog.js');
  const oldArticleCards = {};
  for(const locale of locales) {
    const translations = (await importGitData(before.head,`data/blog/translations/${locale}.js`)).default;
    oldArticleCards[locale] = Object.fromEntries(oldBlog.POSTS.filter(p=>articleSlugs.includes(p.slug)).map(p=>[p.slug,{...p,...translations.posts?.[p.slug]}]));
  }
  const relatedCardsOnlyRoutes = new Set();
  const relatedCardRestorations = [];
  for(const [route,current] of Object.entries(after)) {
    const prior=before.pages[route];
    if(!/^\/[a-z]{2}\/blog\/[^/]+$/.test(route) || articleSlugs.some(s=>route.endsWith(`/blog/${s}`)) || current.mainHash===prior?.mainHash) continue;
    const locale=route.split('/')[1];
    let restored=clean(mainOf(fs.readFileSync(current.file,'utf8')));
    let restoredCards=0;
    for(const card of classElements(restored,'a','rel-card')) {
      const slug=card.attrs.href?.split('/').pop();
      const old=oldArticleCards[locale]?.[slug];
      if(!old) continue;
      let inner=card.inner;
      for(const [tag,cls,value] of [['h3','rel-name',old.title],['div','rel-meta',`${old.category} · ${old.readTime}`]]) {
        const element=classElements(inner,tag,cls)[0];
        if(element) inner=inner.replace(element.outer,element.outer.replace(element.inner,escapeHtml(value)));
      }
      restored=restored.replace(card.outer,card.outer.replace(card.inner,inner));
      restoredCards++;
    }
    if(restoredCards && hash(textOf(restored))===prior?.mainHash) {
      relatedCardsOnlyRoutes.add(route);
      relatedCardRestorations.push({route,restoredCards,fullMainHashMatchesBaseline:true});
    }
  }
  const extraArg = process.argv.find(a=>a.startsWith('--allow-extra-changes='));
  const extraChanges = extraArg ? JSON.parse(fs.readFileSync(extraArg.split('=').slice(1).join('='),'utf8')) : [];
  const extraRoutes = new Set(extraChanges.map(row=>typeof row==='string'?row:row.route));
  const allowedReason = route => /^\/[a-z]{2}\/products\/[^/]+\/[^/]+$/.test(route) ? 'Product content and specifications release' : articleSlugs.some(slug=>route.endsWith(`/blog/${slug}`)) ? 'Reviewed technical sourcing article' : /^\/[a-z]{2}\/blog$/.test(route) ? 'Blog listing may reflect corrected article excerpts' : relatedCardsOnlyRoutes.has(route) ? 'Only related-article card title/read time changed; restoring card fields reproduces the full baseline main hash' : extraRoutes.has(route) ? 'Explicitly reviewed dependent change' : null;
  const changedMain = [];
  const changedMetadata = [];
  const changedSocialImages = [];
  const unexpectedMain = [];
  const addedRoutes=Object.keys(after).filter(route=>!Object.hasOwn(before.pages,route));
  const removedRoutes=Object.keys(before.pages).filter(route=>!Object.hasOwn(after,route));
  ok(addedRoutes.length===0 && removedRoutes.length===0,'*','Preserve rendered route inventory',{added:addedRoutes,removed:removedRoutes});
  for(const [route,current] of Object.entries(after)) {
    const prior = before.pages[route];
    if(!prior) continue;
    const reason = allowedReason(route);
    if(current.mainHash!==prior.mainHash) {
      changedMain.push({route,reason});
      if(!reason) unexpectedMain.push(route);
    }
    const isSourcingArticle = route.endsWith('/blog/sustainable-sourcing-2026');
    if(current.title!==prior.title) {
      changedMetadata.push({route,key:'title',before:prior.title,after:current.title});
      ok(isSourcingArticle,route,'Preserve title except reviewed sourcing-guide replacement',{actual:current.title,wanted:prior.title});
    }
    same(current.canonical,prior.canonical,route,'Preserve canonical');
    same(current.hreflang,prior.hreflang,route,'Preserve hreflang alternates');
    same(current.htmlLang,prior.htmlLang,route,'Preserve HTML language');
    for(const [key,url] of Object.entries(current.socialImages)) {
      const oldUrl=prior.socialImages?.[key];
      if(url!==oldUrl) {
        changedSocialImages.push({route,key,before:oldUrl,after:url});
        if(url && oldUrl) {
          const wanted=new URL(oldUrl);
          const actual=new URL(url);
          same(actual.origin+actual.pathname,wanted.origin+wanted.pathname,route,`Only ${key} query hash changes for founding-date correction`);
          ok(actual.pathname.endsWith('/opengraph-image'),route,`${key} URL hash change is generated share image`);
        } else ok(false,route,`${key} must retain presence`);
      }
    }
    const isEditedArticle = articleSlugs.some(slug=>route.endsWith(`/blog/${slug}`));
    for(const key of Object.keys(prior.metadata)) {
      if(current.metadata[key]!==prior.metadata[key]) {
        changedMetadata.push({route,key,before:prior.metadata[key],after:current.metadata[key]});
        ok((isEditedArticle && ['description','og:description','twitter:description'].includes(key)) || (isSourcingArticle && ['og:title','twitter:title'].includes(key)),route,`Preserve metadata ${key}`,{actual:current.metadata[key],wanted:prior.metadata[key]});
      }
    }
  }
  for(const route of unexpectedMain) ok(false,route,'Unexpected main-content change outside reviewed scope');
  let products = 0, specValues = 0, relatedCards = 0, contextualChoices = 0, hiddenPanels = 0;
  const unchangedEnglishSpecValues = [];
  const missingSpecHeaders = [];
  const localizedSpecCoverage = Object.fromEntries(locales.map(l=>[l,{products:0,keys:0,missing:0}]));
  for(const locale of locales) for(const [category,items] of Object.entries(catalog)) for(const raw of Object.values(items)) {
    const route = `/${locale}/products/${category}/${raw.slug}`;
    const current = after[route];
    const prior = before.pages[route];
    if(!current || !prior) {ok(false,route,'Product route present in before and after');continue;}
    products++;
    const html = fs.readFileSync(current.file,'utf8');
    const main = clean(mainOf(html));
    const copy = getProductPageCopy(category,raw.slug,locale);
    const overlay = getProductTranslation(raw.slug,locale);
    const product = {...raw,...overlay,specs:overlay.specs || getProductSpecTranslation(raw,locale),...(copy?{intro:copy.intro}:{})};
    const m = messages[locale];
    const paragraphs = [...main.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(x=>textOf(x[1]));
    const hero = classElements(main,'p','pdp-intro')[0];
    const renderedIntro = textOf(hero?.inner || '');
    same(renderedIntro,normalized(product.intro),route,'Hero uses actual localized or curated intro');
    ok(Boolean(renderedIntro),route,'Hero intro is nonempty');
    const introOccurrences = paragraphs.reduce((total,p)=>total+(renderedIntro?p.split(renderedIntro).length-1:0),0);
    same(introOccurrences,1,route,'Full hero intro occurs only once across main paragraphs');
    same(textOf(classElements(main,'h1','pdp-h1')[0]?.inner || ''),normalized(product.name),route,'Localized product heading');
    const bread = textOf(classElements(main,'div','pdp-bread-inner')[0]?.inner || '');
    const categoryName = m.categories[category];
    for(const label of [m.nav.products,categoryName,product.name]) ok(bread.includes(normalized(label)),route,'Localized visible product breadcrumb',label);
    same(current.breadcrumbs.map(b=>b.name),[m.nav.home,m.nav.products,categoryName,product.name],route,'Localized structured breadcrumbs');

    const quickKeys = ['MOQ','Lead Time',...(['Size','Sizes','Footprint'].find(k=>product.specs[k])?[['Size','Sizes','Footprint'].find(k=>product.specs[k])]:[]),'Material','Surface Finish','Branding'];
    const quick = classElements(main,'div','pdp-quick-row');
    same(quick.length,quickKeys.length,route,'Hero quick-spec row count');
    for(let i=0;i<quickKeys.length;i++) {
      const key = quickKeys[i];
      same(textOf(classElements(quick[i]?.inner || '','div','pdp-quick-label')[0]?.inner || ''),m.specKeys[key] || key,route,`Localized quick-spec label ${key}`);
      same(textOf(classElements(quick[i]?.inner || '','div','pdp-quick-value')[0]?.inner || ''),normalized(product.specs[key]),route,`Quick-spec value ${key}`);
    }

    const panels = [...main.matchAll(/<div\b[^>]*role="tabpanel"[^>]*>/g)].map(x=>attrsOf(x[0]));
    same(panels.length,4,route,'All four tab panels render in server HTML');
    same(new Set(panels.map(p=>p.id)).size,4,route,'Tab panel IDs are unique');
    same(panels.filter(p=>Object.hasOwn(p,'hidden')).length,3,route,'Only description panel initially displayed');
    for(const pane of panels) {
      ok(pane.id && pane['aria-labelledby'],route,'Tab panel accessible labels');
      const button = [...main.matchAll(/<button\b[^>]*role="tab"[^>]*>/g)].map(x=>attrsOf(x[0])).find(x=>x.id===pane['aria-labelledby']);
      same(button?.['aria-controls'],pane.id,route,'Tab button controls its own panel');
    }
    hiddenPanels += panels.filter(p=>Object.hasOwn(p,'hidden')).length;
    const table = classElements(main,'table','spec-table')[0];
    ok(Boolean(table),route,'Complete spec table is in server HTML');
    const renderedSpecs = [...(table?.inner || '').matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].map(row=>({label:textOf(row[1].match(/<th\b[^>]*>([\s\S]*?)<\/th>/)?.[1] || ''),value:textOf(row[1].match(/<td\b[^>]*>([\s\S]*?)<\/td>/)?.[1] || '')}));
    const sourceSpecs = Object.entries(raw.specs);
    const effectiveSpecs = Object.entries(product.specs);
    for(const [key] of effectiveSpecs) {
      const translatedHeader=m.specKeys?.[key];
      const present=typeof translatedHeader==='string' && Boolean(translatedHeader.trim()) && !translatedHeader.startsWith('specKeys.');
      if(!present) missingSpecHeaders.push({route,locale,key});
      ok(present,route,`Every specification header has a locale message: ${key}`);
    }
    same(effectiveSpecs.map(([k])=>k),sourceSpecs.map(([k])=>k),route,'Translation preserves every original spec key');
    same(renderedSpecs,effectiveSpecs.map(([key,value])=>({label:m.specKeys[key] || key,value:normalized(value)})),route,'All localized specifications render correctly');
    const oldSpecs = Object.fromEntries((prior.productLd?.additionalProperty || []).map(p=>[p.name,p.value]));
    for(const [key,value] of effectiveSpecs) {
      specValues++;
      same(numbers(value),numbers(oldSpecs[key]),route,`Preserve numeric facts in ${key}`);
    }
    same(current.productLd?.additionalProperty,effectiveSpecs.map(([name,value])=>({'@type':'PropertyValue',name,value})),route,'Product JSON-LD matches visible specifications');
    same(current.productLd?.name,product.name,route,'Product JSON-LD localized name');
    same(current.productLd?.description,product.intro,route,'Product JSON-LD actual intro');
    same(current.productLd?.image,prior.productLd?.image,route,'Product gallery images preserved');
    same(/noindex/.test(current.metadata.robots || ''),isNonBoxProduct(raw.slug),route,'Box indexing policy preserved');
    if(locale!=='en') {
      localizedSpecCoverage[locale].products++;
      localizedSpecCoverage[locale].keys+=sourceSpecs.length;
      const missing = !product.specs || sourceSpecs.some(([key])=>!Object.hasOwn(product.specs,key));
      if(missing) localizedSpecCoverage[locale].missing++;
      ok(!missing,route,'Non-English products have complete spec value overlays');
      for(const [key,value] of effectiveSpecs) {
        // Identical abbreviations, sizes and species names can be legitimate;
        // retain descriptive English matches for human review, not a fake
        // language detector or an unconditional rejection.
        if(value===raw.specs[key] && (String(value).match(/[A-Za-z]{4,}/g) || []).length>=2) unchangedEnglishSpecValues.push({route,key,value});
      }
    }
    const related = (product.related || []).map(slug=>items[slug]).filter(Boolean).slice(0,3).map(p=>({...p,...getProductTranslation(p.slug,locale)}));
    const cards = classElements(main,'a','pdp-rel-card');
    same(cards.length,related.length,route,'Related product count preserved');
    for(let i=0;i<related.length;i++) {
      relatedCards++;
      const actual = cards[i];
      const wanted = related[i];
      same(textOf(classElements(actual?.inner || '','div','pdp-rel-name')[0]?.inner || ''),normalized(wanted.name),route,'Related product localized name');
      same(textOf(classElements(actual?.inner || '','div','pdp-rel-tagline')[0]?.inner || ''),normalized(wanted.tagline),route,'Related product localized tagline');
      same(actual?.attrs.href,`/${locale}/products/${category}/${wanted.slug}`,route,'Related product localized href');
      const img = [...(actual?.inner || '').matchAll(/<img\b[^>]*>/g)].map(x=>attrsOf(x[0]))[0];
      same(img?.alt,wanted.name,route,'Related product localized image alt');
    }
    const choices = classElements(main,'div','contact-options');
    ok(choices.length>=2,route,'Both hero and inquiry banner retain email and WhatsApp choices');
    for(const choice of choices) {
      const email = classElements(choice.inner,'a','contact-choice-email')[0];
      const whatsapp = classElements(choice.inner,'a','contact-choice-whatsapp')[0];
      ok(Boolean(email && whatsapp),route,'Email and WhatsApp paired choices');
      if(email && whatsapp) {
        contextualChoices++;
        const mail = new URL(email.attrs.href);
        const wa = new URL(whatsapp.attrs.href);
        ok((mail.searchParams.get('body') || '').includes(product.name) && (mail.searchParams.get('body') || '').includes(route),route,'Email draft retains product context');
        ok((wa.searchParams.get('text') || '').includes(product.name) && (wa.searchParams.get('text') || '').includes(route),route,'WhatsApp draft retains product context');
      }
    }
  }
  same(products,1488,'*','Verify complete 186 products × 8 locales');
  const sitemap = readSitemap().snapshot;
  same(sitemap.entries.map(e=>e.loc).sort(),before.sitemap.entries.map(e=>e.loc).sort(),'*','Preserve sitemap URL inventory');
  const oldMap = new Map(before.sitemap.entries.map(e=>[e.loc,e]));
  const sitemapDateChanges = [];
  let productSitemapEntries = 0;
  for(const entry of sitemap.entries) {
    const prior = oldMap.get(entry.loc);
    if(!prior) continue;
    same(entry.alternates,prior.alternates,entry.loc,'Preserve sitemap hreflang');
    const route = new URL(entry.loc).pathname;
    const isProduct = /^\/[a-z]{2}\/products\/[^/]+\/[^/]+$/.test(route);
    const isArticle = articleSlugs.some(slug=>route.endsWith(`/blog/${slug}`));
    if(isProduct) {productSitemapEntries++;ok(entry.lastmod?.startsWith('2026-10-19'),route,'Updated indexable product sitemap date');}
    if(entry.lastmod!==prior.lastmod) {
      sitemapDateChanges.push({route,before:prior.lastmod,after:entry.lastmod});
      ok(isProduct || isArticle,route,'Sitemap modification date change limited to released content');
    }
  }
  same(productSitemapEntries,1176,'*','147 indexable products × 8 locales in sitemap');
  const result = {checkedAt:new Date().toISOString(),baselineHead:before.head,passed:issueCount===0,counts:{renderedPages:Object.keys(after).length,products,specValues,relatedCards,contextualChoices,hiddenPanels,changedMain:changedMain.length,preservedMain:Object.keys(after).length-changedMain.length,metadataChanges:changedMetadata.length,socialImageChanges:changedSocialImages.length,sitemapDateChanges:sitemapDateChanges.length,productSitemapEntries,unchangedEnglishSpecValues:unchangedEnglishSpecValues.length,missingSpecHeaders:missingSpecHeaders.length},excludedRuntimeNotFound,missingSpecHeaders,localizedSpecCoverage,unchangedEnglishSpecValues,changedMain,relatedCardRestorations,changedMetadata,changedSocialImages,unexpectedMain,explicitDependentChanges:extraChanges,sitemapDateChanges,issueCount,issues};
  fs.writeFileSync(`${folder}/product-content-validation.json`,JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({...result,changedMain:undefined,changedMetadata:undefined,changedSocialImages:undefined,sitemapDateChanges:undefined,unchangedEnglishSpecValues:unchangedEnglishSpecValues.slice(0,8),issues:issues.slice(0,20)},null,2));
  if(issueCount) process.exitCode=1;
}

// Read nested elements using tag depth so a section's first nested div does not
// prematurely terminate extraction. Handles the deterministic React HTML here.
function classElements(html,tag,className) {
  const result = [];
  const starts = new RegExp(`<${tag}\\b[^>]*>`, 'g');
  for(const match of html.matchAll(starts)) {
    const attrs = attrsOf(match[0]);
    if(!(attrs.class || '').split(/\s+/).includes(className)) continue;
    const contentStart = match.index+match[0].length;
    const tokens = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'g');
    tokens.lastIndex=contentStart;
    let depth=1, token;
    while((token=tokens.exec(html))) {
      depth+=token[0].startsWith('</')?-1:1;
      if(depth===0) {result.push({attrs,inner:html.slice(contentStart,token.index),outer:html.slice(match.index,tokens.lastIndex)});break;}
    }
  }
  return result;
}

function escapeHtml(value) {return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');}
async function importGitData(ref,file) {
  const source=execFileSync('git',['show',`${ref}:${file}`],{encoding:'utf8',maxBuffer:10*1024*1024});
  return import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
}
