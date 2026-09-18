import { mkdir, readFile, writeFile, cp, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// This optional audit changes only this Node process and writes to an isolated
// directory. The regular preview output and the caller's environment stay intact.
const productionAudit = process.argv.includes('--production-audit');
if (productionAudit) {
  process.env.SITE_URL = 'https://www.beautybykyrin.com';
  process.env.INDEX_SITE = 'true';
}
const { site } = await import('./site-config.mjs');
const { pages, header, footer, esc } = await import('./templates.mjs');

const root = path.dirname(fileURLToPath(import.meta.url));
const reportDir = path.join(root, '.build', ...(productionAudit ? ['production-audit'] : []));
const out = productionAudit ? path.join(reportDir, 'dist') : path.join(root, 'dist');
const origin = new URL(site.origin).origin;
const exists = async file => access(file).then(() => true, () => false);
const absolute = value => new URL(value, `${origin}/`).href;
const route = value => value === '/' ? '/' : `/${String(value).replace(/^\/+|\/+$/g, '')}`;
const outputFile = value => value === '/' ? 'index.html' : `${value.slice(1)}.html`;
const xml = value => String(value).replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
const plain = html => String(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const pageList = (await pages()).map(page => ({...page, path: route(page.path)}));
const seen = new Set();
for (const page of pageList) {
  if (!/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(page.path) || seen.has(page.path)) throw new Error(`Invalid or duplicate page route: ${page.path}`);
  if (!page.title || !page.description || !page.body) throw new Error(`Incomplete page: ${page.path}`);
  seen.add(page.path);
}
if (!seen.has('/')) throw new Error('The website requires a home page.');
const discoveryPages = pageList.filter(page => page.noindex !== true);

const businessId = absolute('/#business');
const personId = absolute('/#kyrin');
const websiteId = absolute('/#website');
const ogImage = absolute('/assets/og-image.jpg');
// Only verified facts reach the graph. An unverified value is omitted, never
// guessed: a wrong coordinate or an invented licence is worse than an absent one.
const sameAs = [site.instagram, site.tiktok, site.facebook, site.yelp, site.googleBusinessProfileUrl].filter(Boolean);
const business = {
  '@type': 'HairSalon', '@id': businessId,
  name: site.name, url: absolute('/'), telephone: site.telephone, email: site.email,
  description: 'Independent hair stylist in Las Vegas offering personalized haircuts, color, balayage, highlights, extensions and hair treatments. Appointments are arranged directly with Kyrin.',
  image: [ogImage, absolute(site.portrait.src)],
  address: {'@type':'PostalAddress', streetAddress:site.address, addressLocality:site.locality, addressRegion:site.region, postalCode:site.postalCode, addressCountry:'US'},
  founder: {'@id':personId},
  employee: {'@id':personId},
  areaServed: site.areasServed.map(name => ({'@type':'City', name})),
  hasMap: site.maps,
  // No price is published anywhere on this site, so priceRange is deliberately
  // absent rather than a vague "$$" that is not backed by a real figure.
  openingHoursSpecification: site.hours.map(block => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: block.days, opens: block.opens, closes: block.closes,
  })),
};
if (site.latitude && site.longitude) {
  business.geo = {'@type':'GeoCoordinates', latitude:site.latitude, longitude:site.longitude};
}
if (sameAs.length) business.sameAs = sameAs;

const person = {
  '@type':'Person', '@id':personId, name:site.person, jobTitle:site.jobTitle,
  worksFor:{'@id':businessId}, url:absolute('/about'), image:absolute(site.portrait.src),
  knowsAbout:['Balayage','Hair color','Highlights','Haircuts and styling','Hair extensions','Hair treatments'],
};
if (sameAs.length) person.sameAs = sameAs;
// A2 is unfilled, so hasCredential is omitted entirely. Never invent a licence.
if (site.license.display && site.license.number) {
  person.hasCredential = {
    '@type':'EducationalOccupationalCredential',
    credentialCategory: site.license.type || 'Cosmetology license',
    identifier: site.license.number,
    recognizedBy: {'@type':'GovernmentOrganization', name:'Nevada State Board of Cosmetology'},
  };
}

function breadcrumb(page) {
  if (page.path === '/') return null;
  const items = [{name:'Home', item:absolute('/')}];
  const segments = page.path.slice(1).split('/');
  for (let index = 0; index < segments.length; index++) {
    const parentPath = `/${segments.slice(0, index + 1).join('/')}`;
    const parent = pageList.find(candidate => candidate.path === parentPath);
    if (!parent) continue;
    const name = parent.service?.name || parent.guide?.title || parent.breadcrumb || parent.title.split('|')[0].trim();
    items.push({name, item:absolute(parentPath)});
  }
  return {'@type':'BreadcrumbList', '@id':`${absolute(page.path)}#breadcrumb`, itemListElement:items.map((item, index) => ({'@type':'ListItem', position:index + 1, ...item}))};
}

function schema(page) {
  const url = absolute(page.path);
  const pageType = {about:'AboutPage', contact:'ContactPage', book:'ContactPage', visit:'ContactPage', gallery:'CollectionPage', services:'CollectionPage', guides:'CollectionPage'}[page.type] || (/^[A-Z][A-Za-z]+Page$/.test(page.type || '') ? page.type : 'WebPage');
  const crumbs = breadcrumb(page);
  const webPage = {'@type':pageType, '@id':`${url}#webpage`, url, name:page.title, description:page.description, inLanguage:'en-US', isPartOf:{'@id':websiteId}, about:{'@id':businessId}, primaryImageOfPage:{'@type':'ImageObject', url:absolute(page.service?.image || page.guide?.image || '/assets/og-image.jpg')}};
  if (crumbs) webPage.breadcrumb = {'@id':crumbs['@id']};
  const graph = [business, person, {'@type':'WebSite','@id':websiteId,url:absolute('/'),name:site.name,inLanguage:'en-US',publisher:{'@id':businessId}}, webPage];
  if (crumbs) graph.push(crumbs);
  if (page.service) {
    const serviceId = `${url}#service`;
    graph.push({'@type':'Service','@id':serviceId,name:page.service.name || page.title.split('|')[0].trim(),serviceType:page.service.name,description:page.description,url,provider:{'@id':businessId},areaServed:{'@type':'City',name:'Las Vegas'}});
    webPage.mainEntity = {'@id':serviceId};
  }
  // FAQPage only where the answers are unique to that page. The home, visit and
  // new-guest pages reuse entries from the general set, so marking them up too
  // would publish the same Q&A at several URLs.
  if (Array.isArray(page.faqs) && page.faqs.length) {
    graph.push({
      '@type': 'FAQPage', '@id': `${url}#faq`, url, inLanguage: 'en-US',
      isPartOf: {'@id': websiteId},
      mainEntity: page.faqs.map(item => ({
        '@type': 'Question', name: item.q,
        acceptedAnswer: {'@type': 'Answer', text: item.a},
      })),
    });
  }
  if (page.guide) {
    const articleId = `${url}#article`;
    graph.push({'@type':'Article','@id':articleId,headline:page.guide.title || page.title,description:page.description,url,image:absolute(page.guide.image || '/assets/og-image.jpg'),mainEntityOfPage:{'@id':webPage['@id']},author:{'@type':'Organization','@id':businessId,name:site.name,url:absolute('/about')},publisher:{'@id':businessId},inLanguage:'en-US'});
    webPage.mainEntity = {'@id':articleId};
  }
  return JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g, '\\u003c');
}

// One branded social card per page type, rendered by scripts/og.mjs.
function socialImage(page) {
  const route = page.path;
  if (route === '/') return absolute('/assets/og/home.jpg');
  if (route === '/portfolio') return absolute('/assets/og/portfolio.jpg');
  if (route === '/about') return absolute('/assets/og/about.jpg');
  if (route === '/book' || route === '/thank-you') return absolute('/assets/og/book.jpg');
  if (route.startsWith('/journal')) return absolute('/assets/og/journal.jpg');
  if (route.startsWith('/services')) return absolute('/assets/og/services.jpg');
  return absolute('/assets/og/home.jpg');
}

function head(page, forceNoIndex = false) {
  const url = absolute(page.path);
  const social = socialImage(page);
  const robots = site.indexable && page.noindex !== true && !forceNoIndex ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,follow';
  return `<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#15110f">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="${page.guide ? 'article' : 'website'}">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(social)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Beauty by Kyrin, personalized hair styling in Las Vegas">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${esc(social)}">
<meta name="twitter:image:alt" content="Beauty by Kyrin, personalized hair styling in Las Vegas">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<script type="application/ld+json">${schema(page)}</script>`;
}

await mkdir(out, {recursive:true});
await mkdir(reportDir, {recursive:true});
if (await exists(path.join(root, 'public'))) await cp(path.join(root, 'public'), out, {recursive:true});
if (await exists(path.join(root, 'assets'))) await cp(path.join(root, 'assets'), path.join(out, 'assets'), {recursive:true});
for (const name of ['styles.css','script.js','site.webmanifest']) await cp(path.join(root, name), path.join(out, name));
const shell = await readFile(path.join(root, 'shell.html'), 'utf8');
for (const token of ['__HEAD__','__CLASS__','__HEADER__','__BODY__','__FOOTER__']) if (!shell.includes(token)) throw new Error(`shell.html is missing ${token}`);
function render(page, forceNoIndex = false) {
  const replacements = {__HEAD__:head(page, forceNoIndex),__CLASS__:esc(page.className || `page-${page.type || 'standard'}`),__HEADER__:header(page.path),__BODY__:page.body,__FOOTER__:footer()};
  return shell.replace(/__HEAD__|__CLASS__|__HEADER__|__BODY__|__FOOTER__/g, token => replacements[token]);
}
for (const page of pageList) {
  const target = path.join(out, outputFile(page.path));
  await mkdir(path.dirname(target), {recursive:true});
  await writeFile(target, render(page));
}
const notFound = {path:'/404',title:'Page not found | Beauty by Kyrin',description:'This page could not be found. Explore hair services or request an appointment with Beauty by Kyrin in Las Vegas.',type:'standard',className:'page-not-found',body:`<section class="page-hero"><div class="wrap"><p class="label">A little detour</p><h1>Let’s get you<br><em>back to beautiful.</em></h1><p class="lede">That page isn’t here. Your next great hair day still can be.</p><p><a class="button button-dark" href="/">Back to the homepage</a> <a class="text-link" href="/book">Request an appointment</a></p></div></section>`};
await writeFile(path.join(out, '404.html'), render(notFound, true));
await writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${discoveryPages.map(page => `  <url><loc>${xml(absolute(page.path))}</loc></url>`).join('\n')}\n</urlset>\n`);
// Answer engines are named explicitly. They are allowed by `User-agent: *`
// anyway, but several operators read a named group as an affirmative signal,
// and it documents the decision for whoever edits this next.
const aiAgents = ['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-User','PerplexityBot','Perplexity-User','Google-Extended','Bingbot','Applebot','Applebot-Extended','CCBot'];
// Crawling always stays allowed, even for a preview. `Disallow: /` would stop a
// crawler fetching the page at all, so it would never see the noindex meta tag —
// and a URL blocked that way can still sit in an index with no content behind
// it. Preview builds are kept out by the per-page noindex in head().
await writeFile(path.join(out, 'robots.txt'),
  `User-agent: *\nAllow: /\n\n${aiAgents.map(agent => `User-agent: ${agent}\nAllow: /`).join('\n\n')}\n\nSitemap: ${absolute('/sitemap.xml')}\n`);
const facts = `${site.name} is the independent hair stylist business of ${site.person} in ${site.locality}, ${site.region}.\nLocation: ${site.location}, ${site.address}, ${site.locality}, ${site.region} ${site.postalCode}.\nPhone and text: ${site.phone}.\nAvailability: ${site.availability}\nAppointments are requests until Kyrin confirms a date and time. Pricing and service scope are discussed directly; no online payment is collected by this website.\n`;
await writeFile(path.join(out, 'llms.txt'), `# ${site.name}\n\n${facts}\n## Website pages\n\n${discoveryPages.map(page => `- [${page.title}](${absolute(page.path)}): ${page.description}`).join('\n')}\n\n## Full reference\n\n- [Full website reference](${absolute('/llms-full.txt')})\n`);
await writeFile(path.join(out, 'llms-full.txt'), `# ${site.name}: website reference\n\n${facts}\n${discoveryPages.map(page => `## ${page.title}\n\nURL: ${absolute(page.path)}\n\n${plain(page.body)}\n`).join('\n')}`);
const manifest = {origin,indexable:site.indexable,productionAudit,generatedAt:new Date().toISOString(),pages:pageList.map(page => ({path:page.path,file:outputFile(page.path),title:page.title,description:page.description,type:page.type,noindex:page.noindex === true,canonical:absolute(page.path)})),notFound:'404.html'};
await writeFile(path.join(reportDir, 'page-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Built ${pageList.length} pages and a 404 page in ${path.relative(root, out)}. Sitemap: ${discoveryPages.length} pages. Indexing: ${site.indexable ? 'enabled for public pages' : 'disabled for review'}. Canonical origin: ${origin}`);
