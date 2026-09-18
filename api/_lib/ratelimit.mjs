// Best-effort in-process rate limiting.
//
// A serverless function is not a single long-lived process: Vercel may run
// several instances, and each one keeps its own counters, so this slows an
// abuser down rather than stopping one outright. That is the correct trade for
// a salon booking form — the failure mode of a strict limiter is a lost real
// lead. Pair it with a Vercel Firewall rate-limit rule for a hard ceiling; see
// docs/DEPLOYMENT-PLAN.md.

const WINDOW_MS = 60 * 60 * 1000; // one hour
const MAX_PER_IP = 5;
const MAX_PER_EMAIL = 3;

/** @type {Map<string, number[]>} key -> timestamps within the window */
const hits = new Map();

function record(key, max, now) {
  const recent = (hits.get(key) || []).filter(time => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

/** Drop keys that have aged out so a long-lived instance cannot grow forever. */
function sweep(now) {
  if (hits.size < 500) return;
  for (const [key, times] of hits) {
    if (times.every(time => now - time >= WINDOW_MS)) hits.delete(key);
  }
}

/**
 * @returns {string} the limit that tripped, or '' when the request may proceed
 */
export function rateLimit({ ip, email }) {
  const now = Date.now();
  sweep(now);
  if (ip && ip !== 'unknown' && record(`ip:${ip}`, MAX_PER_IP, now)) return 'ip';
  if (email && record(`email:${email.toLowerCase()}`, MAX_PER_EMAIL, now)) return 'email';
  return '';
}
