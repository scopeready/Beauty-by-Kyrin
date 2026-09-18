// Generates responsive AVIF and WebP derivatives for every photograph.
//
// Run: npm run images
//
// The source files in assets/ stay untouched and remain the <img> fallback.
// Derivatives land in assets/opt/ and are committed, so a deploy needs no image
// toolchain. Re-running is idempotent: a derivative newer than its source is
// left alone.

import { readdir, stat, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const srcDir = path.join(root, 'assets');
const outDir = path.join(root, 'assets', 'opt');

// Widths chosen from the layouts that actually exist: portfolio tiles and
// service thumbnails render around 400–600 CSS px, heroes around 600–760.
export const WIDTHS = [400, 800, 1200];

const PHOTOS = /\.(webp|jpg|jpeg|png)$/i;
// Icons, posters and the OG image are not content photographs.
const SKIP = /^(favicon|icon-|apple-touch|og-image|journey-|plate-)/i;

const python = `
import sys, os
from PIL import Image
src, out_dir, widths = sys.argv[1], sys.argv[2], [int(w) for w in sys.argv[3].split(',')]
base = os.path.splitext(os.path.basename(src))[0]
im = Image.open(src)
im = im.convert('RGB') if im.mode not in ('RGB', 'L') else im
made = []
for w in widths:
    if w > im.width:          # never upscale
        continue
    h = round(im.height * w / im.width)
    resized = im.resize((w, h), Image.LANCZOS)
    for ext, kwargs in (('avif', dict(quality=55)), ('webp', dict(quality=76, method=6))):
        target = os.path.join(out_dir, f'{base}-{w}.{ext}')
        if os.path.exists(target) and os.path.getmtime(target) >= os.path.getmtime(src):
            continue
        resized.save(target, **kwargs)
        made.append(os.path.basename(target))
print('\\n'.join(made))
`;

const run = (file, args) => new Promise((resolve, reject) => {
  const child = spawn(file, args, { stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '', err = '';
  child.stdout.on('data', chunk => { out += chunk; });
  child.stderr.on('data', chunk => { err += chunk; });
  child.on('close', code => code === 0 ? resolve(out) : reject(new Error(err || `exit ${code}`)));
});

await mkdir(outDir, { recursive: true });
const files = (await readdir(srcDir)).filter(name => PHOTOS.test(name) && !SKIP.test(name));

let created = 0, bytes = 0;
for (const name of files) {
  const source = path.join(srcDir, name);
  const made = (await run('python3', ['-c', python, source, outDir, WIDTHS.join(',')])).trim();
  if (!made) continue;
  for (const file of made.split('\n')) {
    created += 1;
    bytes += (await stat(path.join(outDir, file))).size;
  }
}
console.log(created
  ? `Generated ${created} derivatives from ${files.length} photographs (${(bytes / 1024).toFixed(0)} KB total).`
  : `Up to date: ${files.length} photographs, no derivatives needed rebuilding.`);
