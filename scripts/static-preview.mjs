// Rewrites the built site for a plain static host (no cleanUrls, no rewrites),
// so it can be published somewhere for review without deploying to Vercel.
//
// Run: npm run preview:static   -> writes .build/preview/
//
// The live site keeps root-absolute, extensionless URLs. A generic static host
// serves files literally, so here every internal link becomes a relative path
// with an explicit .html, correct for that page's directory depth.

import { readdir, readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const out = path.join(root, '.build', 'preview');

async function walk(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full, base));
    else files.push(path.relative(base, full));
  }
  return files;
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const all = await walk(dist);
const pages = new Set(all.filter(f => f.endsWith('.html')).map(f => f.replace(/\.html$/, '')));

// Videos are excluded: they are large, and the film section falls back to its
// poster image, which is what a reviewer needs to see anyway.
const SKIP = /\.(mp4|webm)$/i;

for (const file of all) {
  const from = path.join(dist, file);
  const to = path.join(out, file);
  await mkdir(path.dirname(to), { recursive: true });

  if (SKIP.test(file)) continue;
  if (!file.endsWith('.html')) { await cp(from, to); continue; }

  const depth = file.split('/').length - 1;
  const prefix = depth === 0 ? '' : '../'.repeat(depth);
  let html = await readFile(from, 'utf8');

  html = html.replace(/(href|src|poster|srcset|content)="([^"]*)"/g, (whole, attr, value) => {
    // srcset holds a comma-separated list of "url width" pairs.
    if (attr === 'srcset') {
      const rewritten = value.split(',').map(part => {
        const [url, ...rest] = part.trim().split(/\s+/);
        return [rewriteOne(url), ...rest].join(' ');
      }).join(', ');
      return `${attr}="${rewritten}"`;
    }
    // Leave absolute canonical/OG URLs alone — they document the real site.
    if (attr === 'content' && !value.startsWith('/')) return whole;
    return `${attr}="${rewriteOne(value)}"`;
  });

  function rewriteOne(value) {
    if (!value.startsWith('/')) return value;            // relative, hash, external
    if (value.startsWith('//')) return value;            // protocol-relative
    const [pathPart, hash = ''] = value.split('#');
    const clean = pathPart.replace(/^\//, '');
    if (clean === '' ) return `${prefix}index.html${hash ? '#' + hash : ''}`;
    if (pages.has(clean)) return `${prefix}${clean}.html${hash ? '#' + hash : ''}`;
    return `${prefix}${clean}${hash ? '#' + hash : ''}`; // an asset
  }

  // The form posts to a serverless function that does not exist on a static
  // host. Make that honest rather than silently broken.
  html = html.replace(
    /<form class="booking-form" action="[^"]*" method="post"/,
    '<form class="booking-form" action="#" method="post" data-static-preview'
  );
  html = html.replace(
    /(<p class="small-note">This is an appointment request, not an instant booking\.<\/p>)/,
    '<p class="small-note" style="color:#a92a60"><strong>Preview note:</strong> this is a static preview, so the form does not submit here. On the real site it posts to a server-side endpoint that validates, rate-limits and delivers the request.</p>$1'
  );

  await writeFile(to, html);
}

const written = await walk(out);
console.log(`Static preview written to .build/preview: ${written.length} files, ${pages.size} pages.`);
