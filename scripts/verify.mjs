// Crawls the running site: status codes, metadata, JSON-LD, headings, internal links.
const base = process.env.BASE || "http://localhost:3100";
const sm = await (await fetch(base + "/sitemap.xml")).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const seen = new Set(urls), queue = [...urls], problems = [], titles = new Map(), descs = new Map();
const checked = new Set();
let pages = 0, jsonld = 0;
const get = async (p) => fetch(base + p, { redirect: "manual" });
while (queue.length) {
  const p = queue.shift(); if (checked.has(p)) continue; checked.add(p);
  const res = await get(p);
  if (res.status !== 200) { problems.push(`${p} -> ${res.status}`); continue; }
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("html")) continue;
  const html = await res.text(); pages++;
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${p}: ${h1} <h1>`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (!title) problems.push(`${p}: no title`); else { if (titles.has(title)) problems.push(`${p}: duplicate title with ${titles.get(title)}`); titles.set(title, p); }
  if (!desc) problems.push(`${p}: no description`); else { if (descs.has(desc)) problems.push(`${p}: duplicate description with ${descs.get(desc)}`); descs.set(desc, p); if (desc.length > 170) problems.push(`${p}: description ${desc.length} chars`); }
  if (!canon) problems.push(`${p}: no canonical`);
  else if (p !== "/" && !canon.endsWith(p)) problems.push(`${p}: canonical mismatch ${canon}`);
  if (/<meta name="robots" content="[^"]*noindex/.test(html) && p !== "/_not-found") problems.push(`${p}: noindex`);
  if (!/property="og:title"/.test(html)) problems.push(`${p}: no og:title`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1].replace(/\\u003c/g, "<")); jsonld++; } catch { problems.push(`${p}: invalid JSON-LD`); }
  }
  for (const m of html.matchAll(/<img[^>]*>/g)) if (!/ alt=/.test(m[0])) problems.push(`${p}: img without alt`);
  for (const m of html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
    const l = m[1]; if (l.startsWith("/_next") || /\.(svg|png|xml|txt|ico)$/.test(l) || l === "/sitemap.xml") continue;
    if (!seen.has(l)) { seen.add(l); queue.push(l); }
  }
}
// 404 check and static files
const nf = await get("/definitely-not-here"); if (nf.status !== 404) problems.push(`404 page returned ${nf.status}`);
for (const f of ["/robots.txt", "/llms.txt", "/opengraph-image", "/icon.svg", "/images/blog-ai.svg"]) { const r = await get(f); if (r.status !== 200) problems.push(`${f} -> ${r.status}`); }
const rob = await (await get("/robots.txt")).text();
console.log("sitemap urls:", urls.length, "| pages crawled:", pages, "| JSON-LD blocks valid:", jsonld);
console.log("robots.txt:\n" + rob);
console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "NO PROBLEMS FOUND");
