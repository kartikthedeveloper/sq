import Link from "next/link";

export function LogoMark({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2F6BFF" /><stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#0B1B3F" />
      <path d="M32 10 52 21.5v21L32 54 12 42.5v-21z" fill="url(#lg)" />
      <path d="M32 10v22m0 0L12 21.5M32 32l20-10.5M32 32v22" stroke="#fff" strokeOpacity=".75" strokeWidth="2.4" fill="none" />
    </svg>
  );
}

export default function Logo({ light = false }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Success Qube home">
      <LogoMark />
      <span className={`font-display text-xl font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Success <span className={light ? "text-white" : "text-royal"}>Qube</span>
      </span>
    </Link>
  );
}
