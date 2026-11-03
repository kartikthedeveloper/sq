import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";

export const metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold sm:text-5xl">This page could not be found</h1>
      <p className="mt-4 max-w-xl text-lg text-quiet">The link may be old or mistyped. Try one of these instead, or tell us what you were looking for.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Go to homepage</Button>
        <Button href="/services" variant="secondary">Browse services</Button>
        <Button href="/contact" variant="secondary">Contact us</Button>
      </div>
      <ul className="mt-10 grid gap-2 text-royal sm:grid-cols-2">
        {services.slice(0, 6).map((s) => (<li key={s.slug}><Link className="underline underline-offset-4" href={`/services/${s.slug}`}>{s.name}</Link></li>))}
      </ul>
    </Container>
  );
}
