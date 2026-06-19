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

**Background — the `disabled-states` mixin:**
`disabled-states($bg, $color, $color-opacity)` is a private mixin defined at the top of `go-button.component.scss`. It sets the background and text color for any disabled button variant by wrapping the passed-in color in `rgba()`. Every disabled state across primary, negative, neutral, and split buttons calls this mixin — so the opacity value here affects all of them.

**What changed:**
- `disabled-states` mixin: raised background and text opacity from `0.4` → `0.65` — applied to both the `background: rgba($bg, ...)` and the `color: rgba($theme-light-color, ...)` lines inside the mixin.
- Primary disabled button: removed the redundant `border` (the filled background already provides visual weight, a border at the same color adds nothing).
- Secondary disabled button: changed border from a solid full-opacity `$base-light-tertiary` to `rgba($base-light-tertiary, 0.65)` so it fades in sync with the rest of the disabled state.
- Split secondary disabled button: same border fix applied.

**Why:**
`0.4` opacity was too heavy — the button appeared nearly invisible. `0.65` is the Bootstrap-standard for disabled states and provides a clear but not jarring visual downgrade. Because the mixin is shared, raising the opacity improved consistency across all button variants at once. The secondary border staying full-opacity while everything else faded to `0.4` looked inconsistent.

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

---

## `go-off-canvas` Form Label Padding

**Date:** 2026-06-18  
**File:** `projects/go-lib/src/lib/components/go-off-canvas/go-off-canvas.component.scss`

### Fix excessive label padding and broken `:first-child` override

**What changed:**
- `padding-bottom`: `1rem` → `.25rem` (label to input gap).
- `padding-top`: `1rem` → `.75rem` (spacing above each label / row separation).
- `:first-child { padding-top }`: `1 rem` (invalid — space between value and unit made this a no-op) → `0` (correctly removes the leading gap above the first field).

**Why:**
The `::ng-deep` block inside `.go-off-canvas` was overriding `.go-form__label` padding to create spacing between rows and between labels and their inputs. Both values were set to `$column-gutter` (1rem), which was far too large — the default in `_forms.scss` is `.375rem`. The `:first-child` rule meant to suppress the top gap on the first field was silently ignored due to the `1 rem` typo, so every label including the first got the full 1rem top padding, compounding the problem.

---

## Standards > Forms Page Merged into UI Kit > Forms Overview

**Date:** 2026-06-18  
**Files changed:**
- `projects/go-style-guide/src/app/features/standards/components/forms/` — **deleted**
- `projects/go-style-guide/src/app/features/standards/routes/standards-routing.module.ts`
- `projects/go-style-guide/src/app/features/standards/standards.module.ts`
- `projects/go-style-guide/src/app/app.component.ts`
- `projects/go-style-guide/src/app/features/ui-kit/components/layout-docs/components/layout-nav/layout-nav.component.ts`
- `projects/go-style-guide/src/app/features/ui-kit/components/form-docs/components/forms-overview/forms-overview.component.html`
- `projects/go-style-guide/src/app/features/ui-kit/components/form-docs/components/forms-overview/forms-overview.component.ts`

### What changed

- **Deleted** `standards/components/forms/forms.component.html` and `forms.component.ts` entirely.
- **Routing:** Changed the `standards/forms` route from pointing to the now-deleted `FormsComponent` to a `redirectTo: 'ui-kit/forms'`, so any existing links or bookmarks continue to work.
- **Left nav:** Removed the duplicate "Forms" link from the Standards nav group in `app.component.ts`. Updated the example nav in `layout-nav.component.ts` to reference `ui-kit/forms` instead of `standards/forms`.
- **Module:** Removed `FormsComponent` from `StandardsModule` declarations and its import. `FormsModule` and `ReactiveFormsModule` were kept in `StandardsModule` because `GridComponent` uses `[formGroup]` and requires them.
- **Forms Overview content:** Merged the Standards Forms page content (CSS class reference, design principles) into the existing UI Kit > Forms Overview page. The original two-column (live demo + code) layout of the Forms Overview was retained. A "Form Design Principles" card and a "CSS Class Reference" section with Basic Form, Form Hints, Text Input Modifiers, Select Box Modifiers, Checkbox Modifiers, Radio Modifiers, and Dark Forms card pairs were added.

### Why

The Standards > Forms page documented CSS class patterns using raw HTML markup. The UI Kit > Forms Overview already covered the same forms topic from the Angular component perspective but lacked the CSS reference. Maintaining two separate pages for the same topic created confusion — particularly because the Standards page's raw markup demos were visually incorrect (wrong spacing, missing cursor states) compared to what the actual Angular components render. Consolidating into one page under UI Kit gives developers a single authoritative reference that covers both component usage and the underlying CSS, while the redirect ensures no existing links break.

---

## Forms Overview: Replace Raw Checkbox/Radio Markup with Angular Components

**Date:** 2026-06-18  
**Files:**
- `projects/go-style-guide/src/app/features/ui-kit/components/form-docs/components/forms-overview/forms-overview.component.html`
- `projects/go-style-guide/src/app/features/ui-kit/components/form-docs/components/forms-overview/forms-overview.component.ts`

### Replace raw HTML fieldset demos with `go-checkbox-group` / `go-radio-group`

**What changed:**
- Removed the raw `<input class="go-form__checkbox">` + sibling `<label>` pattern from the CSS Reference section's Checkbox & Radio demo.
- Replaced with actual `go-checkbox-group` / `go-checkbox` and `go-radio-group` / `go-radio-button` Angular components, showing default, disabled, error, and dark states for each.
- Added 8 `FormGroup`/`FormControl` properties to the component class for the CSS reference demos (`cssCheckboxDefault`, `cssCheckboxDisabled`, `cssCheckboxError`, `cssCheckboxDark`, `cssRadioDefault`, `cssRadioDisabled`, `cssRadioError`, `cssRadioDark`).
- Disabled states driven by calling `.disable()` on the control in the constructor; error states driven by `Validators.requiredTrue` / `Validators.required` + `markAsTouched()`.
- Updated the code snippet strings (`checkboxModifiers`, new `radioModifiers`) to show correct component markup instead of raw HTML.
- Split the combined "Checkbox & Radio Modifiers" card into two separate card pairs: **Checkbox Modifiers** (`id="css-checkbox-modifiers"`) and **Radio Modifiers** (`id="css-radio-modifiers"`), each with its own live demo and code block.

**Why:**
The raw markup used a sibling `input` + `label` pattern where the input is a visible browser-native checkbox placed before the label. The actual `go-checkbox` component hides the native input and uses an absolutely-positioned `<span>` as the visual indicator, wrapped inside the label. This DOM difference caused incorrect spacing between the checkbox and its label text in the live demo, misleading developers who referenced it as a CSS pattern guide. Using the real components ensures the live demo matches what developers will see when building with Goponents.

---

## `go-radio-button` Alignment Overhaul + Inline Spacing Fix

**Date:** 2026-06-18  
**Files:**
- `projects/go-lib/src/lib/components/go-radio/go-radio-button.component.html`
- `projects/go-lib/src/lib/components/go-radio/go-radio-button.component.scss`
- `projects/go-lib/styles/_forms.scss`

### Mirror checkbox pattern: hidden native input + custom indicator span

**What changed:**
- `go-radio-button.component.html`: Rewrote to mirror the checkbox pattern — native `<input type="radio">` hidden via `.go-radio__input` (opacity 0, absolute, zero width/height); added `<span class="go-radio__custom-indicator">` as the visual indicator; label element uses new `go-form__label--radio-container` modifier class.
- `go-radio-button.component.scss`: Rewrote to match checkbox SCSS structure — `.go-radio__input` hidden, `.go-radio__custom-indicator` absolutely positioned circle; sibling selectors (`~`) drive `:checked`, `:hover`, `:focus`, `:disabled`, `:disabled:checked` states for both light and dark themes.
- `_forms.scss`: Added `&--radio-container` modifier block (mirrors `--checkbox-container`) with `position: relative; padding-left: 1.25rem; line-height: 1.5; margin-right: 1rem; cursor: pointer; user-select: none`.

**Why:**
The original implementation rendered the native radio `<input>` inline before the label text, relying on `vertical-align` alignment. This approach was visually inconsistent with `go-checkbox` and produced misalignment between the control and its label text at standard font sizes. The checkbox pattern (absolutely positioned custom indicator inside a relatively positioned label with `padding-left` indent) is the correct approach used across the design system. The `margin-right: 1rem` on `--radio-container` prevents overlap when multiple `go-radio-button` elements appear side-by-side in the same container.

---

## `go-off-canvas` Submit Button Example: Missing Form Container Class

**Date:** 2026-06-18  
**File:** `projects/go-style-guide/src/app/features/ui-kit/components/basic-test-submit-button/basic-test-submit-button.component.html`

### Add `go-container--form` to match service example spacing

**What changed:**
- Changed `<div class="go-container go-container--reset">` to `<div class="go-container go-container--form go-container--reset">`.

**Why:**
The "Off Canvas With Submit Button" demo lacked `go-container--form`, which applies `padding: 0 .5rem 1rem` to each `.go-column` child. Without it, form rows had no bottom padding, making the spacing visibly different from the "Using the Off Canvas Service" example that did include `go-container--form`. Adding the class makes both examples visually consistent.
