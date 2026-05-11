const BASE = "/api";

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
  const query = new URLSearchParams();
  //if (Math.random() > 0.8) query.set('_error', '500');
  //query.set('_delay', `${Math.random() * 2000}`);
  if (params.search) query.set("q", params.search);
  if (params.categoryId)
    query.set("categoryId", String(params.categoryId));
  if (params.minPrice !== undefined)
    query.set("price_gte", String(params.minPrice));
  if (params.maxPrice !== undefined)
    query.set("price_lte", String(params.maxPrice));
  if (params.sort) query.set("_sort", params.sort);
  if (params.order) query.set("_order", params.order);
  if (params.page) query.set("_page", String(params.page));
  if (params.pageSize) query.set("_limit", String(params.pageSize));

  const qs = query.toString();
  const res = await fetch(`${BASE}/products${qs ? `?${qs}` : ""}`);
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
  const query = new URLSearchParams({
    categoryId: String(categoryId),
    id_ne: String(excludeId),
    _limit: "4",
  });
  const res = await fetch(`${BASE}/products?${query}`);
  if (!res.ok)
    throw new Error(`Failed to fetch related products (${res.status})`);
  return res.json();
};

export const getCategories = async (): Promise<Category[]> => {
  const query = new URLSearchParams();
  //if (Math.random() > 0.8) query.set('_error', '500');
  //query.set('_delay', `${Math.random() * 2000}`);
  const qs = query.toString();
  const res = await fetch(`${BASE}/categories${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`);
  return res.json();
};
