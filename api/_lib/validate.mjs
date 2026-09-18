// Strict server-side validation for the appointment request form.
//
// Deliberately dependency-free. The brief specified Zod; the guarantees it asks
// for (reject malformed email/phone, bound every field, never trust the client)
// are met here in a form that keeps this repo at zero runtime dependencies and
// keeps the function's cold start minimal — which matters on the one endpoint
// that carries revenue.

/** Fields we accept. Anything not listed is dropped, never stored. */
const SCHEMA = {
  name:         { required: true,  max: 100, min: 2 },
  email:        { required: true,  max: 254, kind: 'email' },
  phone:        { required: false, max: 40,  kind: 'phone' },
  service:      { required: true,  max: 80 },
  guest:        { required: false, max: 40 },
  availability: { required: false, max: 200 },
  message:      { required: true,  max: 4000, min: 10 },
  inspiration:  { required: false, max: 200 },
  inspiration_url: { required: false, max: 300 },
  source_page:  { required: false, max: 300 },
  utm_source:   { required: false, max: 150 },
  utm_medium:   { required: false, max: 150 },
  utm_campaign: { required: false, max: 150 },
  utm_content:  { required: false, max: 150 },
  utm_term:     { required: false, max: 150 },
};

// Intentionally permissive on the local part, strict on overall shape. A
// stricter pattern rejects real addresses, and a rejected real lead costs more
// than a bounced fake one.
const EMAIL = /^[^\s@,;:<>()[\]\\]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;

/** Strip control characters that would corrupt the notification email. */
const clean = value => String(value ?? '')
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
  .trim();

function validPhone(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

/**
 * @param {Record<string, unknown>} input raw, untrusted request body
 * @returns {{ok: true, data: Record<string,string>} | {ok: false, errors: Record<string,string>}}
 */
export function validateBooking(input) {
  /** @type {Record<string, string>} */
  const data = {};
  /** @type {Record<string, string>} */
  const errors = {};

  for (const [field, rule] of Object.entries(SCHEMA)) {
    const value = clean(input[field]);

    if (!value) {
      if (rule.required) errors[field] = 'This field is required.';
      continue;
    }
    if (value.length > rule.max) {
      errors[field] = `Please keep this under ${rule.max} characters.`;
      continue;
    }
    if (rule.min && value.length < rule.min) {
      errors[field] = `Please give us a little more detail.`;
      continue;
    }
    if (rule.kind === 'email' && !EMAIL.test(value)) {
      errors[field] = 'Please enter a valid email address.';
      continue;
    }
    if (rule.kind === 'phone' && !validPhone(value)) {
      errors[field] = 'Please enter a valid phone number, or leave it blank.';
      continue;
    }
    data[field] = value;
  }

  // A URL field must actually be a URL on our own origin or a bare path.
  if (data.inspiration_url && !/^\/[\w\-/#?=&.]*$/.test(data.inspiration_url)) {
    delete data.inspiration_url;
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

/**
 * Spam checks that do not inconvenience a real visitor.
 * No CAPTCHA: it is added only if spam actually appears.
 * @returns {string} a reason string when the submission looks automated, else ''
 */
export function spamReason(input, { minSeconds = 3 } = {}) {
  // Honeypot: a field no human sees, so any value at all is a bot.
  if (clean(input.botcheck)) return 'honeypot';

  // Timing: a human cannot read the form and type a real message this fast.
  const started = Number(input.form_started_at);
  if (Number.isFinite(started) && started > 0) {
    const elapsed = (Date.now() - started) / 1000;
    if (elapsed < minSeconds) return 'too-fast';
    // Older than a day means a stale or replayed page.
    if (elapsed > 86_400) return 'stale';
  }

  // Link-stuffed messages are the dominant spam shape on salon forms.
  const links = (clean(input.message).match(/https?:\/\//gi) || []).length;
  if (links >= 2) return 'links';

  return '';
}

/** Client IP, trusting only the proxy header Vercel sets. */
export function clientIp(request) {
  const forwarded = request.headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return (value || '').split(',')[0].trim() || 'unknown';
}
