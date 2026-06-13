"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Banknote,
  Check,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import { useCart, cartSubtotalCents } from "@/state/cartStore";
import { formatSoles } from "@/lib/format";
import {
  buildWhatsappOrderUrl,
  YAPE_HOLDER_NAME,
  YAPE_NUMBER,
} from "@/services/checkout";

type PaymentMethod = "yape" | "cash";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = cartSubtotalCents(items);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("yape");

  const whatsappUrl = useMemo(
    () => buildWhatsappOrderUrl(items, name.trim(), address.trim(), paymentMethod),
    [items, name, address, paymentMethod]
  );

  const canSubmit = name.trim().length > 0 && address.trim().length > 0 && items.length > 0;

  function handleSendOrder() {
    if (!canSubmit) return;
    window.open(whatsappUrl, "_blank");
    clear();
    router.push("/pedido-confirmado");
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
        <p className="text-muted mb-6">Agrega algo a tu carrito antes de pagar.</p>
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
    <div className="max-w-xl mx-auto px-4 py-8">
      <Link
        href="/carrito"
        className="inline-flex items-center gap-2 text-muted hover:text-ink mb-6 text-sm font-semibold"
      >
        <ArrowLeft size={16} /> Volver al carrito
      </Link>
      <h1 className="text-3xl font-extrabold mb-6">Checkout</h1>

      <div className="bg-surface rounded-2xl p-4 mb-4">
        <h2 className="font-bold mb-3">Datos de entrega</h2>
        <label className="block text-muted text-xs mb-1">Nombre completo</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full bg-surface-2 text-ink rounded-2xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-accent"
        />
        <label className="block text-muted text-xs mb-1">Dirección de entrega</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Av. Ejemplo 123, Lima"
          className="w-full bg-surface-2 text-ink rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="bg-surface rounded-2xl p-4 mb-4">
        <h2 className="font-bold mb-3">Método de pago</h2>
        <div className="gap-3 flex flex-col">
          <PaymentOption
            id="yape"
            label="Yape"
            description="Paga al instante con tu app Yape"
            Icon={Smartphone}
            selected={paymentMethod === "yape"}
            onSelect={() => setPaymentMethod("yape")}
          />
          <PaymentOption
            id="cash"
            label="Efectivo al delivery"
            description="Paga cuando recibas tu pedido"
            Icon={Banknote}
            selected={paymentMethod === "cash"}
            onSelect={() => setPaymentMethod("cash")}
          />
        </div>
      </div>

      {paymentMethod === "yape" && (
        <div className="bg-surface rounded-3xl p-6 items-center flex flex-col border border-accent/40 mb-4">
          <div className="w-14 h-14 rounded-full bg-primary items-center justify-center flex mb-3">
            <Smartphone size={24} color="#FFFFFF" />
          </div>
          <p className="text-muted text-xs">Total a pagar</p>
          <p className="text-accent text-3xl font-bold mt-1">{formatSoles(subtotal)}</p>
          <p className="text-muted mt-4 text-center">Yapea al siguiente número:</p>
          <p className="text-ink text-2xl font-bold mt-1">{YAPE_NUMBER}</p>
          <p className="text-muted mt-1">a nombre de</p>
          <p className="text-ink font-semibold">{YAPE_HOLDER_NAME}</p>
          <p className="text-muted text-sm leading-6 mt-5 text-center">
            1. Abre tu app Yape y envía {formatSoles(subtotal)} al número{" "}
            {YAPE_NUMBER}.
            <br />
            2. Toma una captura del comprobante.
            <br />
            3. Toca el botón de abajo: se abrirá WhatsApp con tu pedido listo
            para enviar junto con la captura.
          </p>
        </div>
      )}

      <div className="bg-surface rounded-2xl p-4 mb-6 flex items-center justify-between">
        <span className="font-bold text-lg">Total</span>
        <span className="text-accent font-bold text-xl">{formatSoles(subtotal)}</span>
      </div>

      <button
        onClick={handleSendOrder}
        disabled={!canSubmit}
        className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 transition-colors rounded-2xl py-4 font-bold flex items-center justify-center gap-2"
      >
        <MessageCircle size={18} />
        {paymentMethod === "yape" ? "Ya pagué, enviar pedido por WhatsApp" : "Enviar pedido por WhatsApp"}
      </button>
      {!canSubmit && (
        <p className="text-muted text-xs text-center mt-2">
          Completa tu nombre y dirección para continuar.
        </p>
      )}
    </div>
  );
}

function PaymentOption({
  label,
  description,
  Icon,
  selected,
  onSelect,
}: {
  id: string;
  label: string;
  description: string;
  Icon: typeof Smartphone;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`bg-surface-2 rounded-2xl p-4 flex items-center gap-3 border text-left ${
        selected ? "border-primary" : "border-transparent"
      }`}
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/20 items-center justify-center flex flex-shrink-0">
        <Icon size={20} className="text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{label}</p>
        <p className="text-muted text-xs mt-0.5">{description}</p>
      </div>
      <div
        className={`w-6 h-6 rounded-full items-center justify-center flex flex-shrink-0 ${
          selected ? "bg-primary" : "border border-muted"
        }`}
      >
        {selected && <Check size={14} color="#FFFFFF" />}
      </div>
    </button>
  );
}
