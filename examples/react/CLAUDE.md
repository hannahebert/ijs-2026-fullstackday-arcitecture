# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Vite 8 + React 19 + TypeScript SPA. Routing via React Router v7 in declarative mode (import from `react-router`, not `react-router-dom`; `BrowserRouter` is wired in `src/main.tsx`). TanStack Query v5 is installed and a `QueryClientProvider` wraps the app, but no component currently uses it — all data fetching today goes through bare `fetch` wrappers in `src/api.ts` called from `useEffect`. Styling is plain `.css` files imported per component; no Tailwind, no CSS-in-JS.

## Commands

- `npm install` — first-time setup
- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build`, output to `dist/`
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run format` / `npm run format:check` — Prettier with all defaults (no config file)
- `npm run preview` — serve the production build

## Backend dependency

Every page fetches data; nothing renders without the mock backend at `../server/` running on **port 3001**. Start it in a separate terminal: `cd ../server && npm install && npm start`. `src/api.ts` calls relative `/api/*` paths, which the Vite dev server proxies to `http://localhost:3001` (see `vite.config.ts`).

The backend honors per-request `?_delay=<ms>` and `?_error=<status>` query params, which is handy when you need to reproduce slow or failing requests without changing server code. `src/api.ts` has commented-out lines in `getProducts` and `getCategories` that randomly inject these — uncomment to exercise loading and error paths.

## App structure

Four routes, all declared in `src/App.tsx` under a shared `Layout`:

- `/` → `ProductList` (`src/pages/ProductList.tsx`)
- `/products/:id` → `ProductDetail` (`src/pages/ProductDetail.tsx`)
- `/cart` → `Cart` (`src/pages/Cart.tsx`)
- `/thanks` → `Thanks` (`src/pages/Thanks.tsx`)

Shared, non-page modules sit flat in `src/`:

- `api.ts` — `fetch` wrappers and the `Product` / `Category` / `ProductListParams` types. Single source of truth for backend URLs.
- `cart.ts` — cart persistence. **Synchronous, localStorage-backed, with no subscription mechanism.** Functions (`getCart`, `addToCart`, `setQuantity`, `clearCart`) mutate localStorage and return; nothing notifies other components when the cart changes. Consumers (e.g. the `CartBadge` in `App.tsx`) read once on mount and go stale until they re-mount or manually refresh. If you add a feature that needs live cart updates across components, you'll need to add a notification mechanism (event, context, store) — don't assume one exists.
- `assetUrl.ts` — builds `picsum.photos` URLs for product/category/banner/avatar imagery.

## Things wired but not yet used

Not dead code — keep these in place:

- **TanStack Query** — `QueryClientProvider` is mounted in `src/main.tsx`, but no `useQuery` / `useMutation` calls exist yet. Data fetching is being migrated incrementally.
