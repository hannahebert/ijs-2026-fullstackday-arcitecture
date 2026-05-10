---
layout: section
---

# Part 5: Error Handling & Loading States

The slides everyone forgets to design

---

# When the UI lies about what's happening

- A request fails and the spinner spins forever
- The empty state and the loading state look identical
- An error flashes, then stale data appears, then the error returns
- A page-load failure shows the same modal as a save failure
- The "retry" button reloads the whole page

---

# A request has more than two states

<v-clicks>

- **loading** — we're waiting
- **error** — it failed
- **empty** — it succeeded with nothing
- **success** — it succeeded with something

</v-clicks>

<v-click>

Three independent values (`isLoading`, `error`, `data`). Only one should be "active" at a time — but nothing in the type stops you from having all three at once.

</v-click>

---

# Errors are part of the UI, not edge cases

- A `try/catch` that logs and moves on is a silent failure
- "Something went wrong" tells the user nothing they didn't already see
- A page-load error, a form-submit error, and a background-sync error are different problems — and need different recovery

---
layout: two-cols-header
---

# Angular: Swallowed errors in the pipe

`catchError` returns an empty stream, the spinner clears, the user sees nothing.

::left::

#### Before

```ts
loadUser() {
  this.loading = true;
  this.userService.getUser(this.id).pipe(
    catchError(err => {
      console.error(err);
      return of(null);
    }),
    finalize(() => this.loading = false),
  ).subscribe(u => this.user = u);
}
```

::right::

<v-click>

#### After

```ts
private result = resource({
  request: () => ({ id: this.id() }),
  loader: ({ request }) => fetchUser(request.id),
});

user      = computed(() => this.result.value());
error     = computed(() => this.result.error());
isLoading = computed(() => this.result.isLoading());
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

# React: Three flags pretending to be one

Three pieces of state. Eight combinations. One bug per impossible one.

::left::

#### Before

```tsx
const [user, setUser] = useState<User>();
const [loading, setLoading] = useState(false);
const [error, setError] = useState<Error>();

useEffect(() => {
  setLoading(true);
  fetchUser(id)
    .then(setUser)
    .catch(setError)
    .finally(() => setLoading(false));
}, [id]);
```

::right::

<v-click>

#### After

```tsx
const { data, error, isPending } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id),
});
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

# What "handling" actually means

<v-clicks>

1. Decide _where_ the error is caught — the closer to the user, the better
2. Decide _what_ the user can do about it — retry, fallback, contact support
3. Decide _what's still usable_ — degrade, don't blank
4. Make loading deliberate — skeleton, spinner, or nothing at all

</v-clicks>
