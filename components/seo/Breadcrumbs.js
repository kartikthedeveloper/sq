import Link from "next/link";
import JsonLd from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

/** items: [{ name, path }] excluding Home; last item is the current page. */
export default function Breadcrumbs({ items }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-quiet">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((it, i) => {
            const last = i === all.length - 1;
            return (
              <li key={it.path} className="flex items-center gap-2">
                {last ? <span aria-current="page" className="font-medium text-ink">{it.name}</span> : <Link href={it.path} className="underline-offset-4 hover:text-royal hover:underline">{it.name}</Link>}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
