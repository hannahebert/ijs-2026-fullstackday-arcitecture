const BASE = "http://localhost:3001";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  stock: number;
  imageSeed: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type ProductListParams = {
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price" | "name";
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
};

export const getProducts = async (
  params: ProductListParams = {},
): Promise<Product[]> => {
  const url = new URL(`${BASE}/products`);
  //if (Math.random() > 0.8) url.searchParams.set('_error', '500');
  //url.searchParams.set('_delay', `${Math.random() * 2000}`);
  if (params.search) url.searchParams.set("q", params.search);
  if (params.categoryId)
    url.searchParams.set("categoryId", String(params.categoryId));
  if (params.minPrice !== undefined)
    url.searchParams.set("price_gte", String(params.minPrice));
  if (params.maxPrice !== undefined)
    url.searchParams.set("price_lte", String(params.maxPrice));
  if (params.sort) url.searchParams.set("_sort", params.sort);
  if (params.order) url.searchParams.set("_order", params.order);
  if (params.page) url.searchParams.set("_page", String(params.page));
  if (params.pageSize) url.searchParams.set("_limit", String(params.pageSize));

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json();
};

export const getProduct = async (id: string | number): Promise<Product> => {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product (${res.status})`);
  return res.json();
};

export const getRelatedProducts = async (
  categoryId: number,
  excludeId: number,
): Promise<Product[]> => {
  const url = new URL(`${BASE}/products`);
  url.searchParams.set("categoryId", String(categoryId));
  url.searchParams.set("id_ne", String(excludeId));
  url.searchParams.set("_limit", "4");
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`Failed to fetch related products (${res.status})`);
  return res.json();
};

export const getCategories = async (): Promise<Category[]> => {
  const url = new URL(`${BASE}/categories`);
  //if (Math.random() > 0.8) url.searchParams.set('_error', '500');
  //url.searchParams.set('_delay', `${Math.random() * 2000}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`);
  return res.json();
};
