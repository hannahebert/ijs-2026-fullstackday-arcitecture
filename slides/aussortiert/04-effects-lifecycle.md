---
layout: section
---

# Part 4: Effects & Lifecycle Chaos

When side effects start running the show

---

# When effects are fighting you

- A bug shows up and the cause is two effects running in the wrong order
- The fix is "wrap it in `setTimeout`"
- An effect's only job is to keep two pieces of state in sync
- Data refetches on every keystroke
- "Why is this running twice?"

---

# Most effects shouldn't be effects

<v-clicks>

- **Derived from state or props?** Compute it on render.
- **Triggered by a user action?** It's an event handler.
- **One-time setup?** An initializer, or module scope.

</v-clicks>

<v-click>

What's left: synchronizing with something **outside** the component — the DOM, a socket, a third-party widget.

</v-click>

---

# Synchronizing isn't free

- Effects run _after_ the render that triggered them — cascades become double renders
- Cleanup isn't optional; missing it means leaks and stale callbacks
- Async effects race — the last `await` to resolve wins, not the latest call
- The dependency list is a contract you maintain by hand

---
layout: two-cols-header
---

# Angular: Subscriptions that won't die

A hook for setup, another for teardown, and a field to remember which.

::left::

#### Before

```ts
@Component({ ... })
export class ProfileComponent
  implements OnInit, OnDestroy {
  userName = '';
  private sub?: Subscription;

  ngOnInit() {
    this.sub = this.userService.user$
      .subscribe(u => this.userName = u?.name ?? '');
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
```

::right::

<v-click>

#### After

```ts
@Component({ ... })
export class ProfileComponent {
  private user = toSignal(this.userService.user$);
  userName = computed(() => this.user()?.name ?? '');
}
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

# React: useEffect to sync state with itself

Two pieces of state, an effect to keep them aligned, and a stale render between every change.

::left::

#### Before

```tsx
const [items, setItems] = useState<Item[]>([]);
const [query, setQuery] = useState('');
const [filtered, setFiltered] = useState<Item[]>([]);

useEffect(() => {
  setFiltered(
    items.filter(i => i.name.includes(query))
  );
}, [items, query]);

return <List items={filtered} />;
```

::right::

<v-click>

#### After

```tsx
const [items, setItems] = useState<Item[]>([]);
const [query, setQuery] = useState('');

const filtered = items.filter(i =>
  i.name.includes(query)
);

return <List items={filtered} />;
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

# What an effect is _for_

<v-clicks>

1. Talking to something the framework doesn't own — DOM, sockets, timers
2. Side effects you genuinely can't undo on render — analytics, logging
3. Bridging external state in, and cleaning up on the way out

</v-clicks>

<v-click>

If the body of your effect looks like a calculation, it probably is one.

</v-click>
