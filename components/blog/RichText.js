import Link from "next/link";

// Renders text with [label](url) links. Internal links use next/link.
export default function RichText({ text }) {
  const parts = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    parts.push(href.startsWith("/") ? <Link key={i++} href={href}>{label}</Link> : <a key={i++} href={href} rel="noopener noreferrer">{label}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
