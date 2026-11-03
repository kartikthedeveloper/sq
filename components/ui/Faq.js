"use client";
import { useId, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";

/** Accessible accordion: buttons with aria-expanded/aria-controls, region panels. */
export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  return (
    <div className="divide-y divide-ink/10 rounded-xl glass">
      {items.map((it, i) => {
        const isOpen = open === i;
        const bid = `${uid}-b-${i}`, pid = `${uid}-p-${i}`;
        return (
          <div key={it.q}>
            <h3>
              <button id={bid} aria-expanded={isOpen} aria-controls={pid} onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-display text-lg font-semibold text-ink sm:px-6">
                {it.q}
                <Plus className={`h-5 w-5 shrink-0 text-royal transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div id={pid} role="region" aria-labelledby={bid} key="p"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }} className="overflow-hidden">
                  <p className="px-5 pb-6 leading-relaxed text-body sm:px-6">{it.a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
