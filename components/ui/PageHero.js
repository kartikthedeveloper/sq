import Container from "./Container";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function PageHero({ crumbs, title, intro, children }) {
  return (
    <header className="pb-10 pt-8 sm:pb-14 sm:pt-12">
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} />}
        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-quiet sm:text-xl">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </header>
  );
}
