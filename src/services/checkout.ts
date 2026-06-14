import type { CartItem } from "@/types";
import { formatSoles } from "@/lib/format";
import { cartSubtotalCents } from "@/state/cartStore";

export const RESTAURANT_WHATSAPP = "51957298683";
export const YAPE_NUMBER = "957 298 683";
export const YAPE_HOLDER_NAME = "Carlos Tou";

export function buildWhatsappOrderMessage(
  items: CartItem[],
  customerName: string,
  address: string,
  paymentMethod: "yape" | "cash"
): string {
  const lines = items.map(
    (i) => `• ${i.quantity}x ${i.name} - ${formatSoles(i.priceCents * i.quantity)}`
  );
  const subtotal = cartSubtotalCents(items);
  const paymentLabel =
    paymentMethod === "yape" ? "Yape (ya envié el pago, adjunto captura)" : "Efectivo al delivery";

  return [
    "¡Hola Receta Chifera! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatSoles(subtotal)}`,
    "",
    `Nombre: ${customerName}`,
    `Dirección de entrega: ${address}`,
    `Método de pago: ${paymentLabel}`,
  ].join("\n");
}

export function buildWhatsappZodiacUrl(
  email: string,
  zodiacAnimal: string,
  zodiacElement: string
): string {
  const message = [
    "¡Hola Receta Chifera!",
    `Mi zodiaco chino es ${zodiacElement} ${zodiacAnimal}.`,
    `Mi correo es ${email}.`,
    "Quiero recibir promociones y novedades.",
  ].join("\n");
  return `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsappOrderUrl(
  items: CartItem[],
  customerName: string,
  address: string,
  paymentMethod: "yape" | "cash"
): string {
  const message = buildWhatsappOrderMessage(items, customerName, address, paymentMethod);
  return `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
