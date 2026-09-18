// Renders the branded 1200x630 social cards, one per page type.
//
// Run: npm run og   (requires playwright; not needed for a normal build)
//
// Rendered in a real browser against the site's own fonts and palette, so the
// cards cannot drift from the brand the way a hand-drawn raster would. Output
// is committed to assets/og/, so deploying needs no browser.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../site-config.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, 'assets', 'og');

// One card per page type, each using a real photograph of Kyrin's work.
export const CARDS = [
  { name: 'home',      eyebrow: 'Las Vegas hair stylist', title: 'A little dimension.', accent: 'A lot of you.',        photo: 'highlights-blonde-waves' },
  { name: 'services',  eyebrow: 'The service edit',       title: 'Your hair.',          accent: 'Your next chapter.',   photo: 'color-brunette-bob' },
  { name: 'portfolio', eyebrow: 'The portfolio',          title: 'The hair.',           accent: 'The feeling.',          photo: 'color-burgundy' },
  { name: 'about',     eyebrow: 'The person behind the chair', title: 'Hi, I’m Kyrin.', accent: 'Let’s talk hair.',     photo: 'kyrin-cutout-v2' },
  { name: 'journal',   eyebrow: 'The hair journal',       title: 'Good hair starts',    accent: 'with good questions.', photo: 'photo-04' },
  { name: 'book',      eyebrow: 'Request an appointment', title: 'Your chair',          accent: 'is calling.',           photo: 'extensions-blonde' },
];

// Absolute, because the card is written to .build/og/ and the photographs are
// not relative to it.
const photoUrl = name => `file://${path.join(root, 'assets', `${name}.webp`)}`;

const card = ({ eyebrow, title, accent, photo }) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500&family=Jost:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;display:flex;background:#281a23;color:#fcf7f5;font-family:'Jost',sans-serif;overflow:hidden}
.copy{flex:0 0 58%;padding:72px 56px 64px 72px;display:flex;flex-direction:column;justify-content:space-between;position:relative;z-index:2}
.eyebrow{font-size:17px;letter-spacing:.2em;text-transform:uppercase;color:#ed83ae}
h1{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:82px;line-height:1.02;letter-spacing:-.01em}
h1 em{display:block;font-style:italic;font-weight:400;color:#ed83ae}
.mark{font-size:19px;letter-spacing:.16em;text-transform:uppercase;display:flex;align-items:baseline;gap:12px}
.mark strong{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:32px;letter-spacing:.02em;text-transform:none}
.meta{font-size:17px;color:#c9b3bf;letter-spacing:.02em}
.art{flex:1;position:relative}
.art img{width:100%;height:100%;object-fit:cover;object-position:50% 28%}
.art::after{content:'';position:absolute;inset:0;background:linear-gradient(100deg,#281a23 0%,rgba(40,26,35,.82) 22%,rgba(40,26,35,0) 62%)}
.rule{position:absolute;left:72px;right:56px;bottom:112px;height:1px;background:rgba(252,247,245,.18)}
</style></head>
<body>
<div class="copy">
  <div class="mark"><span>Beauty by</span><strong>Kyrin.</strong></div>
  <div><p class="eyebrow">${eyebrow}</p><h1>${title}<em>${accent}</em></h1></div>
  <p class="meta">${site.locality}, ${site.region} &nbsp;·&nbsp; ${site.phone}</p>
  <div class="rule"></div>
</div>
<div class="art"><img src="${photoUrl(photo)}" alt=""></div>
</body></html>`;

const { chromium } = await import('playwright');
await mkdir(outDir, { recursive: true });
const tmp = path.join(root, '.build', 'og');
await mkdir(tmp, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const spec of CARDS) {
  const file = path.join(tmp, `${spec.name}.html`);
  await writeFile(file, card(spec));
  await page.goto(`file://${file}`);
  // Fonts must be resolved before the shot or the card renders in a fallback.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(outDir, `${spec.name}.jpg`), type: 'jpeg', quality: 86 });
  console.log(`og: ${spec.name}.jpg`);
}

await browser.close();
console.log(`Rendered ${CARDS.length} social cards into assets/og/.`);
