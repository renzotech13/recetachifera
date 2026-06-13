"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2, UtensilsCrossed } from "lucide-react";
import { useCart, cartSubtotalCents } from "@/state/cartStore";
import { formatSoles } from "@/lib/format";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const increment = useCart((s) => s.increment);
  const decrement = useCart((s) => s.decrement);
  const remove = useCart((s) => s.remove);
  const subtotal = cartSubtotalCents(items);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
          <ShoppingCart size={28} className="text-muted" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
        <p className="text-muted mb-6">
          Agrega platos de la carta o merchandising para continuar.
        </p>
        <Link
          href="/menu"
          className="bg-primary hover:bg-primary-dark transition-colors rounded-2xl px-6 py-3 font-bold inline-block"
        >
          Ver la carta
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-muted hover:text-ink mb-6 text-sm font-semibold"
      >
        <ArrowLeft size={16} /> Seguir comprando
      </Link>
      <h1 className="text-3xl font-extrabold mb-6">Tu carrito</h1>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="bg-surface rounded-2xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-surface-2 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <UtensilsCrossed size={22} className="text-muted" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold leading-tight">{item.name}</p>
              <p className="text-accent font-bold mt-1">{formatSoles(item.priceCents)}</p>
            </div>
            <div className="flex items-center gap-2">
              {item.quantity === 1 ? (
                <button
                  onClick={() => remove(item.id)}
                  className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center"
                >
                  <Trash2 size={14} className="text-primary" />
                </button>
              ) : (
                <button
                  onClick={() => decrement(item.id)}
                  className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center"
                >
                  <Minus size={14} />
                </button>
              )}
              <span className="font-bold w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => increment(item.id)}
                className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-2xl p-4 mt-6 flex items-center justify-between">
        <span className="font-bold text-lg">Subtotal</span>
        <span className="text-accent font-bold text-xl">{formatSoles(subtotal)}</span>
      </div>

      <Link
        href="/checkout"
        className="block text-center bg-primary hover:bg-primary-dark transition-colors rounded-2xl py-4 font-bold mt-4"
      >
        Continuar al checkout
      </Link>
    </div>
  );
}
