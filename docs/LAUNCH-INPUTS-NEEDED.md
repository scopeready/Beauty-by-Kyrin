# Launch inputs still needed

Every unanswered item from Section A of the build brief, with where it plugs in
and what it unlocks. **Nothing here is blocking a deploy** — the site is built so
each value drops in without a rewrite, and anything unfilled is omitted rather
than faked.

Ordered by what it is worth to appointment requests.

---

## 1. Pricing — the single highest-value input

**Status:** not supplied. No price appears anywhere on the site.
**Where it goes:** `content.mjs`, a `startingPrice` and `durationMinutes` per
service; `supabase/migrations/0001_initial_schema.sql` already has the columns.

**Why it matters more than anything else here.** Competitor research looked at 15
Las Vegas hair businesses. **Only 5 publish starting prices, and all 5 are
multi-location salons.** Independent and suite stylists — Kyrin's actual peer
group — almost never do. But *every* best-in-class independent stylist reviewed
outside Las Vegas publishes confidently. Price transparency correlates with
confidence, not with being cheap.

There is a second, sharper reason. When someone asks an AI assistant "what does
balayage cost in Las Vegas", the assistant quotes whoever published a number.
"Competitive pricing" is unquotable and gets skipped.

**The specific opening:** no Las Vegas site found publishes a starting price
*paired with the appointment duration*. Doing both would be unique in this
market.

What is needed, per service: a **starting** price ("from $X"), a typical
appointment length, and whether a consultation is free.

> Until this is supplied, every service page correctly says pricing is quoted
> individually, and the `services` table keeps `published = false`.

---

## 2. Google Business Profile — the biggest local-SEO gap

**Status:** unknown whether claimed.
**Where it goes:** `site.googleBusinessProfileUrl` and
`NEXT_PUBLIC_GBP_REVIEW_URL` in `site-config.mjs` / Vercel env.

**There is a problem that needs solving carefully.** Her landlord, **Venus Hair
Salon, runs its own website at the identical suite address** — 8665 W Flamingo Rd
#128 — with per-stylist profile pages and a near-identical service list. That
business owns this address in Google's index.

So Kyrin needs **her own practitioner profile**, distinct from the salon's, and
the site has been positioned around *her name and her services* rather than the
address for exactly this reason. See `LOCAL-SEO-GEO-PLAN.md`.

Needed: profile claimed status, the exact listing name as it appears on Google,
the short "leave a review" link, and confirmation that Google's hours match
Mon–Fri 9–5 with weekends by appointment.

While `NEXT_PUBLIC_GBP_REVIEW_URL` is empty, the review button is hidden.

---

## 3. Real reviews

**Status:** none supplied. `testimonials` in `site-config.mjs` is an empty array.

No reviews section renders, and `AggregateRating` / `Review` schema are absent —
`verify.mjs` actively fails the build if either appears. That is deliberate:
fabricated reviews violate FTC rules and can get a Google Business Profile
suspended.

Needed per review: client first name, the quote, which service, and the source
(Google / Instagram / direct). Four or five real ones is plenty.

Also needed: **written permission to publish client photos** — the
`gallery_items.has_client_release` column exists to record it.

---

## 4. Nevada cosmetology licence

**Status:** not supplied. `site.license` is empty, so the licence line and the
`hasCredential` structured data are both omitted entirely.

Needed: the number, the licence type, and whether she wants it shown publicly.
Publishing it is a small but real trust and E-E-A-T signal. **It will never be
invented** — `verify.mjs` fails the build if `hasCredential` appears without a
verified number behind it.

---

## 5. Social profiles

**Status:** none supplied. `sameAs` is empty in the JSON-LD, and no social icons
render — there are no dead links or `href="#"` placeholders anywhere.

Needed: Instagram, TikTok, Facebook, Yelp. For a hair stylist, **Instagram is
usually the strongest single trust signal on the page** and its absence is
noticeable. It also feeds `sameAs`, which helps entity resolution.

---

## 6. Map coordinates

**Status:** not verified. `site.latitude` / `site.longitude` are empty, so `geo`
is omitted from the `HairSalon` schema.

Take the exact pin from the Google Business Profile once claimed. A guessed
coordinate is worse than none, so this is gated rather than estimated.

---

## 7. Booking platform

**Status:** none. Every CTA reads "Request an Appointment" and points at `/book`.

If she uses Vagaro / Booksy / Square / StyleSeat / GlossGenius, set
`NEXT_PUBLIC_BOOKING_URL` and the primary CTA becomes "Book with Kyrin". Also
needed: whether a deposit is required, and how much.

Note: the current flow never implies a submitted form is a confirmed
appointment, and that wording must survive any change here.

---

## 8. Policies

**Status:** none confirmed. `policies` in `site-config.mjs` is empty.

`/policies` currently publishes only what is genuinely operative — a request is
not an appointment, pricing is quoted, consultations come first for big changes,
contact her to reschedule — and says plainly that anything else is agreed
directly. Nothing was invented on her behalf.

Needed if she wants them published: cancellation, late arrival, redo/adjustment
window, payment methods, whether extensions require a consultation first, and a
children policy.

---

## 9. Background for the About page

**Status:** partially unfilled. About is written from what is confirmed.

Needed: years of experience, cosmetology school and year, certifications
(extensions, Olaplex, brand education), the product lines she actually uses, the
two or three services she most wants to be known for, a few sentences in her own
words about why she does this, and any languages spoken.

This is the E-E-A-T backbone. **"In her own words" matters most** — it is the
part no one else can write and the part that makes the page hers.

---

## 10. Smaller confirmations

| Item | Current state |
|---|---|
| Suite number | **Answered from the repo: Suite 128.** Confirm still correct |
| Business email | **Answered from the repo: kyrinweidauer@gmail.com.** Confirm this is the right inbox for leads |
| Salon name | Venus Salon — confirm still correct |
| Find-me note | Not supplied. `/visit` tells guests to contact Kyrin for the entrance |
| Parking | Not supplied. Same fallback as above |
| Accessibility / step-free entry | Not supplied — worth stating once known |
| Additional portfolio photos | 10 real photographs in use. More is better, with permission |

---

## What is already confirmed and in place

- **Phone 702-533-8176** everywhere — header, footer, `tel:`, `sms:`, schema.
  The incorrect `702-544-8176` **does not appear anywhere in this repo.**
- Venus Salon, 8665 W Flamingo Rd Suite 128, Las Vegas NV 89147.
- Hours: Mon–Fri 9:00am–5:00pm, weekends by appointment, published as
  `openingHoursSpecification`.
- Web3Forms delivery, now server-side so the key no longer ships to the browser.
- 10 real photographs of Kyrin's work, plus a real portrait.
