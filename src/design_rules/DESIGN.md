```markdown
# Design System Strategy: The Curated Workspace

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Atelier."** 

We are moving away from the rigid, boxy constraints of traditional corporate job boards. Instead, we treat the discovery of a career as an editorial experience—professional, yet agile and airy. The goal is to break the "template" look common in recruitment software by utilizing intentional asymmetry, overlapping layers, and high-contrast typography scales. We lean into the "startup agility" through fluid layouts and "LinkedIn professionalism" through a sophisticated, restrained color palette.

By utilizing substantial whitespace (the "breathing room" principle) and soft, tonal layering, we create a dashboard that feels less like a data-heavy chore and more like a high-end personal concierge.

---

## 2. Colors & Surface Architecture
Our palette is rooted in a deep, authoritative `primary` blue (#0032b5), balanced by a sophisticated spectrum of neutral surfaces that provide depth without visual noise.

### The "No-Line" Rule
To achieve a premium, modern aesthetic, **1px solid borders are prohibited for sectioning.** Boundaries must be defined through background color shifts. For example:
*   A sidebar should be `surface-container-low`.
*   The main feed should be `surface`.
*   Floating cards should be `surface-container-lowest`.
This creates a seamless, "molded" look rather than a fragmented one.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine paper. 
*   **Base:** `surface` (#f7f9fb)
*   **Structural Sections:** `surface-container` (#eceef0)
*   **Interactive Cards:** `surface-container-lowest` (#ffffff)
*   **Overlays/Modals:** Semi-transparent `surface-container-highest` with a `backdrop-blur` of 20px.

### The "Glass & Gradient" Rule
To inject "soul" into the tech-forward aesthetic:
*   **CTAs:** Use a subtle linear gradient from `primary` (#0032b5) to `primary_container` (#0344ec) at a 135-degree angle.
*   **Elevated Elements:** Use Glassmorphism for floating navigation or filter bars. Apply `surface_container_lowest` at 80% opacity with a high blur to allow the brand colors to bleed through softly.

---

## 3. Typography: Editorial Authority
We utilize a dual-font system to balance "Discovery" (Editorial) with "Utility" (Interface).

*   **Display & Headlines (Manrope):** Use Manrope for all `display` and `headline` roles. Its geometric yet warm curves provide the "friendly feel" requested. Use `headline-lg` (2rem) for page titles to create a strong vertical anchor.
*   **Body & UI (Inter):** Inter is our workhorse. It is engineered for readability in data-heavy dashboards. Use `body-md` (0.875rem) for the majority of secondary data to keep the interface feeling light and accessible.
*   **Hierarchy Tip:** Always pair a `display-sm` headline with a `body-lg` subheader. The high contrast in size (2.25rem vs 1rem) creates an immediate sense of "High-End Editorial" importance.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often a crutch for poor spacing. In this system, depth is achieved through **Tonal Layering.**

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on a `surface-container-low` background. The subtle shift from white to off-white creates a soft, natural lift.
*   **Ambient Shadows:** For high-priority elements (e.g., "Apply Now" buttons or active Modals), use an ultra-diffused shadow.
    *   *Spec:* `0px 20px 40px rgba(25, 28, 30, 0.06)` (A tinted version of `on-surface`).
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in input fields, use `outline-variant` at 20% opacity. Never use 100% opaque borders.
*   **Roundedness:** Use the `xl` scale (1.5rem) for large containers and `md` (0.75rem) for buttons. This "friendly" curvature softens the professional blue, making the platform feel approachable to students.

---

## 5. Components

### Buttons: The Tactile Primary
*   **Primary:** Gradient-fill (`primary` to `primary_container`), `md` (0.75rem) corner radius. Use `primary_fixed` for hover states to create a "glow" effect.
*   **Secondary:** No background, `outline` at 20% opacity. On hover, shift background to `primary_fixed`.
*   **Tertiary:** Text-only in `primary`. For use in low-emphasis actions like "Cancel" or "Skip."

### Cards: The Content Vessel
*   **Rule:** Forbid divider lines within cards. 
*   **Structure:** Use `spacing-6` (2rem) internal padding. Separate the job title from the company description using a background shift to `surface-container-low` for the metadata footer.

### Input Fields: Clean & Minimal
*   **Default:** `surface-container-lowest` background with a `Ghost Border`.
*   **Focus:** Transition the border to 100% `primary` opacity and add a subtle `primary_fixed` outer glow (4px).

### Chips: Discovery Tags
*   Use `secondary_container` (#c9cffd) with `on_secondary_container` (#51577f) text. These should be pill-shaped (`full` roundedness) to contrast against the more structured rectangular cards.

### Dashboard-Specific Components
*   **Progress Rings:** Use `tertiary` (#6c3400) for application status trackers to provide a warm, distinct contrast to the dominant blue.
*   **Insight Banners:** Use `surface_variant` with a `primary` left-accent bar (4px width) to highlight "Recommended for you" sections.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use `spacing-12` (4rem) or more between major vertical sections to allow the eye to rest.
*   **Do** use `on_surface_variant` (#454652) for secondary text (timestamps, location) to create a clear visual hierarchy.
*   **Do** lean into asymmetry—try aligning a headline to the left while the primary action is staggered to the right.

### Don’t:
*   **Don’t** use black (#000000). Always use `on_background` (#191c1e) for text to maintain a premium, softened feel.
*   **Don’t** use dividers or horizontal rules. Use a `spacing-4` (1.4rem) gap or a background color change instead.
*   **Don’t** stack more than three levels of surface nesting (e.g., Surface > Container > Card). Any more will lead to visual clutter.

---

*This design system is designed to grow. When in doubt, prioritize whitespace over information density. Professionalism is not about how much data you can show, but how clearly you can present the right data.*```