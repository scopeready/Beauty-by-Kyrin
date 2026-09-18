import { readFile, readdir } from "node:fs/promises";

const html = await readFile("index.html", "utf8");
const css = await readFile("styles.css", "utf8");
const js = await readFile("script.js", "utf8");
const files = await readdir("assets");

const checks = [];
const add = (name, pass, detail) => checks.push({ name, pass, detail });

add("One H1", (html.match(/<h1\b/g) || []).length === 1, `${(html.match(/<h1\b/g) || []).length} found`);
add("Meta description", /<meta name="description" content=".{120,170}">/.test(html), "120 to 170 characters");
add("Absolute OG image", /<meta property="og:image" content="https:\/\//.test(html), "absolute HTTPS URL");
add("Twitter card", /<meta name="twitter:card"/.test(html), "summary large image configured");
add("Image alt text", !/<img\b(?![^>]*\balt=)[^>]*>/i.test(html), "all images have alt attributes");
add("Viewport", /<meta name="viewport"/.test(html), "responsive viewport configured");
add("No generic link text", !/>\s*(click here|read more|learn more|here|link)\s*</i.test(html), "link labels describe destinations");
add("No placeholder copy", !/(lorem ipsum|REMOVE_THIS|blank-app-v1|<brand name>|<product>)/i.test(`${html}${css}${js}`), "no scaffold placeholders");
add("No h-screen", !/h-screen/.test(`${html}${css}${js}`), "dynamic viewport units used");
add("Reduced motion", /prefers-reduced-motion/.test(css) && /reducedMotion/.test(js), "CSS and JavaScript fallbacks present");
add("Blob media CSP", /media-src 'self' blob:/.test(await readFile("vercel.json", "utf8")), "scroll video blobs allowed");
add("Head kit", ["favicon.svg", "favicon-32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "og-image.jpg"].every((name) => files.includes(name)), "favicon, app icons, and OG image present");
add("Scroll media", ["kyrin-journey.mp4", "kyrin-journey-mobile.mp4", "journey-poster.png", "journey-mobile-poster.png"].every((name) => files.includes(name)), "desktop, mobile, and exact posters present");
add("No unsafe HTML injection", !/dangerouslySetInnerHTML|eval\(|new Function\(/.test(js), "no dynamic code execution");

const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
const fragments = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
const missing = fragments.filter((fragment) => !ids.has(fragment));
add("Fragment integrity", missing.length === 0, missing.length ? `missing: ${missing.join(", ")}` : "all fragment targets exist");

const failed = checks.filter((check) => !check.pass);
console.table(checks.map((check) => ({ Check: check.name, Status: check.pass ? "PASS" : "FAIL", Detail: check.detail })));
if (failed.length) {
  console.error(`${failed.length} audit check(s) failed.`);
  process.exit(1);
}
console.log("All audit checks passed.");
