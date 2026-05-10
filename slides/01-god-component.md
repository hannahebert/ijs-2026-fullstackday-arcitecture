---
layout: section
---

# The God Component & Component Architecture

Why we shouldn't dump everything into one compoment.

---

# Problems a God Component creates

<v-clicks>

- **Untestability** — you can't just unit-test one concern
- **Merge conflicts** — every feature touches the same file; PRs block each other
- **Hidden coupling** — a filter change accidentally breaks the edit form
- **Slow builds & re-renders** — one state change triggers the whole tree
- **Onboarding tax** — new team members need to understand 500 lines before touching anything
- **Impossible reuse** — the fetch logic, the filter logic, and the UI are fused together forever

</v-clicks>

---

# When to leave it alone

- Long isn't bad if it's coherent
- A child with 10 props is a worse smell than a large component
- Don't refactor for use cases that might never exist

---

# Refactoring manually — how to approach it

<v-clicks>

1. **Don't start at line 1** — read the whole file first, draw the concern boundaries
2. **Slice by state, not by lines** — which state variables belong together?
3. **Extract leaf components first** — pure display pieces with no side effects
4. **Move state to a service/ hook** — one extraction at a time, keep tests green
5. **Commit after each step** — small diffs are reversible; a 1000-line refactor is not
6. **Test after each extraction** — if it breaks now, you know exactly where

</v-clicks>

---

# Refactoring manually — how to approach it

<v-clicks class="mt-8">

- What you can *see* → child components
- What *behaves* together → custom hook / service
- What *fetches or persists* → data layer (last!)

> Start at the outside and work inward. The data layer is always the hardest seam.

</v-clicks>


---

# "Why bother — I have AI for that now."

<v-clicks>

- **Domain knowledge doesn't transfer automatically** — AI needs context via prompt, docs, or architecture notes
- **If you can't explain the split, Claude can't find it either** — garbage in, garbage out
- **A God Component refactored by AI without a clear seam is still a God Component** — just spread across more files

</v-clicks>

---

# Refactoring with AI

<v-clicks>

1. **Give context, not just the file** — Say what it does
2. **Ask for one extraction at a time** — "extract the filter state into a hook" beats "refactor this"
3. **Review the seams Claude draws** — check interfaces before accepting
4. **Run tests after each step** — don't let Claude accumulate ten changes before you verify (or let it verify)
5. **Ask for the *why*** — "explain what you changed and why" catches hidden assumptions

</v-clicks>

---

# Prompts that work well

<v-clicks class="mt-8">
```
"Identify the distinct concerns in this component.
Don't change any code yet — just list them."
```
<br>
```
"Extract only the filter state and logic into
a custom hook. Keep the component's API identical."
```
<br>
```
"What would the ideal folder structure look like
after a full refactor? Show me the file tree."
```

</v-clicks>

---

# Preventing God Components long-term

<v-clicks>

- **Add a linting rule** — `max-lines` in ESLint; it fails the pipeline, not just a PR comment (Pros and Cons)
- **Add/ Expand the rules for code reviews (i.e. in your skill.md)** 
- **Architect the folder structure first** — i.e. a clear `components/`, `hooks/`, `services/` split 
- **Write the test before the code** — if you can't unit-test it in isolation, the boundary is wrong

</v-clicks>
