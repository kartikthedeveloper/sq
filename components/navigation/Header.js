"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import TrackedLink from "@/components/ui/TrackedLink";
import { mainNav } from "@/data/navigation";
import { servicesByGroup } from "@/data/services";
import { technologies } from "@/data/technologies";

const groups = servicesByGroup();

function MegaPanel({ id, kind, close }) {
  return (
    <m.div id={id} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16 }}
      className="absolute inset-x-0 top-full z-40 px-5 sm:px-8">
      <div className="glass-strong mx-auto mt-2 max-w-7xl rounded-2xl p-6">
        {kind === "services" ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {groups.map((g) => (
                <div key={g.id}>
                  <p className="font-display text-sm font-semibold text-ink">{g.name}</p>
                  <p className="text-sm text-quiet">{g.blurb}</p>
                  <ul className="mt-3 space-y-0.5">
                    {g.items.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} onClick={close} className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-[0.95rem] text-body hover:bg-mist hover:text-royal">
                          <Icon name={s.icon} className="h-4 w-4 text-royal" />{s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 text-sm">
              <span className="text-quiet">Not sure which service you need?</span>
              <Link href="/services" onClick={close} className="inline-flex items-center gap-1 font-semibold text-royal hover:underline">View all services <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((t) => (
              <Link key={t.id} href={`/technologies#${t.id}`} onClick={close} className="flex items-start gap-3 rounded-xl p-3 hover:bg-mist">
                <Icon name={t.icon} className="mt-0.5 h-5 w-5 text-royal" />
                <span><span className="block font-display font-semibold text-ink">{t.name}</span><span className="text-sm text-quiet">{t.items.join(", ")}</span></span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </m.div>
  );
}

function MobileMenu({ onClose }) {
  const ref = useRef(null);
  const [open, setOpen] = useState("services");

  useEffect(() => {
    const el = ref.current;
    const focusables = () => el.querySelectorAll('a[href], button:not([disabled])');
    focusables()[0]?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <m.div ref={ref} role="dialog" aria-modal="true" aria-label="Site navigation" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.25 }} className="fixed inset-0 z-[60] overflow-y-auto bg-paper lg:hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <Logo />
        <button onClick={onClose} aria-label="Close menu" className="rounded-lg p-2 text-ink hover:bg-mist"><X className="h-6 w-6" aria-hidden="true" /></button>
      </div>
      <nav aria-label="Mobile" className="px-5 pb-10">
        <ul className="divide-y divide-ink/10">
          {mainNav.map((item) => (
            <li key={item.label} className="py-1">
              {item.mega ? (
                <>
                  <button aria-expanded={open === item.mega} onClick={() => setOpen(open === item.mega ? "" : item.mega)}
                    className="flex w-full items-center justify-between py-3 font-display text-xl font-semibold text-ink">
                    {item.label}<ChevronDown className={`h-5 w-5 transition-transform ${open === item.mega ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {open === item.mega && (
                    <div className="pb-3 pl-1">
                      {item.mega === "services"
                        ? groups.map((g) => (
                            <div key={g.id} className="mb-3">
                              <p className="text-sm font-semibold text-quiet">{g.name}</p>
                              <ul>{g.items.map((s) => (<li key={s.slug}><Link href={`/services/${s.slug}`} onClick={onClose} className="block py-2 text-body hover:text-royal">{s.name}</Link></li>))}</ul>
                            </div>
                          ))
                        : <ul>{technologies.map((t) => (<li key={t.id}><Link href={`/technologies#${t.id}`} onClick={onClose} className="block py-2 text-body hover:text-royal">{t.name}</Link></li>))}</ul>}
                      <Link href={item.href} onClick={onClose} className="mt-1 inline-block py-2 font-semibold text-royal">All {item.label.toLowerCase()}</Link>
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href} onClick={onClose} className="block py-3 font-display text-xl font-semibold text-ink">{item.label}</Link>
              )}
            </li>
          ))}
        </ul>
        <TrackedLink href="/contact#contact-form" event="consultation_click" onClick={onClose}
          className="mt-6 flex items-center justify-center rounded-lg bg-royal px-5 py-3.5 font-semibold text-white">Get a free consultation</TrackedLink>
      </nav>
    </m.div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wrapRef = useRef(null);
  const closeAll = useCallback(() => { setOpenMenu(null); setMobile(false); }, []);

  useEffect(() => { closeAll(); }, [pathname, closeAll]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null); };
    const onKey = (e) => { if (e.key === "Escape") setOpenMenu(null); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <header ref={wrapRef} className={`sticky top-0 z-50 transition-shadow ${scrolled ? "glass-strong !rounded-none" : "bg-transparent"}`}
      onMouseLeave={() => setOpenMenu(null)}>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.mega ? (
              <div key={item.label} onMouseEnter={() => setOpenMenu(item.mega)}>
                <button aria-expanded={openMenu === item.mega} aria-controls={`mega-${item.mega}`}
                  onClick={() => setOpenMenu(openMenu === item.mega ? null : item.mega)}
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-[0.95rem] font-medium text-ink hover:bg-white/70">
                  {item.label}<ChevronDown className={`h-4 w-4 transition-transform ${openMenu === item.mega ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <Link key={item.label} href={item.href} aria-current={pathname === item.href ? "page" : undefined}
                className={`rounded-lg px-3.5 py-2 text-[0.95rem] font-medium hover:bg-white/70 ${pathname === item.href ? "text-royal" : "text-ink"}`}>{item.label}</Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <TrackedLink href="/contact#contact-form" event="consultation_click"
            className="hidden rounded-lg bg-royal px-4 py-2.5 text-[0.95rem] font-semibold text-white hover:bg-royal-deep sm:inline-flex">Get a Free Consultation</TrackedLink>
          <button className="rounded-lg p-2 text-ink hover:bg-white/70 lg:hidden" aria-label="Open menu" aria-haspopup="dialog" onClick={() => setMobile(true)}>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <AnimatePresence>{openMenu && <MegaPanel key={openMenu} id={`mega-${openMenu}`} kind={openMenu} close={closeAll} />}</AnimatePresence>
      <AnimatePresence>{mobile && <MobileMenu onClose={() => setMobile(false)} />}</AnimatePresence>
    </header>
  );
}
