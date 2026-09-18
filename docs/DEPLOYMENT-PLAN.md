# Deployment plan

**Nothing in this document has been executed.** The work is committed to a local
branch and has not been pushed. No DNS was touched, no Vercel setting changed, no
remote Supabase resource created.

---

## Read this first: the brief's premise was out of date

The build brief said the domain was served by SiteGround and that cutting over
early would take Kyrin's site down. **That is no longer true.**

As of this build:

- `www.beautybykyrin.com` and the apex both resolve to Vercel (216.150.x.x).
- Both domains are attached to the **`beauty-by-kyrin`** project
  (`prj_JL4FVVqG7jnTzbdFiOX1vZmJ688Q`), which has a READY production deployment.
- That project is serving the current multi-page site right now.

The risk therefore runs the other way. It is not "deploying early breaks the old
site" — it is **"any push to `main` immediately republishes the live public
site."** And because *both* Vercel projects are connected to this same
repository, one push builds both.

That is why nothing has been pushed.

---

## The two Vercel projects

| Project | ID | Domains | Verdict |
|---|---|---|---|
| `beauty-by-kyrin` | `prj_JL4FVVqG7jnTzbdFiOX1vZmJ688Q` | `www.beautybykyrin.com`, `beautybykyrin.com`, `beauty-by-kyrin.vercel.app` | **Canonical.** It holds the real domains |
| `beauty-by-kyrin-live` | `prj_0rNHr9ExaEEKlmkEFWRtjgkrhG3N` | `beauty-by-kyrin-live.vercel.app` only | **Redundant.** Same repo, no real domain |

**Recommendation:** keep `beauty-by-kyrin` as canonical. Do not create a third
project. Do not delete `beauty-by-kyrin-live` yet — first disconnect its Git
integration so a push stops triggering a second, pointless production build.
Delete it only once the owner confirms nothing links to its `.vercel.app` URL.

> Note: the old build hard-coded `beauty-by-kyrin-live.vercel.app` as the
> canonical origin. That is fixed — `SITE_URL` now defaults to
> `https://www.beautybykyrin.com`.

---

## Environment variables

Set in Vercel Project Settings, never in the repo. **The site builds and the
booking form works with none of them set** — each is an override.

| Variable | Scope | Needed? | Effect while unset |
|---|---|---|---|
| `SITE_URL` | Production | No | Defaults to `https://www.beautybykyrin.com` |
| `INDEX_SITE` | **Production only** | **Yes** | Pages emit `noindex`. Must be exactly `true` in production and **absent from Preview** |
| `WEB3FORMS_ACCESS_KEY` | Production, Preview | No | Falls back to the committed key, so the form cannot ship dead |
| `SUPABASE_URL` | Production | Optional | Leads are delivered by email only |
| `SUPABASE_SERVICE_ROLE_KEY` | Production | Optional | As above. **Server-side only — never a `NEXT_PUBLIC_` variable** |
| `NEXT_PUBLIC_GA_ID` | Production | Optional | No analytics script is emitted |
| `NEXT_PUBLIC_BOOKING_URL` | Production | Optional | CTAs read "Request an Appointment" |
| `NEXT_PUBLIC_GBP_REVIEW_URL` | Production | Optional | The review button is hidden |

**`INDEX_SITE` is the one that matters.** Setting it at the Preview scope would
let a preview deployment be indexed and compete with the real site.

---

## Deployment sequence — only after APPROVE DEPLOYMENT

1. **Re-fetch and confirm.** `git fetch origin main` and check nothing has
   changed on `main` since this branch was cut.
2. **Run the gate locally.** `npm run check` must pass, and
   `npm run audit:production` should be clean. Confirm the build ends without
   warnings.
3. **Push the branch — not `main`.** `git push -u origin claude/sweet-gates-ybew9w`.
   This triggers a **preview** build on both projects. That is the intended
   moment to see it deployed for real.
4. **QA the preview properly.** Every route, both breakpoints. Specifically:
   - Submit the form end-to-end and confirm the email arrives in Kyrin's inbox.
   - Confirm the preview is `noindex` (`INDEX_SITE` must not be set for Preview).
   - Check `tel:` and `sms:` links on a real phone.
   - Validate the JSON-LD in Google's Rich Results Test.
5. **Supabase (optional, only if lead storage is wanted).** Create the project,
   run `supabase/migrations/0001_initial_schema.sql`, then set `SUPABASE_URL`
   and `SUPABASE_SERVICE_ROLE_KEY`. **Verify RLS**: with the anon key, a
   `select` on `appointment_inquiries` must return nothing.
6. **Merge to `main`.** This publishes to `www.beautybykyrin.com` immediately.
7. **Verify production.** SSL, form delivery, sitemap, robots, canonicals, and
   that **no `noindex` remains** on any public page.
8. **Set `INDEX_SITE=true`** on Production if it is not already, and redeploy.

Apex → www is already configured in Vercel; no DNS change is required.

---

## Rollback

Vercel keeps every previous deployment. If anything looks wrong on production,
open the `beauty-by-kyrin` project, find the last known-good deployment and use
**Promote to Production**. That is faster and safer than a revert commit, and it
does not need a rebuild.

---

## Recommended hardening after launch

- **Vercel Firewall rate-limit rule on `/api/book`.** The in-process limiter in
  `api/_lib/ratelimit.mjs` is best-effort: serverless instances do not share
  memory, so it slows an abuser rather than stopping one. A firewall rule is the
  real ceiling. This is deliberate — a strict limiter that drops a genuine lead
  costs more than the spam it prevents.
- **Watch the function logs for `[book] LEAD LOST`.** That line only appears if
  both Web3Forms *and* Supabase failed on the same request, which is the one
  case where a guest saw an error. It should never appear.
- Leave the SiteGround files alone until the owner confirms removal.
