import Link from "next/link";
import { CheckCircle2, ChefHat } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 flex flex-col items-center text-center">
      <div className="w-28 h-28 rounded-full bg-primary/20 items-center justify-center flex relative">
        <div className="w-20 h-20 rounded-full bg-primary items-center justify-center flex">
          <ChefHat size={36} color="#FFFFFF" />
        </div>
        <CheckCircle2
          size={36}
          className="text-accent absolute -top-1 -right-1"
          fill="#0A0A0A"
        />
      </div>

      <h1 className="text-2xl font-bold mt-6">¡Pedido enviado!</h1>
      <p className="text-muted mt-3 leading-6 max-w-md">
        Te redirigimos a WhatsApp con el resumen de tu pedido. Envía la captura
        de tu pago (si elegiste Yape) y nuestro equipo confirmará todo en
        minutos. ¡Gracias por elegir Receta Chifera!
      </p>

      <div className="w-full mt-10 gap-3 flex flex-col">
        <Link
          href="/menu"
          className="bg-primary hover:bg-primary-dark transition-colors rounded-2xl py-4 font-bold"
        >
          Volver al menú
        </Link>
        <Link
          href="/"
          className="border border-primary text-primary rounded-2xl py-4 font-bold hover:bg-primary/10 transition-colors"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
