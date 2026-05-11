# Refactorings

---

## Slot — Component extraction: `ProductCard` (10 min · Flo · IDE)

**Files:**
- Modify: `examples/react/src/pages/ProductList.tsx`, `ProductList.css`
- Create: `examples/react/src/pages/product-list/ProductCard.tsx`, `ProductCard.css`

**Goal:** Pull the grid card out of `ProductList`. The `.map` collapses to a one-liner.

**Claude Code prompt:**

```
Extract the product card JSX from src/pages/ProductList.tsx into a new
src/pages/product-list/ProductCard.tsx component. Props: product (Product),
justAdded (boolean), onAdd (id: number) => void. Move the relevant CSS into
a co-located ProductCard.css. Keep ProductList.tsx behavior identical.
```

---

## Slot — Hook extraction: `useProducts` (10 min · Flo · IDE)

**Files:**
- Modify: `examples/react/src/pages/ProductList.tsx`
- Create: `examples/react/src/pages/product-list/useProducts.ts`

**Goal:** Pull the `useEffect` + `products` + `loading` + `error` state out of `ProductList` into a hook. The component sheds three `useState`s and one `useEffect`.

**Claude Code prompt:**

```
Extract the products fetching logic from src/pages/ProductList.tsx into a new
src/pages/product-list/useProducts.ts hook.

The hook takes a ProductListParams argument and returns { products, loading,
error }. Move the three useState declarations (products, loading, error) and
the useEffect that fetches based on params into the hook. In ProductList,
replace those declarations with a single useProducts(...) call passing the
filter values.

Don't introduce debouncing, AbortController, or React Query yet — behavior
must stay identical to the current code.
```

---

## Slot — Refactoring State (10 min · Flo · IDE)

**Two refactors prepared. Pick by available time:**

- **Primary (C): Cart → Context.** Always do this if time allows.
- **Bonus (D): Filters → URL state.** Do this if there's slack in the slot.

### C — Cart → Context

**Files:**
- Modify: `examples/react/src/cart.ts`, `App.tsx`, `pages/Cart.tsx`, `pages/ProductDetail.tsx`, `pages/product-list/ProductCard.tsx`
- Possibly create: `examples/react/src/cart-context.tsx` (or merge into `cart.ts`)

**Goal:** Replace the module-level `cart.ts` functions with a React Context. `useCart()` returns `{ items, addToCart, setQuantity, clearCart }`. Header badge becomes reactive — adding an item updates it instantly, no reload.

**Steps:**

1. Create `CartContext` + `CartProvider` holding `items` in `useState`. Provide the four functions.
2. Keep localStorage persistence via a one-line `useEffect` in the provider that writes `items` to storage. Initial state reads from storage.
3. Wrap the app's children in `<CartProvider>` inside `App.tsx` (inside `<BrowserRouter>`).
4. Add a `useCart()` hook.
5. Update call sites:
   - `App.tsx`'s `CartBadge`: `const { items } = useCart(); const count = items.reduce(...);` — note that count is **derived**, not stored.
   - `ProductCard.tsx` and `ProductDetail.tsx`: `const { addToCart } = useCart();`.
   - `Cart.tsx`: `const { items, setQuantity } = useCart();` — remove `useCartLines` and the manual `reload()`.
6. Confirm the badge updates instantly when adding from list or detail.

**Claude Code prompt:**

```
Refactor cart state to live in React Context instead of module-level
functions touching localStorage.

Create src/cart-context.tsx exporting:
- CartProvider: holds items: CartItem[] in useState. Initialize from
  localStorage on mount; persist via useEffect when items changes.
- useCart(): returns { items, addToCart, setQuantity, clearCart }.

Wrap the inside of <BrowserRouter> in App.tsx with <CartProvider>.

Update call sites to use useCart() instead of importing from cart.ts:
- CartBadge in App.tsx: read items, compute count inline. Don't store count
  in useState — it's derived.
- ProductCard and ProductDetail: pull addToCart from useCart().
- Cart.tsx: pull items and setQuantity from useCart(); remove the
  useCartLines hook and the manual reload() — items now update reactively.
- Thanks.tsx: pull clearCart from useCart().

Delete src/cart.ts once every call site is migrated.
```

alternative

```
The cart state is shared accross multiple components and updating the cart at one
place does not update it at other places. If I add a new item to the cart, the count
in the badge is not updated. How could we fix that? What are advantages and
disatvantages of the fixes?
```

### D — Filters → URL state (bonus, ~5 min if there's time)

**Files:**
- Modify: `examples/react/src/pages/ProductList.tsx`

**Goal:** Move the six filter `useState`s (`search`, `selectedCategoryId`, `maxPrice`, `sort`, `order`, `page`) into URL search params via React Router's `useSearchParams`.

**Claude Code prompt:**

```
Move filter state in src/pages/ProductList.tsx from useState to React Router
v7's useSearchParams (imported from "react-router").

Filters: search, selectedCategoryId, maxPrice, sort, order, page.

Read each value from searchParams with defaults: search='', categoryId=
undefined, maxPrice=200, sort='name', order='asc', page=1. Write via
setSearchParams whenever a control changes. When any filter other than page
changes, reset page to 1 (matches current behavior).

Don't change the functionality. Just move the state.
```

---

## Slot — Error Handling & Loading States (5 min · Flo · IDE)

**Files:**
- Modify: `examples/react/src/pages/product-list/useProducts.ts`, `examples/react/src/pages/ProductList.tsx`

**Goal:** Swap the body of `useProducts` for React Query. Restructure the JSX to make the four states (loading / error / empty / data) distinct.

**Steps:**

1. In `useProducts.ts`, replace the manual `useState` + `useEffect` body with `useQuery`:
   ```ts
   export const useProducts = (params: ProductListParams) => useQuery({
     queryKey: ['products', params],
     queryFn: () => getProducts(params),
   });
   ```
2. In `ProductList.tsx`, destructure: `const { data: products = [], isPending, isError, error } = useProducts(...);`.
3. Restructure the JSX so the four states are visibly distinct:
   - `isPending` — loading message (or skeleton if buffer time allows).
   - `isError` — error message (`error.message`).
   - `!isPending && products.length === 0` — empty state ("No products match your filters" — currently this looks identical to loading).
   - Otherwise — the grid.

**Audience point:** "Three flags pretending to be one" → one query result, four states clearly distinguished. This is exactly what's on the matching slide.

**Claude Code prompt:**

```
Migrate src/pages/product-list/useProducts.ts to React Query and restructure
the JSX in src/pages/ProductList.tsx to render four distinct states.

In useProducts.ts: replace the manual useState/useEffect body with a useQuery
call from @tanstack/react-query. Return the useQuery result directly.

In ProductList.tsx: destructure const { data: products = [], isPending,
isError, error } = useProducts(...). Replace existing loading/error rendering
with four branches:
- isPending → loading message
- isError → error message from error.message
- !isPending && products.length === 0 → empty state ("No products match your filters.")
- otherwise → the grid

React Query is already installed and QueryClientProvider already wraps the
app in main.tsx — no setup needed.
```

---

## Slot — Puffer / Additional Refactorings (12 min · Flo · IDE)

Live menu. Pick based on time remaining and audience energy. Roughly priority order:

### 1. Skeleton UI for the product grid (~5 min)

In `index.css`, add a `.skeleton` rule (grey block, subtle shimmer animation; ~15 lines). Render a grid of N skeleton cards while `isPending` is true and there are no previous results. Don't swap to skeletons on refetch — keep stale results with a small "Updating…" badge.

**Claude Code prompt:**

```
Add skeleton UI for the product grid loading state.

In src/index.css, add a .skeleton rule with a subtle shimmer animation (grey
block, includes @keyframes; ~15 lines total).

Create src/pages/product-list/SkeletonCard.tsx matching the real ProductCard
dimensions: image placeholder, title bar, price bar, button bar.

In ProductList.tsx, when isPending is true AND there are no previous products,
render a grid of 8 SkeletonCards instead of the loading text. During refetch
with prior data visible, keep the data and show a small "Updating..." badge
in the toolbar corner — do not swap to skeletons.
```

### 2. Per-source loading / error on `ProductDetail` (~7 min)

Currently `ProductDetail` has four sequential `useEffect`s with a single `loading` flag. Replace each fetch with its own `useQuery` (`useProduct`, `useRelatedProducts`, `useCategories`). Track per-source state. The product hero appears when its query resolves; related and breadcrumb fill in independently. If related fails, show an inline error scoped to that section. Breadcrumb degrades to "Shop » productName" if categories fails.

**Claude Code prompt:**

```
Replace the four sequential useEffects in src/pages/ProductDetail.tsx with
three React Query hooks. Handle per-source loading and error so partial
failures degrade gracefully.

Create three hooks under src/pages/product-detail/:
- useProduct(id) — wraps getProduct.
- useRelatedProducts(categoryId, excludeId) — wraps getRelatedProducts.
  Use the `enabled` option so it only runs once categoryId is known.
- useCategories() — wraps getCategories.

In ProductDetail.tsx, call all three hooks at the top. Render the product
hero as soon as useProduct resolves, independent of the others. Related:
skeleton while loading, inline error scoped to that section if it fails.
Breadcrumb: degrade to "Shop » <productName>" if categories fails.

Keep the recently-viewed localStorage tracking effect untouched.
```

### 3. Filters → URL state (~6 min, if not already done in slot 9)

See section D in the State slot above — same refactor, same Claude prompt.

### 4. Retry button (~3 min)

Wire a button next to any error message to `useQuery`'s `refetch`. One small change with an obvious UX payoff.

**Claude Code prompt:**

```
Add a "Retry" button next to the error message in src/pages/ProductList.tsx.

The button calls the refetch function returned by React Query's useProducts
hook. If useProducts currently destructures only data/isPending/isError/error,
expose refetch alongside them (or return the whole useQuery result and let
the caller pick what it needs).
```

### 5. Extract remaining child components (~3 min each)

`Toolbar` (search input + sort dropdown), `Pagination` (prev/next + page indicator). Same pattern as `ProductCard`. Quick to demonstrate "and you'd do the same for these."

**Claude Code prompt:**

```
Extract two more components from src/pages/ProductList.tsx into co-located
files under src/pages/product-list/.

Toolbar.tsx — props: { search: string; onChangeSearch: (s: string) => void;
sort: 'name' | 'price'; order: 'asc' | 'desc'; onChangeSort: (sort, order) => void }.
Contains the search input and the sort dropdown.

Pagination.tsx — props: { page: number; canGoNext: boolean;
onChangePage: (n: number) => void }. Contains the Previous / Page N / Next
controls.

Move relevant CSS rules into co-located Toolbar.css and Pagination.css.
Update ProductList.tsx to render <Toolbar /> and <Pagination />.
```
