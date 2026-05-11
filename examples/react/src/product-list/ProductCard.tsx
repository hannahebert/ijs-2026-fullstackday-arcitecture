import { useState } from "react";
import type { Product } from "../api.ts";
import { Link } from "react-router";
import { getAssetUrl } from "../assetUrl.ts";
import { useCart } from "../cart-context.tsx";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={getAssetUrl("product", product.imageSeed, "md")}
          alt={product.name}
        />
      </Link>
      <div className="product-card-body">
        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="price">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className="add-button"
        >
          {product.stock === 0
            ? "Out of stock"
            : justAdded
              ? "Added to cart"
              : "Add to cart"}
        </button>
      </div>
    </article>
  );
};
