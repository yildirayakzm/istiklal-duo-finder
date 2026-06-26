# Design System Specification: High-End Gaming Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Neon Nexus."** 

We are moving away from the cluttered, "box-in-a-box" aesthetics common in low-tier gaming dashboards. Instead, we are building a premium, cinematic experience that feels like a high-end command center. This system prioritizes **intentional depth and atmospheric lighting** over rigid structural lines. 

To achieve a signature look, we employ **Dynamic Asymmetry**: while the core navigation remains predictable, content cards and hero sections utilize varying heights and subtle overlapping to break the "standard grid" monotony. By treating the UI as a series of translucent layers suspended in a deep-space environment, we create a professional yet unmistakably "gamer" digital landscape.

---

## 2. Color & Atmospheric Theory

The palette is rooted in the void—`background (#0d0d17)`—but find its soul in the interplay of neon luminance and atmospheric haze.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. They create visual noise and cheapen the "Cyberpunk" aesthetic. Boundaries must be defined through:
*   **Tonal Shifts:** Placing a `surface_container_low` section against the main `background`.
*   **Luminous Transitions:** Using soft, edge-lit glows (10-15% opacity of `primary`) to imply the start of a new module.

### Surface Hierarchy & Nesting
Treat the interface as a physical stack of frosted obsidian.
*   **Lowest Layer:** `surface_container_lowest` (#000000) for deep-set, recessed areas like search bars or input tracks.
*   **Base:** `surface` (#0d0d17) for the primary application canvas.
*   **Elevated Modules:** `surface_container` (#181825) for primary cards and content zones.
*   **Floating Elements:** `surface_bright` (#2b2b3b) for tooltips, modals, and active states.

### The Glass & Gradient Rule
To move beyond a flat appearance, use **Glassmorphism** for persistent elements like sidebars or floating action buttons.
*   **Glass Recipe:** `surface_variant` at 60% opacity + `backdrop-blur: 24px`.
*   **Signature Textures:** Apply a linear gradient from `secondary_dim` (#b122fd) to `primary_dim` (#00e2ee) at a 45-degree angle for hero typography highlights and "Pro" status badges to provide a shimmering, high-polish finish.

---

## 3. Typography Scale

We utilize **Inter** for its mathematical precision and high-readability in low-light environments. The hierarchy is designed for an editorial impact, using extreme contrast between Display and Body sizes.

*   **Display (lg/md):** Reserved for "Welcome" messages and major achievement headlines. Tracking should be set to `-0.02em` to feel tighter and more authoritative.
*   **Headline (sm/md):** Used for section titles. Pair these with a `secondary` color highlight on the most important word to draw the eye.
*   **Title (sm/md/lg):** Used for card titles. Always use `on_surface` (high contrast) to ensure game titles or usernames pop.
*   **Body (sm/md/lg):** Use `on_surface_variant` (#aca9b8) for descriptions. This slightly reduced contrast prevents eye strain during long gaming sessions.
*   **Labels:** Always uppercase with `+0.05em` letter spacing to signify metadata (e.g., "MATCH FOUND," "LEVEL 50").

---

## 4. Elevation & Depth: Tonal Layering

This system rejects the "Drop Shadow" in favor of **Ambient Luminescence.**

*   **The Layering Principle:** Depth is achieved by "stacking" the surface-container tiers. For example, a `surface_container_highest` (#252433) card sitting on a `surface` background creates a natural, soft lift.
*   **Ambient Shadows:** When a float is required (e.g., a modal), use a massive blur (40px+) with low opacity (8%) using a tinted shadow: `rgba(0, 242, 255, 0.08)`. This mimics the glow of a neon sign against a dark wall.
*   **The "Ghost Border":** For card accessibility, use a 1px border of `outline_variant` (#474753) at **20% opacity**. It should be felt, not seen.
*   **Inner Glows:** To emphasize "Gamer" premium feel, active cards should have an `inner-shadow` (1px) using the `primary` token at 15% opacity on the top-left edge.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary_container` (#00f1fe) with `on_primary` (#005f64) text. 
    *   *Hover State:* Add a `0 0 20px` outer glow using `primary`.
*   **Secondary:** Ghost style. `outline` border with `secondary` text. 
    *   *Hover State:* Fill with `secondary_container` at 10% opacity.
*   **Corner Radius:** Use `md` (0.75rem) for a modern, approachable feel that isn't too "boxy."

### Cards & Content
*   **Forbid Divider Lines:** Use `1.5rem` (xl spacing) or a subtle shift from `surface_container` to `surface_container_high` to separate content blocks.
*   **Gamer Badges:** Use `full` (9999px) rounding. Apply a `secondary_dim` background with a subtle pulse animation for "Live" states.

### Input Fields
*   **State:** The container should be `surface_container_lowest` (total black). 
*   **Focus:** Transition the "Ghost Border" from 20% opacity to 100% `primary` (#99f7ff) with a soft 4px outer glow.

### Additional Signature Components:
*   **Luminance Progress Bars:** Instead of flat bars, use a gradient from `primary` to `secondary` with a "trailing" glow effect at the tip of the progress indicator.
*   **Blur-Back Modals:** When a modal is active, the background should not just darken, but blur significantly (`20px`) to focus the user entirely on the action.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts (e.g., a large 2/3 width card next to two 1/3 stacked cards) to create visual interest.
*   **Do** use `primary` and `secondary` colors for "moments of delight"—hovering over a game card, leveling up, or receiving a notification.
*   **Do** utilize large amounts of negative space (spacing scale `xl` and `2xl`) to maintain a "Professional" and "Clean" look despite the cyberpunk colors.

### Don't:
*   **Don't** use pure white (#FFFFFF) for text. Always use `on_background` (#e6e3f3) to avoid "vibrating" against the dark background.
*   **Don't** use sharp 0px corners. This breaks the "High-End" feel; stick to the `md` and `lg` rounding scale.
*   **Don't** stack more than three levels of surface depth. Beyond three layers, the UI becomes heavy and loses its "floating glass" quality.
*   **Don't** use 100% opaque borders. If you can clearly see the line from a distance, it is too heavy.