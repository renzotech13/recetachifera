import { Suspense } from "react";
import { getCategories, getProducts } from "@/lib/data";
import { MenuClient } from "./MenuClient";

export default async function MenuPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-1">Nuestra Carta</h1>
      <p className="text-muted mb-6">
        Precios &quot;Menú&quot; incluyen entrada (sopa o wantán). Precios
        &quot;Carta&quot; son solo el plato.
      </p>
      <Suspense>
        <MenuClient categories={categories} products={products} />
      </Suspense>
    </div>
  );
}
