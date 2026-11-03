import Link from "next/link";
import Image from "next/image";
import { formatDate, readingTime } from "@/lib/utils";

export default function BlogCard({ post }) {
  return (
    <article className="glass flex h-full flex-col overflow-hidden rounded-xl transition hover:-translate-y-1 hover:shadow-float">
      <Link href={`/blog/${post.slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <Image src={post.image} alt="" width={1200} height={630} unoptimized loading="lazy" className="h-auto w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-quiet">{post.category} · {readingTime(post.sections)} min read</p>
        <h3 className="mt-2 text-xl font-bold leading-snug"><Link href={`/blog/${post.slug}`} className="hover:text-royal">{post.title}</Link></h3>
        <p className="mt-2 flex-1 text-quiet">{post.excerpt}</p>
        <p className="mt-4 text-sm text-quiet"><time dateTime={post.published}>{formatDate(post.published)}</time></p>
      </div>
    </article>
  );
}
