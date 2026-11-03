"use client";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/** Link or anchor that reports a GA4 event on click. External/tel/mailto use <a>. */
export default function TrackedLink({ href, event, params, children, className, external, ...rest }) {
  const onClick = () => event && trackEvent(event, params);
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} onClick={onClick} className={className} {...rest}>{children}</Link>;
  }
  return (
    <a href={href} onClick={onClick} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}
