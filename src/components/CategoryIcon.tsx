import {
  Beef,
  ChefHat,
  Drumstick,
  Flame,
  GlassWater,
  Layers,
  Plane,
  Sandwich,
  Soup,
  Users,
  UtensilsCrossed,
  type LucideProps,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  chaufas: ChefHat,
  tallarines: UtensilsCrossed,
  "pollo-carnes": Drumstick,
  aeropuertos: Plane,
  duos: Layers,
  frituras: Flame,
  combinados: Sandwich,
  "platos-fondo": Beef,
  sopas: Soup,
  "menu-familiar": Users,
  bocaditos: Sandwich,
  bebidas: GlassWater,
};

export function CategoryIcon({ slug, size = 20, color }: { slug: string; size?: number; color?: string }) {
  const Icon = ICONS[slug] ?? ChefHat;
  return <Icon size={size} color={color} />;
}
