# Brand Direction — Beauty by Kyrin

**Site:** www.beautybykyrin.com · **Stylist:** Kyrin Weidauer · **Prepared:** 2026-09-18
**Source of truth for this document:** the `:root` block at the top of `styles.css`, plus the rules that consume those tokens. Everything below was read out of the shipped stylesheet, not out of the brief. Where a statement is inference rather than observation it is marked **(inferred)**.

---

## 1. The palette as implemented

Nine colour tokens and two font stacks, declared once at the top of `styles.css`:

```css
:root{--ink:#281a23;--dark:#21151e;--paper:#fcf7f5;--pale:#f3e6e7;
      --pink:#ed83ae;--rose:#a92a60;--text:#554650;--muted:#705f69;--line:#d8c8cf;
      --display:'Cormorant Garamond',Georgia,serif;--sans:'Jost',Arial,sans-serif;
      --gutter:clamp(22px,5vw,88px);--ease:cubic-bezier(.2,.75,.2,1)}
```

| Token | Hex | Role in the shipped site |
|---|---|---|
| `--ink` | `#281a23` | Default `body` colour; headings; `.button-dark` background; `.button-outline` border and label; text on the pink bands. A plum-black, not a neutral black. |
| `--dark` | `#21151e` | The **section** colour. Backgrounds of `.site-header`, `.home-hero`, `.film-section`, `.look-finder-section`, `.lightbox`, `.site-nav` (mobile drawer), `.mobile-book` bar and `.site-footer`. Also the text colour *on* pink surfaces (`.button-primary`, `.nav-book`, `.hero-round`). |
| `--paper` | `#fcf7f5` | Page background; text on every `--dark` and `--ink` surface; form field background. |
| `--pale` | `#f3e6e7` | The quiet panel. `.pale-panel`, `.address-card`, `.fit-note`, `.article-next`, image placeholder behind `.work-piece`, `.related-links:hover`. Used to separate without introducing a new hue. |
| `--pink` | `#ed83ae` | The accent surface, and accent text **only on dark**. Backgrounds: `.button-primary`, `.nav-book`, `.hero-round`, `.first-visit-band`, `.closing-cta`. Text: `.brand-period`, `.footer-invitation em`, `.footer-logo em`, `.footer-contact .label`, `.look-finder .label`, `.lightbox .label`, `.finder-result .text-link` — every one of those sits on `--dark`. |
| `--rose` | `#a92a60` | The accent *on light*. `h1 em` / `h2 em`, `.label`, `.service-number`, `.portrait-signature`, `.faq-list summary>span`, `.fit-note` top rule, all hover states (`.button-dark:hover`, `.text-link:hover`, `.service-link:hover`, `.breadcrumbs a:hover`) and the global focus ring. |
| `--text` | `#554650` | Body paragraphs (`p`). One step lighter than `--ink` so headings stay dominant. |
| `--muted` | `#705f69` | Secondary metadata: optional-field hints, small captions, some labels. |
| `--line` | `#d8c8cf` | 1px hairlines: `.section-end`, `.faq-list details`, `.visit-details dl>div`, `.considerations p`, `.service-feature`, `.preparation-list li`, and the `.portfolio-filters button` borders. |

Three one-off hexes exist outside the token set and are worth knowing about, because they are the ones a future edit is most likely to break:

| Hex | Where | Why it is not a token |
|---|---|---|
| `#dbb6c7` | `.hero-copy .label` | A lighter pink used only for the hero eyebrow, so the label reads as secondary to the H1 rather than competing with `--pink`. |
| `#e0cdda` / `#c3adba` | `.footer-contact address`, `.footer-links>div` / `.footer-links>p` | A deliberate two-step de-emphasis ladder inside the footer: address and links, then the copyright line. |
| `#c2aab6` | `.field input/select/textarea` border | Form control boundary. **This one has a contrast problem — see §3.** |
| `#a41347` / `#9b1845` | `[aria-invalid]` border, `.field-error` text | The error state. Both pass comfortably. |

### Dark mode
There is none, and none is declared. No `prefers-color-scheme` block exists in `styles.css`. `<meta name="theme-color" content="#15110f">` in `build.mjs` is darker than any token in the palette — a small inconsistency worth aligning to `#21151e` **(inferred: no functional impact beyond the browser chrome tint on mobile)**.

---

## 2. Type

Two families, loaded from Google Fonts with `display=swap` and `preconnect` to both `fonts.googleapis.com` and `fonts.gstatic.com`:

- **Cormorant Garamond** — `ital,wght@0,400;0,500;0,600;1,400;1,500`. Display only.
- **Jost** — `wght@400;500;600`. Everything else.

### The scale as shipped

| Role | Declaration | Notes |
|---|---|---|
| `h1` | `clamp(64px, 7.3vw, 112px)` · Cormorant 500 · `letter-spacing:-.04em` · `line-height:1.05` · `text-wrap:balance` | Never smaller than 64px, even on a phone. This is the loudest decision in the system. |
| `h2` | `clamp(48px, 5.1vw, 78px)` | Same weight, tracking and leading as `h1`. |
| `h3` | `clamp(27px, 2.45vw, 38px)` · `line-height:1.14` | The only display size with a looser leading. |
| `.footer-invitation` | `500 clamp(50px,5.1vw,80px)/1.02` · `-.035em` | Footer's own display line, slightly tighter leading than `h1`. |
| `.portrait-signature` | `italic 500 clamp(43px,5vw,74px)/1` | Cormorant italic, rotated `-7deg`. The one handwritten-feeling mark in the system. |
| Body `p` | `17px / 1.65` Jost 400, colour `--text` | Set on `body`; paragraphs get `margin:0 0 1.3rem`. |
| `.lede` | `19px / 1.7`, `max-width:635px` | The paragraph under every `h1`. |
| `.label` | `11px` · `600` · `uppercase` · `letter-spacing:.19em` · `line-height:1.8` | The eyebrow. Drops to 10px and `.17em` in the hero and footer, 9px/`.12em` in the smallest context. |
| `.button` | `13px` · `500` · `.02em` | Steps down to 12px then 11px at narrower breakpoints. |
| `.text-link` | `14px` · `500` | Steps down to 13px/12px in denser contexts. |
| Form fields | `16px` | Deliberately 16px: below that, iOS Safari zooms the viewport on focus. Do not "fix" this to 14px. |

### The rule the scale is actually built on
Display type is enormous and tightly tracked; everything functional is small, wide-tracked and uppercase. There is no middle. That gap **is** the editorial feel — it is what makes a 17px paragraph read as "caption to a magazine spread" rather than "body text on a website." Adding a 24px display-weight subhead would collapse it. **(inferred, but the pattern is consistent across all 22 routes.)**

`em` inside `h1`/`h2` is the emphasis mechanism: `em{font-weight:400}` drops the weight back and `h1 em,h2 em{color:var(--rose)}` recolours it. So italics in a headline are a *colour and weight* change, not a slant change. Every page hero uses it exactly once.

---

## 3. Contrast — computed, not estimated

Relative luminance per WCAG 2.x: each channel `c = v/12.92` where `v ≤ 0.03928`, else `((v+0.055)/1.055)^2.4`; `L = 0.2126R + 0.7152G + 0.0722B`. Ratio = `(L₁+0.05)/(L₂+0.05)`.

### Text pairs — every one passes

| Foreground | Background | Ratio | AA normal (4.5:1) | AA large (3:1) | Where |
|---|---|---|---|---|---|
| `--ink` `#281a23` | `--paper` `#fcf7f5` | **15.66:1** | Pass | Pass | `body` default, all headings |
| `--text` `#554650` | `--paper` | **8.31:1** | Pass | Pass | every paragraph |
| `--muted` `#705f69` | `--paper` | **5.60:1** | Pass | Pass | field hints, small captions |
| `--rose` `#a92a60` | `--paper` | **6.20:1** | Pass | Pass | `.label`, `h1 em`, hover states |
| `--ink` | `--pale` `#f3e6e7` | **13.69:1** | Pass | Pass | panel headings |
| `--text` | `--pale` | **7.27:1** | Pass | Pass | panel paragraphs |
| `--muted` | `--pale` | **4.90:1** | Pass | Pass | panel metadata — the narrowest text margin in the system |
| `--rose` | `--pale` | **5.42:1** | Pass | Pass | `.fit-note` label |
| `--paper` | `--dark` `#21151e` | **16.60:1** | Pass | Pass | header, hero, footer, lightbox |
| `--pink` `#ed83ae` | `--dark` | **7.10:1** | Pass | Pass | footer `em`, dark-section labels |
| `#dbb6c7` | `--dark` | **9.68:1** | Pass | Pass | `.hero-copy .label` |
| `#e0cdda` | `--dark` | **11.69:1** | Pass | Pass | footer address and links |
| `#c3adba` | `--dark` | **8.40:1** | Pass | Pass | footer copyright line |
| `--ink` | `--pink` | **6.70:1** | Pass | Pass | `.first-visit-band` copy, `.closing-cta` |
| `--dark` | `--pink` | **7.10:1** | Pass | Pass | `.button-primary`, `.nav-book`, `.hero-round` |
| `--paper` | `--ink` | **15.66:1** | Pass | Pass | `.button-dark` |
| `--paper` | `--rose` | **6.20:1** | Pass | Pass | `.button-dark:hover` |
| `#9b1845` | `--paper` | **7.57:1** | Pass | Pass | `.field-error` |

**No text pair in the shipped stylesheet falls below 4.5:1.** The closest is `--muted` on `--pale` at 4.90:1 — it passes, but it has 9% of headroom, so darkening `--muted` is the wrong lever to pull if a future edit needs more contrast somewhere else. Change the background, not the text.

`--pink` on `--paper` computes to **2.34:1** and would fail badly. It is **never used that way** — every pink-as-text rule is scoped to a `--dark` ancestor (`.footer-contact`, `.look-finder`, `.lightbox`, `.finder-result`). That scoping is load-bearing. A future rule like `.label{color:var(--pink)}` written outside a dark section would silently ship a 2.34:1 label.

### Non-text contrast (WCAG 1.4.11, threshold 3:1) — three genuine failures

| Element | Pair | Ratio | Verdict |
|---|---|---|---|
| Form field border `#c2aab6` on `--paper` | control boundary | **2.03:1** | **Fails 3:1.** The border is the only thing marking where an input begins. Darkening it to roughly `#9e8592` or darker clears 3:1 while staying in-palette. |
| Focus ring `--rose` on `--dark` | `outline:3px solid var(--rose)` inside `.site-header`, `.site-footer`, `.home-hero`, `.look-finder-section`, `.lightbox`, `.mobile-book` | **2.68:1** | **Fails 3:1.** Every keyboard user tabbing through the sticky header or the footer gets a focus indicator that is barely visible. `--pink` on `--dark` is **7.10:1** — scoping the outline colour to pink inside dark sections fixes it with an existing token. |
| Focus ring `--rose` on `--pink` bands (`.first-visit-band`, `.closing-cta`) | same rule | **2.65:1** | **Fails 3:1.** `--ink` on `--pink` is 6.70:1 and would be the correct override there. |
| `.portfolio-filters button` border `--line` on `--paper` | control boundary | **1.51:1** | **Fails 3:1** on the same grounds as the form fields — these are real controls, not dividers. |

`--line` used as a *divider* (`.section-end`, `.faq-list details`, `.visit-details`) is decorative and out of 1.4.11 scope; it is only the filter buttons that turn it into a control boundary.

None of the above changes the visual character of the site. They are four scoped colour overrides. **This document does not change any code — these are findings only.**

---

## 4. Spacing rhythm

| Token / rule | Value | Meaning |
|---|---|---|
| `--gutter` | `clamp(22px, 5vw, 88px)` | The page margin. Everything horizontal derives from it. |
| `.wrap` | `width: min(100% - var(--gutter)*2, 1320px)` | The single container. 1320px max, gutter-bounded below that. |
| `.narrow` | `max-width: 780px` | The reading measure for long-form pages (FAQ, journal, policies). |
| `.section` | `padding: clamp(72px, 8.5vw, 130px) 0` → `76px 0` at mobile | The vertical beat. One value, applied everywhere. |
| `.lede` | `max-width: 635px` | The intro measure — deliberately narrower than `.narrow`. |
| `html` | `scroll-padding-top: 100px` | Clears the sticky header on in-page anchors. |

The rhythm is **one container, one section padding, one gutter**. There is no spacing scale in the usual sense (no `--space-1..8`) — the system gets its consistency from having exactly three vertical values (`.section`, plus the slightly tighter `77px`/`72px` on the two pink bands) and letting `clamp()` handle every breakpoint. Small internal spacing is set per-component in px. **(inferred)** This is a deliberate trade: less systematisation, fewer abstractions to learn, and a stylesheet a non-specialist can edit. Given a single-author hand-written generator, that is the right trade. Do not retrofit a spacing scale onto it.

---

## 5. Photography direction

**What is actually in `assets/`:** real client work supplied by Kyrin — burgundy colour, blonde highlights (three variants), brunette colour on a bob and on waves, blonde extensions, extensions-with-highlights, three original `photo-0*.webp` frames, plus `kyrin-portrait.webp` and `kyrin-cutout-v2.webp` (a true alpha cutout used for the About hero). Two video files (`kyrin-journey.mp4`, `kyrin-journey-mobile.mp4`) with matching poster PNGs.

**Rules the code already enforces:**

- **AVIF then WebP then the original**, at 400/800/1200, generated into `assets/opt/` and emitted as a `<picture>` by the `image()` helper in `templates.mjs`.
- **Explicit `width`/`height` on every `<img>`**, taken from the `portfolio` array in `site-config.mjs` where the image is a portfolio piece. Layout shift is designed out, not patched.
- **`fetchpriority="high" loading="eager"` for hero images only**; everything else `loading="lazy" decoding="async"`.
- `sizes="(max-width:900px) 100vw, 45vw"` is the default — a two-column desktop assumption.
- `background: var(--pale)` behind `.work-piece` images, so a slow load shows blush, not white.

**Art direction rules that are not in the code and must be held editorially:**

1. **Finished hair, retained.** The photography shows completed work. There are no before/afters anywhere on the site and none should be added without Kyrin supplying a genuine matched pair with the client's permission.
2. **No stock.** Every image is her work or her portrait. A stock beauty shot would be the single fastest way to lose the credibility the whole positioning rests on.
3. **Back-of-head and three-quarter views are the house angle.** Six of the ten portfolio entries are rear or side views. That is what lets a caption describe *placement* ("where you want brightness") instead of a face.
4. **Captions describe visible colour and shape only.** Every `note` in the `portfolio` array is written as a conversation starter — "bring this photo to talk about the depth" — never as a claim about a named technique, product or documented installation. The extension images in particular are inspiration for length and movement, not evidence of a specific method. Keep it that way.
5. **The video is atmospheric.** `kyrin-journey.mp4` derives from a supplied portfolio photograph. It is decorative treatment, not a documented transformation, and the site never describes it as one.

---

## 6. Buttons and links

```css
.button{display:inline-flex;align-items:center;justify-content:space-between;gap:32px;
        min-height:56px;padding:15px 25px;font-size:13px;font-weight:500;letter-spacing:.02em;
        border:1px solid transparent;transition:background .25s,color .25s,transform .25s;
        line-height:1.5;text-align:left}
```

| Variant | Rule | Use |
|---|---|---|
| `.button-primary` | `background:var(--pink); color:var(--dark)` | The pink call to action. Header `.nav-book`, hero primary, `.hero-round`. |
| `.button-dark` | `background:var(--ink); color:var(--paper)` · hover `background:var(--rose)` | The default CTA on light pages. The hover is the only place rose becomes a *surface*. |
| `.button-outline` | `border-color:var(--ink); color:var(--ink)` | Secondary action. |
| `.text-link` | `14px/500`, `border-bottom:1px solid currentColor`, `min-height:44px`, `padding:9px 0`, hover `color:var(--rose)` | The tertiary action, always paired with the `arrow` glyph. |

Three things worth naming because they are easy to lose in an edit:

- **`justify-content:space-between` with `gap:32px`.** Buttons are not centred pills; label left, arrow right, air between. That shape is the brand more than the colour is.
- **56px minimum height on buttons, 44px on text links.** Both clear the 44×44 touch-target guidance. `.field input` is 49px.
- **`button:disabled{cursor:wait;opacity:.65}`** — the booking form's submit state. It signals "working", not "unavailable".

Focus is global and explicit: `outline:3px solid var(--rose); outline-offset:6px` on links, buttons and `summary`; `2px / 3px` on form controls. Nothing anywhere sets `outline:none`. That is correct and should stay correct — subject to the dark-section contrast fix in §3.

---

## 7. Motion

| Rule | Value |
|---|---|
| Easing token | `--ease: cubic-bezier(.2,.75,.2,1)` — fast out, long settle |
| Durations in use | `.2s` (colour/opacity), `.25s` (buttons, most hovers), `.3s–.4s`, `.6s–.7s` (the large transform reveals) |
| Keyframes | Exactly one: `@keyframes arrive`, applied to `.hero-copy` as `animation:arrive 1s var(--ease) both` |
| Scroll reveal | `IntersectionObserver`, `threshold:.12`, adds `.reveal-now` and **unobserves immediately** — elements animate once, never on scroll-back |
| Scroll film | `.film-section` scrubs a decorative video against scroll position. No scroll interception, no pinning hijack. |

**Reduced motion is honoured in both layers, which is the part that matters:**

```css
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .film-section{height:auto;min-height:0}
  .film-sticky{position:relative;top:0;height:620px;min-height:0}
  .film-media video{display:none}
  .film-progress{display:none}
  .hero-round{transform:none}
  .reveal-now{opacity:1;transform:none}
}
```

and in `script.js`:

```js
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window && !reduced.matches) { /* reveals */ }
if(!film || reduced.matches || navigator.connection?.saveData) return () => {};
```

So the video is not merely hidden — it is **never fetched** under reduced motion or Data Saver. The reveal observer is never constructed. Two rules to keep:

1. **Every animated element must be readable in its final state with no JS and no motion.** `.reveal-now{opacity:1;transform:none}` under the media query is what guarantees this. Any new reveal class needs the same treatment.
2. **Motion never carries information.** The film is decorative; the reveals are decorative; the rotated signature is decorative. Nothing the reader needs is behind a transition.

---

## 8. Voice and tone

Read off the shipped copy in `content.mjs` and `site-config.mjs`, not prescribed.

**The sentence shape.** Short declarative, then a qualifier. "No. Balayage can be a conversation about subtle brunette dimension as well as a brighter blonde effect." Answer first, nuance second. Every FAQ answer on the site opens this way — which is also what makes them quotable by answer engines (see `SEO-STRATEGY.md` §6).

**Six rules the copy actually follows:**

| Rule | Evidence in the shipped copy |
|---|---|
| **Say what it is not.** | Every service carries a `notFor` array. Balayage's says outright: "You need to cover grey consistently from the root — balayage deliberately leaves the root area alone." Telling a reader to book something else is the trust move of the whole site. |
| **Never promise a specific outcome.** | "A photograph is a useful direction, never a guarantee of an identical result." Repeated in different words on the balayage page, the FAQ and the new-guest page. |
| **A request is not a booking.** | "Your appointment is confirmed only after Kyrin replies and you agree on a date and time together." Stated on `/book`, `/thank-you`, `/policies` and in the FAQ. Non-negotiable. |
| **No price, ever, without her.** | "Ask Kyrin for a personalized quote before your service is agreed." The site explains *why* pricing varies (starting colour, history, length, density) instead of dodging the question. |
| **Second person, present tense, no hype.** | "You want to add brightness to brunette or blonde hair while keeping some depth." No "stunning", no "flawless", no exclamation marks anywhere in `content.mjs`. |
| **Headline voice is playful; body voice is straight.** | "A little dimension. A lot of you." / "Your chair is calling." against "Plan for two to four hours for most colour work." The display type carries the personality so the body copy does not have to. |

**Banned by the facts, not by taste:** reviews and ratings (none exist), years of experience (not supplied), licence number (not supplied), certifications or product brands (not supplied), social handles (not supplied), any dollar figure, "award-winning", "best in Las Vegas", and any claim about a service outside the confirmed five. `site-config.mjs` enforces most of this structurally — an empty string renders as omitted, never as a placeholder.

---

## 9. On the palette change from the original brief

The project brief originally described a **hot pink `#FF3E9A` on near-black** direction. What shipped is `--pink #ed83ae` and `--rose #a92a60` on `--dark #21151e` and `--paper #fcf7f5`. The repository's current `design-brief.md` is v2 and already documents the implemented palette, so the earlier direction survives only as the stated history.

**I think the change was right, for four reasons — three of them measurable:**

1. **`#FF3E9A` is measurably the weaker accent, in both directions.** Computed on the same basis as §3: `#FF3E9A` on `--paper` is **3.08:1** — a fail for normal text, and only barely a pass for large text, so it could never have been the label/accent colour that `--rose` is at 6.20:1. Against a near-black it is **5.38:1** on `#21151e` (**5.93:1** on a true `#0d0d0d`), where the shipped `#ed83ae` on `#21151e` is **7.10:1**. The restrained pink is the *higher*-contrast choice on dark and has a real accent partner on light. It is also calm enough to sit behind a 78px Cormorant headline, which a fully saturated magenta is not. On a site whose entire visual argument is large serif type over large flat colour fields, that matters.
2. **A near-black page would have broken the photography.** The palette's real job here is to sit behind real client hair photos — blondes, brunettes, a burgundy. `--paper #fcf7f5` is a warm off-white that lets a blonde read as blonde; near-black throughout would have forced every image into a high-key cutout treatment, which is exactly the "Instagram feed dump" look the competitor research identifies as the market default. The implemented system uses dark as a *punctuation* colour — header, hero, film, footer — and paper for the long middle of every page.
3. **Two pinks beat one.** The restrained palette split the accent into `--pink` (surfaces and accent-on-dark, 7.10:1) and `--rose` (accent-on-light, 6.20:1). A single hot pink would have had to do both jobs and would have failed one of them. This split is the single best structural decision in the stylesheet, and it is why every text pair on the site passes AA.
4. **It matches the positioning.** The competitor research puts the Las Vegas market's default at loud, high-saturation, high-throughput salon branding. Kyrin's differentiator is one stylist, unhurried, consultative. A restrained editorial palette *is* the positioning argument, made before a word is read.

**The one thing lost:** hot pink is more memorable at thumbnail size — in a Google Business Profile photo grid, an Instagram avatar, a share card. The mitigation is already in the system and should be used deliberately: `.brand-period`, `.hero-round`, `.nav-book` and the two full-bleed pink bands are the brand's loud moments. Keep them loud. If a social avatar or a GBP logo tile is ever produced, that is the right place to push `--pink` to its most saturated legitimate use rather than reintroducing a second pink into the stylesheet.

---

## 10. Quick reference for anyone editing

- **Add a colour?** Don't. There are nine tokens and four justified one-offs. If a new value seems necessary, the likely real need is `--pale` or a different `--dark`/`--paper` pairing.
- **Pink text?** Only inside a `--dark` ancestor. On paper it is 2.34:1.
- **New display size?** There is no size between 27px and 17px on purpose.
- **New animation?** Add the reduced-motion neutraliser in the same commit, and make the final state the no-JS state.
- **New form control?** `font-size:16px`, `min-height:49px`, and give it a border that clears 3:1 (the current `#c2aab6` does not).
- **New image?** Add the 400/800/1200 AVIF + WebP variants to `assets/opt/`, and pass real `width`/`height` through `image()`.
