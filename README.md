# Beauty by Kyrin · v2

An editorial website for Kyrin Weidauer, an independent hair stylist inside Venus Salon in Las Vegas. Authentic portfolio photography, decorative scroll-controlled film, useful service guides, and direct appointment requests support a personal client experience.

## Architecture

This is a zero-dependency Node.js static site generator. Node.js 20 or newer is required. There is no framework runtime, database, or package installation required for the application.

- `site-config.mjs`: business facts, contact details, availability, portfolio, shared FAQs, and publishing settings.
- `content.mjs`: five service pages and three hair journal guides.
- `templates.mjs`: shared navigation/footer and page bodies.
- `shell.html`: HTML shell, fonts, stylesheet, and deferred enhancement script.
- `build.mjs`: HTML, metadata, JSON-LD, sitemap, robots, and supplementary text references.
- `styles.css` / `script.js`: responsive presentation and interaction enhancements.
- `assets/`: supplied photographs, derived motion media, social image, and icons.
- `server.mjs`: local server with clean routes and security headers.
- `verify.mjs`: generated-site checks; report at `.build/verification-report.json`.
- `vercel.json`: build command, output, clean URLs, caching, and security headers.
- `scripts/audit.mjs` / `scripts/serve.mjs`: compatibility entry points that delegate to the current build/check/server workflow.

The generator writes 19 content routes, including request confirmation, plus a custom 404: 20 HTML pages total. `dist/` is the authoritative deployment output. Root-level `index.html`, `404.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, and `llms-full.txt` are generated reference snapshots retained for continuity with the original site. Edit `templates.mjs`, `content.mjs`, and `site-config.mjs`, not those snapshots or files in `dist/`.

## Local development

From this directory:

```powershell
npm run dev
```

Open `http://127.0.0.1:4173`. This builds once before starting the server. After source changes, run `npm run build` in another terminal and refresh. Set `PORT` if a different port is needed.

```powershell
npm run check
```

The check command validates JavaScript syntax, rebuilds, and checks metadata, canonical URLs, structured data, internal routes/fragments, assets, form labels, sitemap consistency, and review indexing settings. It does not send appointment requests or prove mailbox delivery. Browser review remains useful for layout, keyboard operation, motion, and form states.

## GitHub and Vercel

Source: [scopeready/Beauty-by-Kyrin](https://github.com/scopeready/Beauty-by-Kyrin). Review address: [beauty-by-kyrin-live.vercel.app](https://beauty-by-kyrin-live.vercel.app).

The existing Vercel project is connected to the repository. Use `npm run build`, output directory `dist`, and no framework preset. Production branch updates deploy through the Git connection.

| Variable | Default | Purpose |
| --- | --- | --- |
| `SITE_URL` | `https://beauty-by-kyrin-live.vercel.app` | Origin for canonical URLs, metadata, structured data, sitemap, references, and form redirects. |
| `INDEX_SITE` | unset / false | Only the exact value `true` enables indexing for public content pages. Otherwise pages emit `noindex,follow`. |

The review site permits crawling so crawlers can see `noindex`; `robots.txt` does not block those directives. Confirmation and error pages remain excluded from indexing.

Custom-domain launch is separate. No SiteGround DNS cutover is part of this build. When the domain is ready to move, configure it and redirects in Vercel, preserve email DNS records, set `SITE_URL=https://www.beautybykyrin.com` and `INDEX_SITE=true`, redeploy, and check canonical URLs and sitemap before search submission. Environment settings alone do not change DNS.

## Appointment requests

The form uses the existing Web3Forms endpoint and client access key supplied with the original website. The browser-visible access key is an integration identifier, not a server secret. Never put private API credentials in static source files.

JavaScript provides validation and sending/success/failure states; failed requests preserve entered details. Native form submission provides a fallback, with a static `/thank-you` receipt page. A request is not a confirmed appointment: Kyrin must agree on the service, date, and time directly. No payment is collected.

Do not send unsolicited test requests during automated checks. The owner should later make one clearly labeled submission and verify receipt, reply routing, spam filtering, and the current Web3Forms destination before custom-domain launch. Mailbox delivery has not been verified by this build.

## Content and search integrity

The site uses client-supplied facts and photographs. Venus Salon's suite address was corroborated through its official site. Conflicting fixed hours are replaced with “By appointment. Contact Kyrin for availability.” Unverified social profiles, testimonials, ratings, prices, awards, coordinates, and specific extension brands/methods are not presented as established facts.

Each content page has individual metadata and semantic HTML. JSON-LD connects `HairSalon`, `Person`, `WebSite`, page, service, article, and breadcrumb entities as relevant. Visible FAQs help visitors without a promise of FAQ rich results. `llms.txt` and `llms-full.txt` mirror the visible content; they are supplementary references, not a ranking mechanism or an AI-search requirement.

Search visibility, local rankings, rich results, and AI citations depend on systems outside this repository and are not guaranteed.
