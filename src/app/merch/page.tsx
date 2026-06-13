import { MERCH_ITEMS } from "@/data/merch";
import { MerchCard } from "@/components/MerchCard";

export default function MerchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <span className="inline-block bg-accent/20 text-accent text-xs font-bold px-3 py-1 rounded-full mb-3">
        Edición limitada
      </span>
      <h1 className="text-3xl font-extrabold mb-1">Merchandising Chino</h1>
      <p className="text-muted mb-8 max-w-xl">
        Lleva un pedacito de Receta Chifera a casa: polos, tazas, llaveros de
        la suerte y más artículos con estilo chino. Pagas igual que tu pedido:
        con Yape.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MERCH_ITEMS.map((item) => (
          <MerchCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
