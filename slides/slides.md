---
theme: default
title: "Architecture Sins in Modern Frontend Apps"
info: |
  ## iJS 2026 Fullstack Day
  Architecture – React & Angular
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
mdc: true
colorSchema: light
themeConfig:
  primary: '#2D6CC7'
---

# Architecture Sins in Modern Frontend Apps

## When Best Intentions Meet Reality

Hannah Ebert & Florian Sowade

<div class="pt-12">
  <span class="text-gray-400">iJS 2026 – Fullstack Day</span>
</div>

---

# Hannah Ebert

**Software Architect · adesso SE**

<br/>

- Fokus auf Softwarearchitektur & Qualität
- Fullstack-Entwicklung & Developer Experience
- AI-gestützte Entwicklung

<br/>

> „Erst verstehen. Dann automatisieren."

---

# Florian Sowade

<!-- TODO: bio -->

---

# Agenda

<v-clicks>

1. The Promise vs. The Reality
2. The God Component & Component Architecture
3. State Management Gone Wrong
4. useEffect / Lifecycle Spaghetti
5. Error Handling & Loading States
6. Forms
7. Over-Engineering
8. Wrap-Up & Takeaways

</v-clicks>

---
layout: section
---

# Part 1: The Promise vs. The Reality

_Hannah & Florian_

---

# It Always Starts Clean...

<v-clicks>

- The greenfield project dream
- "This time we'll do it right"
- How architecture erodes over time

</v-clicks>

---

# ...Then Reality Hits

- Feature pressure, deadlines, team changes
- The broken window effect: starts clean, then nobody cares
- The gap between diagrams and production code

---

# Menti: Who Are You?

<!-- TODO: Menti QR code / link -->
<!-- Poll: Who does Angular? Who does React? Who does both? -->
<!-- Use results to calibrate depth per framework in the rest of the talk -->

---
layout: section
---

# Part 2: The God Component & Component Architecture

---

# Angular: The Kitchen-Sink Component

_Hannah_

<!-- TODO: code example of a bloated Angular component -->

---

# React: The 2,000-Line Component

_Florian_

<!-- TODO: code example of a bloated React component -->

---

# How to Spot It & How to Fix It

- Signs you have a God Component
- Extraction strategies
- When to split vs. when it's fine

---

# Prop Drilling & Prop Explosion

- Passing props through 5 layers just to reach a leaf
- The 45-props Button component
- When to reach for context / DI instead

<!-- TODO: examples in both frameworks -->

---

# Business Logic in Templates

- Calculations and conditions directly in JSX / Angular templates
- Why it's hard to test and easy to miss
- Extract into hooks / services / pipes

<!-- TODO: examples in both frameworks -->

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

---
layout: section
---

# Part 5: Error Handling & Loading States

---

# The Endless Spinner

- When a request fails but the UI just... spins
- Missing error boundaries (React) / error handling (Angular)

---

# Angular: Error Interceptors & RxJS Error Handling

_Hannah_

<!-- TODO: examples -->

---

# React: Error Boundaries & Suspense

_Florian_

<!-- TODO: examples -->

---

# Patterns That Actually Work

- Optimistic UI, retry, fallback states
- Making errors visible, not silent

---
layout: section
---

# Part 6: Forms

---

# Controlled vs. Uncontrolled – Pick One

- Mixing controlled and uncontrolled inputs in the same form
- React: useState for some fields, refs for others, FormData for a third
- Angular: mixing template-driven and reactive forms in one component

<!-- TODO: examples of the mismatch and a clean approach -->

---
layout: section
---

# Part 7: Over-Engineering

---

# YAGNI in Practice

- Premature abstractions
- "Enterprise" patterns in a 3-page app
- Config-driven everything

---

# Angular: Layers of Indirection

_Hannah_

<!-- TODO: examples -->

---

# React: Wrapper Components & HOC Pyramids

_Florian_

<!-- TODO: examples -->

---

# The Simplicity Principle

- The right amount of architecture for the problem size
- Refactor when you need it, not before

---
layout: section
---

# Part 8: Wrap-Up & Takeaways

_Hannah & Florian_

---

# Key Takeaways

1. Start simple, refactor when pain is real
2. State belongs where it's used
3. Side effects: derive, don't sync
4. Make errors visible
5. Architecture should serve the team, not the other way around

---
layout: center
---

# Thank You!

Hannah Ebert & Florian Sowade

<div class="pt-4 text-gray-400">
  Questions?
</div>
