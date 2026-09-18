// POST /api/book — the appointment request endpoint.
//
// Works with and without JavaScript. A browser with JS posts JSON and renders
// the response inline; a browser without it posts a normal form and gets a
// 303 redirect to /thank-you. Both paths run the same validation.

import { validateBooking, spamReason, clientIp } from './_lib/validate.mjs';
import { rateLimit } from './_lib/ratelimit.mjs';
import { sendToWeb3Forms, saveToSupabase } from './_lib/delivery.mjs';

const wantsJson = request =>
  String(request.headers['accept'] || '').includes('application/json') ||
  String(request.headers['content-type'] || '').includes('application/json');

/**
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 * @param {number} status
 * @param {Record<string, unknown>} payload
 * @param {{redirect?: string}} [options]
 */
function reply(request, response, status, payload, options = {}) {
  const { redirect } = options;
  if (!wantsJson(request) && redirect) {
    response.statusCode = 303;
    response.setHeader('Location', redirect);
    response.end();
    return;
  }
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  if (request.body && typeof request.body === 'object') return request.body;

  const raw = await new Promise((resolve, reject) => {
    let data = '';
    request.on('data', chunk => {
      data += chunk;
      // Refuse an oversized body rather than buffering it.
      if (data.length > 100_000) reject(new Error('too-large'));
    });
    request.on('end', () => resolve(data));
    request.on('error', reject);
  });

  if (!raw) return {};
  const type = String(request.headers['content-type'] || '');
  if (type.includes('application/json')) {
    try { return JSON.parse(raw); } catch { return {}; }
  }
  return Object.fromEntries(new URLSearchParams(raw));
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return reply(request, response, 405, { ok: false, error: 'Method not allowed.' });
  }

  let body;
  try {
    body = await readBody(request);
  } catch {
    return reply(request, response, 413, { ok: false, error: 'That request was too large.' });
  }

  // Silently accept obvious bots: a 200 gives a spammer no signal to tune against,
  // and nothing is delivered or stored.
  const spam = spamReason(body);
  if (spam) {
    console.warn(`[book] rejected: ${spam}`);
    return reply(request, response, 200, { ok: true }, { redirect: '/thank-you' });
  }

  const result = validateBooking(body);
  if (!result.ok) {
    return reply(request, response, 422, {
      ok: false,
      error: 'Please check the highlighted fields and try again.',
      errors: result.errors,
    }, { redirect: '/book?error=validation' });
  }
  const data = result.data;

  const limited = rateLimit({ ip: clientIp(request), email: data.email });
  if (limited) {
    console.warn(`[book] rate limited by ${limited}`);
    return reply(request, response, 429, {
      ok: false,
      error: 'We already have a recent request from you. Please text or call 702-533-8176 if it is urgent.',
    }, { redirect: '/book?error=rate' });
  }

  // Both paths run; neither is allowed to block the other.
  const [stored, emailed] = await Promise.all([
    saveToSupabase(data),
    sendToWeb3Forms(data),
  ]);

  // Never log the guest's details — only whether each path worked.
  if (!emailed.ok) console.error(`[book] delivery failed: ${emailed.error}`);
  if (!stored.ok && !stored.skipped) console.error(`[book] persistence failed: ${stored.error}`);

  // One landing is enough to promise the guest it reached Kyrin.
  if (emailed.ok || stored.ok) {
    return reply(request, response, 200, { ok: true }, { redirect: '/thank-you' });
  }

  console.error('[book] LEAD LOST — both delivery paths failed');
  return reply(request, response, 502, {
    ok: false,
    error: 'We could not send your request just now. Your details are still here — please try again, or text or call 702-533-8176.',
  }, { redirect: '/book?error=delivery' });
}
