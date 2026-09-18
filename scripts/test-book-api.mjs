// Exercises the appointment endpoint's decision logic without touching the
// network. Delivery is stubbed, so what is under test is exactly the part that
// decides whether a real guest's request is accepted, rejected or dropped.
//
// Run: npm run test:api

import { validateBooking, spamReason, clientIp } from '../api/_lib/validate.mjs';
import { rateLimit } from '../api/_lib/ratelimit.mjs';

let failures = 0;
const check = (ok, label) => {
  if (!ok) { failures += 1; console.error(`FAIL  ${label}`); }
  else console.log(`ok    ${label}`);
};

const valid = () => ({
  name: 'Jordan Reyes',
  email: 'jordan.reyes@example.com',
  phone: '702-555-0147',
  service: 'Balayage',
  guest: 'I’m a new guest',
  message: 'My hair is box-dyed dark and I would love to get back to something brighter without wrecking it.',
  form_started_at: String(Date.now() - 60_000),
});

// --- Acceptance -------------------------------------------------------------
{
  const result = validateBooking(valid());
  check(result.ok, 'a well-formed request is accepted');
  check(result.ok && result.data.name === 'Jordan Reyes', 'the name survives validation');
  check(result.ok && !('form_started_at' in result.data), 'unlisted fields are dropped, not stored');
}

// --- Required fields --------------------------------------------------------
for (const field of ['name', 'email', 'service', 'message']) {
  const body = valid();
  delete body[field];
  const result = validateBooking(body);
  check(!result.ok && Boolean(result.errors[field]), `a missing ${field} is rejected with a field error`);
}

// --- Optional fields --------------------------------------------------------
{
  const body = valid();
  delete body.phone;
  check(validateBooking(body).ok, 'phone is genuinely optional');
}

// --- Malformed input --------------------------------------------------------
for (const email of ['not-an-email', 'a@b', 'no@tld.', 'two@@at.com', 'spaces in@example.com']) {
  check(!validateBooking({ ...valid(), email }).ok, `a malformed email is rejected: ${email}`);
}
for (const email of ['a.b+tag@example.co.uk', 'UPPER@Example.COM', "o'brien@example.com"]) {
  check(validateBooking({ ...valid(), email }).ok, `a real-world email is accepted: ${email}`);
}
check(!validateBooking({ ...valid(), phone: '12' }).ok, 'a too-short phone is rejected');
check(validateBooking({ ...valid(), phone: '+1 (702) 555-0147' }).ok, 'a formatted phone is accepted');
check(!validateBooking({ ...valid(), message: 'too short' }).ok, 'a too-short message is rejected');
check(!validateBooking({ ...valid(), name: 'x'.repeat(200) }).ok, 'an over-long name is rejected');

// --- Injection and control characters ---------------------------------------
{
  const result = validateBooking({ ...valid(), name: 'Jo\u0000rdan\u001b[31m' });
  check(result.ok && !/[\u0000\u001b]/.test(result.data.name), 'control characters are stripped from the email body');
}
{
  const result = validateBooking({ ...valid(), inspiration_url: 'https://evil.example.com/x' });
  check(result.ok && !result.data.inspiration_url, 'an off-site inspiration URL is discarded');
  const good = validateBooking({ ...valid(), inspiration_url: '/portfolio#blonde-extensions' });
  check(good.ok && good.data.inspiration_url === '/portfolio#blonde-extensions', 'an on-site inspiration path is kept');
}

// --- Spam -------------------------------------------------------------------
check(spamReason({ ...valid(), botcheck: 'x' }) === 'honeypot', 'a filled honeypot is caught');
check(spamReason({ ...valid(), form_started_at: String(Date.now()) }) === 'too-fast', 'an instant submission is caught');
check(spamReason({ ...valid(), form_started_at: String(Date.now() - 200_000_000) }) === 'stale', 'a stale form is caught');
check(spamReason({ ...valid(), message: 'buy http://a.com and http://b.com now' }) === 'links', 'a link-stuffed message is caught');
check(spamReason(valid()) === '', 'a real submission is not flagged as spam');
// A human filling the form legitimately fast must still get through.
check(spamReason({ ...valid(), form_started_at: String(Date.now() - 4_000) }) === '', 'a fast but human submission passes');
// A visitor with JS disabled sends no timestamp at all.
{
  const body = valid();
  delete body.form_started_at;
  check(spamReason(body) === '', 'a no-JavaScript submission is not treated as spam');
}

// --- Rate limiting ----------------------------------------------------------
{
  const ip = '198.51.100.7';
  const results = Array.from({ length: 7 }, (_, i) => rateLimit({ ip, email: `person${i}@example.com` }));
  check(results.slice(0, 5).every(r => r === ''), 'the first five requests from one IP pass');
  check(results[5] === 'ip', 'the sixth request from the same IP is limited');
}
{
  const email = 'repeat@example.com';
  const results = Array.from({ length: 5 }, (_, i) => rateLimit({ ip: `203.0.113.${i}`, email }));
  check(results.slice(0, 3).every(r => r === ''), 'the first three requests for one email pass');
  check(results[3] === 'email', 'the fourth request for the same email is limited');
}
check(rateLimit({ ip: 'unknown', email: 'fresh@example.com' }) === '', 'an unknown IP is not limited into oblivion');

// --- Client IP --------------------------------------------------------------
check(clientIp({ headers: { 'x-forwarded-for': '203.0.113.5, 70.41.3.18' } }) === '203.0.113.5', 'the client IP is the first forwarded hop');
check(clientIp({ headers: {} }) === 'unknown', 'a missing forwarded header degrades safely');

console.log(failures ? `\n${failures} assertion(s) failed.` : '\nPASS: booking endpoint logic verified.');
process.exit(failures ? 1 : 0);
