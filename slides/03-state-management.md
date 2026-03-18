---
layout: section
---

# Part 3: State Management Gone Wrong

---

# State Management: You Already Have It

- You're doing state management whether you plan for it or not
- Better to be intentional than to let it happen by accident
- The Facebook Messages bug: same state duplicated across the app, going out of sync

---

# Derived State Is a Trap

- Storing values that could be computed
- Two sources of truth that inevitably diverge
- Derive, don't duplicate

---

# Angular: Service Spaghetti & NgRx Overuse

_Hannah_

- Services doing too much
- NgRx for everything
- When Signals or simple BehaviorSubjects suffice

<!-- TODO: before/after code examples -->

---

# React: Over-Engineered State

_Florian_

- Reaching for Redux/Zustand when useState is enough
- Global state for local concerns
- Prop drilling panic

<!-- TODO: before/after code examples -->

---

# The Right Level of State

- Local vs. shared vs. global – a decision framework
- Server state vs. client state
