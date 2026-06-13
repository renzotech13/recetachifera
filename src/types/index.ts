export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price_menu_cents: number | null;
  price_carta_cents: number | null;
  image_url: string | null;
  is_available: boolean;
};

export function productPriceCents(product: Product): number {
  return product.price_carta_cents ?? product.price_menu_cents ?? 0;
}

export type MerchItem = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image: string;
  badge?: string;
};

export type CartItem = {
  id: string;
  name: string;
  priceCents: number;
  quantity: number;
  image: string | null;
  kind: "product" | "merch";
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  author: string;
  image: string;
  tag: string;
};
