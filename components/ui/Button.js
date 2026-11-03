import TrackedLink from "./TrackedLink";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[0.95rem] font-semibold transition-colors duration-200 focus-visible:outline-offset-2";
const variants = {
  primary: "bg-royal text-white shadow-[0_10px_24px_-10px_rgba(29,63,168,.7)] hover:bg-royal-deep",
  secondary: "glass text-ink hover:bg-white",
  quiet: "text-royal hover:bg-mist",
  inverse: "bg-white text-royal-deep hover:bg-mist",
};

export default function Button({ href, variant = "primary", className, event, params, external, children, ...rest }) {
  const cls = cn(base, variants[variant], className);
  if (href) return <TrackedLink href={href} event={event} params={params} external={external} className={cls} {...rest}>{children}</TrackedLink>;
  return <button className={cls} {...rest}>{children}</button>;
}
