import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { site, telHref, mailHref, waHref } from "@/lib/site";
import { contactFaqs } from "@/data/faqs";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import ContactForm from "@/components/forms/ContactForm";
import Faq from "@/components/ui/Faq";
import TrackedLink from "@/components/ui/TrackedLink";

export const metadata = buildMetadata({
  title: "Contact Success Qube: IT Company in Sikar, Rajasthan",
  description: "Contact Success Qube in Sikar, Rajasthan for a free consultation on websites, software, mobile apps, AI, SEO and digital marketing.",
  path: "/contact",
});

export default function ContactPage() {
  const fullAddress = [site.address, site.locality, site.region, site.postalCode, site.countryName].filter(Boolean).join(", ");
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Contact Success Qube", description: metadata.description, path: "/contact", type: "ContactPage" })} />
      <PageHero crumbs={[{ name: "Contact", path: "/contact" }]} title="Tell us what you want to build" intro="Share a few details and we will reply within one business day with honest advice on next steps. The first consultation is free." />
      <Section className="!pt-4" labelledBy="form-title">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div id="contact-form" className="glass-strong scroll-mt-28 rounded-xl p-6 sm:p-8">
            <h2 id="form-title" className="text-2xl font-bold">Send us a message</h2>
            <div className="mt-6"><ContactForm /></div>
          </div>
          <aside className="space-y-5" aria-label="Contact details">
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-bold">{site.name}</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-royal" aria-hidden="true" /><span>{fullAddress}</span></li>
                {site.phone && <li className="flex gap-3"><Phone className="mt-1 h-5 w-5 shrink-0 text-royal" aria-hidden="true" /><TrackedLink href={telHref()} event="phone_click" className="hover:underline">{site.phone}</TrackedLink></li>}
                {site.whatsapp && <li className="flex gap-3"><MessageCircle className="mt-1 h-5 w-5 shrink-0 text-royal" aria-hidden="true" /><TrackedLink href={waHref()} external event="whatsapp_click" className="hover:underline">Chat on WhatsApp</TrackedLink></li>}
                {site.email && <li className="flex gap-3"><Mail className="mt-1 h-5 w-5 shrink-0 text-royal" aria-hidden="true" /><TrackedLink href={mailHref()} event="email_click" className="hover:underline">{site.email}</TrackedLink></li>}
                <li className="flex gap-3"><Clock className="mt-1 h-5 w-5 shrink-0 text-royal" aria-hidden="true" /><span>We reply to enquiries within one business day.</span></li>
              </ul>
              {site.gbpUrl && <p className="mt-5"><a href={site.gbpUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-royal underline underline-offset-2">View us on Google Business Profile</a></p>}
            </div>
            {site.mapsEmbedUrl && (
              <div className="glass overflow-hidden rounded-xl">
                <iframe title={`Map showing ${site.name} location`} src={site.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full border-0" allowFullScreen />
              </div>
            )}
          </aside>
        </div>
      </Section>
      <Section tone="tint" labelledBy="cfaq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeading id="cfaq" title="Before you write" /><Faq items={contactFaqs} /></div>
      </Section>
    </>
  );
}
