---
layout: section
---

# Part 2: The God Component & Component Architecture

Why your biggest component keeps getting bigger

---
layout: statement
---

# Demo time

---

# When to suspect a God Component

- The line count keeps creeping up
- It shows up in nearly every PR
- More pieces of state than the UI seems to need
- It's the file where all the merge conflicts land

---

# Where to cut first

- Pull out what you can _see_ (rows, cards, panels)
- Then what _behaves_ together (filters, forms)
- Save the data/fetch layer for later — it's the hardest seam

---

# When to leave it alone

- Long isn't bad if it's coherent
- A child with 10 props is a worse smell
- Don't refactor for use cases that don't exist yet

---

# Business logic in templates

If a calculation, decision, or format rule lives _only_ inside a render block, you can't:

- **test it** without rendering the component
- **grep for it** when the rule changes
- **reuse it** anywhere else

Lift it out. Plain function, util, pipe, hook — anything outside the markup.
