import { Routes, Route, Outlet, Link } from "react-router";
import { ProductList } from "./pages/ProductList";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Thanks } from "./pages/Thanks";
import { CartProvider, useCart } from "./cart-context";

const CartBadge = () => {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="cart-badge">
      Cart {count > 0 ? `(${count})` : ""}
    </Link>
  );
};

const Layout = () => (
  <>
    <header className="site-header">
      <Link to="/" className="site-title">
        Shop
      </Link>
      <span className="site-subtitle">Architecture Sins demo</span>
      <CartBadge />
    </header>
    <main>
      <Outlet />
    </main>
  </>
);

export const App = () => (
  <CartProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="thanks" element={<Thanks />} />
      </Route>
    </Routes>
  </CartProvider>
);
