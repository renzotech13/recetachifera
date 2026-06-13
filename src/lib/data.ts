import { supabase } from "@/lib/supabase";
import type { Category, Product } from "@/types";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_available", true);

  if (error) throw error;
  return data ?? [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function subscribeZodiac(input: {
  email: string;
  birthDate: string;
  zodiacAnimal: string;
  zodiacElement: string;
}): Promise<void> {
  const { error } = await supabase.from("zodiac_subscribers").insert({
    email: input.email,
    birth_date: input.birthDate,
    zodiac_animal: input.zodiacAnimal,
    zodiac_element: input.zodiacElement,
  });

  if (error) throw error;
}
