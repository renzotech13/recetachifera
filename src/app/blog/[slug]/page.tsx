import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-muted hover:text-ink mb-6 text-sm font-semibold"
      >
        <ArrowLeft size={16} /> Volver al blog
      </Link>

      <span className="text-5xl">{post.image}</span>
      <span className="block text-accent text-xs font-bold mt-4 uppercase tracking-wide">
        {post.tag}
      </span>
      <h1 className="text-3xl font-extrabold mt-2 leading-tight">{post.title}</h1>
      <p className="text-muted text-sm mt-3">
        {new Date(post.date).toLocaleDateString("es-PE", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        · {post.author}
      </p>

      <div className="mt-6 space-y-4">
        {post.content.map((paragraph, i) => (
          <p key={i} className="text-ink/90 leading-7">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-10 bg-surface rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-bold">¿Listo para probar nuestro chifa?</p>
        <Link
          href="/menu"
          className="bg-primary hover:bg-primary-dark transition-colors rounded-2xl px-6 py-3 font-bold"
        >
          Ver la carta
        </Link>
      </div>
    </article>
  );
}
