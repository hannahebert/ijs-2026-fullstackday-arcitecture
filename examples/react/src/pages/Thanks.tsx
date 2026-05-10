import { useEffect } from "react";
import { Link } from "react-router";
import { clearCart } from "../cart";
import "./Thanks.css";

export const Thanks = () => {
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="thanks-page">
      <h1>Thanks for your order!</h1>
      <p>Your items are on their way (in our imagination).</p>
      <Link to="/">Continue shopping</Link>
    </div>
  );
};
