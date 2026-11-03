import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import CtaBand from "@/components/ui/CtaBand";
import { process as steps } from "@/data/process";

export const metadata = buildMetadata({
  title: "Our Development Process: Discover to Support",
  description: "How Success Qube delivers projects in seven stages: Discover, Strategize, Design, Develop, Test, Deploy and Support, with clear deliverables at each step.",
  path: "/process",
});

const receive = [
  "A written summary of goals, users and success measures",
  "Scope, architecture outline, phases, timeline and estimate",
  "Wireframes and a clickable prototype for feedback",
  "Working builds demoed every cycle, with source access",
  "Test notes covering functionality, devices and security checks",
  "Live site or app, analytics, backups and a rollback plan",
  "Maintenance plan, updates and a prioritised improvement list",
];

export default function ProcessPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Process", path: "/process" }]} title="A seven-stage process with something concrete at every stage" intro="You always know where the project stands, what was delivered, and what happens next." />
      <Section className="!pt-4">
        <ol className="space-y-5">
          {steps.map((s, i) => (
            <li key={s.name} className="glass grid gap-4 rounded-xl p-6 md:grid-cols-[auto_1fr_1fr] md:items-start md:gap-8">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-ink font-bold text-white">{i + 1}</span><Icon name={s.icon} className="h-6 w-6 text-royal" /></div>
              <div><h2 className="text-2xl font-bold">{s.name}</h2><p className="mt-1 text-quiet">{s.text}</p></div>
              <div><p className="font-display font-bold text-ink">You receive</p><p className="mt-1 text-quiet">{receive[i]}</p></div>
            </li>
          ))}
        </ol>
      </Section>
      <CtaBand />
    </>
  );
}
