import productsData from "@/public/data/products.json";

export type ProductCategory = "Apparel" | "Accessories" | "Tech" | "Essentials";

export interface ProductVariant {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  tag: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  inStock: boolean;
  colors: string[];
  sizes?: string[];
  variants: ProductVariant[];
}

/**
 * Returns the product catalogue from the static JSON import.
 * Importing directly avoids the need for an absolute URL and works
 * reliably in both server and client contexts.
 *
 * React Query caches the result for the lifetime of the session
 * (staleTime: Infinity set in providers.tsx), so this only runs once.
 */
export async function listProducts(): Promise<Product[]> {
  return productsData as Product[];
}
