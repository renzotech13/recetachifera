"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/state/cartStore";
import { formatSoles } from "@/lib/format";
import { productPriceCents, type Product } from "@/types";

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const add = useCart((s) => s.add);
  const price = productPriceCents(product);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-muted hover:text-ink mb-6 text-sm font-semibold"
      >
        <ArrowLeft size={16} /> Volver a la carta
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-3xl bg-surface flex items-center justify-center">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover rounded-3xl"
            />
          ) : (
            <UtensilsCrossed size={56} className="text-muted" />
          )}
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold">{product.name}</h1>
          {product.description && (
            <p className="text-muted mt-3 leading-6">{product.description}</p>
          )}

          {product.price_menu_cents != null && product.price_carta_cents != null && (
            <div className="bg-surface rounded-2xl p-4 mt-5 flex gap-6">
              <div>
                <p className="text-muted text-xs">Precio Menú (con entrada)</p>
                <p className="text-ink font-bold text-lg">
                  {formatSoles(product.price_menu_cents)}
                </p>
              </div>
              <div>
                <p className="text-muted text-xs">Precio Carta (solo plato)</p>
                <p className="text-accent font-bold text-lg">
                  {formatSoles(product.price_carta_cents)}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mt-6">
            <span className="text-muted text-sm">Cantidad</span>
            <div className="flex items-center gap-3 bg-surface rounded-2xl px-3 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center"
              >
                <Minus size={14} />
              </button>
              <span className="font-bold w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between bg-surface rounded-2xl p-4">
            <div>
              <p className="text-muted text-xs">Total</p>
              <p className="text-accent text-2xl font-bold">
                {formatSoles(price * quantity)}
              </p>
            </div>
            <button
              onClick={() =>
                add(
                  {
                    id: product.id,
                    name: product.name,
                    priceCents: price,
                    image: product.image_url,
                    kind: "product",
                  },
                  quantity
                )
              }
              className="bg-primary hover:bg-primary-dark transition-colors rounded-2xl px-6 py-3 font-bold"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
