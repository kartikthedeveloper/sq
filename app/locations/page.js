import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import { locations } from "@/data/locations";

export const metadata = buildMetadata({ title: "Local IT Services in Sikar and Jaipur", description: "IT, web development, software, SEO and digital marketing services for businesses in Sikar and Jaipur, Rajasthan.", path: "/locations" });

export default function LocationsIndex() {
  return (
    <>
      <PageHero crumbs={[{ name: "Locations", path: "/locations" }]} title="Local IT services in Sikar and Jaipur" intro="Our home base is Sikar, Rajasthan. These pages explain how we help local businesses, and each one covers a different need." />
      <Section className="!pt-4">
        <ul className="grid gap-5 md:grid-cols-2">
          {locations.map((l) => (
            <li key={l.slug}><Link href={`/locations/${l.slug}`} className="glass block h-full rounded-xl p-6 hover:bg-white"><h2 className="text-xl font-bold">{l.title}</h2><p className="mt-2 text-quiet">{l.meta}</p></Link></li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
