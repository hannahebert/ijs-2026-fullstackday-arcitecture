---
layout: section
---

# Error Handling & Loading States

The states nobody designs until users see an endless loading spinner.

---

# When the UI lies about what's happening

<v-clicks>

- A request fails and the spinner spins forever
- The empty state and the loading state look identical
- An error flashes, then stale data appears, then the error returns
- A page-load failure shows the same modal as a save failure
- The "retry" button reloads the whole page

</v-clicks>

---

# A request has more than two states

<div class="card-grid-2">
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    </div>
    <div class="card-title">loading</div>
    <div class="card-desc">We're waiting — the request is in flight</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
      </svg>
    </div>
    <div class="card-title">error</div>
    <div class="card-desc">It failed — something went wrong and needs recovery</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      </svg>
    </div>
    <div class="card-title">success — empty</div>
    <div class="card-desc">It succeeded with nothing — needs its own distinct empty state</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    </div>
    <div class="card-title">success — with data</div>
    <div class="card-desc">It succeeded with something — the happy path</div>
  </div>
</div>

> `isLoading`, `error`, `data` as three independent flags — only one should be active at a time, but nothing enforces that.

---

# Errors are part of the UI, not edge cases

<div class="card-grid">
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
      </svg>
    </div>
    <div class="card-title">Silent failures</div>
    <div class="card-desc">A <code>try/catch</code> that logs and moves on hides the problem from the user</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>
      </svg>
    </div>
    <div class="card-title">Vague messages</div>
    <div class="card-desc">"Something went wrong" tells the user nothing they didn't already see</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>
      </svg>
    </div>
    <div class="card-title">One message fits none</div>
    <div class="card-desc">Page-load, form-submit, and background-sync errors are different problems — they need different recovery</div>
  </div>
</div>

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

<div class="card-grid-2">
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    </div>
    <div class="card-title">Where is it caught?</div>
    <div class="card-desc">The closer to the user, the more context you have for recovery</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m4 4 7.07 17 2.51-7.39L21 11.07z"/>
      </svg>
    </div>
    <div class="card-title">What can the user do?</div>
    <div class="card-desc">Retry, use a fallback, or contact support — make the action explicit</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
      </svg>
    </div>
    <div class="card-title">What's still usable?</div>
    <div class="card-desc">Degrade gracefully — don't blank the whole page for one failed widget</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    </div>
    <div class="card-title">Loading is intentional</div>
    <div class="card-desc">Skeleton, spinner, or nothing — always a deliberate choice, never an accident</div>
  </div>
</div>

---

# Docs-as-Code: teach the AI your conventions

<v-clicks>

```markdown
# docs/error-handling.md

- Every async op has exactly one active state:
  loading | error | success | empty
- Never catch and ignore — recover or rethrow
  with context
- Error messages name the recovery action,
  not just the problem
- Page errors, form errors, and background
  errors get separate handling
```

</v-clicks>

