# Fixes

---

## Dart Sass Deprecation: Division Operator (`/`)

**Date:** 2026-06-18

Dart Sass deprecated the use of `/` as a division operator outside of `calc()`. In Dart Sass 2.0.0 it will be removed entirely. Two files were updated to use the modern `math.div()` function instead.

### `projects/go-lib/styles/_variables.scss`

**What changed:**
- Added `@use 'sass:math';` at the top of the file.
- Replaced `$column-gutter / 2` with `math.div($column-gutter, 2)`.
- Replaced `$column-gutter / 4` with `math.div($column-gutter, 4)`.
- Replaced all fraction literals in the `$column-sizes` map (e.g. `1 / 5`, `2 / 3`) with `math.div()` equivalents.

**Why:**
This file is the central variables stylesheet imported across the entire library. Every component that imported it was inheriting the deprecation warnings, causing a flood of repeated warnings on every `ng serve` or `ng build`. Fixing the source eliminated the warnings project-wide.

### `projects/go-lib/src/lib/components/go-action-sheet/go-action-sheet.component.scss`

**What changed:**
- Added `@use 'sass:math';` at the top of the file.
- Replaced `(($as-before-box-diag-width + $as-before-box-half-width) / 2)` with `math.div($as-before-box-diag-width + $as-before-box-half-width, 2)`.

**Why:**
This component had its own inline division for a margin calculation that was not covered by the variables fix. It was the one remaining deprecation warning after the variables file was updated.

---

## `go-button` Disabled State Overhaul

**Date:** 2026-06-18  
**File:** `projects/go-lib/src/lib/components/go-button/go-button.component.scss`

Five iterative fixes were made to bring the disabled button states into a consistent, visually correct shape across primary, secondary, and split-button variants.

### 1. Normalize disabled state opacity to 0.65 + fix secondary border

**What changed:**
- `disabled-states` mixin: raised background and text opacity from `0.4` → `0.65`.
- Primary disabled button: removed the redundant `border` (the filled background already provides visual weight, a border at the same color adds nothing).
- Secondary disabled button: changed border from a solid full-opacity `$base-light-tertiary` to `rgba($base-light-tertiary, 0.65)` so it fades in sync with the rest of the disabled state.
- Split secondary disabled button: same border fix applied.

**Why:**
`0.4` opacity was too heavy — the button appeared nearly invisible. `0.65` is the Bootstrap-standard for disabled states and provides a clear but not jarring visual downgrade. The secondary border staying full-opacity at `0.4` overall opacity looked inconsistent.

### 2. Set secondary button font color to `$gray-600`

**What changed:**
- Added `color: $gray-600` to `.go-button--secondary`.

**Why:**
The secondary button had no explicit font color, so it inherited the page default (near-black). `$gray-600` matches the border color and gives it a softer, secondary-action feel consistent with the design system.

### 3. Use solid background on disabled secondary button

**What changed:**
- Added explicit `background: $theme-light-bg-active` on the disabled and disabled-hover/focus states of the secondary button.

**Why:**
The `disabled-states` mixin applies `rgba($bg, 0.65)` to the background. For secondary buttons the background is near-white (`$theme-light-bg-active`), so `rgba(near-white, 0.65)` on a white page was effectively invisible — the button appeared to disappear. A solid, full-opacity background makes the disabled state visually apparent.

### 4. Disabled secondary — fade border and font, leave background unchanged

**What changed:**
- Removed the `disabled-states` mixin call and the solid background override from the secondary disabled state.
- Applied only `color: rgba($gray-600, 0.65)` and `border: 1px solid rgba($base-light-tertiary, 0.65)` directly.

**Why:**
After step 3 it became clear the mixin was fighting the secondary button's design: secondary buttons intentionally have a transparent/white background, and the mixin was forcing a tinted fill. The correct approach is to leave the background alone and only fade the border and text, which communicates "disabled" without changing the button's fundamental appearance.

### 5. Disable hover on disabled buttons, preserve `not-allowed` cursor

**What changed:**
- Added `pointer-events: none` to `.go-button:disabled` and `.split-button:disabled`.
- Added `cursor: not-allowed` to `.go-button-container:has(> button:disabled)`.

**Why:**
`pointer-events: none` prevents any hover or focus styles from firing on a disabled button, so the button truly looks inert on mouse-over. However, `pointer-events: none` also suppresses the cursor change — the `not-allowed` cursor was lost. Moving the cursor rule up to the container (which still receives pointer events) restores it via the `:has()` selector, giving users the correct feedback without re-enabling interactions on the button itself.
