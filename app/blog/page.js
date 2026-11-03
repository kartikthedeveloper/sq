import { buildMetadata } from "@/lib/seo";
import { webPageSchema, itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import BlogCard from "@/components/blog/BlogCard";
import CtaBand from "@/components/ui/CtaBand";
import { posts } from "@/data/blog";

export const metadata = buildMetadata({
  title: "Blog: Web Development, AI, SEO, Cloud and Security Guides",
  description: "Practical guides from Success Qube on websites, Next.js, AI automation, SEO vs GEO, cybersecurity, cloud computing and digital transformation.",
  path: "/blog",
});

export default function BlogIndex() {
  return (
    <>
      <JsonLd data={[webPageSchema({ name: "Blog", description: metadata.description, path: "/blog", type: "CollectionPage" }), itemListSchema("Success Qube articles", posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })))]} />
      <PageHero crumbs={[{ name: "Blog", path: "/blog" }]} title="Insights and practical guides" intro="Short, useful articles written by our team. We publish when we have something worth saying." />
      <Section className="!pt-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
      </Section>
      <CtaBand />
    </>
  );
}
