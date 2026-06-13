"use client";

import Link from "next/link";
import { useState } from "react";
import { ChefHat, Menu, ShoppingCart, X } from "lucide-react";
import { useCart, cartItemCount } from "@/state/cartStore";

const LINKS = [
  { href: "/menu", label: "Carta" },
  { href: "/merch", label: "Merchandising" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const count = cartItemCount(items);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-surface">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <ChefHat size={18} color="#FFFFFF" />
          </div>
          <span className="font-bold text-lg">
            Receta <span className="text-accent">Chifera</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/carrito"
            className="relative w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-surface-2 transition-colors"
          >
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-background text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 rounded-full bg-surface flex items-center justify-center"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-surface px-4 py-3 flex flex-col gap-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
