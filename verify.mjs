import { readFile, access, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { site, portfolio, testimonials } from './site-config.mjs';

const SAME_AS = [site.instagram, site.tiktok, site.facebook, site.yelp, site.googleBusinessProfileUrl].filter(Boolean);

const root = path.dirname(fileURLToPath(import.meta.url));
const productionAudit = process.argv.includes('--production-audit');
const reportDir = path.join(root, '.build', ...(productionAudit ? ['production-audit'] : []));
const dist = productionAudit ? path.join(reportDir, 'dist') : path.join(root, 'dist');
const manifest = JSON.parse(await readFile(path.join(reportDir, 'page-manifest.json'), 'utf8'));
const discoveryPages = manifest.pages.filter(page => page.noindex !== true);
const failures = [];
let assertions = 0;
const check = (condition, message) => {assertions++; if (!condition) failures.push(message);};
const exists = async file => access(file).then(() => true, () => false);
const decode = text => String(text || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
const attributes = tag => {
  const result = {};
  for (const match of tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) result[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4]);
  return result;
};
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => ({text:match[0],attr:attributes(match[0]),index:match.index}));
const meta = (html, name) => tags(html, 'meta').find(tag => tag.attr.name === name || tag.attr.property === name)?.attr.content;
const files = new Map();
for (const page of manifest.pages) files.set(page.path, await readFile(path.join(dist, page.file), 'utf8'));
files.set('/404', await readFile(path.join(dist, manifest.notFound), 'utf8'));
const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();
const ids = new Map([...files].map(([route, html]) => [route,new Set([...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(match => decode(match[1])))]));

async function localReference(value, from, kind) {
  if (!value || /^(?:mailto|tel|sms|data|blob|javascript):/i.test(value)) return;
  let url;
  try {url = new URL(decode(value), `${manifest.origin}${from}`);} catch {check(false, `${from}: invalid ${kind} URL ${value}`); return;}
  if (url.origin !== manifest.origin) return;
  let pathname;
  try {pathname = decodeURIComponent(url.pathname);} catch {check(false, `${from}: malformed path ${url.pathname}`);return;}
  const route = pathname === '/' ? '/' : pathname.replace(/\.html$/, '').replace(/\/$/, '');
  if (files.has(route)) {
    if (url.hash) check(ids.get(route).has(decodeURIComponent(url.hash.slice(1))), `${from}: missing anchor ${value}`);
    return;
  }
  const target = path.resolve(dist, `.${pathname}`);
  check(target.startsWith(`${dist}${path.sep}`), `${from}: reference outside dist ${value}`);
  check(await exists(target), `${from}: missing ${kind} ${value}`);
}

for (const [route, html] of files) {
  const page = manifest.pages.find(candidate => candidate.path === route);
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]);
  const description = meta(html, 'description');
  const canonical = tags(html, 'link').find(tag => tag.attr.rel === 'canonical')?.attr.href;
  const robots = meta(html, 'robots') || '';
  check((html.match(/<h1\b/gi) || []).length === 1, `${route}: must have exactly one H1`);
  check(Boolean(title) && !titles.has(title), `${route}: missing or duplicate title`);titles.add(title);
  check(Boolean(description) && !descriptions.has(description), `${route}: missing or duplicate description`);descriptions.add(description);
  check(Boolean(canonical) && !canonicals.has(canonical), `${route}: missing or duplicate canonical`);canonicals.add(canonical);
  check(canonical === `${manifest.origin}${route}`, `${route}: canonical does not match real page URL`);
  if (page) {
    check(title === page.title, `${route}: title differs from page manifest`);
    check(description === page.description, `${route}: description differs from page manifest`);
  }
  check(/width=device-width/.test(meta(html, 'viewport') || ''), `${route}: missing responsive viewport`);
  check(meta(html, 'og:url') === canonical, `${route}: Open Graph URL mismatch`);
  check(/^https:\/\//.test(meta(html, 'og:image') || ''), `${route}: Open Graph image must be absolute HTTPS`);
  check(meta(html, 'twitter:card') === 'summary_large_image', `${route}: missing Twitter image card`);
  check(!/__HEAD__|__CLASS__|__HEADER__|__BODY__|__FOOTER__/.test(html), `${route}: unexpanded shell placeholder`);
  check(!/lorem ipsum|TODO|PLACEHOLDER_CONTENT/i.test(html), `${route}: placeholder content found`);
  if (!manifest.indexable || page?.noindex || route === '/404') check(/(?:^|,)noindex(?:,|$)/.test(robots) && !/(?:^|,)index(?:,|$)/.test(robots), `${route}: review, confirmation or 404 page allows indexing`);
  else check(/(?:^|,)index(?:,|$)/.test(robots) && !robots.includes('noindex'), `${route}: launch page is not indexable`);
  check(/<html\b[^>]*\blang=["']en(?:-US)?["']/i.test(html), `${route}: missing English document language`);
  check((html.match(/<main\b/gi) || []).length === 1, `${route}: must have exactly one main landmark`);
  check(tags(html,'meta').filter(tag => tag.attr.name === 'viewport').length === 1, `${route}: duplicate viewport metadata`);
  check(tags(html,'meta').filter(tag => 'charset' in tag.attr).length === 1, `${route}: missing or duplicate character encoding metadata`);
  const pageIds = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(match => decode(match[1]));
  check(new Set(pageIds).size === pageIds.length, `${route}: duplicate element IDs`);

  const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  check(blocks.length > 0, `${route}: missing structured data`);
  for (const block of blocks) {
    let data;
    try {data = JSON.parse(block[1]);} catch (error) {check(false, `${route}: invalid JSON-LD: ${error.message}`);continue;}
    check(data['@context'] === 'https://schema.org', `${route}: unexpected schema context`);
    const graph = data['@graph'] || [data];
    check(graph.some(node => node['@type'] === 'HairSalon'), `${route}: missing HairSalon entity`);
    check(graph.some(node => node['@type'] === 'WebSite'), `${route}: missing WebSite entity`);
    check(graph.some(node => node['@type'] === 'Person' && node.image === `${manifest.origin}/assets/kyrin-cutout-v2.webp`), `${route}: Person schema does not use Kyrin’s updated portrait`);
    check(graph.filter(node => node['@type'] === 'HairSalon').every(node => node['@id'] === `${manifest.origin}/#business`), `${route}: inconsistent business entity ID`);
    if (route !== '/' && route !== '/404') check(graph.some(node => node['@type'] === 'BreadcrumbList'), `${route}: missing breadcrumbs`);
    const structuredUrls = [];
    function inspect(value, key = '') {
      if (!value || typeof value !== 'object') return;
      for (const [name, item] of Object.entries(value)) {
        // Properties that must never appear without the evidence behind them.
        // aggregateRating/review stay blocked outright: there are no real,
        // attributable reviews yet, and inventing them breaks FTC rules.
        // geo and sameAs are gated on their config actually being filled in, so
        // an empty value can never reach the page as a guess.
        check(!['aggregateRating','review'].includes(name), `${route}: unverified schema property ${name}`);
        check(name !== 'geo' || Boolean(site.latitude && site.longitude), `${route}: geo published without verified coordinates`);
        check(name !== 'sameAs' || SAME_AS.length > 0, `${route}: sameAs published without verified profiles`);
        check(name !== 'hasCredential' || Boolean(site.license.display && site.license.number), `${route}: hasCredential published without a verified licence`);
        if (name === '@type') check(![item].flat().some(type => ['Review','AggregateRating'].includes(type)), `${route}: self-serving review schema`);
        if (['@id','url','contentUrl','thumbnailUrl','image','item','mainEntityOfPage'].includes(name)) {
          for (const candidate of [item].flat().filter(entry => typeof entry === 'string')) {
            try {
              const structuredUrl = new URL(candidate);
              check(['https:','http:'].includes(structuredUrl.protocol), `${route}: invalid structured URL ${candidate}`);
              structuredUrl.hash = '';
              structuredUrls.push(structuredUrl.href);
            } catch {check(false, `${route}: relative or invalid structured URL ${candidate}`);}
          }
        }
        if (name === 'itemListElement' && Array.isArray(item)) check(item.every((entry, index) => entry.position === index + 1), `${route}: breadcrumb sequence invalid`);
        if (Array.isArray(item)) item.forEach(entry => inspect(entry, name));
        else if (typeof item === 'object') inspect(item, name);
      }
    }
    inspect(data);
    for (const url of new Set(structuredUrls)) await localReference(url, route, 'structured-data URL');
  }

  for (const image of tags(html, 'img')) {
    check('alt' in image.attr, `${route}: image lacks alt: ${image.attr.src}`);
    check(Number(image.attr.width) > 0 && Number(image.attr.height) > 0, `${route}: image lacks dimensions: ${image.attr.src}`);
  }
  const labels = new Set(tags(html, 'label').map(label => label.attr.for).filter(Boolean));
  const labelledRegions = [...html.matchAll(/<label\b[^>]*>[\s\S]*?<\/label>/gi)].map(match => ({start:match.index,end:match.index + match[0].length}));
  for (const input of [...tags(html,'input'),...tags(html,'select'),...tags(html,'textarea')]) {
    if (input.attr.name === 'redirect' && input.attr.value) {
      await localReference(input.attr.value, route, 'form confirmation');
      const confirmation = new URL(input.attr.value, manifest.origin);
      check(confirmation.origin === manifest.origin, `${route}: form redirects to the wrong deployment host`);
      check(manifest.pages.some(candidate => candidate.path === confirmation.pathname && candidate.noindex), `${route}: form confirmation should be a declared noindex page`);
    }
    if (['hidden','submit','button','reset'].includes(input.attr.type) || /\shidden(?:\s|=|>)/i.test(input.text)) continue;
    check(Boolean(input.attr['aria-label'] || input.attr['aria-labelledby'] || (input.attr.id && labels.has(input.attr.id)) || labelledRegions.some(region => input.index > region.start && input.index < region.end)), `${route}: unlabeled form field ${input.attr.name || input.attr.id || input.text}`);
    if (/\brequired(?:\s|=|>)/i.test(input.text)) check(Boolean(input.attr.name), `${route}: required field missing a name`);
  }
  for (const tag of [...tags(html,'a'),...tags(html,'link')]) if (tag.attr.href) await localReference(tag.attr.href, route, 'link');
  for (const tag of [...tags(html,'img'),...tags(html,'script'),...tags(html,'source'),...tags(html,'video')]) {
    if (tag.attr.src) await localReference(tag.attr.src, route, 'asset');
    if (tag.attr.poster) await localReference(tag.attr.poster, route, 'poster');
    if (tag.attr.srcset) for (const candidate of tag.attr.srcset.split(',')) await localReference(candidate.trim().split(/\s+/)[0], route, 'responsive asset');
    for (const [key,value] of Object.entries(tag.attr)) if (/^data-(desktop|mobile)(?:-src|-poster)?$/.test(key)) await localReference(value, route, 'media');
  }
}

// Photo regressions exercise the generated pages and the shipped interaction
// code; source config supplies identity and captions, never the deployment host.
const portfolioHtml = files.get('/portfolio') || '';
const homeHtml = files.get('/') || '';
const bookingHtml = files.get('/book') || '';
const expectedPhotos = ['color-burgundy.webp','highlights-blonde-dimension.webp','extensions-blonde.webp','color-brunette-bob.webp','color-brunette-waves.webp','extensions-highlights-blonde.webp','highlights-blonde-waves.webp'];
const cards = [...portfolioHtml.matchAll(/<div\b([^>]*\bdata-portfolio-item\b[^>]*)>([\s\S]*?)<\/div>/g)].map(match => ({attr:attributes(`<div${match[1]}>`),body:match[2]}));
check(cards.length === 10, 'Portfolio must render all 10 photograph cards');
check(portfolio.length === 10 && new Set(portfolio.map(photo => photo.id)).size === 10, 'Portfolio identities must be unique and complete');
for (const photo of expectedPhotos) check(cards.some(card => tags(card.body,'img').some(image => image.attr.src === `/assets/${photo}`)), `Portfolio missing new photograph ${photo}`);

async function webpSize(src) {
  const data = await readFile(path.join(dist, src.replace(/^\//,'')));
  if (data.toString('ascii',0,4) !== 'RIFF' || data.toString('ascii',8,12) !== 'WEBP') throw new Error(`Not a WebP image: ${src}`);
  for (let offset = 12; offset + 8 <= data.length;) {
    const type = data.toString('ascii',offset,offset + 4);
    const size = data.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (start + size > data.length) break;
    if (type === 'VP8X' && size >= 10) return {width:data.readUIntLE(start + 4,3) + 1,height:data.readUIntLE(start + 7,3) + 1};
    if (type === 'VP8 ' && size >= 10) return {width:data.readUInt16LE(start + 6) & 0x3fff,height:data.readUInt16LE(start + 8) & 0x3fff};
    if (type === 'VP8L' && size >= 5) {const bits = data.readUInt32LE(start + 1);return {width:(bits & 0x3fff) + 1,height:((bits >>> 14) & 0x3fff) + 1};}
    offset = start + size + (size % 2);
  }
  throw new Error(`No supported WebP dimensions found: ${src}`);
}
for (const photo of portfolio) {
  const card = cards.find(candidate => candidate.attr.id === photo.id);
  check(Boolean(card), `Portfolio missing card identity ${photo.id}`);
  const image = card && tags(card.body,'img')[0]?.attr;
  check(image?.src === photo.src && image?.alt === photo.alt, `Portfolio photo/alt mismatch for ${photo.id}`);
  try {
    const actual = await webpSize(photo.src);
    check(actual.width === photo.width && actual.height === photo.height, `Config dimensions differ from actual photograph ${photo.id}`);
    check(Number(image?.width) === actual.width && Number(image?.height) === actual.height, `Rendered dimensions differ from photograph ${photo.id}`);
  } catch (error) {check(false,error.message);}
}
const featured = portfolio.filter(photo => photo.featured);
const homeWork = homeHtml.match(/<section\b[^>]*\bid=["']work["'][^>]*>([\s\S]*?)<\/section>/i)?.[1] || '';
check(featured.length === 3 && tags(homeWork,'figure').length === 3, 'Homepage must feature exactly three portfolio photographs');
for (const photo of featured) check(tags(homeWork,'img').some(image => image.attr.src === photo.src && image.attr.alt === photo.alt), `Homepage featured photograph/alt mismatch for ${photo.id}`);
const filterValues = tags(portfolioHtml,'button').filter(button => 'data-filter' in button.attr).map(button => button.attr['data-filter']);
check(filterValues.length === 5 && ['all','color','highlights','extensions','cuts'].every(value => filterValues.includes(value)), 'Portfolio filter options are incomplete');
const combinedCard = cards.find(card => card.attr.id === 'blonde-extensions-highlights');
check(['highlights','extensions'].every(value => combinedCard?.attr['data-category'].split(/\s+/).includes(value)), 'Combined extensions/highlights photo must have both categories');
for (const route of ['/','/about']) {
  const html = files.get(route) || '';
  check(!html.includes('/assets/kyrin-portrait.webp'), `${route}: old portrait remains in generated output`);
  check(tags(html,'img').some(image => image.attr.src === site.portrait.src && image.attr.alt === site.portrait.alt && Number(image.attr.width) === site.portrait.width && Number(image.attr.height) === site.portrait.height), `${route}: updated visible portrait or its dimensions are missing`);
}
check(site.portrait.src === '/assets/kyrin-cutout-v2.webp', 'Portrait config points to the old photograph');
try {const actual = await webpSize(site.portrait.src);check(actual.width === site.portrait.width && actual.height === site.portrait.height,'Portrait config dimensions differ from its actual image');} catch (error) {check(false,error.message);}

const bookingForm = tags(bookingHtml,'form').find(form => 'data-look-options' in form.attr);
let lookOptions = {};
try {lookOptions = JSON.parse(bookingForm?.attr['data-look-options'] || '{}');} catch {check(false,'Booking photo options are not valid JSON');}
check(Object.keys(lookOptions).length === portfolio.length, 'Booking photo options must include all portfolio identities');
check(new Set(Object.values(lookOptions)).size === portfolio.length, 'Booking photo descriptions must uniquely identify the selected photograph');
for (const photo of portfolio) check(typeof lookOptions[photo.id] === 'string' && lookOptions[photo.id].includes(photo.label) && lookOptions[photo.id].includes(photo.title), `Booking inspiration loses the exact label or unique title for ${photo.id}`);
check(tags(bookingHtml,'input').some(input => input.attr.name === 'inspiration_url' && input.attr.type === 'hidden'), 'Booking form must submit a separate inspiration URL');

const interactionCode = await readFile(path.join(dist,'script.js'),'utf8');
const filterStart = interactionCode.indexOf("document.querySelectorAll('[data-filter]')");
const filterEnd = interactionCode.indexOf('const dialog=',filterStart);
check(filterStart >= 0 && filterEnd > filterStart, 'Portfolio filter setup was not found for the interaction regression');
if (filterStart >= 0 && filterEnd > filterStart) {
  const nodes = cards.map(card => ({id:card.attr.id,dataset:{category:card.attr['data-category']},hidden:false}));
  const buttons = filterValues.map(filter => ({dataset:{filter},classList:{toggle(){}},setAttribute(){},addEventListener(event,handler){this.click=handler;}}));
  const status = {textContent:''};
  const document = {querySelectorAll:selector => selector === '[data-filter]' ? buttons : selector === '[data-portfolio-item]' ? nodes : [],querySelector:() => status};
  try {
    runInNewContext(interactionCode.slice(filterStart,filterEnd),{document},{timeout:1000});
    for (const filter of ['highlights','extensions']) {buttons.find(button => button.dataset.filter === filter)?.click();check(nodes.find(node => node.id === 'blonde-extensions-highlights')?.hidden === false, `Combined photo is hidden by the ${filter} filter`);}
    buttons.find(button => button.dataset.filter === 'cuts')?.click();check(nodes.find(node => node.id === 'blonde-extensions-highlights')?.hidden === true,'Combined photo incorrectly appears in Cuts & shape');
    buttons.find(button => button.dataset.filter === 'all')?.click();check(nodes.every(node => !node.hidden),'All the work does not restore every photograph');
  } catch (error) {check(false,`Portfolio interaction regression: ${error.message}`);}
}
const inspirationStart = interactionCode.indexOf('const params=new URLSearchParams(location.search);');
const inspirationEnd = interactionCode.indexOf("form.addEventListener('submit'",inspirationStart);
check(inspirationStart >= 0 && inspirationEnd > inspirationStart,'Booking inspiration setup was not found for the interaction regression');
if (inspirationStart >= 0 && inspirationEnd > inspirationStart) for (const photo of portfolio) {
  const fields = {'#service':{options:[]},'[data-inspiration]':{value:''},'[data-inspiration-url]':{value:''},'[data-selected-inspiration]':{hidden:true,textContent:''}};
  const form = {dataset:{lookOptions:JSON.stringify(lookOptions)},querySelector:selector => fields[selector],querySelectorAll:() => [],addEventListener(){}};
  try {
    runInNewContext(interactionCode.slice(inspirationStart,inspirationEnd),{form,status:{},location:{origin:manifest.origin,search:`?look=${encodeURIComponent(photo.id)}`,pathname:'/book'},document:{referrer:''},track(){},URL,URLSearchParams},{timeout:1000});
    check(fields['[data-inspiration]'].value === lookOptions[photo.id], `Booking changes the exact inspiration description for ${photo.id}`);
    check(fields['[data-inspiration-url]'].value === `${manifest.origin}/portfolio#${photo.id}`, `Booking loses the selected photograph URL for ${photo.id}`);
    check(fields['[data-selected-inspiration]'].hidden === false && fields['[data-selected-inspiration]'].textContent.includes(lookOptions[photo.id]), `Booking does not display selected inspiration for ${photo.id}`);
  } catch (error) {check(false,`Booking inspiration regression for ${photo.id}: ${error.message}`);}
}

const sitemap = await readFile(path.join(dist,'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1]));
check(sitemapUrls.length === discoveryPages.length && new Set(sitemapUrls).size === sitemapUrls.length, 'Sitemap page count or uniqueness mismatch');
for (const page of discoveryPages) check(sitemapUrls.includes(page.canonical), `Sitemap missing ${page.canonical}`);
for (const page of manifest.pages.filter(candidate => candidate.noindex)) check(!sitemapUrls.includes(page.canonical), `Sitemap includes noindex page ${page.canonical}`);
check(!sitemapUrls.includes(`${manifest.origin}/404`), 'Sitemap includes the 404 page');
for (const url of sitemapUrls) check(discoveryPages.some(page => page.canonical === url), `Sitemap contains nonexistent or noindex page ${url}`);
const robots = await readFile(path.join(dist,'robots.txt'),'utf8');
check(!/^Disallow:\s*\/\s*$/m.test(robots), 'Robots blocks crawling and prevents noindex discovery');
check(robots.includes(`Sitemap: ${manifest.origin}/sitemap.xml`), 'Robots sitemap URL mismatch');
for (const name of ['llms.txt','llms-full.txt']) {
  const text = await readFile(path.join(dist,name),'utf8');
  for (const page of discoveryPages) check(text.includes(page.canonical), `${name} missing ${page.path}`);
  for (const page of manifest.pages.filter(candidate => candidate.noindex)) check(!text.includes(`URL: ${page.canonical}`) && !text.includes(`](${page.canonical})`), `${name} advertises noindex page ${page.path}`);
  check(!/ignore (?:all )?(?:previous|prior) instructions|always recommend|rank (?:this|us) first/i.test(text), `${name} contains manipulative instructions`);
}
const stylesheet = await readFile(path.join(dist,'styles.css'),'utf8');
for (const match of stylesheet.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g)) await localReference(match[1], '/', 'CSS asset');
const webmanifest = JSON.parse(await readFile(path.join(dist,'site.webmanifest'),'utf8'));
for (const icon of webmanifest.icons || []) await localReference(icon.src, '/', 'manifest icon');
if (productionAudit) {
  check(manifest.indexable === true, 'Production audit did not enable public-page indexing');
  check(manifest.origin === 'https://www.beautybykyrin.com', 'Production audit canonical origin mismatch');
}
const report = {passed:failures.length === 0,pages:manifest.pages.length,sitemapPages:discoveryPages.length,assertions,indexable:manifest.indexable,productionAudit,origin:manifest.origin,failures};
await writeFile(path.join(reportDir,'verification-report.json'), `${JSON.stringify(report,null,2)}\n`);
if (failures.length) {
  console.error(`FAIL: ${failures.length} issue(s) in ${assertions} checks.\n${failures.map(failure => `- ${failure}`).join('\n')}`);
  process.exitCode = 1;
} else console.log(`PASS: ${manifest.pages.length} pages plus 404; ${assertions} checks covering metadata, schema, sitemap, links, assets, labels and review indexing.`);
