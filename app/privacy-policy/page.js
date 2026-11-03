import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata = buildMetadata({ title: "Privacy Policy", description: "How Success Qube collects, uses and protects personal information submitted through this website.", path: "/privacy-policy" });

export default function Privacy() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]} title="Privacy Policy" intro={`Last updated ${new Date(site.contentDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}.`} />
      <Section className="!pt-2">
        <div className="prose-sq max-w-3xl">
          <h2>What we collect</h2>
          <p>When you use our contact, quote, consultation, career or newsletter forms, we collect the details you enter, such as your name, email, phone number, company and message. Our servers also process technical data such as IP address for security and spam prevention.</p>
          <h2>How we use it</h2>
          <ul><li>To reply to your enquiry and provide quotes or services</li><li>To prevent spam and abuse of our forms</li><li>To send newsletter emails if you subscribe, which you can stop at any time</li></ul>
          <h2>Analytics and cookies</h2>
          <p>If analytics is enabled, we use Google Analytics 4 only after you accept analytics cookies in our banner. You can decline and still use the whole site. You can clear your choice by removing this site's stored data in your browser.</p>
          <h2>Sharing</h2>
          <p>We do not sell personal data. Form submissions are delivered to us through our email service provider, and may be processed by hosting and analytics providers acting on our behalf.</p>
          <h2>Retention and your rights</h2>
          <p>We keep enquiry data only as long as needed for the purpose it was provided. You may ask us to access, correct or delete your personal data, or to withdraw consent, by contacting us{site.email ? ` at ${site.email}` : " through our contact page"}. We follow applicable Indian data protection law, including the Digital Personal Data Protection Act, 2023.</p>
          <h2>Contact</h2>
          <p>{site.name}, {site.locality}, {site.region}, {site.countryName}. Use the <a href="/contact">contact page</a> for privacy requests.</p>
          <p><em>This policy is a general template. Have it reviewed by a qualified legal professional before relying on it.</em></p>
        </div>
      </Section>
    </>
  );
}
