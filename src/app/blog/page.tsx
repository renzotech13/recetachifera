import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-1">Blog Receta Chifera</h1>
      <p className="text-muted mb-8 max-w-xl">
        Historia, cultura y recetas del chifa peruano, además de guías para
        pedir y pagar tus platos favoritos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-surface rounded-2xl p-6 hover:bg-surface-2 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <post.icon size={22} className="text-accent" />
            </div>
            <span className="block text-accent text-xs font-bold mt-3 uppercase tracking-wide">
              {post.tag}
            </span>
            <h2 className="font-bold text-xl mt-1 leading-tight">{post.title}</h2>
            <p className="text-muted text-sm mt-2 leading-6">{post.excerpt}</p>
            <p className="text-muted text-xs mt-4">
              {new Date(post.date).toLocaleDateString("es-PE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · {post.author}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
