# Local SEO & GEO Plan — Beauty by Kyrin

**Site:** www.beautybykyrin.com · **Stylist:** Kyrin Weidauer · **Prepared:** 2026-09-18
**Companions:** `SEO-STRATEGY.md`, `COMPETITOR-RESEARCH.md`, `KEYWORD-MAP.md`, `CONTENT-INVENTORY.md`

> ### Status: RECOMMENDATIONS ONLY. NOTHING BELOW HAS BEEN EXECUTED.
>
> No Google Business Profile has been claimed, verified or optimised. No Apple Business Connect listing exists. No Bing Places listing exists. No Yelp claim has been made. No directory submission has been made. No review has been requested, received or published. No social account has been connected — `instagram`, `tiktok`, `facebook` and `yelp` are all empty strings in `site-config.mjs`, which is why `sameAs` is omitted from the JSON-LD entirely.
>
> Every action in this document requires Kyrin's own account, her verification, and in several cases mail or phone verification that only she can complete. Treat this as a work order, not a report.
>
> **No ranking is guaranteed.** Not a map-pack position, not a "near me" result, not an AI citation. These are the actions that make ranking possible.

---

## 1. The problem that defines this plan: the Venus Salon address collision

Kyrin rents one chair inside **Venus Salon**, 8665 W Flamingo Rd Suite 128, Las Vegas NV 89147.

**Venus Hair Salon runs its own website — venushairsalonlv.com — at that exact suite address.** Verified in `COMPETITOR-RESEARCH.md` §2.5, it has a services page, an about page, a contact page, an FAQ, a blog, and **individual per-stylist profile pages** (`/our-stylists/ashley/`, `/our-stylists/charlie/`, `/our-stylists/alison/`). Its own description says the studio "specialises in hair extensions, balayage, hair colouring and haircut services" — an almost exact overlap with Kyrin's five services. Its phone is 702-802-8540.

### What that means, concretely

1. **Google already associates 8665 W Flamingo Rd Suite 128 with an established entity.** Any address-led or "hair salon Flamingo and Durango" query surfaces Venus first. Competing for the address is competing on Venus's home ground with none of its history.
2. **Two businesses at one suite is a classic Google Business Profile duplicate-and-suspension trigger.** A second listing at an address that already has one gets scrutinised. This has to be set up correctly the first time.
3. **The per-stylist pages are the sharpest edge.** If a client searches "Kyrin Venus Salon Las Vegas" and Venus ever publishes a Kyrin profile page, that page — on an older, more established domain — could outrank her own site for her own name. Nothing is more damaging than losing your name to your landlord.
4. **It cuts the other way too.** Being inside an established, findable salon is a genuine trust and wayfinding asset. The goal is not to hide Venus. The site already names it openly — `location: 'Inside Venus Salon'` — and that is correct.

### The strategy, in one line

**Rank on her name and her services. Never compete for the address.**

Three mechanisms:

| Mechanism | What it means in practice |
|---|---|
| **Her own practitioner GBP** | A separate profile for *Beauty by Kyrin* — practitioner-type, not a second salon — at the same address, with her own phone (702-533-8176, distinct from Venus's 702-802-8540), her own name, her own hours. §2 covers the rules that keep it from being merged or suspended. |
| **Name-first positioning** | Every title, every profile name, every directory entry leads with **Beauty by Kyrin** or **Kyrin Weidauer**, never with the address or the salon. The site already does this: `/about` is mapped to `kyrin weidauer hair stylist` and the home title carries the brand. Reinforce it everywhere off-site. |
| **Distinct NAP presentation** | Her name, her phone, the shared address, presented identically everywhere — and never in a form that reads as "Venus Salon". §7 gives the exact string. |

### The neighbourhood, not the city
`KEYWORD-MAP.md` assigns `/las-vegas-hair-stylist` the primary keyword **hair salon spring valley las vegas**, not "hair salon las vegas". That is the right call. "Las Vegas hair salon" belongs to multi-location operators with thousands of reviews. Spring Valley, Rhodes Ranch, Peccole Ranch, the Lakes, the Chinatown/Spring Mountain corridor and Flamingo & Durango are winnable, and she is genuinely there. **One page. Never a page per suburb** — that is a doorway pattern and a spam-policy violation.

---

## 2. Google Business Profile — the single highest-leverage action

GBP signals carry the largest single share of map-pack weight, and photo volume is reported as the second-biggest profile factor (`COMPETITOR-RESEARCH.md` §8, R5, cited to industry sources). For "near me" and Maps intent, **the profile outranks the entire website.** Everything else in this document is secondary to getting this right.

### 2.1 Creation and verification

| Step | Detail |
|---|---|
| Account | Kyrin's own Google account. Not a marketer's, not a shared one. She must own it. |
| Listing type | **Practitioner / individual professional** located within another business. This is the supported pattern for a stylist renting a chair — it is *not* a second salon listing. Naming it as a practitioner listing is what keeps it from being flagged as a duplicate of Venus. |
| Name | `Beauty by Kyrin` — exactly. No descriptors, no keywords, no "Las Vegas", no "Hair Salon" appended. Keyword-stuffed names are a suspension risk and a reported-edit magnet. |
| Address | `8665 W Flamingo Rd Suite 128, Las Vegas, NV 89147`. **Include the suite number.** It is the only thing separating her record from the salon's. |
| Phone | `702-533-8176`. **Must differ from Venus's 702-802-8540.** A shared phone number is the most common cause of two listings being merged. |
| Website | `https://www.beautybykyrin.com` |
| Verification | Likely video verification for a practitioner at a shared address. Expect to be asked to show the exterior, the suite number and her station. Have her record it in one unbroken take. |
| Pin | Drop it precisely. **Then copy the exact latitude and longitude into `site-config.mjs`** (`latitude` / `longitude`), which currently carries a `TODO(launch)` and omits `geo` from the JSON-LD rather than guessing. This is the one code change that should follow directly from the GBP. |

### 2.2 Categories

| Slot | Value | Reason |
|---|---|---|
| **Primary** | `Hair Salon` | The category that competes in the map pack for the terms she wants. `Hairdresser` is the close alternative; `Hair Salon` is the higher-volume local category in US results and matches the `HairSalon` schema type already in the JSON-LD. **(inferred — no volume data available to confirm; re-decide if Search Console shows otherwise.)** |
| Secondary | `Hair Extensions Technician` | Extensions are one of the five confirmed services and a distinct, high-value search category. |
| Secondary | `Beauty Salon` | Broad catch. |
| **Do not add** | Nail salon, barber, makeup artist, eyelash service, day spa, colour correction specialist | Categories she does not serve. Irrelevant categories dilute relevance and invite bad-fit enquiries. |

### 2.3 Description (750 characters)

Must be truthful, must not keyword-stuff, must not name a price, must not claim a credential she has not supplied. A usable draft, built only from confirmed facts:

> Beauty by Kyrin is the independent hair studio of Kyrin Weidauer, working from her own chair inside Venus Salon on West Flamingo Road in Las Vegas, near Flamingo and Durango. She offers balayage, hair color and highlights, haircuts and styling, hair extensions, and hair treatments — one stylist, start to finish, every appointment.
>
> Appointments are by request rather than walk-in, so every visit begins with a real consultation about your hair history, the result you want, and the upkeep it will need. Guests travel from across the valley, including Spring Valley, Summerlin, Enterprise and Henderson.
>
> Call or text 702-533-8176 to talk about your hair, or send a request at beautybykyrin.com.

Note what is absent: no price, no rating, no "best", no years of experience, no licence number, no certification. All unconfirmed.

### 2.4 Services

Add **exactly five**, matching the site's five confirmed services and its URLs — nothing more. A service term that is not on the profile cannot rank from the profile.

| Service name on GBP | Links to |
|---|---|
| Balayage | `/services/balayage` |
| Hair Color & Highlights | `/services/color-and-highlights` |
| Haircuts & Styling | `/services/haircuts-and-styling` |
| Hair Extensions | `/services/hair-extensions` |
| Hair Treatments | `/services/hair-treatments` |

Each takes a short description. **Reuse the service's `lede` from `content.mjs`** so the profile and the site say the same thing in the same voice. Leave every price field **blank** — GBP allows a blank price, and no price exists.

### 2.5 Hours

Venus Salon's general hours are Mon–Fri 9:00am–5:00pm, weekends by appointment. Kyrin books individually inside them. The site handles this by publishing the general hours in `openingHoursSpecification` **and** carrying the sentence "By appointment. Contact Kyrin for availability." on every page.

On GBP: post `Mon–Fri 9:00 AM – 5:00 PM`, leave Saturday and Sunday closed rather than guessing, and put the appointment-only fact in the description and in a pinned Q&A. **Do not post speculative weekend hours.** A profile whose hours are wrong gets "temporarily closed" edits from the public and loses trust fast.

### 2.6 Photos — the second-biggest profile factor

Volume and recency both matter. From day one:

| Type | Count | Source |
|---|---|---|
| Logo | 1 | Needs creating — see the note in `BRAND-DIRECTION.md` §9 about where `--pink` should be pushed hardest. |
| Cover | 1 | Her strongest colour result. |
| Exterior | 3–5 | The building, the signage, the suite door with "128" legible, the parking lot, the approach from Flamingo Rd. **These carry disproportionate weight for a shared address** — they are how a client finds a suite inside someone else's salon, and how a verification reviewer confirms it. |
| Interior | 3–5 | Her station specifically, not a generic salon shot. |
| Team | 1–2 | `assets/kyrin-portrait.webp` already exists. |
| Work | 10+ at launch | The portfolio images in `assets/` — real client work only. |

Then **add new work photos weekly, taken on her phone, geotagged by the phone naturally.** Consistency beats a single large upload. Never upload stock. Never upload another stylist's work.

### 2.7 Q&A — seed it yourself, publicly

GBP Q&A is open to the public. Anyone can ask, and anyone can answer — including a competitor. The correct posture is to **seed the real questions and answer them from the business account**, then upvote the answers. This is explicitly permitted.

Seed these six, using the shipped FAQ answers from `site-config.mjs` verbatim so the profile and the site match word for word:

1. *Do you take walk-ins?* → "No. Beauty by Kyrin is appointment-only, which is what makes a proper consultation possible before any colour or cutting begins…"
2. *Where exactly are you inside the building?* → Suite 128, inside Venus Salon, near Flamingo and Durango. **This is the answer that resolves the address collision for a real human standing in the parking lot. Prioritise it.**
3. *How much will my appointment cost?* → "Ask Kyrin for a personalized quote before your service is agreed…" (the site's exact wording — no number)
4. *How long does a colour appointment take?* → "Plan for two to four hours for most colour work…"
5. *Are appointments available on weekends?* → "Contact Kyrin for current availability…"
6. *What if I don't know which service I want?* → the "Help me choose" answer from the FAQ.

Monitor Q&A monthly. An unanswered or wrongly-answered question sits on the profile indefinitely.

### 2.8 Ongoing
- **Google Posts** every 1–2 weeks: a new result, an opening, a seasonal note. Posts are short-lived but signal an active profile.
- **Products/Services** kept in sync with the five. If a sixth service is ever confirmed, the site and the profile change in the same week.
- **Check monthly for suggested edits** from the public. At a shared address, expect attempts to merge her listing into Venus's. Reject them.
- **Never buy, trade or incentivise anything on the profile.**

---

## 3. Apple Business Connect

Directly feeds Apple Maps, Siri and Spotlight. On iPhone — which is how most of this category is browsed — Apple Maps is the default, not Google Maps. It is under-used by every competitor in the research set, which makes it cheap ground.

| Field | Value |
|---|---|
| Name | Beauty by Kyrin |
| Category | Hair Salon (plus Beauty Salon if a second is allowed) |
| Address | 8665 W Flamingo Rd Suite 128, Las Vegas, NV 89147 |
| Phone | 702-533-8176 |
| Website | https://www.beautybykyrin.com |
| Hours | Mon–Fri 9:00 AM – 5:00 PM; note appointment-only |
| Photos | The same exterior/interior/work set as GBP |
| Place Card action | Link to `/book`. Do **not** connect a booking platform — none exists (`NEXT_PUBLIC_BOOKING_URL` is blank). |

Verification is typically by phone or postcard. Same suite-number discipline applies.

---

## 4. Bing Places

Feeds Bing, and through Bing, **Microsoft Copilot** — a real answer-engine surface. Bing Places can import directly from a verified Google Business Profile, so **do this after §2**, not before: the import guarantees NAP consistency for free.

Then verify manually that the suite number survived the import, add the same photo set, and connect Bing Webmaster Tools (`BING_SITE_VERIFICATION` in `.env.example` accepts the token).

---

## 5. Yelp

Yelp matters in this category whether or not anyone likes it: it ranks for "hair salon las vegas" queries, it is a common review destination, and **a listing probably already exists whether or not she created it.**

1. **Search Yelp for "Beauty by Kyrin", "Kyrin Weidauer" and the address first.** Claim an existing listing rather than creating a duplicate.
2. Claim it, set the exact NAP from §7, add photos, add the five services.
3. `site-config.mjs` has a `yelp` field, currently empty. Once the listing is claimed, that URL goes in — and it then flows automatically into `sameAs` on both the `HairSalon` and the `Person` nodes in the JSON-LD.
4. **Do not pay for Yelp advertising** as a local-SEO tactic. It buys ad placement, not ranking.
5. **Critical:** Yelp's Terms of Service **prohibit soliciting reviews.** The review workflow in §8 must route to Google, never to Yelp. Asking for a Yelp review can get reviews filtered and the listing penalised.

---

## 6. Industry and general directories

Submit only where the listing will be accurate and maintained. Ten good citations beat a hundred auto-generated ones, and a wrong citation is worse than no citation.

| Tier | Directory | Notes |
|---|---|---|
| **Do first** | Google Business Profile | §2 |
| | Apple Business Connect | §3 |
| | Bing Places | §4 |
| | Yelp | §5 — claim, never solicit |
| | Facebook Page | Functions as a citation even with no posting cadence. Once created, the URL goes into `site-config.mjs` → `sameAs`. |
| | Instagram business profile | §9 |
| **Do next** | StyleSeat | Stylist-specific, strong for practitioner searches. |
| | Vagaro / Booksy | Directory listings are useful even without using them for booking. **Never let a platform profile outrank the site for her own name** (`COMPETITOR-RESEARCH.md` R14). |
| | Nextdoor Business | Genuinely strong for Spring Valley neighbourhood intent. |
| | Bing/Apple-adjacent aggregators (Data Axle, Foursquare) | Feed many downstream directories from one correct record. |
| | Las Vegas / Spring Valley chamber or neighbourhood business listings | Local relevance, and often a real followed link. |
| **Only when they become true** | Certification-body stylist locators (e.g. extension-method locators) | `COMPETITOR-RESEARCH.md` notes these exist and are a real referral and link channel. **Only if Kyrin actually holds the certification.** `certifications` in `site-config.mjs` is an empty array. Do not list her as certified in anything unverified. |
| **Never** | Paid link packages, bulk citation blasts, PBNs, "guaranteed #1" services | Spam-policy violations, and the cleanup costs more than the listings ever return. |

**Directory hygiene:** keep one plain-text file with the exact NAP string, the description, the category set and the photo set. Every submission copies from that file. Never retype it.

---

## 7. NAP consistency — the exact strings

Google resolves an entity partly by matching name/address/phone across the web. At a **shared address** that matching is the whole ball game, because the competing signal is a legitimate, established business at the same coordinates. Variation is what lets the two records blur together.

### The canonical NAP — copy and paste this, byte-identical, everywhere

```
Beauty by Kyrin
8665 W Flamingo Rd Suite 128
Las Vegas, NV 89147
702-533-8176
```

### Single-line form, for directory fields that take one line

```
Beauty by Kyrin, 8665 W Flamingo Rd Suite 128, Las Vegas, NV 89147, 702-533-8176
```

### The rules

| Field | Rule |
|---|---|
| **Name** | `Beauty by Kyrin`. Never "Beauty by Kyrin — Las Vegas", never "Beauty by Kyrin Hair Salon", never "Kyrin @ Venus Salon". Where a platform has a separate practitioner-name field, use `Kyrin Weidauer`. |
| **Street** | `8665 W Flamingo Rd` — abbreviated `W`, abbreviated `Rd`, no period. Not "West Flamingo Road". |
| **Suite** | `Suite 128`. Not `Ste 128`, not `#128`, not `Unit 128`. **Never omit it.** The suite is the field that distinguishes her record from the salon's. |
| **City/State/ZIP** | `Las Vegas, NV 89147`. Two-letter state, no ZIP+4. |
| **Phone** | `702-533-8176` with hyphens. Not `(702) 533-8176`, not `702.533.8176`. The site stores both display (`702-533-8176`) and `tel:` (`+17025338176`) forms in `site-config.mjs`. |
| **Website** | `https://www.beautybykyrin.com` — https, with `www`, no trailing slash. This is `site.origin`, and it is what every canonical on the site uses. |
| **Venus Salon** | May be mentioned as *wayfinding context* ("inside Venus Salon") in a description or a Q&A. **Never inside the business-name field, and never inside the address field.** That is what creates a merge. |

### What the site currently renders
The footer shows `Inside Venus Salon / 8665 W Flamingo Rd, Suite 128 / Las Vegas, NV 89147` and the JSON-LD `PostalAddress.streetAddress` is `8665 W Flamingo Rd, Suite 128`. Both include a comma before "Suite" where the canonical string above does not. This is a cosmetic difference that Google normalises, and it is **not** worth a code change on its own — but if the address line is ever edited for another reason, align it to the canonical form then. `site-config.mjs` already stores `streetAddress` and `suite` as separate fields, so the pieces are available.

---

## 8. Review generation — FTC-compliant, and non-negotiable

She starts at zero. Review quantity, quality, recency and keyword content all feed local ranking, and `COMPETITOR-RESEARCH.md` R12 rates a simple post-appointment ask, sent every time, as compounding faster than anything else available.

### The four hard rules

| Rule | Detail |
|---|---|
| **Never incentivised** | No discount, no free service, no product, no raffle, no loyalty points, no "leave a review and get…". The FTC's rule on consumer reviews and testimonials prohibits offering compensation conditioned on a review's sentiment, and platforms independently prohibit incentives of any kind. A discovered incentive can wipe the review history. |
| **Never fabricated** | No review written by Kyrin, by a friend, by a family member, by a marketer, or by any tool. `testimonials` in `site-config.mjs` is an empty array **on purpose**, and the site omits the reviews section and `AggregateRating` together. Fake reviews are an FTC violation with civil penalties and a Google suspension trigger. |
| **Never gated** | No "how did we do?" pre-screen that routes happy clients to Google and unhappy clients to a private form. Review gating is prohibited by Google's policies and is treated by the FTC as a deceptive practice. **Every client gets the same link.** |
| **Never solicited on Yelp** | Yelp's ToS prohibits requesting reviews. Ask for Google. |

### The workflow

**Step 1 — ask in person, at the chair, at the end of the appointment.** Once, plainly, with no pressure:

> "If you're happy with how this turned out, a Google review really helps people find me — I'm still new here and I'm inside someone else's salon, so it's hard to be found. No pressure at all either way."

That second clause is true and it is the most persuasive thing she can say.

**Step 2 — follow up by text within 24 hours**, while the hair still looks fresh:

> "So good to see you today! If you'd like to leave a review, here's the link: [link]. And if anything isn't sitting right, text me first — I'd rather fix it."

Both halves matter. The second is **not** gating: the review link is given unconditionally and first. It is an offer to fix a problem, alongside the link, not instead of it.

**Step 3 — use the short GBP review link.** Once the profile exists, set `NEXT_PUBLIC_GBP_REVIEW_URL` in Vercel. The site already reads it (`googleReviewUrl` in `site-config.mjs`) and **hides the review button entirely while it is blank** — so setting the variable is the whole of that feature's launch work. No code change.

**Step 4 — reply to every review, good and bad.** Within a few days. Thank by first name; mention the service naturally ("so glad the balayage grew out the way you wanted") — genuine service keywords in the thread are a real relevance signal. For a negative review: acknowledge, apologise for the experience, offer to make it right offline. Never argue, never mention a price, and **never disclose anything about the client**.

**Step 5 — log it.** A dated line per ask: client first name, date, service, asked / reviewed. Not for Google — for Kyrin, so the ask actually happens every time. The ask-every-time habit is the entire mechanism.

**Step 6 — do not build a reviews page or add `AggregateRating` until real reviews exist**, and then only from genuine, attributable, permission-given reviews. `/reviews` currently 302s to `/faq`; when a real page exists, repoint it and make it a 301.

### If a fake or malicious review appears
Report it through GBP's flagging flow, reply publicly and factually once, and keep asking real clients. Volume of genuine reviews is the only durable defence.

---

## 9. Instagram and TikTok

Both are empty in `site-config.mjs` (`instagram`, `tiktok`), so the icons are hidden and `sameAs` is omitted. `script.js` already contains an `instagram_click` tracking event — the wiring exists and waits for a handle.

**Why this is a local-SEO item and not a social-media item:** for a solo stylist, Instagram is often the *first* place a prospective client checks after a referral, and it is frequently the top brand result for her name. It has to point back to the site, and it has to carry the same NAP.

| Item | Rule |
|---|---|
| Handle | The same on both platforms, as close to `beautybykyrin` as availability allows. One handle, everywhere, forever. |
| Display name | `Beauty by Kyrin` + `Kyrin Weidauer` — name-first, matching the canonical NAP. |
| Bio | Must contain **Las Vegas** and **Spring Valley** or **Flamingo & Durango** in plain text, the appointment-only fact, and the phone. Location words in a bio are how these platforms' own search finds her. |
| Link | `https://www.beautybykyrin.com` — the site, not a link-in-bio aggregator. An aggregator inserts a page she does not own between the profile and the site. If one is genuinely needed, the site's own `/book` is the better destination. |
| Profile location | Tag the business location consistently. If the platform offers Venus Salon's location tag, use it for wayfinding on *posts* but keep the profile's own identity as Beauty by Kyrin. |
| Category | Hair Salon / Beauty, Cosmetic & Personal Care. |
| Content | Her own work only, with permission. No reposted results from other stylists, no stock, ever. The same standard the site holds. |
| Cross-link | Once the handles exist, set them in `site-config.mjs` → they flow automatically into `sameAs` on the `HairSalon` **and** the `Person`. That is a direct entity-consolidation win against the address collision. |
| Platform ranking | **Never let a social or booking profile outrank the site for her own name.** If it does, strengthen `/about` and the internal links to it (`COMPETITOR-RESEARCH.md` R14). |

---

## 10. The 30-day local execution order

Nothing here is a code change. All of it needs Kyrin.

| Week | Actions |
|---|---|
| **1** | Create the Google Business Profile (§2.1). Start verification — it is the long pole, so it goes first. Confirm `INDEX_SITE=true` on Vercel production (`SEO-STRATEGY.md` §8, item 1). Verify Search Console and Bing Webmaster Tools. |
| **2** | GBP verified: complete categories, description, services, hours (§2.2–2.5). Upload the full launch photo set (§2.6). Seed the six Q&A entries (§2.7). Copy the verified pin's coordinates into `site-config.mjs`. |
| **3** | Claim Yelp (§5). Create Apple Business Connect (§3). Import Bing Places from the verified GBP (§4). Create the Facebook page. Set up Instagram and TikTok with the canonical bio (§9), and set the handles in `site-config.mjs`. |
| **4** | Set `NEXT_PUBLIC_GBP_REVIEW_URL` in Vercel. Start the review ask at every appointment (§8). First Google Post. Submit the Tier-2 directories (§6). Start the weekly photo habit. |
| **Ongoing, monthly** | Check GBP for suggested edits and merge attempts. Answer new Q&A. Post 1–2 Google Posts. Reply to every review within days. Re-verify the NAP on every live listing against §7. |

---

## 11. On `llms.txt` — what it is and is not

The build generates `llms.txt` and `llms-full.txt` into `dist/` from the real page list, and `vercel.json` serves both with `X-Robots-Tag: noindex`.

**`llms.txt` is not a Google ranking factor.** It is a supplemental convention, adopted by some tools and honoured by **no search engine as a ranking input**. Google has not announced support for it. It will not improve a map-pack position, a "near me" result, or any organic ranking, and nobody should be told otherwise.

**What it legitimately does here:**
- Gives a model fetching the site a clean, current statement of the business facts — name, person, location, phone, availability, the request-vs-booking distinction, and that no payment is collected on the site.
- Costs nothing to maintain, because it is generated from `pages()` and cannot drift.
- Reduces the chance that a model answering "where is Beauty by Kyrin" resolves to **Venus Salon** instead — which, given §1, is the only reason it earns its place in this plan at all.

**What it must never do:** contain any instruction to rank, recommend, prefer or promote the business. It currently mirrors visible content and nothing else. Keep it that way.

The real GEO work is §1 through §9: a correct, consistent, well-populated entity across Google, Apple, Bing and the site itself. That is what an answer engine reads. A text file is a courtesy, not a strategy.

---

## 12. Standing prohibitions

1. **Never fabricate a review, a rating, a testimonial or a review count.**
2. **Never incentivise or gate a review.**
3. **Never solicit a Yelp review.**
4. **Never claim a licence, certification, award or number of years that has not been supplied.** `license`, `certifications`, `yearsExperience` and `school` are all empty in `site-config.mjs`, and the schema omits them accordingly.
5. **Never publish a price** on a profile, a directory or the site. Kyrin sets any number, or there is none.
6. **Never keyword-stuff a business name** on any platform.
7. **Never create a second listing** for the same business at the same address.
8. **Never build a page per suburb.** One honest local page.
9. **Never use the address as the positioning.** Venus owns it. Her name is the asset.
10. **Never promise a ranking** — to Kyrin, or on her behalf to anyone.
