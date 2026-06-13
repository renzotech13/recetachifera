"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ProductCard } from "@/components/ProductCard";
import type { Category, Product } from "@/types";

export function MenuClient({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("categoria");
  const activeCategory = categories.find((c) => c.slug === activeSlug);

  const visibleProducts = activeCategory
    ? products.filter((p) => p.category_id === activeCategory.id)
    : products;

  return (
    <div>
      <div className="flex gap-3 overflow-x-auto scrollbar-none pb-4 mb-2">
        <Link
          href="/menu"
          className={`flex-shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors ${
            !activeCategory
              ? "bg-primary text-white"
              : "bg-surface text-muted hover:text-ink"
          }`}
        >
          Todos
        </Link>
        {categories.map((cat) => {
          const active = cat.slug === activeSlug;
          return (
            <Link
              key={cat.id}
              href={`/menu?categoria=${cat.slug}`}
              className={`flex-shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors ${
                active ? "bg-primary text-white" : "bg-surface text-muted hover:text-ink"
              }`}
            >
              <CategoryIcon slug={cat.slug} size={16} color={active ? "#FFFFFF" : undefined} />
              {cat.name}
            </Link>
          );
        })}
      </div>

      {categories
        .filter((cat) => !activeCategory || cat.id === activeCategory.id)
        .map((cat) => {
          const catProducts = visibleProducts.filter((p) => p.category_id === cat.id);
          if (catProducts.length === 0) return null;
          return (
            <section key={cat.id} className="mb-10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CategoryIcon slug={cat.slug} color="#D4AF37" />
                {cat.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {catProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
}
