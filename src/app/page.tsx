import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MessageCircle,
  Smartphone,
  Truck,
} from "lucide-react";
import { getCategories, getProducts } from "@/lib/data";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ProductCard } from "@/components/ProductCard";
import { MERCH_ITEMS } from "@/data/merch";
import { BLOG_POSTS } from "@/data/blog";
import { formatSoles } from "@/lib/format";

export default async function Home() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const featured = products.slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-background" />
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative">
          <span className="inline-block bg-accent/20 text-accent text-xs font-bold px-3 py-1 rounded-full mb-4">
            Chifa peruano de verdad
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-2xl">
            Sabor chifa, <span className="text-primary">directo</span> a tu{" "}
            <span className="text-accent">mesa</span>
          </h1>
          <p className="text-muted mt-4 max-w-xl leading-7">
            Chaufas, tallarines, aeropuertos y mucho más. Pide online, paga
            fácil con Yape y recibe en la puerta de tu casa.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/menu"
              className="bg-primary hover:bg-primary-dark transition-colors rounded-2xl px-6 py-3 font-bold flex items-center gap-2"
            >
              Ver la carta <ArrowRight size={16} />
            </Link>
            <Link
              href="/nosotros"
              className="border border-accent text-accent rounded-2xl px-6 py-3 font-bold hover:bg-accent/10 transition-colors"
            >
              Conócenos
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Feature
          icon={<Smartphone size={20} className="text-primary" />}
          title="Paga con Yape"
          desc="Yapea y confirma tu pedido por WhatsApp en segundos."
        />
        <Feature
          icon={<Truck size={20} className="text-primary" />}
          title="Delivery a domicilio"
          desc="Envío gratis en compras desde S/. 50."
        />
        <Feature
          icon={<Clock size={20} className="text-primary" />}
          title="Listo en minutos"
          desc="Platos preparados al momento, calientitos y recién salidos del wok."
        />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Categorías</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?categoria=${cat.slug}`}
              className="flex-shrink-0 bg-surface rounded-2xl px-5 py-4 flex flex-col items-center gap-2 min-w-[100px] hover:bg-surface-2 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <CategoryIcon slug={cat.slug} color="#A80000" />
              </div>
              <span className="text-xs font-medium text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Lo más pedido</h2>
          <Link href="/menu" className="text-accent text-sm font-semibold flex items-center gap-1">
            Ver toda la carta <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-surface rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 border border-accent/30">
          <div className="flex-1">
            <span className="text-accent text-xs font-bold uppercase tracking-wide">
              Edición limitada
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Merchandising chino Receta Chifera
            </h2>
            <p className="text-muted mt-2 leading-6 max-w-md">
              Polos, tazas, llaveros de la suerte y más artículos con estilo
              chino para los verdaderos fans del chifa.
            </p>
            <Link
              href="/merch"
              className="inline-flex items-center gap-2 bg-accent text-background font-bold rounded-2xl px-5 py-3 mt-4"
            >
              Ver tienda <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            {MERCH_ITEMS.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-surface-2 rounded-2xl p-4 w-36">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-2">
                  <item.icon size={18} className="text-accent" />
                </div>
                <p className="text-xs font-semibold line-clamp-1">{item.name}</p>
                <p className="text-accent text-sm font-bold mt-1">
                  {formatSoles(item.priceCents)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6 pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Desde el blog</h2>
          <Link href="/blog" className="text-accent text-sm font-semibold flex items-center gap-1">
            Ver todo <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-surface rounded-2xl p-5 hover:bg-surface-2 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <post.icon size={18} className="text-accent" />
              </div>
              <span className="block text-accent text-xs font-bold mt-3 uppercase tracking-wide">
                {post.tag}
              </span>
              <h3 className="font-bold mt-1 leading-tight">{post.title}</h3>
              <p className="text-muted text-sm mt-2 line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <a
          href="https://wa.me/51957298683"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-primary rounded-2xl py-5 font-bold hover:bg-primary-dark transition-colors"
        >
          <MessageCircle size={20} /> ¿Tienes dudas? Escríbenos por WhatsApp
        </a>
      </section>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-surface rounded-2xl p-5 flex items-start gap-3">
      <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-muted text-sm mt-1">{desc}</p>
      </div>
    </div>
  );
}
