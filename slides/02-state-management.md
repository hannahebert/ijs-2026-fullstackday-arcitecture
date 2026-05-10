---
layout: section
---

# State Management Gone Wrong

When the state map looks worse than the UI

---

# What is state?

<v-clicks>

Any value your UI depends on that can change over time.
</v-clicks>

<v-clicks>

- **Server data** — the product list fetched from an API
- **UI state** — which filters are selected?
- **Form state** — what the user has typed so far
- **Derived state** — the filtered product list, the total price, ...

</v-clicks>

---

# Derived state

State that can be **computed from other state**

<v-clicks>

```ts
// State
const [items, setItems] = useState([...]);
const [filter, setFilter] = useState('active');

// Derived — just a variable, not useState
const visibleItems = items.filter(i => i.status === filter);
const totalCount = items.length;
const activeCount = items.filter(i => i.status === 'active').length;
```

</v-clicks>

---

# BUT: Derived state is a trap

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

# Where should state live?

<v-clicks>

1. **Local** — only one component cares
2. **Lifted** — a small subtree shares it
3. **Server state** — it lives on a server, treat it as such
4. **Global** — genuinely cross-cutting (auth, theme, feature flags)

</v-clicks>

---

# Where should state live?

```mermaid {scale: 0.6}
flowchart LR
    A([New state needed]) --> B{Does it come\nfrom the server?}
    B -->|Yes| C[Server state\nReact Query / SWR / NgRx Data]
    B -->|No| D{More than one\ncomponent needs it?}
    D -->|No| E[Local\nuseState in that component]
    D -->|Yes| F{Small subtree\nor whole app?}
    F -->|Subtree| G[Lifted\nmove to parent component]
    F -->|Whole app| H[Global\nContext / Zustand / NgRx]
```
