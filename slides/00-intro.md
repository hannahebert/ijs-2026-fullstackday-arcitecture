# Architecture Sins in Modern Frontend Apps

## When Best Intentions Meet Reality

Hannah Ebert & Florian Sowade

<div class="pt-12">
  <span class="text-gray-400">iJS 2026 – Fullstack Day</span>
</div>

---

# Hannah Ebert

<p class="speaker-role">Software Architect · adesso SE</p>

<div class="speaker-grid">
  <div class="speaker-card">
    <div class="speaker-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    </div>
    <div class="speaker-card-text">Software architecture & quality</div>
  </div>
  <div class="speaker-card">
    <div class="speaker-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    </div>
    <div class="speaker-card-text">Fullstack development & developer experience</div>
  </div>
  <div class="speaker-card">
    <div class="speaker-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>
      </svg>
    </div>
    <div class="speaker-card-text">AI-assisted development</div>
  </div>
</div>

> "Understand first. Automate later."

<style>
.slidev-layout { place-content: start; text-align: left; }
h1 { border-left: 5px solid #2D6CC7; padding-left: 1rem !important; margin-bottom: 0.4rem !important; }
.speaker-role { font-size: 1.1rem !important; color: #64748b; font-weight: 600; margin-top: 0 !important; margin-bottom: 1.5rem !important; line-height: 1.4 !important; }
.speaker-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
.speaker-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.2rem 1.3rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06); display: flex; flex-direction: column; gap: 0.65rem; }
.speaker-icon { width: 36px; height: 36px; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #2D6CC7; flex-shrink: 0; }
.speaker-card-text { font-size: 0.9rem !important; color: #1e293b; line-height: 1.4 !important; font-weight: 500; }
</style>

---

# Florian Sowade

<p class="speaker-role">Co-Founder · Suora</p>

<div class="speaker-grid">
  <div class="speaker-card">
    <div class="speaker-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>
      </svg>
    </div>
    <div class="speaker-card-text">Building frontend applications since 2007</div>
  </div>
  <div class="speaker-card">
    <div class="speaker-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
      </svg>
    </div>
    <div class="speaker-card-text">Frontend architecture & React</div>
  </div>
  <div class="speaker-card">
    <div class="speaker-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    </div>
    <div class="speaker-card-text">Agile processes & team collaboration</div>
  </div>
</div>

> "The best architecture is the one your team can change."

<style>
.slidev-layout { place-content: start; text-align: left; }
h1 { border-left: 5px solid #2D6CC7; padding-left: 1rem !important; margin-bottom: 0.4rem !important; }
.speaker-role { font-size: 1.1rem !important; color: #64748b; font-weight: 600; margin-top: 0 !important; margin-bottom: 1.5rem !important; line-height: 1.4 !important; }
.speaker-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
.speaker-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.2rem 1.3rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06); display: flex; flex-direction: column; gap: 0.65rem; }
.speaker-icon { width: 36px; height: 36px; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #2D6CC7; flex-shrink: 0; }
.speaker-card-text { font-size: 0.9rem !important; color: #1e293b; line-height: 1.4 !important; font-weight: 500; }
</style>
