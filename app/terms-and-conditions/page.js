import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata = buildMetadata({ title: "Terms & Conditions", description: "Terms for using the Success Qube website and general terms for enquiries and proposals.", path: "/terms-and-conditions" });

export default function Terms() {
  return (
    <>
      <PageHero crumbs={[{ name: "Terms & Conditions", path: "/terms-and-conditions" }]} title="Terms & Conditions" intro="Terms for using this website. Project work is governed by a separate written agreement." />
      <Section className="!pt-2">
        <div className="prose-sq max-w-3xl">
          <h2>Use of this website</h2>
          <p>The content on this website is provided for general information about {site.name} and its services. You agree not to misuse the site, attempt unauthorised access, or submit unlawful, abusive or misleading content through our forms.</p>
          <h2>Quotes and proposals</h2>
          <p>Information on this site is not a binding offer. Prices, timelines and deliverables are confirmed only in a written proposal or agreement signed or accepted by both parties.</p>
          <h2>Intellectual property</h2>
          <p>Website text, design and code are owned by {site.name} unless stated otherwise. Ownership of project deliverables is set out in the relevant project agreement.</p>
          <h2>Third-party links and services</h2>
          <p>We are not responsible for the content of external sites we link to or for third-party services we integrate at your request.</p>
          <h2>Limitation of liability</h2>
          <p>To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of this website.</p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India. Disputes fall under the jurisdiction of the courts in Rajasthan, India.</p>
          <p><em>This is a general template. Have it reviewed by a qualified legal professional before relying on it.</em></p>
        </div>
      </Section>
    </>
  );
}
