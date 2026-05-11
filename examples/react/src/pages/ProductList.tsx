import { useEffect, useState } from "react";
import {
  getProducts,
  getCategories,
  type Product,
  type Category,
} from "../api";
import "./ProductList.css";
import { ProductCard } from "../product-list/ProductCard.tsx";

const PAGE_SIZE = 9;

const useProductData = (
  search: string,
  selectedCategoryId: number | undefined,
  maxPrice: number | undefined,
  sort: "name" | "price",
  order: "asc" | "desc",
  page: number,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts({
      search: search || undefined,
      categoryId: selectedCategoryId,
      maxPrice,
      sort,
      order,
      page,
      pageSize: PAGE_SIZE,
    })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [search, selectedCategoryId, maxPrice, sort, order, page]);

  return {
    products,
    loading,
    error,
  };
};

export const ProductList = () => {
  // TODO: Extract fetching categories into hook
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >();

  // TODO: Extract default value
  // TODO: Extract Filter State into hook
  const [maxPrice, setMaxPrice] = useState(200);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"name" | "price">("name");

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const { products, error, loading } = useProductData(
    search,
    selectedCategoryId,
    maxPrice,
    sort,
    order,
    page,
  );

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <div className="product-list">
      {/* TODO: Extract Filter Aside */}
      <aside className="filters">
        <h2>Categories</h2>
        <ul className="category-list">
          <li>
            <label>
              <input
                type="radio"
                name="category"
                checked={selectedCategoryId === undefined}
                onChange={() => {
                  setSelectedCategoryId(undefined);
                  setPage(1);
                }}
              />
              All
            </label>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <label>
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategoryId === cat.id}
                  onChange={() => {
                    setSelectedCategoryId(cat.id);
                    setPage(1);
                  }}
                />
                {cat.name}
              </label>
            </li>
          ))}
        </ul>

        <h2>Max price</h2>
        <input
          type="range"
          min={10}
          max={200}
          step={10}
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setPage(1);
          }}
        />
        <div className="price-display">${maxPrice}</div>
      </aside>

      <section className="results">
        <div className="toolbar">
          {/* TODO: Extract Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="search-input"
          />
          <select
            value={`${sort}-${order}`}
            onChange={(e) => {
              const [s, o] = e.target.value.split("-");
              setSort(s as "name" | "price");
              setOrder(o as "asc" | "desc");
            }}
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="price-asc">Price (low to high)</option>
            <option value="price-desc">Price (high to low)</option>
          </select>
        </div>

        {loading && <div className="status">Loading...</div>}
        {error && <div className="status error">Error: {error}</div>}
        {!loading && !error && products.length === 0 && (
          <div className="status">No products match your filters.</div>
        )}

        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={products.length < PAGE_SIZE}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};
