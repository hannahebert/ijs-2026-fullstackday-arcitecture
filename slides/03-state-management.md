---
layout: section
---

# Part 3: State Management Gone Wrong

When the state map looks worse than the UI

---

# When state is fighting you

- You changed one thing and three places re-rendered
- The same value lives in two stores, and they disagree
- You're writing effects to keep state in sync with itself
- `isLoading` shows up three times in the same flow
- The bug is never where the state is

---

# Derived state is a trap

Storing what you could compute creates a second source of truth.

- Two values drift apart the moment one updates
- You write an effect to keep them aligned
- The fix has its own bugs

<v-click>

**Derive on read.** A computed value, a selector, a `computed` signal — anything that runs when you ask for it.

</v-click>

---

# Server state isn't client state

Data from an API has different needs than UI state.

- Caching, refetching, invalidation, retries
- Stale-while-revalidate, optimistic updates
- It changes underneath you

<v-click>

Use a server-state library and keep your client state for what's actually client state.

</v-click>

---
layout: two-cols-header
---

# Angular: NgRx where a Signal would do

When the cure is bigger than the disease.

::left::

#### Before

```ts
// dialog.actions.ts
export const open = createAction('[Dialog] Open');
export const close = createAction('[Dialog] Close');

// dialog.reducer.ts
export const dialogReducer = createReducer(
  { isOpen: false },
  on(open, (s) => ({ ...s, isOpen: true })),
  on(close, (s) => ({ ...s, isOpen: false }))
);

// dialog.selectors.ts
export const selectIsOpen = (s: AppState) => s.dialog.isOpen;

// component.ts
readonly isOpen$ = this.store.select(selectIsOpen);
open() { this.store.dispatch(open()); }
```

::right::

<v-click>

#### After

```ts
// component.ts
readonly isOpen = signal(false);

open()  { this.isOpen.set(true); }
close() { this.isOpen.set(false); }
```

</v-click>

<!-- TODO: Hannah to verify / adjust idiomatic Angular -->

<style>
h1 { font-size: 1.8rem !important; margin-bottom: 0.4rem !important; }
p  { font-size: 1.1rem !important; line-height: 1.4 !important; margin-bottom: 0.6rem !important; }
h4 { font-size: 1rem  !important; margin: 0.4rem 0 0.2rem !important; }
pre { font-size: 0.7rem !important; line-height: 1.5 !important; }
.two-cols-header { column-gap: 1.5rem !important; }
</style>

---
layout: two-cols-header
---

# React: Global state for local concerns

A Zustand store, a Redux slice, a Context provider — all to remember which row is expanded.

::left::

#### Before

```tsx
// store.ts
const useUIStore = create<UIState>((set) => ({
  expandedRowId: null,
  setExpandedRowId: (id) => set({ expandedRowId: id }),
}));

// Row.tsx (deep in the tree)
const expandedId = useUIStore((s) => s.expandedRowId);
const setExpanded = useUIStore((s) => s.setExpandedRowId);
const isExpanded = expandedId === id;
```

::right::

<v-click>

#### After

```tsx
// Table.tsx
const [expandedId, setExpandedId] = useState<string>();

<Row
  isExpanded={expandedId === row.id}
  onToggle={() => setExpandedId(row.id)}
/>
```

</v-click>

<style>
h1 { font-size: 1.8rem !important; margin-bottom: 0.4rem !important; }
p  { font-size: 1.1rem !important; line-height: 1.4 !important; margin-bottom: 0.6rem !important; }
h4 { font-size: 1rem  !important; margin: 0.4rem 0 0.2rem !important; }
pre { font-size: 0.7rem !important; line-height: 1.5 !important; }
.two-cols-header { column-gap: 1.5rem !important; }
</style>

---

# Where should this state live?

Ask, in order:

<v-clicks>

1. **Local** — only one component cares
2. **Lifted** — a small subtree shares it
3. **Server state** — it lives on a server, treat it as such
4. **Global** — genuinely cross-cutting (auth, theme, feature flags)

</v-clicks>

<v-click>

Skip a level only when the next one is clearly necessary.

</v-click>

<v-click>

But don't keep state below the level it belongs to either — that's how prop drilling and duplication start.

</v-click>
