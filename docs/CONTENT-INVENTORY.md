# Content Inventory — Beauty by Kyrin

**Site:** www.beautybykyrin.com · **Prepared:** 2026-09-18
**Route source:** `pages()` in `templates.mjs`, read directly — not guessed. Cross-checked against `dist/` (23 HTML files) and `.build/page-manifest.json`.
**Keyword source:** `KEYWORD-MAP.md`. **Gap source:** `design-brief.md` and `COMPETITOR-RESEARCH.md`.

**22 content routes + 1 custom 404 = 23 HTML files. 21 routes appear in `sitemap.xml`** (`/thank-you` is `noindex` and is excluded by `discoveryPages` in `build.mjs`).

> **Titles and descriptions below are the ones that actually ship.** Several differ from the recommended values in `KEYWORD-MAP.md` — that is flagged per row and summarised in §5.

---

## 1. The full page table

| # | Route | Title tag (shipped) | Meta description (shipped) | Primary keyword (`KEYWORD-MAP.md`) | Content type | Status |
|---|---|---|---|---|---|---|
| 1 | `/` | Beauty by Kyrin \| Las Vegas Hair Stylist & Color | Discover personal hair artistry in Las Vegas. Explore balayage, dimensional color, custom cuts and extensions with Kyrin inside Venus Salon. Request a visit. | **hair stylist las vegas** | Home · `WebPage` | **Live.** Full build: hero, services, scroll film, portfolio, look finder, Kyrin intro, first-visit band, journal, location, booking. Title differs from map. |
| 2 | `/services` | Hair Services in Las Vegas \| Beauty by Kyrin | Explore balayage, color, highlights, haircuts, styling, extensions and treatments at Beauty by Kyrin in Las Vegas. Find your service and request a consultation. | **hair services las vegas** | Hub · `CollectionPage` | **Live.** Routes to the five service pages. Title matches the map exactly. |
| 3 | `/services/balayage` | Balayage in Las Vegas \| Beauty by Kyrin | Explore balayage in Las Vegas with Beauty by Kyrin. Plan soft dimension, face-framing brightness and a maintenance routine around your hair and lifestyle. | **balayage las vegas** | Service · `WebPage` + `Service` + `FAQPage` | **Live.** `bestFor` ×3, `notFor` ×3, comparison table (balayage vs foils), approach, considerations, 4 FAQs. The strongest page on the site. |
| 4 | `/services/color-and-highlights` | Hair Color & Highlights in Las Vegas \| Beauty by Kyrin | Discover hair color and highlights in Las Vegas with Beauty by Kyrin. Explore tone, brightness and dimension with a consultation for your next color appointment. | **hair color and highlights las vegas** | Service · `WebPage` + `Service` + `FAQPage` | **Live.** Same structure. Description is 161 chars — 1 over the 160 target. |
| 5 | `/services/haircuts-and-styling` | Haircuts & Styling in Las Vegas \| Beauty by Kyrin | Explore haircuts, styling and blowouts in Las Vegas with Beauty by Kyrin. Discuss shape, length and a finish that fits how you wear your hair every day. | **womens haircut las vegas** | Service · `WebPage` + `Service` + `FAQPage` | **Live.** ⚠️ Description says "blowouts" — see §4, gap G5. |
| 6 | `/services/hair-extensions` | Hair Extensions in Las Vegas \| Beauty by Kyrin | Consider hair extensions in Las Vegas with Beauty by Kyrin. Discuss length, fullness, blending, care and the full commitment before choosing your extension plan. | **hair extensions las vegas** | Service · `WebPage` + `Service` + `FAQPage` | **Live.** Names no method or brand — correct, none confirmed. Description 161 chars. |
| 7 | `/services/hair-treatments` | Hair Treatments in Las Vegas \| Beauty by Kyrin | Explore deep conditioning, keratin services and scalp care in Las Vegas with Beauty by Kyrin. Discuss your hair concerns and a treatment plan before booking. | **hair treatment las vegas** | Service · `WebPage` + `Service` + `FAQPage` | **Live.** ⚠️ Description says "keratin services" — see §4, gap G5. |
| 8 | `/portfolio` | Color, Highlights & Extensions \| Beauty by Kyrin Portfolio | Browse Kyrin's real color, highlights, extensions and cut portfolio in Las Vegas. Explore service-specific photos and bring your favorite look to your consultation. | **hair transformations las vegas** | Gallery · `CollectionPage` | **Live.** 10 entries from `site-config.mjs`, filterable, lightbox, each mapped to a service. Description 164 chars. |
| 9 | `/about` | Meet Kyrin Weidauer \| Las Vegas Hair Stylist | Meet Kyrin Weidauer, the stylist behind Beauty by Kyrin in Las Vegas. Discover a personal approach to hair color, cuts, extensions and your first consultation. | **kyrin weidauer hair stylist** | About · `AboutPage` | **Live, thin by necessity.** No years of experience, school, certifications or licence supplied — all empty in `site-config.mjs`. **This is the page that must win her own name.** See §4, gap G1. |
| 10 | `/new-guests` | Your First Hair Appointment \| Beauty by Kyrin Las Vegas | New to Beauty by Kyrin? Learn what to bring, what to discuss and how your Las Vegas hair consultation works. Start with your goals, routine and inspiration. | **what to expect at your first hair appointment** | Guide · `WebPage` | **Live.** Tier 1 in the keyword map. Reuses general FAQ entries, so no `FAQPage` markup here — deliberate, avoids duplicate Q&A across URLs. |
| 11 | `/visit` | Visit Beauty by Kyrin \| Venus Salon, Las Vegas | Find Beauty by Kyrin inside Venus Salon at 8665 W Flamingo Rd, Suite 128, Las Vegas. Get directions, contact Kyrin and plan your appointment near Flamingo and Durango. | *(not separately mapped — supports the local page)* | Contact · `ContactPage` | **Live.** Address card, `hasMap` link, `<dl>` details. Description 167 chars — the longest on the site, will truncate. |
| 12 | `/book` | Request a Hair Appointment \| Beauty by Kyrin Las Vegas | Ready for your next look? Request an appointment with Kyrin in Las Vegas for color, balayage, cuts or extensions. Share your hair goals or call 702-533-8176. | *(conversion page — not a ranking target)* | Form · `ContactPage` | **Live.** Posts to `/api/book` (serverless → Web3Forms, optional Supabase). ⚠️ **End-to-end delivery is untested.** See §4, gap G2. |
| 13 | `/faq` | Hair Appointment Questions \| Beauty by Kyrin Las Vegas | Get answers about booking, consultations, pricing, color preparation and visiting Beauty by Kyrin inside Venus Salon in Las Vegas. Plan your next hair appointment. | **questions to ask your hairstylist** | Q&A · `WebPage` + `FAQPage` | **Live.** All 10 `generalFaqs`, marked up here and only here. Every answer is answer-first. Description 163 chars. |
| 14 | `/journal` | The Hair Journal \| Beauty by Kyrin Las Vegas | Plan your next hair change with clear guides to balayage, highlights, color consultations and extensions from the Beauty by Kyrin hair journal in Las Vegas. | **hair care tips las vegas** | Hub · `CollectionPage` | **Live, but thin: 3 posts.** The map allocates 8. See §3. |
| 15 | `/journal/balayage-vs-highlights` | Balayage vs. Highlights: How to Choose Your Color \| Beauty by Kyrin | Compare balayage and highlights by placement, brightness, grow-out and upkeep. Use this practical guide to prepare for a color consultation in Las Vegas. | **balayage vs highlights** | Article · `Article` + `FAQPage` | **Live, published.** 6 sections, 2 FAQs, 5-minute read, links up to `/services/balayage` and `/services/color-and-highlights`. |
| 16 | `/journal/prepare-for-hair-color` | How to Prepare for a Hair Color Consultation \| Beauty by Kyrin | Prepare for your hair color consultation with useful photos, an honest color history and questions about cost, upkeep and the result you want to achieve. | **how to prepare for a hair color appointment** | Article · `Article` + `FAQPage` | **Live, published.** Title 62 chars. |
| 17 | `/journal/hair-extensions-consultation` | What to Ask at a Hair Extensions Consultation \| Beauty by Kyrin | Explore the questions to ask before hair extensions: suitability, blending, method, care, maintenance and the full cost of your proposed extension plan. | **do i need a consultation for hair extensions** | Article · `Article` + `FAQPage` | **Live, published.** Title 63 chars. |
| 18 | `/thank-you` | Appointment Request Sent \| Beauty by Kyrin | Thank you for your appointment request. Kyrin will follow up to discuss your hair, availability and the next step. | *(none — intentionally not a ranking target)* | Utility · `WebPage` | **Live, `noindex`.** Excluded from `sitemap.xml`, `llms.txt` and `llms-full.txt`. Clean GA4 conversion destination once analytics exist. |
| 19 | `/privacy` | Privacy \| Beauty by Kyrin | Learn how Beauty by Kyrin handles appointment request information and which services help deliver this website, its fonts and the contact form. | *(none)* | Legal · `WebPage` | **Live.** Names Google Fonts, Web3Forms and the optional Supabase path. |
| 20 | `/las-vegas-hair-stylist` | Las Vegas Hair Stylist \| Beauty by Kyrin | An independent Las Vegas hair stylist near Flamingo and Durango. See which parts of the valley Kyrin's guests travel from, what she offers and how to book. | **hair salon spring valley las vegas** | Local · `WebPage` + `FAQPage` (3 reused FAQs) | **Live, needs depth.** Tier 1 in the map. ⚠️ Title and description lead on "Las Vegas", not Spring Valley — see §5. |
| 21 | `/policies` | Booking & Appointment Policies \| Beauty by Kyrin | How appointments work at Beauty by Kyrin in Las Vegas: requests versus confirmed bookings, how pricing is quoted, consultations, and changing an appointment. | *(none)* | Trust · `WebPage` | **Live, but every confirmed policy field is blank.** See §4, gap G3. |
| 22 | `/terms` | Terms of Use \| Beauty by Kyrin | The terms that apply to the Beauty by Kyrin website, including information accuracy, appointment requests, photography and the use of site content. | *(none)* | Legal · `WebPage` | **Live.** |
| — | `/404` | Page not found \| Beauty by Kyrin | This page could not be found. Explore hair services or request an appointment with Beauty by Kyrin in Las Vegas. | *(none)* | Utility | **Live.** Rendered with `forceNoIndex`. Not in the sitemap. Links to `/` and `/book`. |

### Redirects (`vercel.json`) — not pages, but part of the URL inventory

| From | To | Type | Note |
|---|---|---|---|
| `/contact` | `/visit` | 301 | Catches the conventional URL a directory or inbound link will guess. |
| `/gallery` | `/portfolio` | 301 | |
| `/new-clients` | `/new-guests` | 301 | |
| `/reviews` | `/faq` | **302** | Temporary on purpose — there is no reviews page yet. Make it a 301 only when a real one exists. |

---

## 2. Which journal posts are drafts

**None.** All three are published and live.

There is **no draft mechanism in the codebase** — no `draft` flag exists anywhere in `content.mjs`, `templates.mjs` or `build.mjs`, and `pages()` maps over every entry in the `guides` array unconditionally. Anything added to `guides` ships on the next deploy.

**Implication:** if a post is written but not ready, it cannot be parked in `content.mjs`. Either keep it out of the array, or add a `draft` flag and filter it in `pages()` — currently one line of work, and worth doing before more posts are written.

The three live posts:

| Route | Read time | Sections | FAQs | Links up to |
|---|---|---|---|---|
| `/journal/balayage-vs-highlights` | 5 minute read | 6 | 2 | `balayage`, `color-and-highlights` |
| `/journal/prepare-for-hair-color` | (set in `content.mjs`) | 6 | 2 | colour services |
| `/journal/hair-extensions-consultation` | (set in `content.mjs`) | 6 | 2 | `hair-extensions` |

---

## 3. Mapped-but-missing pages

`KEYWORD-MAP.md` assigns primary keywords to **eight** journal routes. **Five have no page and no entry in the `guides` array.** These are already named, slugged and keyword-mapped — the cheapest content work available on this project.

| Missing route | Primary keyword (mapped) | Feeds | Priority |
|---|---|---|---|
| `/journal/does-balayage-damage-hair` | does balayage damage hair | `/services/balayage` | **Highest.** Objection-handling for the strongest service term. |
| `/journal/how-often-balayage-touch-up` | how often should you get balayage touched up | `/services/balayage` | **High.** Maintenance intent, directly commercial. |
| `/journal/tape-in-vs-hand-tied-extensions` | tape in vs hand tied extensions | `/services/hair-extensions` | High. ⚠️ Must be written as a general explainer — **naming a method Kyrin offers would be an unconfirmed service claim.** |
| `/journal/olaplex-vs-k18` | olaplex vs k18 | `/services/hair-treatments` | Medium. ⚠️ Both are brand names; `productLines` is empty in `site-config.mjs`. Write comparatively, never as "the products I use". |
| `/journal/las-vegas-climate-and-your-hair` | how to protect hair in las vegas heat | `/services/hair-treatments` | Medium, but the **most defensible local angle on the list** — nobody in `COMPETITOR-RESEARCH.md` covers it. |

---

## 4. Content gaps against the brief and the research

### G1 — No proof of person beyond her own copy · **High**
`yearsExperience`, `school`, `certifications`, `productLines`, `languages` and `license` are all empty in `site-config.mjs`. `COMPETITOR-RESEARCH.md` §4 finds that **tenure is the default credibility proxy across the entire Las Vegas market** — 27+, 30+, 20+, 13+ years, stated plainly by competitors. `/about` currently has none of it, and `hasCredential` is omitted from the JSON-LD as a result. **Nothing here may be invented.** These are questions for Kyrin, and each answer unlocks either a schema property or a visible line. This is the highest-value set of blanks on the site.

### G2 — The booking form is untested end to end · **Critical**
`/book` posts to `/api/book`, which relays to Web3Forms server-side (with a committed fallback key so the form cannot ship dead) and optionally writes to Supabase. `scripts/test-book-api.mjs` covers the endpoint's accept/reject/rate-limit logic, but its own header states **delivery is stubbed and the network is never touched** — so **no one has confirmed a submission reaches Kyrin's inbox.** On a lead-generation site, a silently failing form costs money and produces no error anywhere. Submit a real request and confirm receipt before anything else in the roadmap.

### G3 — `/policies` exists but every confirmed policy is blank · **High**
The `policies` object in `site-config.mjs` has six fields — `cancellation`, `late`, `redo`, `payment`, `extensionsConsult`, `kids` — and **all six are empty strings.** The page still reads well, because it was written around what *is* settled (a request is not a booking; pricing is quoted, never assumed; consultations come first; contact her to move an appointment). But `COMPETITOR-RESEARCH.md` R10 finds the market norm is a stated 24–48 hour cancellation window and a deposit around 25%, and for a solo stylist a no-show is 100% of that slot's revenue. **Ask Kyrin for the six answers.** Each one fills in automatically once set.

### G4 — No reviews, anywhere · **High, and correctly handled**
`testimonials` is an empty array. The reviews section, `AggregateRating` and `Review` schema are all omitted together. `/reviews` 302s to `/faq`. **This is the right implementation of a real gap — never fabricate one.** The fix is operational, not editorial: the review workflow in `LOCAL-SEO-GEO-PLAN.md` §8.

### G5 — Two service descriptions reach slightly beyond the confirmed five · **Medium**
Kyrin's confirmed services are exactly: balayage · color-and-highlights · haircuts-and-styling · hair-extensions · hair-treatments.

- `/services/haircuts-and-styling` meta description says "haircuts, styling and **blowouts**".
- `/services/hair-treatments` meta description says "deep conditioning, **keratin services** and scalp care".

`KEYWORD-RESEARCH.md` §6 lists **blowouts** and **keratin smoothing** among the *unconfirmed* services held back pending her confirmation. Both are arguably sub-modalities of the parent service rather than new offerings — but they are appearing in meta descriptions, which is the most quotable place on a page. **Confirm with Kyrin, or reword.** No other page names an unconfirmed service, and colour correction, bridal and vivids appear nowhere.

### G6 — No pricing, and none may be invented · **Strategic, unresolved**
Zero dollar figures appear on the site. That is correct: none were supplied. `priceRange` is omitted from the JSON-LD with a code comment explaining why a vague `"$$"` is not an improvement. `COMPETITOR-RESEARCH.md` §6.3 argues for publishing "starting at" figures paired with durations — an opening no Las Vegas competitor fills. **The competitor prices in that document are market observations, not Kyrin's.** This is a decision for her. Until then, the durations already in the copy ("two to four hours for most colour work") are the differentiator.

### G7 — No problem-led pages · **Medium**
`COMPETITOR-RESEARCH.md` §5 identifies these as the highest-intent, least-contested traffic in the category: brassy blonde, grown-out balayage, box-dye correction, fine hair that won't hold volume, extension damage. None exists. ⚠️ Several edge into **colour correction, which is not a confirmed service** — any such page must be written as "what's happening with your hair and what to ask about", routing to a consultation, never as a service offer.

### G8 — No social accounts · **Medium**
`instagram`, `tiktok`, `facebook` and `yelp` are all empty, so the icons are hidden and `sameAs` is omitted from **both** the `HairSalon` and the `Person`. `script.js` already has an `instagram_click` event waiting. For a solo stylist, Instagram is usually the first place a referral checks and often the top result for her own name. See `LOCAL-SEO-GEO-PLAN.md` §9.

### G9 — No geo coordinates · **Medium, and gated on the GBP**
`latitude` and `longitude` are empty with an explicit `TODO(launch)`: read the exact pin from the Google Business Profile. `geo` is omitted from the JSON-LD rather than guessed. **At a shared suite address, a guessed coordinate is actively harmful** — it could pin her to Venus's record. Fill it only from the verified profile.

### G10 — No analytics · **Medium**
`NEXT_PUBLIC_GA_ID` is blank and no tracking script is emitted. The `track()` helper in `script.js` already fires `phone_click`, `email_click`, `instagram_click` and `service_view` (with the service slug). Setting a real GA4 ID turns all of it on with **no code change**.

### G11 — Indexing may still be switched off · **Critical, verify first**
`site.indexable` is `env('INDEX_SITE') === 'true'`. Anything else, including unset, emits `noindex,follow` on every page. The local manifest records `"indexable": false`. **Confirm `INDEX_SITE=true` on the `beauty-by-kyrin` Vercel production environment and view-source a live page.** Until that is confirmed, every other item in this inventory is moot.

### G12 — Repository leftovers and a redundant Vercel project · **Low, but a live trap**
Root-level `index.html`, `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt` and `llms-full.txt` are v1 artifacts. They are **not** deployed — `build.mjs` copies only `public/` (absent) and `assets/`, and generates its own — but the stale root `robots.txt` points its `Sitemap:` line at `beauty-by-kyrin-live.vercel.app`, and the next person to "edit robots.txt" will edit the wrong file. The redundant second Vercel project `beauty-by-kyrin-live` should be removed for the same reason.

### G13 — No draft mechanism · **Low**
Per §2. Anything added to `guides` publishes immediately.

---

## 5. Metadata deviations from `KEYWORD-MAP.md`

The map specifies title tags and descriptions that were checked programmatically to be ≤60 and 140–160 characters. Several shipped values differ. None is wrong; each is a decision worth making consciously.

| Route | Map recommends | Shipped | Assessment |
|---|---|---|---|
| `/` | `Hair Stylist in Las Vegas \| Beauty by Kyrin` (43) | `Beauty by Kyrin \| Las Vegas Hair Stylist & Color` (48) | **Brand-first vs keyword-first.** Given the Venus address collision, brand-first is defensible — she needs to own her name. Re-decide once Search Console shows how the home page is actually queried. |
| `/about` | `About Kyrin Weidauer \| Hair Stylist, Las Vegas` (46) | `Meet Kyrin Weidauer \| Las Vegas Hair Stylist` (44) | Equivalent. Both lead with her name, which is the point. |
| `/las-vegas-hair-stylist` | mapped to **hair salon spring valley las vegas** | Title and description both lead with "Las Vegas", not Spring Valley | **The clearest mismatch on the site.** The page targets the neighbourhood term but signals the city term. Worth aligning — the city term is not winnable (`COMPETITOR-RESEARCH.md` R6). |
| `/journal/balayage-vs-highlights` | — | Title 67 chars | Over the 60-char target; will truncate in most SERPs. The `\| Beauty by Kyrin` suffix is what pushes it over. |
| `/journal/prepare-for-hair-color`, `/journal/hair-extensions-consultation` | — | 62 and 63 chars | Marginally over. Same cause. |
| `/services/color-and-highlights`, `/services/hair-extensions` | 140–160 | 161 chars each | 1 over. Cosmetic. |
| `/portfolio`, `/faq`, `/visit` | 140–160 | 164, 163, **167** | `/visit` will truncate noticeably. Worth a trim, since it carries the address. |
| `/thank-you` | — | 114 chars | Fine — `noindex`, never shown in a SERP. |

---

## 6. Summary

| Metric | Count |
|---|---|
| Content routes | 22 |
| Indexable routes (in `sitemap.xml`) | 21 |
| `noindex` routes | 1 (`/thank-you`) |
| Total HTML files in `dist/` | 23 (22 + `404.html`) |
| Service pages | 5 — matching the five confirmed services exactly |
| Journal posts live | 3 |
| Journal posts mapped but missing | 5 |
| Pages carrying `FAQPage` markup | 10 (5 services × 4 Q, 3 articles × 2 Q, `/faq` × 10 Q, `/las-vegas-hair-stylist` × 3 reused Q) |
| Pages carrying `Service` schema | 5 |
| Pages carrying `Article` schema | 3 |
| Reviews / testimonials | 0 — deliberately |
| Prices published | 0 — deliberately |
| Content gaps identified | 13 |
| Gaps that are **critical** | 2 — G2 (untested form), G11 (indexing switch) |

**Everything in `site-config.mjs` that is blank is blank on purpose.** An empty value renders as omitted, never as a placeholder, and that property is what makes the JSON-LD graph trustworthy. Each blank is a question for Kyrin, not a gap to fill by inference.
