import { buildMetadata } from "@/lib/seo";
import { webPageSchema, faqSchema } from "@/lib/schema";
import { homeFaqs } from "@/data/faqs";
import JsonLd from "@/components/ui/JsonLd";
import CtaBand from "@/components/ui/CtaBand";
import Hero from "@/components/home/Hero";
import { Capabilities, AboutSection, ServicesSection, WhyChoose, TechStack, IndustriesSection, PortfolioSection, ProcessSection, Testimonials, BlogSection, FaqSection } from "@/components/home/Sections";

export const metadata = buildMetadata({
  title: "Success Qube | IT Company in Sikar, Rajasthan: AI, Software & Web Development",
  absoluteTitle: true,
  description: "Success Qube is an IT company in Sikar, Rajasthan building websites, software, mobile apps, AI and automation, with SEO and digital marketing for businesses across India.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[webPageSchema({ name: "Success Qube – IT Company in Sikar, Rajasthan", description: "AI, software, web and digital marketing services.", path: "/" }), faqSchema(homeFaqs)]} />
      <Hero />
      <Capabilities />
      <AboutSection />
      <ServicesSection />
      <WhyChoose />
      <TechStack />
      <IndustriesSection />
      <PortfolioSection />
      <ProcessSection />
      <Testimonials />
      <BlogSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
