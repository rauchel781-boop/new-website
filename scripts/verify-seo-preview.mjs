// Run against a local production server: npm run start -- -p 3107
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base='http://localhost:3107';
const checks=[];
for(const [route,width,height] of [['/icon',32,32],['/apple-icon',180,180],['/opengraph-image',1200,630]]){
  const response=await fetch(base+route);assert.equal(response.status,200,route);
  assert.match(response.headers.get('content-type'),/image\/png/);
  const buffer=Buffer.from(await response.arrayBuffer());
  assert.equal(buffer.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  assert.equal(buffer.toString('ascii',12,16),'IHDR');
  assert.equal(buffer.readUInt32BE(16),width);assert.equal(buffer.readUInt32BE(20),height);
  checks.push({route,status:200,width,height,bytes:buffer.length});
}
const replacements=[
  '/tea-coffee-boxes/8-dividers-acacia-tea-bag-box/tea-box-3.webp',
  '/factory/material.webp',
  '/garden-seeds-box/bamboo-seed-storage-box-with-adjustable-removable-dividers/bamboo-seed-storage-box-with-adjustable-removable-dividers-1.webp',
];
for(const route of replacements){
  const response=await fetch(base+route);assert.equal(response.status,200,route);
  assert.match(response.headers.get('content-type'),/image\/webp/);
  const buffer=Buffer.from(await response.arrayBuffer());
  assert.equal(buffer.toString('ascii',0,4),'RIFF');assert.equal(buffer.toString('ascii',8,12),'WEBP');
  checks.push({route,status:200,bytes:buffer.length});
}
for(const locale of ['en','de']){
  const route=`/${locale}/blog/how-to-choose-wood-thickness-for-custom-wooden-boxes`;
  const response=await fetch(base+route);assert.equal(response.status,200);
  const html=await response.text();for(const src of replacements)assert.ok(html.includes(`src="${src}"`));
  assert.ok(!html.includes('src="/folder/material.jpg"'));
  checks.push({route,status:200,replacementImages:3});
}
fs.mkdirSync('audits/seo-2026-10-17',{recursive:true});
fs.writeFileSync('audits/seo-2026-10-17/first-batch-http-checks.json',JSON.stringify(checks,null,2));
console.log(`PASS: ${checks.length} local production HTTP checks; valid icons, sharing image, replacement photos and article responses.`);
