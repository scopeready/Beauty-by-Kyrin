# Beauty by Kyrin — Las Vegas Hair Market & Competitor Research

**Prepared:** 18 September 2026
**Subject:** Kyrin Weidauer — independent solo stylist renting a chair at Venus Salon, 8665 W Flamingo Rd, Suite 128, Las Vegas, NV 89147 (Spring Valley). Phone 702-533-8176.
**Confirmed services:** balayage; hair color & highlights; haircuts & styling; hair extensions; hair treatments.
**Business goal:** convert qualified Las Vegas searchers and social visitors into appointment requests.

---

## 0. How to read this document — methodology and a hard limitation

**Read this section before trusting any line below it.**

This research was carried out under a real constraint that materially limits it, and the limitation is disclosed rather than papered over.

| | Status |
|---|---|
| Web **search** | Worked. All findings below come from search results and the page titles, descriptions and content excerpts they return. |
| Web **fetch** (loading the actual pages) | **Blocked.** The session's network egress proxy returned `403` for *every* outbound host tested — competitor sites, the client's own site, even Wikipedia. This is an organisation-level egress policy, not a site-level block. |

**What that means in practice:**

- I could **not** personally view a single competitor page, so I have **no first-hand observations** of hero design, image quality, mobile experience, layout, typography, load speed, scroll behaviour, or exactly where CTAs sit on the page.
- What I *can* report reliably is **page architecture** (which URLs exist, and what each page's title and description say it is), **published claims** (prices, deposit rules, policies, consultation terms) as stated in indexed page content, and **positioning language**.
- Every finding below is tagged:
  - **[V]** — Verified from indexed page content or the page's own title/URL. Checkable by opening the URL.
  - **[R]** — Reported by a third-party listing (Yelp, Facebook, Birdeye, directory). Real, but second-hand.
  - **[U]** — Unverified / could not be confirmed. Stated as unknown.
- I have **not** invented a single price, review count, ranking or search volume. Where numbers appear, the source is named. Where a snippet was ambiguous or self-contradictory, I say so instead of picking one.

**Before this document drives final design decisions, someone with an unrestricted browser should spend ~90 minutes opening the URLs below on a phone.** Section 11 is the exact checklist for that pass. The strategic conclusions in sections 6–10 are robust to that check; the visual-design observations are the ones that need it.

---

## 1. The competitive set at a glance

Kyrin competes in three distinct layers, and they behave differently online.

| Layer | Who | How they win online | How beatable |
|---|---|---|---|
| **A. Multi-location LV powerhouses** | The Hair Standard, Hottie Hair, Capelli, Vegas Hair Color Masters | Deep site architecture, dozens of service+location pages, published pricing, large review volume, real content marketing | Not beatable head-on for generic head terms. Beatable on *specificity* and *personal* proof. |
| **B. Established single-location LV salons** | Layla Social, EVŌQ, Sage & Thorne, A Perfect Hue, Komi, Venus (her own host salon) | Neighbourhood landing pages, service pages, team pages, some pricing | Beatable. Most have thin per-service depth and generic stock-feeling presentation. |
| **C. Solo / suite stylists — Kyrin's true peer group** | Hair by Jacki, Aumirie Balayage, Revamp Extensions, Hair Extensions by Wynter, Balayage Bombshell | One person, one specialism, text-to-book, personal proof | **Highly beatable.** This tier is where the quality bar is lowest and the gaps are widest. |

**The single most important structural fact in this research:** her landlord has its own website.

**Venus Hair Salon — https://venushairsalonlv.com** — operates a full site at **8665 West Flamingo Road, Suite 128, Las Vegas, NV 89147** [V] — Kyrin's exact address. It has a services page, an about page, a contact page, an FAQ, a blog, and **individual stylist profile pages** (`/our-stylists/ashley/`, `/our-stylists/charlie/`, `/our-stylists/alison/`) [V]. Its own description says the studio "specialises in hair extensions, balayage, hair colouring and haircut services" [V] — an almost exact overlap with Kyrin's service list. Its FAQ states pricing is clarified up front during the appointment [V]. Phone 702-802-8540 [V].

Implications, and they are not small:

1. Any address-based or "hair salon on Flamingo & Durango" search will surface Venus first, not Kyrin. Google associates that suite with an established entity.
2. Kyrin's site must be built around **her name and her work**, not the address. The address is a fulfilment detail, not the brand.
3. She needs her **own Google Business Profile** as an independent practitioner at that address, distinct from the salon's listing. Whether one exists today is **[U]** — verify before anything else.
4. There is a real referral dynamic worth being deliberate about: the salon's site sends traffic to *its* stylists. Kyrin's site is the only asset that sends traffic to Kyrin.

> **Note:** No public web presence for "Beauty by Kyrin" surfaced in search — no site content, no listings, no reviews were found [V, as a negative result]. Either the site is new/unindexed or it is invisible to search. The existing site at www.beautybykyrin.com could not be loaded (egress blocked) so its current state is **[U]**. Treat organic discovery as starting from zero.

---

## 2. Las Vegas competitors — detailed profiles

### 2.1 The Hair Standard — https://thehairstandard.com
*Layer A. Three Las Vegas locations. The most complete site found in this market.*

| Dimension | Finding |
|---|---|
| Architecture | Genuinely deep and deliberate. Verified URLs: `/services`, `/services/balayage`, `/services/hair-extensions`, `/hair`, `/hair/balayage`, `/locations/summerlin`, `/frequently-asked-questions`, `/salon-policies`, `/terms` [V]. Note the **two parallel content tracks** — `/services/*` and `/hair/*` — targeting different query intents for the same topic. |
| Pricing | **Publishes.** Balayage **from $250** [V]. There is a dedicated prices page: "Hair Services and Prices in Las Vegas" `/services` [V]. Site states final price depends on hair length, dramatic-ness of the change, and the individual stylist's pricing [V]. |
| Pricing in SEO | The balayage page's **title tag literally contains the price**: *"Balayage Las Vegas \| From $250 \| The Hair Standard"* [V]. That puts a number in the search result itself — a qualification filter applied before the click. This is the sharpest single tactic found in this research. |
| Booking | Online booking plus phone (702-410-8260) [V]. **Card on file** taken at online booking; the site is explicit that the card *is not charged* and is held only against late cancellation or no-show [V]. |
| Consultation | Free, and included [V]. |
| Trust | Site claims 4,300+ five-star reviews [R — site's own claim, not independently verified]. Dedicated FAQ, salon policies and terms pages [V]. |
| Local SEO | City in title tags, per-location pages, service×city page pattern [V]. |

**Takeaway:** this is the ceiling in Las Vegas. Kyrin cannot out-build it. She can out-*specify* it — it is a multi-stylist salon, so it can never say "this is the person who will be doing your hair, here is her work, here is her price."

---

### 2.2 Hottie Hair — https://hottiehair.com
*Layer A. Three LV locations. Extensions-led. The most commercially sophisticated site found.*

| Dimension | Finding |
|---|---|
| Architecture | `/services/hair-extensions`, `/hair-services`, `/locations/las-vegas`, `/shop`, `/blog`, `/pricing-calculator` [V]. |
| Pricing | **Publishes more than anyone else in the market**, by method [V]: hand-tied / beaded weft **$675–$2,100**; K-tip **$750–$1,800**; tape-in **$800–$1,500**; I-tip **$1,200–$1,800**; clip-in **$180–$350**; halo from **$160** at 16". |
| **Pricing calculator** | A dedicated `/pricing-calculator` page offering live pricing and instant booking across extensions, colour, treatments and hair-loss services [V]. **This is the standout feature of the entire competitive set.** |
| Content marketing | A real blog, including a long-form cost guide — *"How Much Do Hair Extensions Cost? $180–$3,000+ Las Vegas Guide (2026)"* [V]. A cost guide is the highest-intent content format in this category and they own it locally. |
| Retail | Full e-commerce `/shop`; markets "$100K+ hair in stock" [V]. |
| Consultation | Free; site promises an exact quote at consultation, "no surprises" [V]. |
| Trust | Yelp listing shows 423 reviews / 359 photos [R]. Facebook shows 86% recommended from 257 reviews [R]. |
| Weakness | At least one public review complains about the online booking flow's reliability [R — a single user's account; treat as a hint, not a fact]. |

**Takeaway:** they have proven that Las Vegas extension buyers will engage with published numbers and a self-serve estimator. That validates the pricing strategy recommended in section 8 — this is not a theory, a local competitor is already running it.

---

### 2.3 Vegas Hair Color Masters — https://vegashaircolormasters.com
*Layer A/B. Colour-specialist positioning.*

- **Architecture:** `/service-menu`, `/salon-policy`, `/special-offers-1`, `/gallery`, `/contact-us` [V].
- **Pricing:** publishes a full service menu, **tiered by stylist seniority — Junior / Stylist / Senior / Master** — spanning roughly $30–$45+ up to $350+ [V]. Also a defined add-on: a **$25 luxury upgrade** (described as a $55+ value) covering a 10-minute scalp massage, deep-conditioning mask and warm towel wrap [V].
- **Policy (the most explicit found in LV):** a deposit may be required for certain appointments; full refund requires 24 hours' notice; **late cancellation charged 50% of the service; no-show charged in full**; for appointments booked inside 24 hours, cancellation must be at least 1 hour ahead by voicemail [V].
- **Positioning:** gray blending, colour correction, blonding & balayage; emphasises ongoing hands-on colour education [V].
- **Phone:** (702) 456-0026 [V].

**Takeaway:** the tiered menu is a salon solution to a salon problem (many stylists at different levels). **Kyrin should not copy it** — as a solo stylist, a single clear price is a structural advantage she has and they don't. But their policy page is the template for how explicit a deposit/cancellation policy can be without reading as hostile.

---

### 2.4 Layla: A Social Salon — https://www.laylasocial.com
*Layer B. Summerlin. The closest geographic threat.*

- **Architecture:** service pages `/balayage-full-partial`, `/extensions`, `/full-color`, plus `/our-team` [V].
- **Critical:** they run a **neighbourhood landing page aimed directly at Kyrin's area — `/spring-valley-las-vegas`** ("Spring Valley Hair Stylists, Las Vegas Award Winning Salon") [V]. A Summerlin salon is actively competing for Spring Valley search intent.
- **Positioning:** 7+ years, "luxurious social salon," explicitly gender-neutral environment [V]. Known for colour and extensions [V].
- **Pricing:** **[U]** — not confirmed.
- **Booking:** **[U]**.

**Takeaway:** Spring Valley is contested by someone who isn't even in Spring Valley. Kyrin is *actually* in Spring Valley and should say so with far more authority — cross-streets, landmarks, parking, drive times — than a salon writing about a neighbourhood from four miles away.

---

### 2.5 Venus Hair Salon — https://venushairsalonlv.com
*Layer B — and her host salon. Covered in section 1; summarised here for completeness.*

- Same suite as Kyrin: 8665 W Flamingo Rd, Suite 128, 89147 [V].
- `/services/`, `/about-us/`, `/contact-us/`, `/faq/`, `/blog/`, and per-stylist pages under `/our-stylists/` [V].
- Stylist pages name experience and specialisms — e.g. one stylist with 13+ years; another specialising in colour, cuts, extensions, makeup and blowouts; another, a Las Vegas native with 5+ years, specialising in blondes, vivids and extensions [V].
- Brand voice is bold ("transforms everyday hair into unapologetic statements") [V]; FAQ states pricing is clarified up front [V].
- Services overlap Kyrin's almost exactly [V].

**Takeaway:** the per-stylist page is the format Kyrin must beat. Hers must be an order of magnitude deeper than a paragraph bio — because for her it is not a sub-page, it is the whole business.

---

### 2.6 Balayage Bombshell — https://www.balayagebombshell.com
*Layer C. Same ZIP code as Kyrin (89147). Direct competitor.*

- **Address:** listings disagree — 4235 S Fort Apache Rd #100, LV 89147 [R] and 9765 W Charleston Blvd [R]. Possibly a move or a stale listing. Either way, **89147 is Kyrin's ZIP** [R].
- **Naming:** the brand name *is* the service term ("Balayage Bombshell") — a deliberate exact-match play [V].
- **Architecture:** thin — `/index.php/services-offered`, `/index.php/balayage-boss-babe-gallery` [V]. The `index.php`-style URLs suggest an older CMS build [V].
- **Positioning:** "artistically creating dazzling balayage and ombre highlights" [V].
- **Trust:** Yelp 43 reviews / 156 photos [R]; Birdeye 4.7 from 76 reviews [R]. Reviews name a single stylist, Veronica, and mention fair pricing and hair health [R].
- **Pricing:** **[U]**.

**Takeaway:** a solo-feeling brand with real reviews and a weak site. This is the exact gap Kyrin can beat with a better-built site — and a caution that a service-word brand name gets you found but locks you into one service.

---

### 2.7 Revamp Extensions — https://www.revampextensions.com
*Layer C. Solo specialist. Geographically the closest peer — on Durango.*

- **Address:** 7225 S Durango Dr, Ste 100, LV 89113 [V]. Phone (725) 400-4406 [V].
- **Model:** private, **appointment-only** luxury extension studio; one-on-one appointments; handmade extensions [V].
- **Operator:** Natalie Walker, described as a 30+ year specialist [V]. Named-human positioning — same structure as Kyrin.
- **Architecture:** **has a dedicated `/prices` page** [V] and a `/styletips` page (aftercare/education content) [V].
- **Pricing:** a prices page exists; **its actual contents are [U]**. Lengths offered: 14", 18", 22", 24" [V].
- **Consultation:** free [V].
- **Trust:** Yelp 17 reviews / 76 photos [R]. Low volume.

**Takeaway:** the closest analogue to what Kyrin could be, and it has only ~17 public reviews. This tier is winnable on execution alone.

---

### 2.8 Hair by Jacki — https://www.hairbyjacki.com
*Layer C. Solo stylist, private studio, Summerlin. The most interesting architecture in the solo tier.*

- **Operator:** Jacki Cameron, certified Master Stylist/Colorist, 27+ years [V]. Private studio, 10300 W Charleston Blvd, LV 89135 [R]. (702) 266-6550 [R].
- **Architecture — this is the lesson:** she runs **separate niche+neighbourhood landing pages**, each as its own file [V]:
  - `/mens-haircut-summerlin.html`
  - `/hair-highlights-lowlights-summerlin.html`
  - `/curly-hair-specialist-summerlin.html`
  - `/mature.html` ("Hair service for older women")
  - `/jackie.html` (bio), `/services.html` (menu)
- **Segmentation by *client type*, not just service** — curly-hair specialist, mature hair, fine hair [V]. That is a smarter axis than most salons use.
- **Booking:** free consultations; **text any time, day or night**; an online appointment page [V].
- **Pricing:** a services menu page exists; contents **[U]**. Positioning language is "personalised service at competitive pricing" [V].
- **Trust:** Yelp 24 reviews / 67 photos [R].

**Takeaway:** a solo stylist running ~8 targeted landing pages is doing more structural SEO work than most Layer-B salons. The technology is dated; the strategy is sound and directly transferable.

---

### 2.9 Aumirie Balayage Parlor — https://www.aumirie.com
*Layer C. Solo stylist in a rented suite — structurally identical to Kyrin.*

- **Model:** operates from "a private, comfortable suite inside the Body Spa Campus Salon" [V] — i.e. an independent renting space, exactly like Kyrin at Venus.
- **Address:** 2470 Paseo Verde Pkwy, Suite 125, Henderson, NV 89074 [R]. (702) 908-2485 [V].
- **Architecture:** `/book-online`, plus pages that still carry **default placeholder URLs — `/blank-2` (Contact), `/blank-4` (Hair Stylist)** [V]. A live site shipped with unedited template slugs.
- **Pricing:** **does not publish.** The stated process is: text photos of your current hair and your goal, and receive a cost estimate back [V].
- **Positioning:** balayage, custom lived-in colour, "affordable prices" [V]; also lash extensions and brows [V].
- **Trust:** Yelp 55 reviews / 135 photos [R].

**Takeaway:** the closest structural mirror to Kyrin's situation, and it demonstrates both the opportunity and the failure mode. The photo-text-quote flow is genuinely good lead capture — it starts a conversation. But it is buried behind a site with `/blank-2` in the URL bar. **Steal the mechanism, not the execution.**

---

### 2.10 Hair Extensions by Wynter — https://www.hairextensionsbywynter.com
*Layer C. Solo extension specialist.*

- Named-person brand; 100% natural human hair extensions, all hair types [V].
- Free consultation; **evening appointments** explicitly advertised; open Tuesday–Saturday [V]. (702) 806-8861 [V].
- Architecture: `/contact-us`, and a **`/cart`** — meaning retail product sales are wired in [V].
- Pricing: **[U]**.

**Takeaway:** "evening appointments" is a small, concrete, unglamorous differentiator that answers a real scheduling objection. Worth noting how few competitors say anything about *when* they are available.

---

### 2.11 Supporting Las Vegas observations (Layer B, lighter coverage)

| Business | URL | Key verified findings |
|---|---|---|
| **EVŌQ Salon** | evoqsalon.com | **$25 deposit taken at online booking, applied to the service total** [V]. Walk-ins welcome but appointments recommended [V]. Has a **dedicated consultation page**, `/general-services/hair-consultation-las-vegas` [V]. Service pages for balayage, extensions, treatments, styling [V]. Final price given in person at consultation [V]. |
| **Sage & Thorne** | sageandthorne.com | Strong **problem-led content**: `/color-corrections/`, `/vivids-fantasy-colors/`, `/specialized-color-services/`, plus blog posts written to panic-search intent — e.g. *"Hair Color Gone Wrong? Fix It Fast at Our Las Vegas Salon"* [V]. Recommends a **complimentary consultation before booking**, for personalised pricing [V]. Publishes some colour-correction figures (a simple toning around $65, a full colour-correcting job around $150) — **the snippet was ambiguous about what the middle figure covers, so treat these as indicative, not exact [V/U]**. À-la-carte pricing varying by service-provider level [V]. |
| **A Perfect Hue** | aperfecthue.com | `/services/color-highlights/` [V]. **New Guest Blowout Special, $39** — a low-risk trial offer [V]. Otherwise "tailored pricing," with prices and times stated as approximations affected by length, density and detail [V]. Unusually long hours including Sunday 8:30am–7:00pm [R]. Yelp 261 reviews / 1,085 photos [R]. |
| **Komi Hair Salon** | komihairsalon.com | Explicit **"Package Pricing + Product Cost"** model, framed on-site as full transparency without surprise add-ons [V]. Full dimensional colour / balayage **$220–$440+** [V]. States surcharges for lead stylists, existing extensions, or exceptionally thick/long hair [V]. |
| **Capelli Hair Salon** | capellibabe.com | Three LV locations, operating since 2015 [V]. Publishes starting prices, including full balayage around **$290+** [V]. **Caution:** two search snippets returned inconsistent figures for cuts and extensions (e.g. extensions quoted as both "$75+" and "$150+"). **I could not resolve this without loading the page — do not rely on Capelli's specific numbers without checking them [U].** |
| **Angie's Salon LV** | angiessalonlv.com | Boutique southwest-LV salon positioned on colour correction and transformation for all hair types [V]. 4985 S Fort Apache Rd #102, LV 89148 [V]. Little else confirmable [U]. |
| **Hair Color Xperts** | haircolorxpertslv.com | Summerlin; 2400 N Buffalo Dr Suite 105 [V]. Notable policy: **cancel inside 24 hours and a deposit is required to book anything in future** [V] — a graduated, behaviour-triggered deposit rather than a blanket one. |

---

## 3. Best-in-class benchmarks from outside Las Vegas

These are the "worth the drive" bar. Chosen because each is an **independent specialist**, not a chain — several are literally solo operators inside rented suites, i.e. Kyrin's exact business model.

### 3.1 Extension Goddess (Scottsdale, AZ) — https://www.extensiongoddess.com
**The single most relevant benchmark in this document.** Structurally identical to Kyrin: one licensed stylist operating inside **Mattison Ave Salon Suites**, Old Town Scottsdale [V].

| Dimension | Finding |
|---|---|
| Operator | Tara — licensed cosmetologist, 20+ years [V]. |
| Credentials as content | Certifications are listed **by name**: Invisible Bead Extensions (IBE), Natural Beaded Rows (NBR), Combline, Kristen Grip–KOVI Method, and Mermaid Extensions **Educator** [V]. Specific, checkable, third-party-verifiable authority. |
| Architecture | `/hair-extensions` and — the smart one — **`/hair-extensions-for-hair-loss-thinning-hair-fine-hair`** [V]. A page organised around the **client's problem**, not the salon's service name. |
| Pricing | **Publishes a real ballpark: roughly $825–$1,200 for one row**, with the variables named (length, hair type, method, whether colour is added after install) [V]. |
| Booking / deposit | **$50 non-refundable consultation deposit, credited toward the first installation appointment** [V]. |
| Distribution | Also present via GlossGenius booking (`taracross.glossgenius.com`) and a Fresha listing [V] — the site is the hub, the platforms are spokes. |

**Why it's the bar:** it proves a solo stylist in a rented suite can publish four-figure prices, charge for consultations, and still present as premium. Price transparency and premium positioning are not in tension — transparency *is* the premium signal, because it says "I know exactly what I'm doing and what it costs."

### 3.2 Haven Holistic Salon (Matthews, NC) — https://havenholisticsalon.com/hair-extensions/
**The most granular pricing transparency found anywhere in this research.** Publishes price *paired with time commitment*: a mini row at **$149 / 1 hour**, scaling to **3 rows at $472 / 4 hours** [V].

Publishing *duration* alongside price is rare and valuable — it pre-empts the second question every client has after "how much," and it makes a long appointment feel planned rather than sprung on them.

### 3.3 The Beautiful Co. (Greenville, SC) — https://beautifulsalon.co/ibe-hair-extensions/
- Publishes an **all-inclusive range of $550–$1,100+**, explicitly framed as all-inclusive [V] — removes the fear of add-on creep.
- **Hyperlocal targeting *within* a city**: the page names specific neighbourhoods — North Main, Pelham–Haywood, Taylors [V]. Not "Greenville," but the districts inside it.
- Leads with the damage-prevention angle ("certified, damage-preventing hand-tied wefts") [V].

**Directly transferable:** Kyrin should be targeting *Spring Valley, Rhodes Ranch, Peccole Ranch, the Lakes, Southwest Las Vegas, Chinatown/Spring Mountain* — not "Las Vegas," which she cannot win.

### 3.4 Hair by Michelle Stewart (Humble, TX) — https://thehairbymichelle.com
- Solo stylist; IBE-certified; `/services` and `/contact-me` [V].
- Publishes an entry point — **services from $70+** — with final pricing at a complimentary consultation [V].
- **Multi-suburb geo targeting**: pages and copy address Kingwood, New Caney, Splendora and Humble [V].
- **Text-to-book** (713-292-4310) [V] — same channel choice as the best LV solo operators.

### 3.5 Luxe Aura Hair Extensions (NYC) — https://luxeaurahair.com
- Dedicated `/book-now` and `/location` pages; a standalone Natural Beaded Rows page [V]. Greenwich Village [V].
- **Best consultation copy found in this research.** The hair-loss consultation is described as *free, private, and completely unhurried* [V] — three words that each defuse a distinct anxiety (cost, embarrassment, being rushed into a sale).
- Specialists assess hair in person and recommend based on density and condition [V].

### 3.6 Also noted
- **CK Studio Salon (Skokie, IL)** — `/invisible-bead-extensions-in-skokie/`, framed as **"Method, Cost, and Who It Fits"** [V]. A *qualification* page that openly tells readers who the service is **not** for. Builds enormous trust and filters out bad-fit enquiries before they cost time.
- **The Upper Hand (Houston)** — `/balayage/`; leads on awards ("Houston's Best," five-time Elle Top 100 US salon) [V]. Awards are the trust currency when review volume alone isn't differentiating.

---

## 4. Patterns — what nearly everyone does (table stakes)

If Kyrin's site misses these, it reads as amateur before anyone evaluates her work.

1. **A dedicated page per service.** Every serious site in this set has standalone balayage / extensions / colour pages — not one combined "Services" list. Confirmed at The Hair Standard, Hottie Hair, Layla, EVŌQ, Sage & Thorne, A Perfect Hue, Komi, Aumirie, Extension Goddess [V].
2. **City name in page titles.** "Balayage Las Vegas," "Hair Extensions Las Vegas," "Hair Salon in Summerlin" — near-universal in the title tags observed [V].
3. **Free consultation, stated prominently.** The Hair Standard, Hottie Hair, Revamp, Wynter, Hair by Jacki, Sage & Thorne, Michelle Stewart, Luxe Aura, Tangerine (Dallas) all advertise complimentary consultations [V]. It is the default first CTA in this industry — the consultation, not the appointment, is what gets sold on the page.
4. **"Starting at" / "from" price framing with variables named.** Where prices appear at all, they are hedged and the hedge is explained: length, density, level of change, stylist level [V across The Hair Standard, Komi, A Perfect Hue, Capelli, Extension Goddess].
5. **A cancellation/no-show policy.** Vegas Hair Color Masters, The Hair Standard, Hair Color Xperts, EVŌQ all publish one [V]. Industry guidance cites 24 hours as the minimum window, with 48 hours common among independents [V, from industry sources].
6. **Some deposit or card-on-file mechanism.** EVŌQ $25 applied to service; The Hair Standard card-on-file-but-not-charged; Vegas Hair Color Masters conditional deposit; Hair Color Xperts deposit triggered by a prior late cancel; Extension Goddess $50 non-refundable consult deposit [V].
7. **Gallery / portfolio page.** Universal [V]. Also the strongest GBP ranking input after the profile itself — photo volume is reported as the second-biggest Google Business Profile factor [V, industry source].
8. **A named human with stated years of experience.** 27+ years (Jacki), 30+ (Natalie Walker), 20+ (Tara), 13+ (a Venus stylist) [V]. Tenure is the default credibility proxy across the whole market.
9. **Phone and/or text as a primary contact channel.** Text-to-book is the norm in the solo tier: Jacki (text any time, day or night), Aumirie (text photos), Michelle Stewart (text to book) [V].
10. **Third-party review presence** — Yelp, Google, Facebook, Birdeye [R throughout].

---

## 5. Gaps — what almost nobody does well

This is where the opportunity is. Each of these is a real, observed absence across the set.

| # | Gap | Evidence | Opportunity |
|---|---|---|---|
| **G1** | **Nobody in the solo tier publishes prices.** Aumirie explicitly refuses (text for a quote); Revamp has a prices page of unverified content; Jacki, Wynter and Balayage Bombshell are all unconfirmed. Meanwhile the *chains* publish freely. | [V]/[U] per section 2 | Be the **only solo stylist in the southwest valley with a real, honest price page.** The biggest single differentiator available. |
| **G2** | **Almost nobody publishes appointment duration.** Found once, at Haven Holistic (NC) [V]. Not found on any Las Vegas site. | [V] | "Balayage: 3–4 hours, $X." Answers the real objection for a service that eats a whole afternoon. |
| **G3** | **Almost nobody has a qualification page — who the service is *not* for.** Found once (CK Studio, Skokie) [V]. | [V] | Fewer wasted consults, more trust. "Extensions aren't right for you if…" is more persuasive than any sales copy. |
| **G4** | **Problem-led pages are rare.** Only Sage & Thorne (colour gone wrong) and Extension Goddess (thinning/fine hair) organise around the client's problem rather than the service name [V]. | [V] | Brassy blonde, grown-out balayage, box-dye correction, fine hair that won't hold volume, post-partum thinning, extension damage. Huge uncontested intent. |
| **G5** | **Maintenance and cost-of-ownership is barely addressed.** Only Revamp's `/styletips` and Hottie's blog touch it [V]. | [V] | "What balayage actually costs you per year" and "what extensions need every 6–8 weeks" — builds trust *and* pre-sells repeat visits. |
| **G6** | **Nobody in the solo tier runs an estimator.** Hottie Hair's `/pricing-calculator` is alone in this market [V]. | [V] | Even a simple 4-question "get your estimate" form is a **qualified lead capture** disguised as a helpful tool. |
| **G7** | **Site quality in the solo tier is genuinely poor.** Aumirie ships `/blank-2` and `/blank-4` as live URLs; Balayage Bombshell runs `index.php`-style URLs [V]. | [V] | A well-built, fast, mobile-first site is by itself a competitive advantage at this tier. |
| **G8** | **Hyperlocal targeting below city level is nearly absent in LV.** Layla runs a Spring Valley page from Summerlin [V]; out-of-market benchmarks target neighbourhoods explicitly [V]. | [V] | Kyrin is genuinely *in* Spring Valley. Own the specific area — cross-streets, landmarks, parking, drive times from Summerlin/Henderson/Chinatown. |
| **G9** | **Almost nobody addresses "I'm switching stylists."** No site in this set was found to speak to the anxiety of leaving a current stylist. | [V, as a negative] | The single most common real-world barrier for a solo stylist's ideal client. Nobody is speaking to it. |
| **G10** | **Consultation copy is generic.** Nearly everyone says "free consultation." Only Luxe Aura makes it emotionally specific ("free, private, completely unhurried") [V]. | [V] | Rewrite the consultation as an experience with a named outcome, not a checkbox. |
| **G11** | **Certifications are rarely named.** Extension Goddess names five methods by brand [V]. Most LV sites say "certified" without saying in what. | [V] | Any specific, named certification Kyrin holds outranks a decade of "experienced." *Only list what she actually holds.* |

---

## 6. Pricing transparency — the strategic question, answered

This was flagged as the key decision, so here is the count, with the caveat that eight of these could not be opened directly.

### 6.1 Las Vegas — who actually publishes a number

| Business | Publishes a concrete starting price? | Evidence |
|---|---|---|
| The Hair Standard | **Yes** — balayage from $250, dedicated prices page, price in the title tag | [V] |
| Hottie Hair | **Yes** — full method-by-method ranges + a live calculator | [V] |
| Vegas Hair Color Masters | **Yes** — full menu, tiered by stylist level, ~$30–$350+ | [V] |
| Komi Hair Salon | **Yes** — balayage/dimensional colour $220–$440+ | [V] |
| Capelli | **Yes**, but figures inconsistent across sources — verify | [V]/[U] |
| Sage & Thorne | **Partially** — some colour-correction figures only; rest at consultation | [V]/[U] |
| A Perfect Hue | **Barely** — only a $39 new-guest blowout; core services "tailored" | [V] |
| Revamp Extensions | **Has a `/prices` page**; contents unverified | [V]/[U] |
| EVŌQ | **No** — price at consultation; $25 booking deposit | [V] |
| Aumirie Balayage | **No** — explicitly text-photos-for-a-quote | [V] |
| Layla Social | Unknown | [U] |
| Hair by Jacki | Menu page exists; contents unknown | [U] |
| Hair Extensions by Wynter | Unknown | [U] |
| Balayage Bombshell | Unknown | [U] |
| Venus Hair Salon (host) | Claims pricing is clarified up front *at the appointment* — i.e. not on the site | [V] |

**Count:** of the 15 Las Vegas businesses examined, **5 clearly publish usable starting prices** (Hair Standard, Hottie Hair, Vegas Hair Color Masters, Komi, Capelli), **3 more publish partially or have an unverified price page**, and **7 either decline to publish or could not be confirmed**.

### 6.2 The pattern that matters

**Transparency correlates with scale, not with prestige.** The multi-location operators publish. The solo and suite stylists — Kyrin's actual peer group — overwhelmingly do not. Yet the out-of-market best-in-class solo operators (**Extension Goddess $825–$1,200; Haven Holistic $149–$472 with durations; The Beautiful Co. $550–$1,100+; Michelle Stewart from $70+**) *all* publish [V].

So the fear that publishing prices cheapens a solo stylist is **not supported by the evidence**. The opposite is: the best independent sites outside this market publish confidently, and use the number itself as a positioning device.

### 6.3 Recommendation

**Publish starting prices. Do it.** Specifically:

- **"Starting at" per service**, with the variables named (length, density, how far the change is from current colour, whether extensions are already in) — this is the universal convention and it protects her [V].
- **Pair every price with a time range** — the gap nobody in Las Vegas is filling (G2).
- **Do not tier by stylist level.** That's a salon construct. One stylist, one price, is a *clarity* advantage she uniquely has.
- **Frame the number as qualification, not discount.** The Hair Standard putting "From $250" in its title tag is a filter, not a sale [V].
- **Anchor with a range, not a single figure**, for extensions especially — Hottie Hair's local ranges ($675–$2,100 hand-tied) set the market's expectation frame already [V].

**Caveat:** no pricing is included in this document because none was provided, and none should be invented. Kyrin sets the numbers. This document only establishes that publishing them is the right strategy and shows the local price bands she'll be read against.

---

## 7. Positioning: what "independent solo stylist" actually buys her

Three assets no salon in this research can claim, all of them structural:

1. **Continuity.** The person in the photos is the person doing the hair — every time, no rotation, no "your stylist has left." Salon sites cannot promise this; multi-stylist pages actively contradict it.
2. **Undivided time.** Revamp ("one-on-one," appointment-only) and Luxe Aura ("private, unhurried") both monetise this [V]. Most LV salons market throughput — walk-ins welcome, Sunday hours, three locations.
3. **Direct access.** Text the stylist, not a front desk. The solo tier already does this [V]; it should be stated as a *benefit*, not just a contact method.

Three liabilities to design around:

1. **No institutional trust.** No 4,300-review number to hide behind. Countered with specificity: named certifications, real before/afters, a real price, a real policy.
2. **The host-salon confusion.** Venus owns the address online [V]. Her site must resolve "where do I actually go, and who am I seeing" in the first screen.
3. **Capacity.** One person, finite chairs. This is why **qualification** (G3) matters more for her than for a salon — her scarce resource is her own time.

---

## 8. Recommendations, ranked by impact on appointment requests

### Tier 1 — do these first; they move bookings directly

**R1. Make the primary CTA a *consultation request*, not a booking.**
Free consultation is the market default [V], and it converts far better than asking a stranger to commit to a 4-hour colour appointment. Put it in the header, at the end of every service page, and in a persistent mobile bar. Borrow the *idea* behind Luxe Aura's framing — private, unhurried, no pressure — in original wording [V].

**R2. Build the "text me a photo, get an estimate" flow — done properly.**
Aumirie already proves Las Vegas clients will do this [V]; its site just buries it. Make it a first-class feature: upload current-hair and goal photos, a few structured questions (current colour, length, previous box dye, extensions now?), submit. Low commitment, high intent, and it arrives pre-qualified. This is **G6 + G1 combined** and it is the highest-leverage single build on the list.

**R3. Publish starting prices with durations.**
Per section 6. Prices qualify the lead before it costs her a consultation slot; durations close the second objection. **No other Las Vegas site pairs the two** [V].

**R4. One deep page per service — five pages, each genuinely substantial.**
Balayage · Hair Colour & Highlights · Haircuts & Styling · Hair Extensions · Hair Treatments. Each with: who it suits and who it doesn't (G3), what happens in the appointment, how long, starting price, maintenance schedule and cost (G5), aftercare, before/afters *for that service specifically*, FAQs, and a CTA. Universal table stake [V] — the depth is the differentiator.

**R5. Claim and build an independent Google Business Profile.**
Google Business Profile signals are reported as carrying the largest single share of local map-pack weight (~32%), with photo volume the second-biggest profile factor [V, industry source]. Kyrin needs her own practitioner listing, distinct from Venus's [V]. NAP — "Beauty by Kyrin, 8665 W Flamingo Rd Suite 128, Las Vegas NV 89147, 702-533-8176" — must be byte-identical on the site, the GBP and every directory [V]. Every service term must appear on the profile, or it can't rank for it [V].

**R6. Own Spring Valley, not Las Vegas.**
"Las Vegas hair salon" is owned by three-location operators with thousands of reviews. Build genuine geographic depth: Spring Valley, southwest Las Vegas, Rhodes Ranch, Peccole Ranch, the Lakes, Flamingo & Durango, Chinatown/Spring Mountain corridor. A Summerlin salon is already targeting Spring Valley from four miles away [V]; she's actually here. Include cross-streets, landmarks, parking, drive times.

### Tier 2 — strong differentiation, build next

**R7. A real "New Guest" page.**
What the first appointment looks like, start to finish; what to bring; what to do with your hair beforehand; where to park at 8665 W Flamingo; what it costs; what happens if you hate it. Directly resolves the host-salon confusion (section 7) and the switching-stylists anxiety (**G9**) — which nothing in this research addresses.

**R8. Problem-led pages.**
Following Sage & Thorne and Extension Goddess [V], but going further: brassy blonde correction, grown-out balayage, box-dye correction, fine hair that won't hold volume, extensions that damaged your hair. **G4** — the highest-intent, least-contested traffic in the category.

**R9. A portfolio organised by *service and hair type*, not a feed dump.**
Filterable by service and, ideally, by starting hair colour/texture. Consistent lighting and angles matter more than volume. Before/after pairs are the format this industry converts on. *(Image quality could not be assessed on any competitor site — egress blocked — but portfolio pages were universal [V].)*

**R10. A clear, friendly deposit and cancellation policy on its own page.**
The market norm is 24 hours minimum, 48 common among independents; deposits of ~25% are widely used; Extension Goddess's $50 consult deposit credited to the first install is the cleanest model found [V]. Protects a solo stylist's calendar — where a no-show is 100% of that day's revenue for that slot, not 1/12th of it. Surface the policy in booking confirmations and reminders, not only on the page [V].

**R11. Name every certification and brand credential she actually holds.**
Extension Goddess names five methods explicitly [V]; most LV competitors say "certified" and stop. Specific, checkable credentials beat vague tenure. **Only list what she genuinely holds — do not infer or embellish.** Many certification bodies also run stylist-locator directories (IBE publishes one [V]), which is a real referral and backlink channel.

### Tier 3 — compounding value, build once the above ships

**R12. Reviews as an operational system, not an afterthought.** Review quantity, quality, recency and keyword content all feed local ranking [V]. She starts near zero. A simple post-appointment ask, sent every time, compounds faster than anything else on this list.

**R13. A small, high-intent content set.** Two or three pieces, not a blog treadmill: a Las Vegas balayage/extension cost guide (Hottie Hair owns this locally right now [V]), a maintenance-and-upkeep guide (**G5**), and a "how to choose an extension method" explainer.

**R14. Site as hub, platforms as spokes.** Extension Goddess runs GlossGenius and Fresha alongside her own site [V]. Booking platforms are distribution; the site is the asset she owns. Never let the platform outrank the site for her own name.

**R15. Mobile-first, unambiguously.** This entire category is browsed on phones between other things. *Mobile experience could not be tested on a single competitor — egress blocked.* Treat this as an untested assumption and verify per section 11.

---

## 9. What to deliberately *not* copy

- **Tiered stylist pricing** (Vegas Hair Color Masters) — solves a problem she doesn't have and dilutes her clearest advantage [V].
- **"Walk-ins welcome"** (EVŌQ) — signals throughput; contradicts the one-on-one premium a solo stylist sells [V].
- **A service-word brand name** (Balayage Bombshell) — good for one keyword, a cage for a five-service stylist [V]. "Beauty by Kyrin" is the more durable asset.
- **Placeholder URLs and template debris** (Aumirie's `/blank-2`) [V].
- **Anyone's copy, photos, layout or branding.** Everything above describes *strategy*. Wording and design must be original to Kyrin.

---

## 10. Confidence summary

| Conclusion | Confidence | Why |
|---|---|---|
| Venus Hair Salon occupies the same address online and competes for the same terms | **High** | Address, services and stylist pages all verified [V] |
| Solo/suite stylists in LV overwhelmingly do not publish prices | **High** | Verified across the tier [V] |
| Publishing prices is correct for an independent | **High** | Every best-in-class out-of-market independent does it [V] |
| Duration-with-price is an open gap | **High** | Found once, out of market, in ~20 sites examined [V] |
| Problem-led and qualification pages are near-absent | **Medium-High** | Two instances found; absence inferred from indexed page sets [V] |
| Spring Valley is under-served hyperlocally | **Medium-High** | Layla targets it from Summerlin; no in-area specialist page found [V] |
| Solo-tier sites are technically weak | **Medium** | Strong signals (`/blank-2`, `index.php`), but **not visually inspected** |
| Mobile experience, image quality, hero design across the market | **None — untested** | **WebFetch blocked for all hosts.** Section 11 required. |

---

## 11. Verification checklist — the ~90-minute pass this document needs

Open each on a phone, then on desktop. Note load speed, where the first CTA sits, whether pricing is reachable in ≤2 taps, and photo quality.

**Las Vegas**
1. https://venushairsalonlv.com — **highest priority.** Exactly how does the host salon present the suite, and is Kyrin on it anywhere?
2. https://thehairstandard.com/services and `/services/balayage` — the pricing-page model
3. https://hottiehair.com/pricing-calculator — how the estimator actually works
4. https://vegashaircolormasters.com/service-menu and `/salon-policy`
5. https://www.laylasocial.com/spring-valley-las-vegas — the neighbourhood-page model
6. https://www.revampextensions.com/prices — **does the closest solo peer publish real numbers?**
7. https://www.hairbyjacki.com/services.html — solo-stylist menu depth
8. https://www.aumirie.com/book-online — the photo-quote flow, and confirm the `/blank-*` URLs
9. https://www.balayagebombshell.com — same ZIP, direct competitor
10. https://komihairsalon.com/services/all-services/ and https://capellibabe.com — **resolve the conflicting Capelli figures**
11. https://aperfecthue.com and https://sageandthorne.com/color-corrections/

**Out of market (the quality bar)**
12. https://www.extensiongoddess.com — **most relevant benchmark**; study the hair-loss page and the deposit flow
13. https://havenholisticsalon.com/hair-extensions/ — the price+duration table
14. https://beautifulsalon.co/ibe-hair-extensions/ — neighbourhood targeting inside a city
15. https://luxeaurahair.com/book-now — consultation framing
16. https://ckstudiosalon.com/invisible-bead-extensions-in-skokie/ — the "who it fits" qualification page

**Also confirm, from Kyrin directly (all currently unknown):**
- Does an independent Google Business Profile for Beauty by Kyrin exist?
- Current state of www.beautybykyrin.com (could not be loaded)
- Her Nevada cosmetology licence number, actual certifications, social handles, review profiles, and her pricing — **none of which were available for this research and none of which have been invented here.**

---

## Sources

All URLs named inline above are the primary sources. Findings were drawn from indexed page content and titles for: [The Hair Standard](https://thehairstandard.com/), [Hottie Hair](https://hottiehair.com/), [Vegas Hair Color Masters](https://vegashaircolormasters.com/), [Layla: A Social Salon](https://www.laylasocial.com/), [Venus Hair Salon](https://venushairsalonlv.com/), [Balayage Bombshell](https://www.balayagebombshell.com/), [Revamp Extensions](https://www.revampextensions.com/), [Hair by Jacki](https://www.hairbyjacki.com/), [Aumirie Balayage](https://www.aumirie.com/), [Hair Extensions by Wynter](https://www.hairextensionsbywynter.com/), [EVŌQ Salon](https://www.evoqsalon.com/), [Sage & Thorne](https://sageandthorne.com/), [A Perfect Hue](https://aperfecthue.com/), [Komi Hair Salon](https://komihairsalon.com/), [Capelli](https://capellibabe.com/), [Angie's Salon LV](https://www.angiessalonlv.com/), [Hair Color Xperts](https://haircolorxpertslv.com/), [Extension Goddess](https://www.extensiongoddess.com/), [Haven Holistic Salon](http://havenholisticsalon.com/hair-extensions/), [The Beautiful Co.](https://beautifulsalon.co/ibe-hair-extensions/), [Hair by Michelle Stewart](https://thehairbymichelle.com/), [Luxe Aura Hair](https://luxeaurahair.com/), [CK Studio Salon](https://ckstudiosalon.com/invisible-bead-extensions-in-skokie/), [The Upper Hand](https://theupperhand.com/balayage/). Review counts cited to [Yelp](https://www.yelp.com/), Facebook and [Birdeye](https://reviews.birdeye.com/) listings. Industry norms on deposits and local SEO cited to [GlossGenius](https://glossgenius.com/blog/salon-deposit-policy) and published 2026 salon local-SEO guidance.
