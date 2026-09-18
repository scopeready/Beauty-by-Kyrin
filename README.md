# Beauty by Kyrin

The website for **Beauty by Kyrin** — Kyrin Weidauer, an independent hair stylist
working inside Venus Salon in Las Vegas. Live at
**https://www.beautybykyrin.com**.

Its job is not to be a portfolio. It is to turn a Las Vegas searcher into an
appointment request.

## Stack

A small hand-written static site generator in plain Node, plus Vercel serverless
functions for the booking endpoint. **No framework, no bundler, and zero runtime
dependencies** — the only `node_modules` entries are dev tools (TypeScript for
checking, Playwright for social cards and QA).

That is a deliberate choice, not an accident of history. For ~25 content pages
with no auth and no per-user state, a framework would add a hydration cost to a
site whose ranking and conversion both depend on being fast, and buy very little
back. What the site does need from a server — validated, rate-limited, durable
lead capture — lives in `api/`.

```
build.mjs              generator: renders pages, JSON-LD, sitemap, robots, llms.txt
templates.mjs          every page's markup, and the route table in pages()
content.mjs            services and journal guides
content-guides-drafts.mjs  unpublished drafts awaiting Kyrin's review
site-config.mjs        THE source of truth for every business fact
styles.css             one stylesheet
script.js              progressive enhancement only: nav, gallery, form, FAQ
shell.html             the HTML shell the generator fills
verify.mjs             12,276 assertions against the built HTML
api/book.mjs           POST /api/book — the appointment endpoint
api/_lib/              validation, rate limiting, delivery
supabase/migrations/   schema + RLS. Local only; not applied anywhere
scripts/images.mjs     responsive AVIF/WebP derivatives
scripts/og.mjs         branded 1200x630 social cards, rendered in a real browser
docs/                  research, strategy, and what still needs answering
```

## Commands

```bash
npm run dev        # build, then serve on http://127.0.0.1:4173
npm run build      # render into dist/
npm run check      # typecheck + API tests + build + verify. Run before pushing
npm run verify     # assert against the built HTML
npm run test:api   # booking endpoint logic, no network
npm run images     # regenerate responsive derivatives (after adding a photo)
npm run og         # regenerate social cards (needs Playwright)
PUBLISH_DRAFTS=true npm run build   # include unpublished journal drafts
```

## Rules that are enforced, not just documented

`verify.mjs` fails the build on each of these. They exist because the cost of
getting one wrong is legal or reputational, not cosmetic.

- **No fabricated reviews.** `AggregateRating` and `Review` may never appear.
  `testimonials` in `site-config.mjs` is empty; the section renders only when it
  is not. Inventing reviews breaks FTC rules and can get a Google Business
  Profile suspended.
- **No unverified facts in structured data.** `geo`, `sameAs` and
  `hasCredential` are each gated on their config being filled in. A guessed
  coordinate or an invented licence number is worse than an absent one.
- **No prices.** None are published, because none have been supplied. See
  `docs/LAUNCH-INPUTS-NEEDED.md`.
- **A request is never called a booking.** An appointment exists when Kyrin
  confirms it, and the copy says so everywhere.
- **Drafts never carry her byline.** Draft guides are excluded from the build
  entirely — no URL, no sitemap entry, no listing.

## Adding things

**A photograph:** drop it in `assets/`, add an entry to `portfolio` in
`site-config.mjs` with real alt text, run `npm run images`, then `npm run check`.

**A service:** add it to `services` in `content.mjs`. It needs `notFor` as well
as `bestFor` — saying who a service is *not* for is a trust signal almost no
competitor offers. The route, schema, sitemap entry and navigation follow
automatically.

**A business fact:** `site-config.mjs`, and only there. The phone number lives in
exactly one place for a reason.

## Deployment

Vercel, from `main`, automatically. **A push to `main` republishes the live
public site.** Read `docs/DEPLOYMENT-PLAN.md` before pushing — including which of
the two Vercel projects is canonical, and why `INDEX_SITE` must never be set on
the Preview scope.
