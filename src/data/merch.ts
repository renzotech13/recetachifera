import {
  Coffee,
  Crown,
  KeyRound,
  Lamp,
  ShoppingBag,
  Shirt,
  Utensils,
  Wind,
} from "lucide-react";
import type { MerchItem } from "@/types";

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: "merch-polo-dragon",
    name: "Polo Dragón Dorado",
    description:
      "Polo negro 100% algodón con bordado de dragón dorado y logo Receta Chifera.",
    priceCents: 4900,
    icon: Shirt,
    badge: "Más vendido",
  },
  {
    id: "merch-taza-chaufa",
    name: "Taza 'Chaufa Lover'",
    description: "Taza de cerámica negra con detalles dorados y frase chifa.",
    priceCents: 2500,
    icon: Coffee,
  },
  {
    id: "merch-llavero-suerte",
    name: "Llavero de la Suerte",
    description: "Llavero metálico con gato de la suerte (Maneki-neko) dorado.",
    priceCents: 1500,
    icon: KeyRound,
    badge: "Nuevo",
  },
  {
    id: "merch-gorra-chifa",
    name: "Gorra Receta Chifera",
    description: "Gorra negra bordada con el logo y detalles rojo/dorado.",
    priceCents: 3900,
    icon: Crown,
  },
  {
    id: "merch-abanico",
    name: "Abanico Chino Decorativo",
    description: "Abanico plegable de tela roja con estampado dorado tradicional.",
    priceCents: 2000,
    icon: Wind,
  },
  {
    id: "merch-linterna",
    name: "Linterna de Papel Roja",
    description: "Linterna decorativa roja con borlas doradas, ideal para regalo.",
    priceCents: 1800,
    icon: Lamp,
  },
  {
    id: "merch-palitos",
    name: "Set de Palitos Chinos",
    description: "Par de palitos de madera con estuche grabado Receta Chifera.",
    priceCents: 1200,
    icon: Utensils,
  },
  {
    id: "merch-bolso-tote",
    name: "Tote Bag 'Wok Life'",
    description: "Bolso de tela resistente, negro con estampado rojo/dorado.",
    priceCents: 2900,
    icon: ShoppingBag,
    badge: "Eco",
  },
];
