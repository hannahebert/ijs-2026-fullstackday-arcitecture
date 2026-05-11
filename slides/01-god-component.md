---
layout: section
---

# The God Component & Component Architecture

Why we shouldn't dump everything into one compoment.

---

# Problems a God Component creates

<div class="card-grid">
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>
      </svg>
    </div>
    <div class="card-title">Untestability</div>
    <div class="card-desc">You can't just unit-test one concern</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>
      </svg>
    </div>
    <div class="card-title">Merge Conflicts</div>
    <div class="card-desc">Every feature touches the same file; PRs block each other</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 17H7A5 5 0 0 1 7 7"/><path d="M15 7h2a5 5 0 0 1 4 8"/><line x1="8" x2="12" y1="12" y2="12"/><line x1="2" x2="22" y1="2" y2="22"/>
      </svg>
    </div>
    <div class="card-title">Hidden Coupling</div>
    <div class="card-desc">A filter change accidentally breaks the edit form</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>
      </svg>
    </div>
    <div class="card-title">Slow Builds & Re-renders</div>
    <div class="card-desc">One state change triggers the whole tree</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
      </svg>
    </div>
    <div class="card-title">Onboarding Tax</div>
    <div class="card-desc">New team members need to understand 500 lines before touching anything</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    </div>
    <div class="card-title">Impossible Reuse</div>
    <div class="card-desc">The fetch logic, filter logic, and UI are fused together forever</div>
  </div>
</div>

---

# When to leave it alone

<div class="card-grid">
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>
      </svg>
    </div>
    <div class="card-title">Size isn't the only indicator</div>
    <div class="card-desc">Long isn't always bad if it's coherent</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>
      </svg>
    </div>
    <div class="card-title">Watch the props</div>
    <div class="card-desc">A child with 10 props is a worse smell than a large component</div>
  </div>
  <div class="card">
    <div class="card-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>
      </svg>
    </div>
    <div class="card-title">Skip the hypothetical</div>
    <div class="card-desc">Don't refactor for use cases that might never exist</div>
  </div>
</div>

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
