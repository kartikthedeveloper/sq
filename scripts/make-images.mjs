import fs from "node:fs";
const palettes = [["#1d3fa8","#2f6bff"],["#2f6bff","#7c3aed"],["#14296f","#2f6bff"],["#7c3aed","#2f6bff"],["#0b1b3f","#1d3fa8"],["#1d3fa8","#7c3aed"],["#2f6bff","#14296f"],["#14296f","#7c3aed"]];
const mk = (name, i, label) => {
  const [a, b] = palettes[i % palettes.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="${label}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><linearGradient id="f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><g transform="translate(${760 + (i % 3) * 40} 120)" stroke="#fff" stroke-opacity=".6" stroke-width="3"><path d="M200 0 400 115v230L200 460 0 345V115z" fill="url(#f)"/><path d="M200 0v230m0 0L0 115m200 115 200-115m-200 115v230" fill="none"/></g><g fill="#fff" fill-opacity=".14"><circle cx="${140 + i * 30}" cy="520" r="120"/><circle cx="${380 + i * 20}" cy="90" r="70"/></g><text x="70" y="330" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" fill="#fff">${label}</text><text x="70" y="388" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#fff" fill-opacity=".85">Success Qube</text></svg>`;
  fs.writeFileSync(`public/images/${name}.svg`, svg);
};
const list = [
  ["blog-website","Websites"],["blog-ai","AI Automation"],["blog-sikar","Sikar Web Guide"],["blog-nextjs","Next.js"],
  ["blog-seo","SEO vs GEO"],["blog-security","Cybersecurity"],["blog-cloud","Cloud"],["blog-startup","Startup Roadmap"],
  ["portfolio-institute","Institute Portal"],["portfolio-localsite","Local Website"],["portfolio-mobile","Student App"],
  ["portfolio-ai","Document Q&A"],["portfolio-store","Online Store"],["portfolio-automation","Lead Routing"],
];
list.forEach(([n, l], i) => mk(n, i, l));
console.log("images:", list.length);
