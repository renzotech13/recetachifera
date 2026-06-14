"use client";

import { useState } from "react";
import { Mail, MessageCircle, PartyPopper, Sparkles, X } from "lucide-react";
import { subscribeZodiac } from "@/lib/data";
import { buildWhatsappZodiacUrl } from "@/services/checkout";
import { getChineseZodiac } from "@/lib/zodiac";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

type Result = {
  animal: string;
  element: string;
  trait: string;
};

export function ZodiacPopup({
  triggerLabel = "Descubre tu zodiaco chino",
  triggerClassName = "bg-accent text-background font-bold rounded-2xl px-6 py-3 inline-flex items-center gap-2 hover:opacity-90 transition-opacity",
}: {
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const canSubmit = day && month && year && /\S+@\S+\.\S+/.test(email);

  function reset() {
    setDay("");
    setMonth("");
    setYear("");
    setEmail("");
    setError(null);
    setResult(null);
  }

  function handleClose() {
    setOpen(false);
    reset();
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const yearNum = Number(year);
      const monthNum = Number(month);
      const dayNum = Number(day);
      const zodiac = getChineseZodiac(yearNum, monthNum, dayNum);

      const birthDate = `${yearNum}-${String(monthNum).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

      await subscribeZodiac({
        email: email.trim(),
        birthDate,
        zodiacAnimal: zodiac.animal,
        zodiacElement: zodiac.element,
      });

      setResult(zodiac);
    } catch {
      setError("No pudimos guardar tus datos. Intenta de nuevo en unos minutos.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={triggerClassName}>
        <Sparkles size={18} />
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-background border border-accent/30 rounded-3xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface flex items-center justify-center"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>

            {!result ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-3">
                  <Sparkles size={22} className="text-accent" />
                </div>
                <h2 className="text-2xl font-extrabold">¿Cuál es tu zodiaco chino?</h2>
                <p className="text-muted text-sm mt-2 leading-6">
                  Cuéntanos tu fecha de nacimiento y tu correo. Te diremos tu signo
                  zodiacal chino y te avisaremos de promociones exclusivas de
                  Receta Chifera.
                </p>

                <div className="grid grid-cols-3 gap-2 mt-5">
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="bg-surface text-ink rounded-2xl px-3 py-3 outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Día</option>
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="bg-surface text-ink rounded-2xl px-3 py-3 outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Mes</option>
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="bg-surface text-ink rounded-2xl px-3 py-3 outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Año</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="block text-muted text-xs mt-4 mb-1">Correo electrónico</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full bg-surface text-ink rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {error && <p className="text-primary text-sm mt-3">{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitting}
                  className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 transition-colors rounded-2xl py-4 font-bold mt-5"
                >
                  {submitting ? "Calculando..." : "Descubrir mi zodiaco"}
                </button>
                <p className="text-muted text-[11px] mt-3 text-center">
                  Al continuar aceptas recibir boletines de Receta Chifera. Puedes
                  darte de baja cuando quieras.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <PartyPopper size={28} className="text-accent" />
                </div>
                <p className="text-muted text-sm">Tu signo zodiacal chino es</p>
                <h2 className="text-3xl font-extrabold text-accent mt-1">
                  {result.element} {result.animal}
                </h2>
                <p className="text-ink/90 mt-4 leading-6">{result.trait}</p>
                <div className="bg-surface rounded-2xl p-4 mt-6 text-left">
                  <p className="text-ink text-sm">
                    ¡Listo! Te suscribimos a nuestros boletines. Pronto recibirás
                    promociones especiales en tu correo.
                  </p>
                </div>
                <a
                  href={buildWhatsappZodiacUrl(email, result.animal, result.element)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-background hover:opacity-90 transition-opacity rounded-2xl py-4 font-bold mt-4 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> Avísame por WhatsApp
                </a>
                <button
                  onClick={handleClose}
                  className="w-full bg-primary hover:bg-primary-dark transition-colors rounded-2xl py-4 font-bold mt-3"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
