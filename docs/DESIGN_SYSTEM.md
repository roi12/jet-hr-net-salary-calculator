# Jet HR Reference Design System

This document captures the visual language that can be inferred from the provided Jet HR references only:

- `public/brand/JetHR Logo Dark.svg`
- `public/brand/JetHR Logo White.svg`
- `public/brand/JetHR Pictogram Dark.svg`
- `public/brand/JetHR Pictogram White.svg`
- `references/jet-hr/screenshots/desktop/jethr-productimage-001-horizontal.jpg`
- `references/jet-hr/screenshots/desktop/jethr-productimage-002-horizontal.jpg`
- `references/jet-hr/screenshots/desktop/jethr-productimage-003-horizontal.jpg`
- `references/jet-hr/screenshots/desktop/jethr-productimage-004-horizontal.jpg`
- `references/jet-hr/screenshots/mobile/jethr-productimage-005-vertical.jpg`
- `references/jet-hr/screenshots/mobile/jethr-productimage-006-vertical.jpg`
- `references/jet-hr/screenshots/mobile/jethr-productimage-007-vertical.jpg`

The goal is not to recreate Jet HR exactly, but to build a prototype that feels visually consistent with those references while remaining clearly labeled as an unofficial Product Builder technical task.

## Confidence Legend

- `Directly observed`: visible repeatedly in the screenshots or encoded explicitly in the SVG assets.
- `Reasonable implementation decision`: not provable from the references, but a safe rule to preserve the same visual character.
- `Cannot be determined`: not reliably inferable and should not be invented as if it were part of the source system.

## Brand Scope

### Directly observed

- The Jet HR wordmark and pictogram use a very dark olive-black brand color: `#11150A`.
- The same assets also exist in white for use on dark backgrounds.
- The brand mark combines a rounded-square pictogram with a bold sans-serif wordmark.
- The product UI is minimal, light, and heavily card-based.

### Reasonable implementation decisions

- The prototype should use the Jet HR-inspired brand assets only for reference and framing, not to imply official ownership.
- Every implemented screen should include a visible note such as `Unofficial prototype for the Product Builder technical task`.

### Cannot be determined

- Official Jet HR brand usage rules, exclusion zones, minimum sizes, or tone-of-voice rules.

## Color System

### Primary, secondary, background, and semantic colors

### Directly observed

- Primary ink / brand dark: `#11150A` from the SVG assets.
- White is used as a core counter-color for cards, mobile surfaces, and inverse logo usage.
- A pale green outer background appears consistently behind the desktop and mobile device frames.
- A vivid yellow-lime accent is used for highlighted chips, chart bars, dots, counters, and selected calendar dates.
- Very light gray is used for table headers, inactive pills, borders, and input strokes.
- Positive states use green.
- Negative states use red.
- Neutral informational areas use gray rather than blue.

### Reasonable implementation decisions

- Use the following implementation palette, clearly marked as approximate where not taken from SVGs:
- `--color-ink: #11150A`
- `--color-surface: #FFFFFF`
- `--color-page-bg: #CFE7A8`
- `--color-surface-muted: #F3F4EF`
- `--color-border: #E4E6DE`
- `--color-accent: #E4F24A`
- `--color-accent-soft: #F1F7BF`
- `--color-text-muted: #6E7468`
- `--color-success: #6CCB5F`
- `--color-danger: #FF6B6B`
- `--color-warning: #E4F24A`

### Cannot be determined

- Exact hex values for the background green, lime accent, muted grays, success green, or danger red from the screenshots alone.
- A complete Jet HR semantic palette for hover, focus, disabled, charts, or data visualization beyond the examples shown.

## Typography Hierarchy

### Directly observed

- The interface uses a clean sans-serif typeface throughout.
- Large page titles are bold and prominent.
- Key numeric summaries are large and bold.
- Card titles are medium-to-bold and clearly separated from body text.
- Body text is compact and neutral.
- Secondary labels and metadata use smaller sizes and lower contrast.
- Table headers and input labels are smaller than primary content.

### Reasonable implementation decisions

- Use a modern sans-serif with neutral geometry and good readability.
- If an exact brand font is unavailable, use a restrained fallback such as `Manrope`, `Plus Jakarta Sans`, or a system sans only as fallback.
- Implement a compact hierarchy close to:
- `display / page title`: `48-56px` desktop, `34-40px` mobile, `700-800`
- `section title`: `28-32px` desktop, `24-28px` mobile, `700`
- `card title`: `18-24px`, `600-700`
- `body`: `14-16px`, `400-500`
- `meta / label / header`: `12-14px`, `500-600`
- Use tight but not cramped line-height, especially for headings and KPI values.

### Cannot be determined

- The exact font family.
- The exact type scale, line-height scale, or letter-spacing values.

## Spacing Scale

### Directly observed

- The UI uses generous outer padding on desktop and comfortable inner padding inside cards.
- Vertical rhythm is consistent across forms, tables, and dashboard cards.
- Repeated structures suggest a compact base spacing with larger jumps for cards and page sections.

### Reasonable implementation decisions

- Use an `8px` base spacing system.
- Recommended scale: `4, 8, 12, 16, 24, 32, 40, 48`.
- Use `16-24px` padding inside inputs and compact pills.
- Use `24-32px` padding inside cards.
- Use `32-48px` gaps between major content regions on desktop.
- Tighten to `16-24px` section gaps on mobile while keeping cards breathable.

### Cannot be determined

- Exact spacing tokens from the original product.

## Border Radius

### Directly observed

- Cards and panels use rounded corners.
- Buttons are rounded; some pills are strongly rounded.
- Inputs have softer radii than the large rounded pills.
- The overall product language avoids sharp corners.

### Reasonable implementation decisions

- Use a radius system such as:
- `8px` for small controls and tabs
- `12px` for inputs
- `16px` for cards
- `999px` for pills, chips, and prominent capsule actions

### Cannot be determined

- Exact border radius values for each component class.

## Borders and Shadows

### Directly observed

- Most surfaces rely on thin light borders rather than heavy shadows.
- Cards, table wrappers, and inputs use subtle outlines.
- Dark overlays and popovers can appear without visible blur-heavy elevation.
- Device mockups use strong outer framing, but that should not be treated as application UI.

### Reasonable implementation decisions

- Prefer `1px` borders in a warm light gray over box-shadow-heavy depth.
- Use very soft shadows only for transient elements such as floating popovers or elevated result panels.
- Keep the general product feel flat, clean, and controlled.

### Cannot be determined

- Any official elevation scale.

## Buttons and Input Fields

### Directly observed

- Primary buttons are dark, high-contrast, and full-width on mobile forms.
- Secondary or destructive actions can be outlined with colored text and borders.
- Inputs are rectangular with light borders and white backgrounds.
- Select inputs often include a leading icon or category token.
- Some selected states or alert states use the lime accent as a background highlight.
- Tab-like segmented controls appear in compact horizontal groups.

### Reasonable implementation decisions

- Primary button:
- dark fill using `#11150A`
- white text
- medium-large height
- rounded corners
- minimal ornament
- Secondary button:
- white or muted background
- border-based separation
- dark text
- Danger secondary button:
- white background with red border and red text
- Inputs:
- `40-48px` minimum height
- `1px` border
- `12px` radius
- left-aligned labels above the field
- clear focus ring added during implementation for accessibility

### Cannot be determined

- Hover, pressed, loading, and disabled treatments.
- Whether the original product uses filled or outlined secondary buttons universally.

## Cards and Result Panels

### Directly observed

- Cards are the main organizational unit on desktop dashboards.
- Summary panels combine title, status chip, and large KPI numbers.
- Charts are embedded inside simple bordered cards.
- Tables sit below summary cards with soft header backgrounds.
- Mobile screens often use one dominant panel stacked vertically.
- Modal or floating action panels use dark surfaces for emphasis.

### Reasonable implementation decisions

- Treat salary results, deductions, and breakdown panels as Jet HR-style cards:
- white background
- thin border
- rounded corners
- generous internal padding
- sparse decoration
- Use small badges for status, and keep KPI numbers visually dominant over explanatory text.

### Cannot be determined

- A definitive visual treatment for a payroll calculator result card, since the references do not show such a tool directly.

## Desktop and Mobile Layout Behaviour

### Directly observed

- Desktop uses a left sidebar navigation and a large right content area.
- The desktop content area is wide, airy, and centered within a large white application canvas.
- Pages commonly open with a large title followed by cards, charts, or tables.
- Mobile uses a single-column flow.
- Mobile layouts place the logo at the top-left and a utility icon at the top-right.
- Mobile actions are usually anchored near the bottom of the visible screen with a prominent full-width primary button.
- Forms stack fields vertically on mobile, sometimes using two small controls in one row.

### Reasonable implementation decisions

- For the prototype:
- desktop can retain the visual rhythm of sidebar plus main content, even if the calculator does not require full product navigation
- tablet should collapse to a simplified stacked layout before phone size
- mobile should prioritize single-column scanning and a sticky or end-of-form primary action
- If a sidebar is not functionally necessary, reuse its spacing logic and surface treatment without inventing unnecessary navigation items

### Cannot be determined

- Exact breakpoints.
- How Jet HR handles responsive transitions between tablet and desktop.

## Recurring Interaction Patterns

### Directly observed

- Selected navigation items are indicated by a soft gray rounded background.
- Important tasks are highlighted using lime-accent pills.
- Tables include sortable-looking column headers with small directional icons.
- Calendar components highlight selected dates with dark backgrounds and lime markers.
- Small badges and counters appear on avatars and chart annotations.
- Popovers and overlays are compact and task-specific.
- Mobile flows emphasize one primary action at a time.

### Reasonable implementation decisions

- Reuse this pattern language for the salary calculator:
- highlight the active calculation mode or selected option with lime accents
- keep one dominant CTA per screen
- use compact helper badges for statuses like `Net estimate`, `Taxes included`, or `Updated assumption`
- keep overlays lightweight and contextual instead of modal-heavy

### Cannot be determined

- Motion system, timing curves, hover animations, or transition choreography.

## Accessibility Requirements

### Directly observed

- The references depend strongly on contrast between dark ink, white surfaces, and accent highlights.
- Body text remains dark on light surfaces in all screenshots.
- Critical actions use size and contrast, not color alone.

### Reasonable implementation decisions

- Ensure WCAG-compliant contrast for all text and controls.
- Do not rely on the yellow-lime accent alone to convey meaning.
- Add visible focus states, keyboard support, and semantic labeling for all form fields and computed results.
- Use sufficiently large tap targets on mobile, especially for CTA buttons, tabs, and date inputs.
- Keep numeric outputs legible with clear grouping and labels.
- Mark the prototype explicitly as unofficial without reducing readability or trust in the UI itself.

### Cannot be determined

- Whether the original product meets any particular accessibility standard or has additional assistive patterns.

## Elements That Are Uncertain and Should Not Be Invented

### Cannot be determined

- Exact font family and licensed brand typography.
- Exact color token values beyond `#11150A` and white from the SVG assets.
- Full navigation structure, icon library rules, or all possible component variants.
- Motion, transitions, loading states, and micro-interactions.
- Chart system details beyond the specific examples shown.
- Error state patterns beyond the visible red and warning-like highlights.
- Exact desktop grid, container widths, and breakpoint map.
- Official copywriting style or product terminology conventions outside the screenshots.

## Implementation Guidance for the Prototype

### Reasonable implementation decisions

- Build toward visual consistency, not brand mimicry.
- Use the Jet HR-inspired dark ink, white cards, lime accents, soft borders, and compact sans-serif hierarchy.
- Keep the calculator UI clean, minimal, and productivity-oriented rather than marketing-like.
- Add a persistent label in the interface making it clear this is an unofficial prototype created for the Product Builder technical task.
- Where the references are ambiguous, prefer restraint over invention.
