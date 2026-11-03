import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import ServiceTemplate from "@/components/services/ServiceTemplate";

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.meta, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  return <ServiceTemplate service={s} />;
}
