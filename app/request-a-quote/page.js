import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import QuoteForm from "@/components/forms/QuoteForm";

export const metadata = buildMetadata({
  title: "Request a Quote for Your Website, App or Software Project",
  description: "Request a written quote from Success Qube for website development, software, mobile apps, AI, SEO or digital marketing. Free, no obligation.",
  path: "/request-a-quote",
});

const steps = ["We read your brief and may ask a few clarifying questions", "You receive a phased estimate with scope and timeline", "We agree a plan, starting with the most valuable part"];

export default function QuotePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: "Request a quote", description: metadata.description, path: "/request-a-quote" })} />
      <PageHero crumbs={[{ name: "Request a Quote", path: "/request-a-quote" }]} title="Get a clear, written quote" intro="The more detail you share, the more accurate our estimate. If you are not sure yet, say so and we will help you define it." />
      <Section className="!pt-4">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="glass-strong rounded-xl p-6 sm:p-8"><QuoteForm /></div>
          <aside className="glass h-fit rounded-xl p-6" aria-label="What happens next">
            <h2 className="text-xl font-bold">What happens next</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
          </aside>
        </div>
      </Section>
    </>
  );
}
