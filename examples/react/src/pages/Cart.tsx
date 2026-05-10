import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getCart, setQuantity, type CartItem } from "../cart";
import { getProduct, type Product } from "../api";
import { getAssetUrl } from "../assetUrl";
import "./Cart.css";

type CartLine = CartItem & { product: Product };

const useCartLines = (): [CartLine[], () => void] => {
  const [items, setItems] = useState<CartLine[]>([]);

  const reload = () => {
    const cart = getCart();
    Promise.all(
      cart.map(async (item) => ({
        ...item,
        product: await getProduct(item.productId),
      })),
    ).then(setItems);
  };

  useEffect(() => {
    reload();
  }, []);

  return [items, reload];
};

export const Cart = () => {
  const [items, reload] = useCartLines();
  const navigate = useNavigate();

  const handleQty = (productId: number, qty: number) => {
    setQuantity(productId, qty);
    reload();
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your cart is empty</h1>
        <Link to="/">Continue shopping</Link>
      </div>
    );
  }

  const total = items.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  return (
    <div className="cart-page">
      <h1>Your cart</h1>
      <ul className="cart-lines">
        {items.map((line) => (
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
                onClick={() => handleQty(line.productId, line.quantity - 1)}
              >
                -
              </button>
              <span>{line.quantity}</span>
              <button
                onClick={() => handleQty(line.productId, line.quantity + 1)}
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
