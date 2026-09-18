# Beauty by Kyrin · v2 design brief

## Direction

Beauty by Kyrin is a personal Las Vegas hair experience, with the stylist and the client's individuality at its center. The direction is a beauty editorial: generous paper-colored space, deep plum, lively pink, expressive typography, and authentic hair photography. The home page introduces the feeling; supporting pages provide the detail needed to choose a service and start a conversation.

Core message: “A little dimension. A lot of you.” The conversion goal is a qualified appointment request or direct text to Kyrin. A request must remain clearly distinct from a confirmed booking.

## Visual system

- Ink `#281a23`, deep plum `#21151e`, paper `#fcf7f5`, pale blush `#f3e6e7`, pink `#ed83ae`, rose `#a92a60`.
- Cormorant Garamond for expressive display typography; Jost for navigation, body copy, forms, and supporting details.
- Large headlines with selective italics, quiet labels, editorial numbering, generous spacing, and clear contrast.
- Asymmetric photo compositions, staggered portfolio columns, occasional rounded image corners, and a circular booking invitation. Varied scale replaces a repeated card-grid treatment.
- Mobile layouts retain readable copy, useful image crops, generous touch targets, navigation, and persistent text/appointment actions.

## Motion and imagery

Animation mode: animated-website.

The scroll-led experience enhances a complete static site. A dedicated home-page film section scrubs decorative video in response to ordinary scrolling without locking or hijacking it. The existing motion asset derives from a supplied portfolio photograph. It is an atmospheric treatment, not evidence of a separate client transformation or extension installation.

The film loads near its section and uses separate desktop/mobile files. Static photography and posters remain useful without motion. Reduced-motion preferences disable film enhancement and decorative transitions; data-saving connections avoid fetching video. Small entrance, image, and link transitions support the page without concealing essential text.

The portfolio uses three photographs supplied with the original site, captioned according to visible color and shape. Kyrin's portrait introduces the person behind the chair. Do not invent client results, before/after histories, reviews, or installation examples. Extension-page imagery is inspiration for length and movement, not a documented installation claim.

## Pages and journey

There are 19 content routes, including request confirmation, plus a custom 404: 20 HTML pages total.

1. Home: identity, services, motion, portfolio, service finder, Kyrin, first-visit invitation, guides, location, and booking.
2. Services hub and five detail pages: balayage; color/highlights; haircuts/styling; extensions; treatments/hair care.
3. Portfolio: category filters, enlarged images, descriptive captions, and inspiration carried into the request flow.
4. About: Kyrin's personal approach, consultation priorities, and location.
5. First visit: what to share, what to bring, budget discussion, and confirmation expectations.
6. Visit: suite address, directions, contact, and arrival planning.
7. Booking: service choice, hair context, availability, form feedback, and text/call alternatives.
8. FAQ: location, pricing, preparation, availability, and appointment changes.
9. Journal hub and three guides: balayage versus highlights, preparing for color, and extension consultations.
10. Privacy, request confirmation, and 404 utility pages.

The service finder translates an everyday goal into a suggested starting page. It is not a diagnosis or final recommendation. Service pages lead into relevant appointment requests. First-visit guidance reduces uncertainty through useful expectations, not discounts or artificial urgency.

## Search and factual standards

Complete content is generated as HTML. Each page has a distinct search purpose, descriptive headings/links, canonical URL, social metadata, and relevant structured data. Service and journal pages connect through useful links; nearby areas are honest location context, not duplicated doorway pages.

`HairSalon`, `Person`, `WebSite`, service, article, and breadcrumb entities use consistent identifiers and details. GEO means making business facts and useful answers easy to retrieve accurately. Supplementary llms references mirror visible content and contain no instructions to rank or recommend the business.

Use the supplied phone and corroborated Venus Salon address. Availability is by appointment because source hours conflict. Omit unsupported socials, testimonials, ratings, awards, prices, precise coordinates, and extension methods/brands. Do not promise rankings, rich results, or AI recommendations.

## Delivery

A zero-dependency Node.js generator produces `dist/` for the GitHub-connected Vercel project. The default origin is the public Vercel review alias with indexing disabled. Custom-domain DNS cutover and enabling public indexing are separate launch steps. Web3Forms delivers appointment requests; actual mailbox delivery remains an owner validation step.
