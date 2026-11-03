import Container from "./Container";
import { cn } from "@/lib/utils";

export function Section({ id, className, children, tone, labelledBy }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 sm:py-24", tone === "tint" && "bg-white/55", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({ id, title, text, className, as: Tag = "h2" }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Tag id={id} className="text-3xl font-bold leading-tight sm:text-4xl">{title}</Tag>
      {text && <p className="mt-4 text-lg leading-relaxed text-quiet">{text}</p>}
    </div>
  );
}
