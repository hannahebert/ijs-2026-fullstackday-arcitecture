import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  getProduct,
  getRelatedProducts,
  getCategories,
  type Product,
  type Category,
} from "../api";
import { addToCart } from "../cart";
import { getAssetUrl } from "../assetUrl";
import "./ProductDetail.css";

const RECENTLY_VIEWED_KEY = "shop:recently-viewed";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(id)
      .then((p) => {
        setProduct(p);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!product) return;
    getRelatedProducts(product.categoryId, product.id)
      .then(setRelated)
      .catch(() => {});
  }, [product]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!product) return;
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    const list: number[] = raw ? JSON.parse(raw) : [];
    list.push(product.id);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(list));
  }, [product]);

  if (loading) return <div className="status">Loading product...</div>;
  if (error) return <div className="status error">Error: {error}</div>;
  if (!product) return null;

  const category = categories.find((c) => c.id === product.categoryId);

  const handleAdd = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) {
      addToCart(product.id);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="product-detail">
      <nav className="breadcrumb">
        <Link to="/">Shop</Link>
        {category && <> &raquo; {category.name}</>}
        <> &raquo; {product.name}</>
      </nav>

      <div className="detail-main">
        <img
          src={getAssetUrl("product", product.imageSeed, "lg")}
          alt={product.name}
        />
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          <p className="stock">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
          <div className="add-row">
            <div className="qty-stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button
              className="add-button"
              onClick={handleAdd}
              disabled={product.stock === 0}
            >
              {justAdded ? "Added to cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related">
          <h2>Related products</h2>
          <div className="related-grid">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="related-card"
              >
                <img
                  src={getAssetUrl("product", p.imageSeed, "sm")}
                  alt={p.name}
                />
                <div className="related-name">{p.name}</div>
                <div className="related-price">${p.price.toFixed(2)}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
