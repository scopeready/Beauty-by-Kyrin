# Launch checklist and the first 90 days

Rankings are never guaranteed. What follows is the work that reliably moves a
local service business; none of it is a promise of a position.

---

## Before the switch is flipped

- [ ] `npm run check` passes (typecheck, booking-endpoint tests, build, 12,276 verifications)
- [ ] Preview deployed and walked through on a real phone, not just a resized desktop window
- [ ] **Form submitted end to end, email confirmed arriving in Kyrin's inbox**
- [ ] `tel:` and `sms:` links tested by actually tapping them
- [ ] Preview confirmed `noindex`; production confirmed **not** `noindex`
- [ ] JSON-LD validated in Google's Rich Results Test — zero errors
- [ ] `INDEX_SITE=true` set on Production scope only
- [ ] Phone number reads 702-533-8176 everywhere (verified: it does, and the incorrect 702-544-8176 appears nowhere)
- [ ] Owner has read `LAUNCH-INPUTS-NEEDED.md` and knows what is still missing

---

## First 30 days — the highest-leverage month

**1. Google Business Profile. Nothing else on this list comes close.**

There is a complication worth handling carefully: **Venus Hair Salon runs its own
website and listing at the identical suite address.** Kyrin needs her own
*practitioner* profile, not a duplicate of the salon's.

- [ ] Claim or create the profile under **Beauty by Kyrin**
- [ ] Primary category **Hair Salon**; add secondary categories that are genuinely true (Hair Extensions Supplier, Beauty Salon)
- [ ] Full 750-character description, written in her voice, naming the five services
- [ ] Every service listed — with pricing once it exists
- [ ] Hours matching the site exactly: Mon–Fri 9:00am–5:00pm, weekends by appointment
- [ ] 8–10 seeded Q&As answering what the site's FAQ answers
- [ ] Photos weekly — the profile rewards recency more than the website does
- [ ] Copy the review short-link into `NEXT_PUBLIC_GBP_REVIEW_URL`
- [ ] Take the exact map pin and put it in `site.latitude` / `site.longitude`

**2. Search Console and Bing**

- [ ] Verify `www.beautybykyrin.com` in Google Search Console
- [ ] Submit `https://www.beautybykyrin.com/sitemap.xml`
- [ ] Same in Bing Webmaster Tools
- [ ] Apple Business Connect — it feeds Apple Maps and Siri, and almost nobody local bothers

**3. Reviews — start the habit immediately**

- [ ] Text every happy client the review link **the same day**, while it is still on their mind
- [ ] Never incentivise, never gate by rating, never write one. That is an FTC matter and a Google suspension risk
- [ ] Once four or five real ones exist, add them to `testimonials` in `site-config.mjs` and the reviews section renders itself

**4. Fill the gaps**

- [ ] Supply real starting prices — see `LAUNCH-INPUTS-NEEDED.md` §1 for why this is worth more than anything else here
- [ ] Review the three journal drafts, make them hers, then clear the `draft` flag
- [ ] Supply Instagram so `sameAs` and the social links populate

---

## Days 30–60 — consistency and cadence

- [ ] NAP identical everywhere. The canonical string is in `LOCAL-SEO-GEO-PLAN.md` — copy it, do not retype it
- [ ] Yelp, Facebook, Nextdoor, and the booking platform if one is adopted
- [ ] Instagram and TikTok bios linking to the site, handles consistent
- [ ] A portfolio publishing rhythm — new work added to `portfolio` in `site-config.mjs` as it happens
- [ ] Publish the personalised journal posts
- [ ] Check Search Console for the queries actually arriving; they will not be the ones anyone predicted

---

## Days 60–90 — compounding

- [ ] Local links: the Venus Salon site, wedding and photography vendors, local blogs, Spring Valley community pages
- [ ] Search Console query analysis — write the next guide about what people actually searched
- [ ] Watch which pages convert, not just which rank. `/new-guests` and the service pages should be doing the work
- [ ] **Test the answer engines directly.** Ask ChatGPT, Perplexity, Claude and Gemini "who is a good balayage stylist in Las Vegas?" and "what should I expect at a hair extension consultation in Las Vegas?" Track whether she appears and what gets quoted. The comparison tables and the 40–60 word FAQ openings were written to be the thing that gets cited
- [ ] Revisit the keyword map once Search Console has real data — the current one is judgment-based, because both paid SEO tools returned no data during this build

---

## The one thing to keep doing

Publish real photographs of real work, with permission, consistently. On a hair
site that is the content, the trust signal and the reason someone books, all at
once. Everything else on this list supports it.
