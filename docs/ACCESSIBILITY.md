# Accessibility — WCAG 2.2 AA

Results from the automated passes run against the built site. Where a number
appears, it was measured, not assumed.

## Colour contrast

Computed from the real `:root` tokens in `styles.css` using the WCAG relative
luminance formula. **Every pair passes AA.**

| Pair | Ratio | Required | |
|---|---:|---:|---|
| `--text #554650` on `--paper #fcf7f5` (body) | 8.31 | 4.5 | PASS |
| `--text` on `--pale #f3e6e7` | 7.27 | 4.5 | PASS |
| `--muted #705f69` on `--paper` (small notes) | 5.60 | 4.5 | PASS |
| `--muted` on `--pale` | 4.90 | 4.5 | PASS |
| `--rose #a92a60` on `--paper` (links) | 6.20 | 4.5 | PASS |
| `--pink #ed83ae` on `--ink #281a23` | 6.70 | 4.5 | PASS |
| `--pink` on `--dark #21151e` | 7.10 | 4.5 | PASS |
| `--paper` on `--ink` (reverse text) | 15.66 | 4.5 | PASS |
| `--paper` on `--dark` | 16.60 | 4.5 | PASS |
| `--ink` text on `--pink` button | 6.70 | 4.5 | PASS |
| Footer `#c9b3bf` on `--ink` | 8.46 | 4.5 | PASS |

The build brief specifically flagged "check hot pink on black carefully". That
concern was real for the original `#FF3E9A`, but the implemented palette uses a
softer, slightly desaturated `#ed83ae`, which clears AA at **6.70:1** against the
plum-black. The refinement solved the contrast problem as a side effect of
solving the aesthetic one.

## Target size — 2.5.8 (AA)

Checked at 390px across 11 routes. WCAG 2.2 exempts targets inline within a
sentence or block of text, so breadcrumbs, footer body links and links inside
running copy are correctly out of scope.

Two standalone controls were **under 24px and have been fixed**:

- the footer "Sitemap" link (was 35×15)
- the booking-page email link (was 164×23)

Both now carry `min-height: 24px`. Re-checked: every standalone control passes.

## Structure, at five breakpoints

Checked across 16 routes × 375 / 390 / 768 / 1024 / 1440 px:

- **Exactly one `<h1>` per page** — no exceptions
- **No image missing an `alt` attribute** — decorative images carry `alt=""`
- **No horizontal overflow** at any width (0 px on every route)
- **CLS 0.0000** on every page sampled — every image carries explicit `width`
  and `height`, so nothing reflows as the page loads

## Built in already

- Skip-to-content link, first in the tab order
- Semantic landmarks: `header`, `nav`, `main`, `footer`, `address`
- Form fields have real `<label>` elements, not placeholder-as-label; errors are
  announced via `aria-describedby` and a `role="status"` live region
- The FAQ uses native `<details>`/`<summary>` — keyboard operable without JS
- The portfolio lightbox is a native `<dialog>`, returning focus to its opener
  on close
- `prefers-reduced-motion` is respected by the scroll-film section
- Comparison tables use real `<th scope>` headers and a `<caption>`
- The mobile nav reports state with `aria-expanded` and closes on Escape

## Not verified here

- **Screen-reader testing with an actual screen reader.** Automated checks
  cannot confirm that the reading order and announcements make sense. Worth one
  pass with VoiceOver or NVDA before launch.
- **Lighthouse accessibility score.** Lighthouse is not installed in this
  environment; the checks above were run directly via Playwright instead. Run it
  against the preview deployment.
