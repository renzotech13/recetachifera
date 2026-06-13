"use client";

import { Plus } from "lucide-react";
import { useCart } from "@/state/cartStore";
import { formatSoles } from "@/lib/format";
import type { MerchItem } from "@/types";

export function MerchCard({ item }: { item: MerchItem }) {
  const add = useCart((s) => s.add);

  return (
    <div className="bg-surface rounded-2xl p-4 flex flex-col">
      <div className="w-full aspect-square rounded-xl bg-surface-2 flex items-center justify-center mb-3 text-5xl relative">
        {item.image}
        {item.badge && (
          <span className="absolute top-2 left-2 bg-accent text-background text-[10px] font-bold px-2 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-10">
        {item.name}
      </h3>
      <p className="text-muted text-xs mt-1 line-clamp-2">{item.description}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-accent font-bold">{formatSoles(item.priceCents)}</span>
        <button
          onClick={() =>
            add({
              id: item.id,
              name: item.name,
              priceCents: item.priceCents,
              image: null,
              kind: "merch",
            })
          }
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors"
          aria-label={`Agregar ${item.name} al carrito`}
        >
          <Plus size={16} color="#FFFFFF" />
        </button>
      </div>
    </div>
  );
}
