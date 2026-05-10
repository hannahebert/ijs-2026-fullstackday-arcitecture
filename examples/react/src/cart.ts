const STORAGE_KEY = "shop:cart";

export type CartItem = { productId: number; quantity: number };

export const getCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addToCart = (productId: number) => {
  const cart = getCart();
  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

export const setQuantity = (productId: number, quantity: number) => {
  const cart = getCart().filter((item) => item.productId !== productId);
  if (quantity > 0) {
    cart.push({ productId, quantity });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem(STORAGE_KEY);
};
