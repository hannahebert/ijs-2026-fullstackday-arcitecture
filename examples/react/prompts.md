## state

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

## Filter => URL state

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

## React Query

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

## Split PDP loading

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

## Retry Button

```
Add a "Retry" button next to the error message in src/pages/ProductList.tsx.

The button calls the refetch function returned by React Query's useProducts
hook. If useProducts currently destructures only data/isPending/isError/error,
expose refetch alongside them (or return the whole useQuery result and let
the caller pick what it needs).
```

## Extract Remaining PLP Components

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
