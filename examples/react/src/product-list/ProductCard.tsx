import type { Product } from "../api.ts";
import { Link } from "react-router";
import { getAssetUrl } from "../assetUrl.ts";

interface Props {
  product: Product;
  onProductAdd: (product: Product) => void;
  isProductAdded: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  onProductAdd,
  isProductAdded,
}) => {
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
          onClick={() => onProductAdd(product)}
          disabled={product.stock === 0}
          className="add-button"
        >
          {product.stock === 0
            ? "Out of stock"
            : isProductAdded
              ? "Added to cart"
              : "Add to cart"}
        </button>
      </div>
    </article>
  );
};
