# Design System Strategy: Neon-Kinetic Minimalism

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Archive."** 

We are moving away from the cluttered, "busy" aesthetic of 2010s gaming hubs and toward a high-end, editorial experience that feels like a premium digital collectible. The goal is to balance the raw energy of neon gaming culture with the sophisticated restraint of a luxury fashion house. 

We break the "template" look through **Intentional Brutalism**: 
*   **Absolute Sharpness:** A strict 0px radius policy across all components to convey precision and technical aggression.
*   **Asymmetrical Energy:** Heavy use of high-contrast typography scales where massive display heads dwarf utilitarian labels.
*   **Tonal Depth:** Utilizing deep, carbon-inspired blacks not as flat fills, but as layered voids that allow neon accents to "bleed" light into the UI.

## 2. Colors & Light Emittance
The palette is built on a foundation of "Void" (`#0b0e14`) with high-frequency light injections.

### The "No-Line" Rule
Sectioning must never be achieved with 1px solid borders. Boundaries are defined by shifting from `surface` to `surface-container-low` or `surface-container-high`. To separate a sidebar from a feed, use a 40px gutter of empty space or a subtle background shift—never a line.

### Surface Hierarchy & Nesting
Treat the UI as a high-tech console interface.
*   **Base Layer:** `surface` (`#0b0e14`) for the main canvas.
*   **Secondary Content:** `surface-container` (`#161a21`) for content groupings.
*   **Interactive Cards:** `surface-container-high` (`#1c2028`) to create a physical "lift" toward the user.

### The "Glass & Gradient" Rule
To prevent the UI from feeling static, use **Light Leaks**. 
*   **CTAs:** Buttons should use a linear gradient from `primary` (`#8eff71`) to `primary-container` (`#2ff801`) at a 135-degree angle.
*   **Glow States:** Floating elements (like active game cards) should utilize a `primary_dim` backdrop-blur of 20px at 10% opacity to simulate a neon hardware glow.

## 3. Typography: The Futuristic Editorial
We pair the technical precision of **Space Grotesk** with the humanistic clarity of **Manrope**.

*   **Display & Headlines (Space Grotesk):** These are your "Statement" pieces. Use `display-lg` (3.5rem) for hero titles. The wide apertures and geometric shapes of Space Grotesk communicate a "Future-Tech" vibe. All headlines should be set to -2% letter spacing for a tighter, more aggressive look.
*   **Body & Utility (Manrope):** All functional text, stats, and descriptions use Manrope. It provides a necessary "premium" breathing room against the loud headlines. 
*   **Visual Hierarchy:** Use `label-md` in `primary` (`#8eff71`) all-caps for categories (e.g., "LIVE NOW") to create a sharp contrast against `body-lg` white text.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are prohibited. Depth is achieved through **Luminance and Atmosphere.**

*   **The Layering Principle:** Instead of shadows, use "Stepped Luminance." An inner container must always be lighter than its parent container (e.g., a `surface-container-highest` card sitting on a `surface-container` background).
*   **Ambient Glows:** For floating "Premium" modals, use a shadow with a 60px blur, 0px offset, and 5% opacity, tinted with `secondary` (`#00eefc`). This creates a "hovering light" effect rather than a "heavy object" effect.
*   **The "Ghost Border" Fallback:** If a UI element (like a search bar) risks disappearing, use an `outline-variant` (`#45484f`) at 15% opacity. It should feel like a faint etch in metal, not a drawn line.

## 5. Components

### Buttons: The Power Cells
*   **Primary:** Sharp 0px corners. Fill: `primary`. Text: `on_primary_fixed` (Deep Green). On hover: Add a `primary` outer glow (8px blur, 30% opacity).
*   **Secondary:** Sharp 0px corners. Fill: Transparent. Border: 2px `secondary` (`#00eefc`). 
*   **States:** All transitions must be 150ms ease-out. No "soft" bounces; transitions should feel like a camera shutter.

### Cards & Game Stats
*   **No Dividers:** Separate "Likes" and "Comments" using `surface-container-highest` blocks with 12px gaps. 
*   **Interaction:** On hover, a card’s background should shift from `surface-container` to `surface-bright`.
*   **Custom Icons:** Use "Stroke-Only" icons with a 1.5pt weight. For game stats, the icons should be `secondary` (`#00eefc`) to pop against the dark backgrounds.

### Interactive Inputs
*   **Text Fields:** Use `surface-container-lowest` (pure black) for the input well. Upon focus, the bottom edge gains a 2px `primary` neon underline. 
*   **Chips:** Use for game genres (e.g., "FPS", "RPG"). Style them as `surface-variant` with `label-sm` text. No rounded corners.

### Custom Component: The "Pulse" Stat
For live viewer counts or active lobbies, use a `tertiary` (`#d674ff`) small square (4px) with a localized keyframe animation that pulses from 40% to 100% opacity, signaling "Live" energy.

## 6. Do’s and Don’ts

### Do:
*   **Embrace the Dark:** Allow large areas of `#0b0e14` to exist. Negative space in this system isn't "empty"; it's "the void" that makes the neon feel powerful.
*   **Use Mono-Spacing for Stats:** When displaying high-score numbers or player counts, use a monospaced variant of Space Grotesk to mimic a digital readout.
*   **Layer with Purpose:** Always check if a background color shift can solve a layout problem before reaching for a border or shadow.

### Don’t:
*   **No Rounding:** Never use a border-radius. Even a 2px radius breaks the "Technical Precision" of this system.
*   **No Muted Grays:** Avoid mid-tone grays. Use the specific `surface-container` tiers to ensure the "deep dark" energy is maintained.
*   **No Standard Blue:** Never use default browser blue. Use `secondary` (`#00eefc`) for all links and "Action" indicators.