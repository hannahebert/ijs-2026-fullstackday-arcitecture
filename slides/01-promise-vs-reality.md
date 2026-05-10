---
layout: section
---

# Part 1: The Promise vs. The Reality

---
layout: center
---

# Every legacy codebase started as a greenfield project.

<!--
- Normalize: not "those teams", everyone ends up here
- Day 1 clean → 2 years, 30 devs, "temporary" hacks
- Default trajectory, not rare outcome
-->

---
layout: center
---

# It's not your fault.

<!--
- Causes are structural: pressure, deadlines, turnover, frameworks shifting
- Broken windows = system property, not character flaw
- Warm tone, mean it — not handwave absolution
-->

---
layout: center
---

# You can get out.

<!--
- Mess is reversible — not terminal
- "Clean" = verb, ongoing discipline
- Small steps compound, no rewrite needed
-->

---
layout: center
---

# But wait —
# my AI writes the code.

<div class="pt-8 text-gray-400">So why are you here?</div>

<!--
- Hands up: who's using Cursor / Copilot / Claude daily?
-->

---
layout: center
---

# AI doesn't decide architecture.
# It amplifies yours.

---

# Same sins. New speed.

<v-clicks>

| Sin               | AI makes it worse           | Skill to keep         |
| ----------------- | --------------------------- | --------------------- |
| God Component     | Lands in the biggest file   | Define seams first    |
| State             | Sees the snippet, not store | Explicit ownership    |
| useEffect         | Mirrors patterns nearby     | Derive, don't sync    |
| Errors            | Skips the edges             | Errors as contract    |
| Over-engineering  | Enterprise for a TODO app   | Match complexity      |

</v-clicks>

<style>
.slidev-layout table {
  font-size: 1.4rem !important;
  margin-top: 0.5rem !important;
}
.slidev-layout th,
.slidev-layout td {
  padding: 0.4rem 0.8rem !important;
  line-height: 1.3 !important;
}
.slidev-layout h1 {
  margin-bottom: 1rem !important;
}
</style>

---
layout: center
---

# The new superpower:
# knowing when the output is wrong — and why.

<div class="pt-6 text-gray-400">…which is the rest of this talk.</div>

---

# Menti: Who Are You?

1. **Which framework do you use day-to-day?**
   Angular · React · Something else *(multi-select)*

2. **Which framework do you want us to go deeper on?**
   Angular · React *(pick one)*

3. **How happy are you with your app's architecture?**
   1 — 5

4. **What's your biggest architectural pain right now?** *(optional, free text)*

<!--
- TODO: replace with Menti QR code once questions are set up in Menti
- Q4 feeds the wrap-up: scan responses during a break, pick 1–2 recurring themes to address before takeaways
-->
