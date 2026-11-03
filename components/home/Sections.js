import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Faq from "@/components/ui/Faq";
import ServiceCard from "@/components/services/ServiceCard";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import BlogCard from "@/components/blog/BlogCard";
import { services } from "@/data/services";
import { technologies } from "@/data/technologies";
import { industries } from "@/data/industries";
import { process as steps } from "@/data/process";
import { posts } from "@/data/blog";
import { homeFaqs } from "@/data/faqs";

const capabilities = [
  { icon: "Globe", title: "Web & apps", text: "Next.js websites, web applications and cross-platform mobile apps.", span: "lg:col-span-2" },
  { icon: "BrainCircuit", title: "AI & automation", text: "LLM assistants, ML features and workflows that remove repetitive work." },
  { icon: "Cloud", title: "Cloud & DevOps", text: "Reliable hosting, CI/CD pipelines and monitoring." },
  { icon: "ShieldCheck", title: "Security", text: "Secure development practices and application security reviews." },
  { icon: "TrendingUp", title: "SEO, GEO & growth", text: "Be found in Google and in AI answers, then convert the visit.", span: "lg:col-span-2" },
];

export function Capabilities() {
  return (
    <Section labelledBy="cap-title">
      <SectionHeading id="cap-title" title="One team for the whole technology journey" text="From the first idea to a product in the hands of customers, the same people plan, build, launch and improve it." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c) => (
          <div key={c.title} className={`glass rounded-xl p-6 ${c.span || ""}`}>
            <Icon name={c.icon} className="h-7 w-7 text-royal" />
            <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
            <p className="mt-2 text-quiet">{c.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function AboutSection() {
  const cols = [
    ["Our vision", "Make good technology normal for businesses of every size, including those outside the big metros."],
    ["Our mission", "Turn business problems into dependable software, websites and automation that people enjoy using."],
    ["Our approach", "Plain-language planning, short build cycles with demos, and honest advice, even when it means building less."],
  ];
  return (
    <Section tone="tint" labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading id="about-title" title="Who we are" text="Success Qube is a full-service IT and technology company in Sikar, Rajasthan. We design, build and grow digital products for local businesses and for clients across India and abroad." />
          <p className="mt-5 leading-relaxed">Businesses choose us because they get one accountable team, clear communication and technology matched to their stage, from a first website to a multi-user platform.</p>
          <Button href="/about" variant="quiet" className="-ml-4 mt-4">More about Success Qube <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
        </div>
        <dl className="space-y-5">
          {cols.map(([t, d]) => (
            <div key={t} className="glass rounded-xl p-6"><dt className="font-display text-lg font-bold text-ink">{t}</dt><dd className="mt-2 text-body">{d}</dd></div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

export function ServicesSection() {
  return (
    <Section id="services" labelledBy="svc-title">
      <SectionHeading id="svc-title" title="Services built around real business outcomes" text="Each service has its own page explaining what you get, how we work and what it costs you in time." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
      </div>
    </Section>
  );
}

export function WhyChoose() {
  const items = [
    ["Practical technology expertise", "We recommend what works for your size and budget, not what is fashionable."],
    ["Business-focused development", "Every feature is tied to a goal such as more enquiries, less manual work or faster billing."],
    ["Scalable architecture", "Clean structure and documentation so the product can grow without a rewrite."],
    ["Modern technology stack", "React, Next.js, Node.js, Python and cloud tooling that your future team can hire for."],
    ["Transparent communication", "Written scope, regular demos and one person you can ask for status."],
    ["Long-term technical support", "Maintenance, security updates and improvements continue after launch."],
  ];
  return (
    <Section tone="tint" labelledBy="why-title">
      <SectionHeading id="why-title" title="Why businesses choose Success Qube" />
      <ul className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2">
        {items.map(([t, d]) => (
          <li key={t} className="flex gap-4">
            <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-royal text-white"><Check className="h-4 w-4" aria-hidden="true" /></span>
            <div><h3 className="text-lg font-bold">{t}</h3><p className="mt-1 text-quiet">{d}</p></div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function TechStack() {
  return (
    <Section labelledBy="tech-title">
      <SectionHeading id="tech-title" title="A modern, maintainable technology stack" text="We list only what we build with. Tools are chosen per project, not per trend." />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((t) => (
          <div key={t.id} className="glass rounded-xl p-6">
            <div className="flex items-center gap-3"><Icon name={t.icon} className="h-6 w-6 text-royal" /><h3 className="text-lg font-bold">{t.name}</h3></div>
            <ul className="mt-4 flex flex-wrap gap-2">{t.items.map((i) => <li key={i} className="neu-inset rounded-md px-3 py-1.5 text-sm font-medium text-ink">{i}</li>)}</ul>
          </div>
        ))}
      </div>
      <Button href="/technologies" variant="quiet" className="-ml-4 mt-6">Explore our technologies <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
    </Section>
  );
}

export function IndustriesSection() {
  return (
    <Section tone="tint" labelledBy="ind-title">
      <SectionHeading id="ind-title" title="Industries we serve" />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <li key={i.slug}>
            <Link href={`/industries#${i.slug}`} className="glass flex items-center gap-4 rounded-xl p-5 hover:bg-white">
              <Icon name={i.icon} className="h-6 w-6 shrink-0 text-royal" /><span className="font-display text-lg font-semibold text-ink">{i.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function PortfolioSection() {
  return (
    <Section labelledBy="pf-title">
      <SectionHeading id="pf-title" title="Project showcase" text="These are clearly labelled demo concepts that show how we approach common problems. Real client work is added here only with the client's permission." />
      <div className="mt-10"><PortfolioGrid /></div>
    </Section>
  );
}

export function ProcessSection() {
  return (
    <Section tone="tint" labelledBy="proc-title">
      <SectionHeading id="proc-title" title="How we work: from first call to ongoing support" />
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.name} className="glass rounded-xl p-5">
            <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-sm font-bold text-white">{i + 1}</span><Icon name={s.icon} className="h-5 w-5 text-royal" /></div>
            <h3 className="mt-3 text-lg font-bold">{s.name}</h3>
            <p className="mt-1 text-sm text-quiet">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Testimonials({ items = [] }) {
  // items: [{ quote, name, role, company }]. Add only real, permissioned feedback.
  return (
    <Section labelledBy="test-title">
      <SectionHeading id="test-title" title="Client feedback" />
      {items.length ? (
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li key={t.name} className="glass rounded-xl p-6"><blockquote className="text-lg leading-relaxed text-ink">“{t.quote}”</blockquote><p className="mt-4 text-sm text-quiet">{t.name}, {t.role}, {t.company}</p></li>
          ))}
        </ul>
      ) : (
        <div className="glass mt-8 max-w-3xl rounded-xl p-6 sm:p-8">
          <p className="text-lg text-ink">We publish only genuine feedback from real clients, with their permission.</p>
          <p className="mt-2 text-quiet">As projects complete, verified reviews will appear here. If you want to talk to us before deciding, we are happy to walk you through how we work.</p>
          <Button href="/contact#contact-form" className="mt-5" event="consultation_click">Talk to our team</Button>
        </div>
      )}
    </Section>
  );
}

export function BlogSection() {
  return (
    <Section tone="tint" labelledBy="blog-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id="blog-title" title="Insights and guides" text="Practical articles on web, AI, SEO, security and cloud." />
        <Button href="/blog" variant="secondary">All articles</Button>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.slice(0, 3).map((p) => <BlogCard key={p.slug} post={p} />)}</div>
    </Section>
  );
}

export function FaqSection({ items = homeFaqs }) {
  return (
    <Section labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id="faq-title" title="Questions businesses ask us" text="Short, direct answers. For anything else, ask us." />
        <Faq items={items} />
      </div>
    </Section>
  );
}
