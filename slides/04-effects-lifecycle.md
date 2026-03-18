---
layout: section
---

# Part 4: useEffect Spaghetti & Lifecycle Chaos

---

# Angular: Lifecycle Hook Overload

_Hannah_

- ngOnChanges / ngDoCheck abuse
- Manual subscriptions & teardown nightmares
- Zombie subscriptions
- The shift to Signals and computed()

<!-- TODO: code examples -->

---

# React: useEffect Hell

_Florian_

- Effects that should be event handlers
- Missing/wrong dependency arrays
- Cascading effects / circular state updates
- Zombie setState after unmount

<!-- TODO: code examples -->

---

# Principles for Clean Side Effects

- Derive, don't sync
- Colocate logic with its trigger
