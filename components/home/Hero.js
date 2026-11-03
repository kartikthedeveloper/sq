import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { MapPin } from "lucide-react";

const faces = [["Globe", "Web"], ["BrainCircuit", "AI"], ["Cloud", "Cloud"], ["Smartphone", "Mobile"]];

// Server component: the 3D cube is pure CSS (no JS) so it never delays LCP or INP.
export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16" aria-labelledby="hero-title">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 id="hero-title" className="hero-rise text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            Building Smarter Digital Experiences with AI &amp; Technology
          </h1>
          <p className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-quiet sm:text-xl" style={{ animationDelay: "120ms" }}>
            Success Qube helps businesses transform ideas into powerful digital products through AI, software development, web technologies, cloud solutions, and intelligent automation.
          </p>
          <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <Button href="/contact#contact-form" event="consultation_click">Get Free Consultation</Button>
            <Button href="/services" variant="secondary">Explore Our Services</Button>
          </div>
          <p className="hero-rise mt-8 flex items-start gap-2 text-[0.95rem] text-body" style={{ animationDelay: "360ms" }}>
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden="true" />
            Your Technology Partner in Sikar, Rajasthan – Building Solutions for Businesses Everywhere.
          </p>
        </div>

        <div className="relative mx-auto grid h-[22rem] w-full max-w-md place-items-center sm:h-[26rem]" aria-hidden="true">
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-electric/25 via-violet/15 to-transparent blur-3xl" />
          <div className="cube-stage">
            <div className="cube">
              {faces.map(([icon, label]) => (
                <div key={label} className="cube-face"><Icon name={icon} className="h-9 w-9 text-royal" /><span>{label}</span></div>
              ))}
              <div className="cube-face" /><div className="cube-face" />
              <div className="cube-core" />
            </div>
          </div>
          <div className="glass float-slow absolute left-0 top-6 rounded-xl px-4 py-3 text-sm font-semibold text-ink sm:-left-4">Next.js &amp; React</div>
          <div className="glass float-slower absolute right-0 top-24 rounded-xl px-4 py-3 text-sm font-semibold text-ink sm:-right-4">AI &amp; Automation</div>
          <div className="glass float-slow absolute bottom-10 left-4 rounded-xl px-4 py-3 text-sm font-semibold text-ink">Secure by design</div>
        </div>
      </Container>
    </section>
  );
}
