// ---------------------------------------------------------------------------
// IndexNow submitter.
//
// Why this exists: this site's real acquisition channel is AI assistants
// (ChatGPT, Copilot, Perplexity), and those lean on Bing's index. Bing
// supports IndexNow — you push a URL list and it crawls within minutes
// instead of the weeks Google takes to rediscover pages on its own.
//
// The key lives at /729175b3535dd6a81f085ca081f3a493.txt (public/), and its
// contents must equal the key itself. Bing fetches that file to prove the
// submitter controls the domain, so the file must stay deployed forever.
//
// Usage:
//   node scripts/indexnow-submit.mjs             # every URL in sitemap.xml
//   node scripts/indexnow-submit.mjs <url> ...   # only the URLs given
//
// Submitting the whole sitemap is for the first run or after a big change.
// Day to day, pass just the URLs that changed — IndexNow asks that you not
// re-submit unchanged pages, and honoring that keeps the domain in good
// standing.
// ---------------------------------------------------------------------------

// Overridable, so a host/key mismatch can be retested without editing this file:
//   node scripts/indexnow-submit.mjs --host custom-woodenbox.com --key <key>
function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const HOST = arg('host', 'www.custom-woodenbox.com');
const KEY = arg('key', '729175b3535dd6a81f085ca081f3a493');
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10000; // IndexNow's documented per-request ceiling

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(urlList) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  const body = await res.text();
  return { status: res.status, body: body.slice(0, 400) };
}

// 200 = accepted. 202 = accepted, key validation still pending (normal on the
// very first submission). 4xx means something is actually wrong, so name it.
function explain(status) {
  switch (status) {
    case 200: return 'OK - URLs accepted.';
    case 202: return 'Accepted - key validation pending. Normal on a first run.';
    case 400: return 'Bad request - malformed URL list.';
    case 403: return 'Forbidden. Two different causes share this code - read the '
      + 'response body. "SiteVerificationNotCompleted" means the host below is not '
      + 'a verified site in Bing Webmaster Tools; the host must match a verified '
      + 'property exactly, www included. Otherwise the key file is unreachable.';
    case 422: return 'Unprocessable - a URL does not belong to this host.';
    case 429: return 'Too many requests - wait and retry later.';
    default:  return 'Unexpected status.';
  }
}

// Positional URLs only - drop the --host/--key flags and the values after them.
const args = (() => {
  const out = [];
  const rest = process.argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === '--host' || rest[i] === '--key') { i++; continue; }
    out.push(rest[i]);
  }
  return out;
})();

try {
  const urls = args.length ? args : await urlsFromSitemap();
  if (!urls.length) throw new Error('No URLs to submit.');

  const foreign = urls.filter((u) => !u.startsWith(`https://${HOST}/`));
  if (foreign.length) {
    console.error(`Refusing to submit ${foreign.length} URL(s) not on ${HOST}:`);
    foreign.slice(0, 5).forEach((u) => console.error(`  ${u}`));
    process.exit(1);
  }

  console.log(`Source : ${args.length ? 'command line' : SITEMAP}`);
  console.log(`URLs   : ${urls.length}`);
  console.log(`Key at : ${KEY_LOCATION}`);
  console.log('');

  let rejected = 0;
  for (let i = 0; i < urls.length; i += BATCH) {
    const chunk = urls.slice(i, i + BATCH);
    const { status, body } = await submit(chunk);
    console.log(`Batch ${i / BATCH + 1}: ${chunk.length} URLs -> HTTP ${status}`);
    console.log(`  ${explain(status)}`);
    if (body) console.log(`  Response: ${body}`);
    if (status !== 200 && status !== 202) rejected++;
  }

  console.log('');
  // Anything outside 200/202 means nothing was queued. Exit non-zero so the
  // calling script reports a failure instead of printing "SUBMITTED".
  if (rejected) {
    console.log(`${rejected} batch(es) REJECTED - nothing was submitted.`);
    process.exit(1);
  }
  console.log('Done. Bing usually crawls submitted URLs within minutes to hours.');
} catch (err) {
  console.error('FAILED:', err.message);
  process.exit(1);
}
