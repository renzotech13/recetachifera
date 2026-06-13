"use client";

import Link from "next/link";
import { Plus, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/state/cartStore";
import { formatSoles } from "@/lib/format";
import { productPriceCents, type Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const price = productPriceCents(product);

  return (
    <div className="bg-surface rounded-2xl p-4 flex flex-col">
      <Link href={`/producto/${product.id}`}>
        <div className="w-full aspect-square rounded-xl bg-surface-2 flex items-center justify-center mb-3">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <UtensilsCrossed size={28} className="text-muted" />
          )}
        </div>
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-10">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-muted text-xs mt-1 line-clamp-2">{product.description}</p>
        )}
      </Link>
      <div className="flex items-center justify-between mt-3">
        <span className="text-accent font-bold">{formatSoles(price)}</span>
        <button
          onClick={() =>
            add({
              id: product.id,
              name: product.name,
              priceCents: price,
              image: product.image_url,
              kind: "product",
            })
          }
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors"
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <Plus size={16} color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
}
