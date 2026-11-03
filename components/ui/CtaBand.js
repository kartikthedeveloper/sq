import Container from "./Container";
import Button from "./Button";

export default function CtaBand({ title = "Have an idea? Let's build something extraordinary.", text = "Tell us what you want to achieve. We reply within one business day with honest advice on the best next step.", cta = "Start your project", href = "/request-a-quote", event = "quote_request_click" }) {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="cta-title">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-electric/40 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-violet/35 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 id="cta-title" className="text-3xl font-bold !text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-white/80">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={href} variant="inverse" event={event}>{cta}</Button>
              <Button href="/contact" variant="secondary" className="!bg-white/10 !text-white !border-white/25 hover:!bg-white/20" event="consultation_click">Free consultation</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
