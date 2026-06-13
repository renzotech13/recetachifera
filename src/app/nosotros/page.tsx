import { Award, ChefHat, Flame, Heart, MapPin, Users } from "lucide-react";
import { ZodiacPopup } from "@/components/ZodiacPopup";

export default function NosotrosPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-background" />
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 relative text-center">
          <span className="inline-block bg-accent/20 text-accent text-xs font-bold px-3 py-1 rounded-full mb-4">
            Conócenos
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            La historia detrás de <span className="text-primary">Receta</span>{" "}
            <span className="text-accent">Chifera</span>
          </h1>
          <p className="text-muted mt-4 max-w-2xl mx-auto leading-7">
            Somos una familia chifera apasionada por llevar el verdadero sabor
            cantonés-peruano a cada mesa. Wok caliente, ingredientes frescos y
            recetas que se transmiten de generación en generación.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <ValueCard
          icon={<ChefHat size={20} className="text-primary" />}
          title="Tradición chifa"
          desc="Recetas familiares con más de 30 años de sazón, preparadas al wok como manda la tradición cantonesa-peruana."
        />
        <ValueCard
          icon={<Flame size={20} className="text-primary" />}
          title="Frescura al instante"
          desc="Ingredientes seleccionados a diario y platos preparados al momento, recién salidos del fuego."
        />
        <ValueCard
          icon={<Heart size={20} className="text-primary" />}
          title="Hecho con cariño"
          desc="Cada plato sale de nuestra cocina con el mismo cariño que le pondríamos a la comida de nuestra propia familia."
        />
      </section>

      <section className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-surface rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <MapPin size={28} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Visítanos o pide a domicilio</h2>
            <p className="text-muted mt-2 leading-6">
              Atendemos en Lima con delivery a domicilio y, próximamente, en
              nuestro local físico podrás escanear el código QR de tu mesa
              para descubrir promociones y tu zodiaco chino mientras esperas
              tu pedido.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 pb-20">
        <div className="bg-gradient-to-br from-primary/20 via-surface to-surface rounded-3xl p-6 md:p-10 text-center border border-accent/30">
          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Award size={26} className="text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            ¿Cuál es tu signo zodiacal chino?
          </h2>
          <p className="text-muted mt-2 max-w-md mx-auto leading-6">
            Ingresa tu fecha de nacimiento y tu correo: te diremos tu signo del
            zodiaco chino y te suscribiremos a nuestros boletines con promos
            exclusivas.
          </p>
          <div className="mt-6 flex justify-center">
            <ZodiacPopup />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-center gap-3 text-muted">
          <Users size={18} className="text-accent" />
          <p className="text-sm text-center">
            Gracias por ser parte de la familia Receta Chifera. ¡Nos vemos en
            la próxima comida!
          </p>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-surface rounded-2xl p-5">
      <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-muted text-sm mt-2 leading-6">{desc}</p>
    </div>
  );
}
