import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";
import { formatDate, readingTime, slugify } from "@/lib/utils";
import JsonLd from "@/components/ui/JsonLd";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RichText from "@/components/blog/RichText";
import BlogCard from "@/components/blog/BlogCard";
import CtaBand from "@/components/ui/CtaBand";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return buildMetadata({ title: p.seoTitle, description: p.meta, path: `/blog/${p.slug}`, image: p.image, type: "article", publishedTime: p.published, modifiedTime: p.updated, authors: [p.author] });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = post.related.map(getPost).filter(Boolean);
  const toc = post.sections.map((s) => ({ id: slugify(s.heading), text: s.heading }));
  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <Container className="pb-8 pt-10">
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <p className="text-sm font-medium text-royal">{post.category}</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-xl text-quiet">{post.excerpt}</p>
            <p className="mt-5 text-sm text-quiet">By <span className="font-semibold text-ink">{post.author}</span> · Published <time dateTime={post.published}>{formatDate(post.published)}</time> · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time> · {readingTime(post.sections)} min read</p>
          </header>
          <Image src={post.image} alt={`${post.title} cover illustration`} width={1200} height={630} unoptimized priority className="mt-8 h-auto w-full rounded-xl" />
          <nav aria-label="Table of contents" className="glass mt-8 rounded-xl p-5">
            <p className="font-display font-bold text-ink">In this article</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">{toc.map((t) => (<li key={t.id}><a className="text-royal underline underline-offset-2" href={`#${t.id}`}>{t.text}</a></li>))}</ol>
          </nav>
          <div className="prose-sq mt-4 text-lg">
            {post.sections.map((s) => (
              <section key={s.heading}>
                <h2 id={slugify(s.heading)}>{s.heading}</h2>
                {s.paragraphs.map((p) => <p key={p.slice(0, 30)}><RichText text={p} /></p>)}
                {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </section>
            ))}
          </div>
          <aside className="glass-strong mt-12 rounded-xl p-6">
            <p className="font-display text-lg font-bold text-ink">Need help with this?</p>
            <p className="mt-1 text-quiet">Talk to our team about your project. The first consultation is free.</p>
            <Link href="/contact#contact-form" className="mt-4 inline-block rounded-lg bg-royal px-5 py-3 font-semibold text-white hover:bg-royal-deep">Book a free consultation</Link>
          </aside>
        </article>
        <section className="mt-16" aria-labelledby="rel-posts">
          <h2 id="rel-posts" className="text-2xl font-bold">Related articles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">{related.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
        </section>
      </Container>
      <CtaBand />
    </>
  );
}
