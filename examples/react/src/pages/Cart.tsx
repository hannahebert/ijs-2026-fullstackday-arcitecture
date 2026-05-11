import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../cart-context";
import { getProduct, type Product } from "../api";
import { getAssetUrl } from "../assetUrl";
import "./Cart.css";

type CartLine = { productId: number; quantity: number; product: Product };

export const Cart = () => {
  const { items, setQuantity } = useCart();
  const [lines, setLines] = useState<CartLine[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all(
      items.map(async (item) => ({
        ...item,
        product: await getProduct(item.productId),
      })),
    ).then(setLines);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your cart is empty</h1>
        <Link to="/">Continue shopping</Link>
      </div>
    );
  }

  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  return (
    <div className="cart-page">
      <h1>Your cart</h1>
      <ul className="cart-lines">
        {lines.map((line) => (
          <li key={line.productId} className="cart-line">
            <img
              src={getAssetUrl("product", line.product.imageSeed, "sm")}
              alt={line.product.name}
            />
            <div className="cart-line-info">
              <div className="cart-line-name">{line.product.name}</div>
              <div className="cart-line-price">
                ${line.product.price.toFixed(2)} each
              </div>
            </div>
            <div className="qty-stepper">
              <button
                onClick={() => setQuantity(line.productId, line.quantity - 1)}
              >
                -
              </button>
              <span>{line.quantity}</span>
              <button
                onClick={() => setQuantity(line.productId, line.quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="cart-line-total">
              ${(line.product.price * line.quantity).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <div className="cart-total">Total: ${total.toFixed(2)}</div>
        <button className="checkout-button" onClick={() => navigate("/thanks")}>
          Checkout
        </button>
      </div>
    </div>
  );
};
