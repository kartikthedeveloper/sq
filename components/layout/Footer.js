import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import NewsletterForm from "@/components/forms/NewsletterForm";
import TrackedLink from "@/components/ui/TrackedLink";
import { site, socialLinks, telHref, mailHref, waHref } from "@/lib/site";
import { services } from "@/data/services";
import { quickLinks } from "@/data/navigation";

export default function Footer() {
  const social = socialLinks();
  return (
    <footer className="mt-10 bg-ink text-white/80">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 max-w-sm leading-relaxed">{site.description}</p>
            <address className="mt-5 space-y-1 text-sm not-italic">
              <p className="font-semibold text-white">{site.name}</p>
              <p>{[site.address, site.locality, site.region, site.postalCode, site.countryName].filter(Boolean).join(", ")}</p>
              {site.phone && <p><TrackedLink href={telHref()} event="phone_click" className="hover:text-white hover:underline">{site.phone}</TrackedLink></p>}
              {site.email && <p><TrackedLink href={mailHref()} event="email_click" className="hover:text-white hover:underline">{site.email}</TrackedLink></p>}
              {site.whatsapp && <p><TrackedLink href={waHref()} external event="whatsapp_click" className="hover:text-white hover:underline">Chat on WhatsApp</TrackedLink></p>}
            </address>
            {social.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Social media">
                {social.map((s) => (
                  <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer me" className="rounded-md border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10">{s.label}</a></li>
                ))}
              </ul>
            )}
          </div>
          <nav aria-label="Quick links" className="lg:col-span-2">
            <p className="font-display font-semibold text-white">Company</p>
            <ul className="mt-4 space-y-2 text-sm">{quickLinks.map((l) => (<li key={l.href}><Link href={l.href} className="hover:text-white hover:underline">{l.label}</Link></li>))}</ul>
          </nav>
          <nav aria-label="Services" className="lg:col-span-3">
            <p className="font-display font-semibold text-white">Services</p>
            <ul className="mt-4 columns-1 gap-6 space-y-2 text-sm sm:columns-2 lg:columns-1 xl:columns-2">
              {services.map((s) => (<li key={s.slug} className="break-inside-avoid"><Link href={`/services/${s.slug}`} className="hover:text-white hover:underline">{s.name}</Link></li>))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className="font-display font-semibold text-white">Local</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/locations/it-company-in-sikar" className="hover:text-white hover:underline">IT company in Sikar</Link></li>
              <li><Link href="/locations/web-development-company-in-sikar" className="hover:text-white hover:underline">Web development in Sikar</Link></li>
              <li><Link href="/locations/it-company-in-jaipur" className="hover:text-white hover:underline">IT company in Jaipur</Link></li>
            </ul>
            <p className="mt-8 font-display font-semibold text-white">Technology notes in your inbox</p>
            <p className="mt-2 text-sm">Occasional practical articles. No spam.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}, {site.locality}, {site.region}, {site.countryName}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/privacy-policy" className="hover:text-white hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-white hover:underline">Terms &amp; Conditions</Link></li>
            <li><Link href="/site-map" className="hover:text-white hover:underline">Sitemap</Link></li>
            <li><a href="/sitemap.xml" className="hover:text-white hover:underline">XML sitemap</a></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
