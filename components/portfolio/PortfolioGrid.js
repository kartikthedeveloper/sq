"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { projects, portfolioCategories } from "@/data/portfolio";

export default function PortfolioGrid() {
  const [cat, setCat] = useState("All");
  const shown = projects.filter((p) => cat === "All" || p.category === cat);
  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {portfolioCategories.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${cat === c ? "bg-royal text-white" : "glass text-ink hover:bg-white"}`}>{c}</button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} projects shown</p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <m.li key={p.slug} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }}>
              <article className="glass flex h-full flex-col overflow-hidden rounded-xl">
                <Image src={p.image} alt={`${p.title} concept artwork`} width={1200} height={630} unoptimized className="h-auto w-full" loading="lazy" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-quiet">{p.category}</span>
                    {p.demo && <span className="rounded-md bg-violet/10 px-2 py-1 text-xs font-semibold text-violet-900">Demo concept</span>}
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-quiet">{p.summary}</p>
                  <p className="mt-3 text-sm text-body">{p.stack.join(" · ")}</p>
                  <Link href={`/case-studies#${p.slug}`} className="mt-4 font-semibold text-royal hover:underline">See the approach</Link>
                </div>
              </article>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
