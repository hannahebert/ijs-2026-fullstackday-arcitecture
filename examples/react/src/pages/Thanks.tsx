import { useEffect } from "react";
import { Link } from "react-router";
import { useCart } from "../cart-context";
import "./Thanks.css";

export const Thanks = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="thanks-page">
      <h1>Thanks for your order!</h1>
      <p>Your items are on their way (in our imagination).</p>
      <Link to="/">Continue shopping</Link>
    </div>
  );
};
