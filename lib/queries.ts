import { createSupabaseClient } from "@/lib/supabase";
import type {
  Brand,
  DockKind,
  Product,
  ProductWithBrand,
  ProductWithDetails,
} from "@/lib/database.types";

export type ProductFilters = {
  brand?: string;
  pet_hair?: boolean;
  carpets?: boolean;
  small_flat?: boolean;
  dock?: DockKind;
};

function requireClient() {
  const client = createSupabaseClient();
  if (!client) {
    throw new Error("Falta la URL o la clave publicable de Supabase.");
  }
  return client;
}

export async function getBrands(): Promise<Brand[]> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("brands")
    .select("id, slug, name")
    .order("name");

  if (error) throw error;
  return data ?? [];
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("brands")
    .select("id, slug, name")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<ProductWithBrand[]> {
  const supabase = requireClient();
  let query = supabase
    .from("products")
    .select(
      "id, slug, brand_id, name, asin, gtin, pa_suction, navigation, mop_type, dock, pet_hair, carpets, small_flat, height_mm, for_whom, not_for_whom, summary, status, brands(id, slug, name)",
    )
    .eq("status", "published")
    .order("name");

  if (filters.pet_hair === true) query = query.eq("pet_hair", true);
  if (filters.carpets === true) query = query.eq("carpets", true);
  if (filters.small_flat === true) query = query.eq("small_flat", true);
  if (filters.dock) query = query.eq("dock", filters.dock);

  const { data, error } = await query;
  if (error) throw error;

  const products = (data ?? []) as ProductWithBrand[];
  if (!filters.brand) return products;
  return products.filter((product) => product.brands?.slug === filters.brand);
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductWithDetails | null> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, brand_id, name, asin, gtin, pa_suction, navigation, mop_type, dock, pet_hair, carpets, small_flat, height_mm, for_whom, not_for_whom, summary, status, brands(id, slug, name), product_variants(id, product_id, color, asin)",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data as ProductWithDetails | null;
}

export async function getProductsForCompare(): Promise<
  Pick<Product, "slug" | "name">[]
> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug, name")
    .eq("status", "published")
    .order("name");

  if (error) throw error;
  return data ?? [];
}

export async function getProductsBySlugs(
  slugs: string[],
): Promise<ProductWithBrand[]> {
  if (slugs.length === 0) return [];
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, brand_id, name, asin, gtin, pa_suction, navigation, mop_type, dock, pet_hair, carpets, small_flat, height_mm, for_whom, not_for_whom, summary, status, brands(id, slug, name)",
    )
    .in("slug", slugs)
    .eq("status", "published");

  if (error) throw error;
  return (data ?? []) as ProductWithBrand[];
}

export async function getProductSlugs(): Promise<string[]> {
  const supabase = requireClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .eq("status", "published");
  if (error) throw error;
  return (data ?? []).map((row) => row.slug);
}
