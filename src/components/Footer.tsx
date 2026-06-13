import Link from "next/link";
import { AtSign, ChefHat, MapPin, MessageCircle, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-surface mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <ChefHat size={18} color="#FFFFFF" />
            </div>
            <span className="font-bold text-lg">
              Receta <span className="text-accent">Chifera</span>
            </span>
          </div>
          <p className="text-muted text-sm leading-6">
            Sabor chifa, directo a tu mesa. Comida, merchandising y mucho más,
            todo pagado fácil con Yape.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-3">Navegación</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link href="/menu" className="hover:text-ink transition-colors">
                Carta
              </Link>
            </li>
            <li>
              <Link href="/merch" className="hover:text-ink transition-colors">
                Merchandising
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-ink transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/carrito" className="hover:text-ink transition-colors">
                Carrito
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Contacto</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-accent" /> +51 957 298 683
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-accent" /> Lima, Perú
            </li>
            <li className="flex items-center gap-2">
              <AtSign size={14} className="text-accent" /> @recetachifera
            </li>
            <li>
              <a
                href="https://wa.me/51957298683"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-1 text-primary font-semibold hover:text-accent transition-colors"
              >
                <MessageCircle size={14} /> Escríbenos por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-surface py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Receta Chifera. Todos los derechos reservados.
      </div>
    </footer>
  );
}
