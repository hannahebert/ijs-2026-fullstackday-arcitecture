import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  getProducts,
  getCategories,
  type Product,
  type Category,
} from "../api";
import { addToCart } from "../cart";
import { getAssetUrl } from "../assetUrl";
import "./ProductList.css";

const PAGE_SIZE = 8;

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >();
  const [maxPrice, setMaxPrice] = useState(200);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"name" | "price">("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [justAddedIds, setJustAddedIds] = useState<Set<number>>(new Set());

  const handleAdd = (productId: number) => {
    addToCart(productId);
    setJustAddedIds((prev) => new Set(prev).add(productId));
    setTimeout(() => {
      setJustAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }, 1500);
  };

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

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

  return (
    <div className="product-list">
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
            <article key={p.id} className="product-card">
              <Link to={`/products/${p.id}`}>
                <img
                  src={getAssetUrl("product", p.imageSeed, "md")}
                  alt={p.name}
                />
              </Link>
              <div className="product-card-body">
                <Link to={`/products/${p.id}`}>
                  <h3>{p.name}</h3>
                </Link>
                <p className="price">${p.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAdd(p.id)}
                  disabled={p.stock === 0}
                  className="add-button"
                >
                  {p.stock === 0
                    ? "Out of stock"
                    : justAddedIds.has(p.id)
                      ? "Added to cart"
                      : "Add to cart"}
                </button>
              </div>
            </article>
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
