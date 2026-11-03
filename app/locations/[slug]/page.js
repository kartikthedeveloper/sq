import { notFound } from "next/navigation";
import { locations, getLocation } from "@/data/locations";
import { buildMetadata } from "@/lib/seo";
import LocationTemplate from "@/components/services/LocationTemplate";

export const dynamicParams = false;
export const generateStaticParams = () => locations.map((l) => ({ slug: l.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) return {};
  return buildMetadata({ title: l.title, description: l.meta, path: `/locations/${l.slug}` });
}

export default async function LocationPage({ params }) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) notFound();
  return <LocationTemplate loc={l} />;
}
