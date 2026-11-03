import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export const metadata = buildMetadata({
  title: "Portfolio: Web, Mobile, AI and Business Software Projects",
  description: "Demo concepts from Success Qube showing how we approach websites, mobile apps, AI assistants, e-commerce and business software.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Portfolio", path: "/portfolio" }]} title="Project showcase" intro="Everything below is labelled as a demo concept. We will publish completed client projects here only when the client has agreed." />
      <Section className="!pt-4"><PortfolioGrid /></Section>
      <CtaBand />
    </>
  );
}
