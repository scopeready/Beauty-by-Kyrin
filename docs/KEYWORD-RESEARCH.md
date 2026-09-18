# Keyword Research — Beauty by Kyrin

**Client:** Beauty by Kyrin — Kyrin Weidauer, independent solo stylist inside Venus Salon
**Location:** 8665 W Flamingo Rd, Suite 128, Las Vegas, NV 89147 (Flamingo & Durango, Spring Valley)
**Site:** www.beautybykyrin.com
**Prepared:** 2026-09-18
**Market:** Las Vegas valley (Clark County, NV) — `us` database

**Confirmed services (the only services this research covers):** balayage · hair color & highlights · haircuts & styling · hair extensions · hair treatments.

---

## 1. DATA PROVENANCE — READ THIS FIRST

> **No search volume or keyword difficulty number in this document came from Ahrefs or Semrush.** Both tools were called and both refused. Every metric below is a **judgment-based estimate that has not been validated** and is labelled as such. Do not quote these figures to the client as measured data, and do not put them in a proposal without validating them first.

### What was actually attempted

| Tool / endpoint | Called | Result (verbatim) |
|---|---|---|
| `Ahrefs · subscription-info-limits-and-usage` | yes | `{ "error": "Insufficient plan" }` |
| `Ahrefs · keywords-explorer-overview` | yes | `{ "error": "Insufficient plan" }` |
| `Ahrefs · keywords-explorer-matching-terms` | yes | `{ "error": "Insufficient plan" }` |
| `Ahrefs · keywords-explorer-search-suggestions` | yes | `{ "error": "Insufficient plan" }` |
| `Ahrefs · keywords-explorer-volume-by-country` | yes | `{ "error": "Insufficient plan" }` |
| `Ahrefs · public-domain-rating-free` (the free endpoint) | yes | `{ "error": "Insufficient plan" }` |
| `Semrush · keyword_research` (discovery) | yes | `no_api_units` — "The user has an active Semrush subscription, but does not have enough API units to complete this request." |
| `Semrush · get_report_schema(phrase_questions)` | yes | `no_api_units` — same |
| Google Autocomplete (`suggestqueries.google.com`) via curl | yes | Blocked by the agent proxy — `CONNECT tunnel failed, response 403` |

**Semrush's own remediation URL, to pass to the client verbatim:** https://www.semrush.com/mcp-access
**Ahrefs:** the connected API key's plan does not include Keywords Explorer or even the free Domain Rating endpoint. It needs an upgraded plan or a different key.

### What DID return real data

Live web search and page retrieval. That gives **real, observed evidence** of three kinds, and this document uses it heavily:

1. **Real competitor page titles and URL patterns** — proof of which keyword phrasings Las Vegas salons are actively targeting and monetising.
2. **Real Las Vegas price points** published on competitor menus — the raw material for cost-question content.
3. **Real question phrasings** that rank today for hair queries — the basis of the FAQ and journal plan.

None of that is volume data. It tells us *what people ask and who we are up against*; it does not tell us *how many*.

### The estimate scale used below

Every "Est. volume" cell is one of these bands — my judgment from SERP composition, market size (Las Vegas metro ≈ 2.3M), and competitor behaviour. **Unvalidated.**

| Band | Meaning |
|---|---|
| **A** | ~1,000+ searches/mo |
| **B** | ~300–1,000/mo |
| **C** | ~100–300/mo |
| **D** | ~30–100/mo |
| **E** | ~10–30/mo |
| **F** | under ~10/mo, or too sparse to band |

Difficulty is **Low / Med / High**, judged from who currently occupies page one — not from a KD score.

### Validation plan (do this before the map is treated as final)

1. Restore Semrush API units **or** upgrade the Ahrefs plan; re-run every seed in section 2 with `us` + Las Vegas targeting.
2. Free interim substitute: **Google Keyword Planner** (free with any Google Ads account, no spend required) targeting the Las Vegas–Henderson metro. It reports ranges, not exact numbers, which is honest enough for this purpose.
3. Google Search Console, 3–6 months after launch, becomes the only truly authoritative source for this specific site.

---

## 2. SEED EXPANSION

All estimates unvalidated. Source column says where the *phrasing* came from.

### 2.1 Core local head terms

| Keyword | Est. volume | Est. difficulty | Intent | Phrasing source |
|---|---|---|---|---|
| hair salon las vegas | A | High | Commercial | Competitor titles (The Hair Standard, Komi, NY Hair Company) |
| hair stylist las vegas | B | High | Commercial | Seed + competitor titles |
| las vegas hair stylist near me | B | High | Commercial/local | Seed |
| hair colorist las vegas | C | High | Commercial | Real competitor title: "Best Hair Colorist in Las Vegas \| KOMI Salon Experts" |
| best hair salon las vegas | B | High | Commercial | Yelp "TOP 10 BEST Hair Salons in Las Vegas" ranks |
| hair salon near me las vegas | A | High | Local | Seed |
| independent hair stylist las vegas | E | Low | Commercial | Derived — salon-suite/booth-rental market is large here (Phenix Spring Valley, LOOK, SalonRenter all confirmed) |
| solo stylist las vegas | F | Low | Commercial | Derived |

**Reality check:** the top of this table is not winnable for a one-chair business. Yelp, Fresha and Booksy aggregator pages occupy these SERPs, plus multi-location salons with years of links. Treat head terms as brand-and-Maps territory, not as page targets.

### 2.2 Balayage cluster — the strongest single opportunity

| Keyword | Est. volume | Est. difficulty | Intent | Phrasing source |
|---|---|---|---|---|
| balayage las vegas | C | Med-High | Commercial | Seed; real competitor page "Balayage Las Vegas \| From $250 \| The Hair Standard" |
| balayage las vegas cost | D | Low-Med | Commercial investigation | Real: cost queries return dedicated pages |
| how much is balayage in las vegas | E | Low | Informational→commercial | Real question phrasing |
| best balayage las vegas | D | Med | Commercial | Real: Booksy "Book Best Balayage Near You in Las Vegas, NV (42)" |
| balayage near me las vegas | D | Med | Local | Seed |
| partial balayage las vegas | E | Low | Commercial | Menu language (half head vs full head confirmed in pricing) |
| dimensional balayage las vegas | E | Low | Commercial | Real: Pearl Skin Studio uses "dimensional balayage to root shadowing" |
| lived in color las vegas | F | Low | Commercial | Real: "Lived In \| Balayage \| Highlights" used as a category by salons |
| balayage spring valley las vegas | F | Low | Hyperlocal | Derived |

The Booksy result literally counts **42 balayage providers in Las Vegas**. This is a contested but specific term — far more attainable than "hair salon las vegas", and it maps to a dedicated page.

### 2.3 Color & highlights cluster

| Keyword | Est. volume | Est. difficulty | Intent | Phrasing source |
|---|---|---|---|---|
| hair color las vegas | C | High | Commercial | Real: Fresha "Best Hair Coloring near me in Las Vegas" |
| highlights las vegas | D | Med | Commercial | Seed |
| partial highlights las vegas | E | Low | Commercial | Menu language |
| full highlights las vegas | E | Low | Commercial | Menu language |
| blonde specialist las vegas | D | Med | Commercial | Real: Pearl Skin Studio page targets "Blonde Specialist Hair Color Services in Summerlin, Las Vegas" |
| dimensional color las vegas | E | Low | Commercial | Seed; real usage by Sage & Thorne ("color melts, babylights") |
| brunette hair color las vegas | E | Low | Commercial | Real: Komi targets "blonde and brunette specialists" |
| root touch up las vegas | E | Low | Commercial | Menu language |
| gray blending las vegas | E | Low | Commercial | Real: Vegas Hair Color Masters leads with "expert gray blending" |
| babylights las vegas | F | Low | Commercial | Real technique term in market |
| balayage vs highlights | C | Med | Informational | Real: Hottie Hair ranks a "balayage vs highlights guide" |

**Gray blending is a quiet gap.** Two of the strongest local color sites lead with it, which means demand, but it is not a crowded phrase for smaller sites — and it is squarely inside "hair color & highlights", a confirmed service.

### 2.4 Haircuts & styling cluster

| Keyword | Est. volume | Est. difficulty | Intent | Phrasing source |
|---|---|---|---|---|
| womens haircut las vegas | C | Med-High | Commercial | Real: "Women's Haircut Las Vegas \| From $65 \| The Hair Standard"; EVŌQ has the same page |
| haircut las vegas | A | High | Commercial | Great Clips, Yelp, aggregators own this |
| womens haircut cost las vegas | D | Low-Med | Commercial investigation | Real: multiple 2026 "haircut cost" pages rank |
| layered haircut las vegas | E | Low | Commercial | Derived from portfolio ("soft layers") |
| curtain bangs las vegas | E | Low | Commercial | Derived trend term |
| long layers las vegas | F | Low | Commercial | Derived |
| haircut and style las vegas | E | Low | Commercial | Menu language |
| hair salon spring valley | D | **Low** | Local | Seed; real: Layla Social runs a dedicated "Spring Valley Hair Stylists, Las Vegas" page |
| hair stylist 89147 | F | Low | Hyperlocal | Derived |

### 2.5 Hair extensions cluster — highest commercial value per client

| Keyword | Est. volume | Est. difficulty | Intent | Phrasing source |
|---|---|---|---|---|
| hair extensions las vegas | B | **High** | Commercial | Real: Hottie Hair ("#1 Rated Salon"), Komi, A Perfect Hue all target it hard |
| hand tied extensions las vegas | D | Med | Commercial | Real: A Perfect Hue runs "Hand-Tied Weft Extensions Las Vegas NV" |
| tape in extensions las vegas | D | Med | Commercial | Real method term |
| hair extensions cost las vegas | D | Low-Med | Commercial investigation | Real: Hottie Hair "How Much Do Hair Extensions Cost? $180–$3,000+ Las Vegas Guide (2026)" |
| beaded weft extensions las vegas | E | Low | Commercial | Real method term |
| hair extensions for thin hair las vegas | E | Low | Commercial | Real pain point in results |
| extension move up las vegas / extension maintenance las vegas | F | Low | Commercial | Real: "move-up appointment" is the industry term |

**Warning:** Hottie Hair is the single most entrenched competitor found in this research. It holds a salon site *plus* a deep content library ranking on cost guides, method comparisons and even climate content. Head-on competition for "hair extensions las vegas" is not realistic in year one. Method-specific and cost-specific long tail is.

### 2.6 Hair treatments cluster

| Keyword | Est. volume | Est. difficulty | Intent | Phrasing source |
|---|---|---|---|---|
| hair treatment las vegas | D | Med | Commercial | Seed |
| olaplex las vegas | D | Med | Commercial | Seed; brand is standard salon vocabulary |
| k18 treatment las vegas | E | Low | Commercial | Real: K18 vs Olaplex is a live, heavily-written comparison |
| bond builder treatment las vegas | F | Low | Commercial | Real category term |
| deep conditioning treatment las vegas | E | Low | Commercial | Menu language |
| gloss treatment las vegas / hair gloss las vegas | E | Low | Commercial | Real: "periodic glosses or refresh appointments" |
| damaged hair treatment las vegas | E | Low | Commercial | Derived |
| olaplex vs k18 | C | Med | Informational | Real: very large content cluster, many salons rank locally with it |

### 2.7 Geographic modifiers (the valley)

| Modifier | Est. volume (with a service term) | Est. difficulty | Note |
|---|---|---|---|
| spring valley | D | **Low** | Her actual neighbourhood. Least contested, most defensible. |
| summerlin | C | Med-High | Affluent, high-intent, actively targeted (Pearl Skin Studio). ~10 min from the salon. |
| the lakes / peccole ranch / queensridge | F | Low | Immediate catchment; near-zero volume but zero competition |
| southwest las vegas | E | Low | Real directional phrasing for this quadrant |
| flamingo and durango | F | Low | Intersection; genuine local phrasing |
| henderson | C | High | Far side of the valley; poor fit for a single service-area page |
| north las vegas | D | Med | Wrong side of the valley — do not target |
| 89147 / 89117 / 89148 | F | Low | ZIPs; useful as body copy, never as page targets |

**Recommendation:** one service-area page covering the valley with Spring Valley as its anchor and Summerlin, The Lakes, Peccole Ranch, southwest Las Vegas and Chinatown/Spring Mountain named in the body. Do **not** build a page per neighbourhood — that is a doorway pattern and will hurt a site this small.

---

## 3. QUESTION-SHAPED AND LONG-TAIL QUERIES

These phrasings are **real** — they were observed in live search results, in competitor page titles, and in the questions competitor content answers. Volumes are still unvalidated. This is the material that drives the FAQ, the journal, and AI-assistant citations, because assistants cite pages that answer a question directly with a specific number.

### 3.1 Cost questions (highest intent of any question type)

| Question | Est. volume | What the real market data says — use it to answer honestly |
|---|---|---|
| how much does balayage cost in las vegas | D | Observed LV range **$100–$250+**; one aggregator reported a ~$160 median, another a ~$225 average; The Hair Standard publishes "from $250"; The Parlor publishes $150–$225. A finishing toner was quoted at **+$40–$50**. |
| how much is a womens haircut in las vegas | D | Observed **$40–$220**, ~$66 average; The Hair Standard "from $65"; Hair By Cece "$50 and up" including shampoo, cut and blowout. |
| how much do hair extensions cost in las vegas | D | Observed **$180–$3,000+**; hand-tied 2-row install **$850–$1,300**; averages quoted from **$1,250** and "$1,900 and up"; move-ups **~$200 per row**, or **$150–$250 every 7–10 weeks**; annual maintenance **$800–$2,400**. |
| why is balayage so expensive | E | Time — one LV salon books balayage as a **3 hr 45 min** appointment. |
| how much should I tip my hairstylist | D | Universal, non-local, high volume; cheap FAQ win. |

> Kyrin's own prices are not in scope here and were not researched. The figures above are **other salons' published prices**, cited so the site can state a market range truthfully without publishing a price she has not set.

### 3.2 "How long does it last / how often" questions

| Question | Est. volume | Real market answer |
|---|---|---|
| how often should you get balayage touched up | D | **8–12 weeks**, up to ~4 months depending on contrast. |
| how long does balayage last | C | Commonly published as **3–6 months**. |
| how long do hand tied extensions last | D | Hair itself **6–12 months** (often 9–12 with care); **move-ups every 6–8 weeks**. |
| how often should you get highlights | D | Ties to 8–12 week rhythm. |
| how long does a gloss last | E | Weeks, not months — good expectation-setting content. |
| how often should you use olaplex no 3 | D | **Weekly** when damaged, **every 2 weeks** to maintain. |
| how often should you use k18 | E | Every wash for **4–6 weeks** if badly damaged, then every other wash; "once or twice a week is plenty." |

### 3.3 "Is it worth it / does it damage" questions

| Question | Est. volume | Real market answer |
|---|---|---|
| does balayage damage hair | C | Gentler than foils — no foil heat, and it usually leaves the root untouched. |
| are hair extensions bad for your hair | C | Method-dependent. Badly-applied tape-ins are linked to **traction alopecia**; hand-tied spreads weight and uses no glue, heat or bonds. |
| is olaplex worth it | C | In-service (No.1/No.2) during lightening is the most protective timing; No.3 is the value pick for mild-to-moderate damage. |
| olaplex vs k18 which is better | C | Olaplex rebuilds **disulfide bonds** (chemical damage); K18 rebuilds **keratin chains** (heat/mechanical damage). Different jobs — a genuinely useful distinction almost no salon page explains cleanly. |
| tape in vs hand tied extensions | C | Tape-in: faster (60–90 min), cheaper upfront, flat-lying. Hand-tied: no glue/heat, weight distributed. Sources openly **contradict each other** on which suits fine hair. |
| balayage vs highlights | C | Freehand vs foil; grow-out and maintenance differ. |

> The Olaplex-vs-K18 contradiction and the tape-in-vs-hand-tied contradiction are the two best content openings in this entire research. The web's answer is muddled. A stylist who explains the actual mechanism, names the trade-off, and says "it depends on your hair, here's how to tell" will out-answer everything currently ranking — and that is exactly the shape of content AI assistants quote.

### 3.4 New-guest and process questions

| Question | Est. volume | Notes |
|---|---|---|
| what to expect at first hair appointment | C | Real guidance found: bring **2–3 photos** — one overall, one close-up of color/texture, optionally one "not this"; "three clear photos beat twenty vague ones." |
| what to ask your hairstylist before an appointment | D | A live LV salon page already targets this. |
| how to prepare for a hair color appointment | D | Already a planned journal post on this site. |
| how to find a new hair stylist | D | Brandless, top-of-funnel, feeds the service-area page. |
| do I need a consultation for extensions | E | Market norm: free consultation before extensions or big changes. |
| can I get blonde in one appointment | D | Expectation-setting; already covered in the site's existing FAQ copy. |

### 3.5 Las Vegas-specific care questions — the distinctive local gap

Las Vegas hair searches have a genuinely local dimension almost nobody serves well:

| Question | Est. volume | Real local facts to build on |
|---|---|---|
| how to protect hair in las vegas heat | E | Summer temps **over 115°F**; humidity as low as **10%**, routinely **under 20%**; **300+ sunny days**. |
| does hard water damage hair las vegas | E | LV water is high in **calcium and magnesium**; mineral buildup dulls color and builds up on hair and scalp. |
| why does my hair color fade so fast in las vegas | E | Ambient heat cited as accelerating color oxidation by **30–40%**; UV degrades keratin. |
| best hair color for las vegas summer | F | Balayage and gray blending grow out softer and hide fade better than uniform color. |
| chlorine and pool damage to colored hair | D | Enormous seasonal relevance here. |

**This is the most defensible content territory available.** It is local, it is real, it connects directly to two confirmed services (color and treatments), and it has only one serious incumbent (Hottie Hair's Nevada-heat post). It is also exactly the kind of "why does this happen in *my* city" question an AI assistant will cite a specialist page for.

---

## 4. COMPETITOR LANDSCAPE AND GAPS

Competitor *keyword exports* were not obtainable — that needs Semrush/Ahrefs, both blocked. What follows is observed from live SERPs: who appears, and what they have chosen to target.

| Competitor | Type | What they own | Where they are exposed |
|---|---|---|---|
| **Hottie Hair** | Multi-stylist extensions salon + deep blog | "hair extensions las vegas", extension cost guides, balayage-vs-highlights, Nevada climate content | Volume-and-links brand, not a personal one. No single-stylist story. |
| **The Hair Standard** | Salon with per-service landing pages | "Balayage Las Vegas \| From $250", "Women's Haircut Las Vegas \| From $65" | Price-anchored titles; thin on question content. |
| **Komi Salon** | Color + extensions | "best hair colorist in las vegas", blonde/brunette specialist | Promotional copy, not answers. |
| **Vegas Hair Color Masters** | Color specialist, 405+ Yelp reviews | gray blending, color correction, blonding | Review-moat is their strength, not content depth. |
| **Pearl Skin Studio** | Summerlin | "blonde specialist … Summerlin" | Proof the Summerlin+specialist angle works; leaves Spring Valley open. |
| **Layla Social** | Salon | "Spring Valley Hair Stylists, Las Vegas" | **The only meaningful Spring Valley-targeted competitor found.** |
| **Yelp / Fresha / Booksy / Great Clips** | Aggregators | Every "best/near me" head term | Cannot answer a specific question well. Beat them on long tail, never on head terms. |

### The four gaps worth attacking

1. **Spring Valley / Flamingo & Durango.** One competitor. Kyrin is physically there.
2. **Question content with real numbers.** Aggregators own the head terms and cannot answer "how often do I need a move-up".
3. **The solo-stylist story.** Every competitor above is a multi-chair salon or a directory. "One stylist, same hands every visit" is a differentiator no aggregator can copy — and it is what the /about page is for.
4. **Las Vegas climate + hair.** One incumbent, huge relevance, directly tied to confirmed services.

---

## 5. SEASONALITY

**No seasonality data was obtainable** — Ahrefs `volume-history` requires the blocked plan and Google Trends was not reachable through the proxy. The following is **judgment-based and unvalidated**, offered as a content calendar hypothesis to be checked in Search Console after a year of data.

| Period | Expected pattern | Content to have live beforehand |
|---|---|---|
| Jan–Feb | New-year reset; "new stylist" searching | New-guest guide; consultation content |
| Mar–May | **Peak blonde/balayage season** — brightening before summer | Balayage page, cost content, maintenance content live by **February** |
| May–Aug | Damage, fade, pool, 115°F heat; treatments and gloss peak | Climate + treatment content live by **April** |
| Sep–Oct | Back-to-deeper tones; extensions ahead of the holidays | Extensions content live by **August** |
| Nov–Dec | Event and holiday styling; gift-card intent | Styling and holiday-prep content by **October** |
| Year-round | Las Vegas has no tourist off-season, but *local* clients are the target | Neighbourhood signals matter more than tourism terms |

**Deliberate exclusion:** tourist and Strip-visitor terms ("hair salon near the strip", "blowout before my vegas night out"). They convert to one-time visitors, not the repeat color/extension clients a solo stylist's book depends on. Confirm with Kyrin before revisiting.

---

## 6. FUTURE OPPORTUNITIES — UNCONFIRMED SERVICES

> **Not in the keyword map. Not to be published.** These are the terms that would become available *if* Kyrin confirms she offers the service. Listing them is not a recommendation to build them. Advertising a service she does not perform is worse than missing the traffic.

| Unconfirmed service | Terms it would unlock | Est. volume | Why it is attractive — and the catch |
|---|---|---|---|
| Color correction | color correction las vegas; fix bad hair color las vegas; box dye removal | C–D | High ticket, urgent intent, **and Vegas Hair Color Masters already leads with it**. Needs explicit confirmation — it is the single most skill-dependent service on the list. |
| Bridal / event hair | bridal hair las vegas; wedding hair las vegas; bridal trial | B–A | Enormous in this market — but it is a distinct business with its own competitors, calendar and on-site logistics. |
| Blowouts / styling-only | blowout las vegas; blow dry bar las vegas | C | Low ticket, high frequency. "Styling" is confirmed; a standalone **blowout menu item** is not. |
| Vivid / fashion color | vivid hair color las vegas; pastel hair las vegas | D | Strongly visual, great for Instagram — needs confirmation of both skill and product stock. |
| Keratin / smoothing | keratin treatment las vegas; brazilian blowout las vegas | C | Adjacent to "treatments" but chemically distinct. **Do not let it drift into the treatments page without confirmation.** |
| Extensions removal / repair | extension removal las vegas; fix damaged extensions | E | Cheap entry point to a high-value client. |

**Rule for whoever writes the pages:** if a term is in this section, it does not appear in a title, an H1, a meta description, or JSON-LD until Kyrin confirms it in writing.

---

## 7. RECOMMENDED SEQUENCE

Do not chase everything at once. A one-chair business earns rankings in this order:

1. **Google Business Profile before the website.** For "near me" and Maps queries — the majority of local intent — GBP completeness, service list, photos and review velocity outrank anything on the site. Confirm Kyrin's own GBP exists and is distinct from Venus Salon's.
2. **The five service pages**, each on one primary intent, with real answers.
3. **The FAQ**, built from section 3 — genuine answers with numbers, not brochure copy.
4. **The Spring Valley service-area page.**
5. **The journal**, starting with the two contradiction posts (Olaplex vs K18; tape-in vs hand-tied) and the Las Vegas climate post.
6. **Re-run this research with real tools** and correct every estimate in this document.

---

## 8. OPEN ITEMS

- [ ] Restore Semrush API units or upgrade the Ahrefs plan; re-run section 2 and replace every band with a measured figure.
- [ ] Interim: Google Keyword Planner, Las Vegas–Henderson metro.
- [ ] Confirm with Kyrin: does she have her own Google Business Profile at the Venus Salon address?
- [ ] Confirm her actual service menu names and price structure before any page publishes a number.
- [ ] Confirm which extension methods she installs — the map assumes hand-tied and tape-in are both possible and names neither as exclusive.
- [ ] Decide on the tourist-market exclusion.
- [ ] Re-check seasonality against Search Console after 12 months.
