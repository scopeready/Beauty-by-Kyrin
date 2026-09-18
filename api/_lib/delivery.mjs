// Getting a lead to Kyrin, and keeping a copy.
//
// Two independent paths. The request succeeds if EITHER lands, because the one
// unacceptable outcome on a lead form is telling a visitor "sent" when nothing
// was. Both failing is the only case that surfaces an error.

// The Web3Forms access key is an endpoint identifier, not a credential: it is
// designed to be submitted from a browser and Web3Forms rejects posts from
// other origins. Keeping it out of the page source is still right — it stops
// trivial scraping — so it lives here, server side only.
//
// It is committed as a fallback on purpose. A `NEXT_PUBLIC_*`-style indirection
// on a lead form has already cost this owner a silent outage on another site:
// the variable was unset at first deploy and the form shipped dead, with no
// error anywhere. An env var still overrides it, so rotating needs no commit.
const WEB3FORMS_KEY = (process.env.WEB3FORMS_ACCESS_KEY || '').trim()
  || '51c67985-c809-4e83-8256-acd77ce65e61';

const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim().replace(/\/$/, '');
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

const LABELS = {
  name: 'Name', email: 'Email', phone: 'Phone', service: 'Service interest',
  guest: 'New or returning', availability: 'Preferred days or times',
  message: 'About their hair', inspiration: 'Inspiration photo',
  source_page: 'Submitted from',
};

function emailBody(data) {
  const lines = Object.entries(LABELS)
    .filter(([field]) => data[field])
    .map(([field, label]) => `${label}: ${data[field]}`);

  const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .filter(field => data[field])
    .map(field => `${field}: ${data[field]}`);
  if (utm.length) lines.push('', 'Campaign:', ...utm);

  lines.push('', 'Reply to this guest directly — this is a request, not a confirmed appointment.');
  return lines.join('\n');
}

/** @returns {Promise<{ok: boolean, error?: string}>} */
export async function sendToWeb3Forms(data) {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: 'New Appointment Request — Beauty by Kyrin',
        from_name: 'Beauty by Kyrin Website',
        // Lets Kyrin hit reply in her inbox and reach the guest.
        replyto: data.email,
        name: data.name,
        email: data.email,
        message: emailBody(data),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return { ok: false, error: `web3forms ${response.status}` };
    return { ok: true };
  } catch (error) {
    return { ok: false, error: `web3forms ${error?.name || 'failed'}` };
  }
}

/** Optional. Absent configuration is not an error — email is the primary path. */
export async function saveToSupabase(data) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return { ok: false, skipped: true };

  const [firstName, ...rest] = data.name.split(/\s+/);
  const row = {
    first_name: firstName,
    last_name: rest.join(' ') || null,
    email: data.email,
    phone: data.phone || '',
    client_type: /new/i.test(data.guest || '') ? 'new' : /visited|return/i.test(data.guest || '') ? 'returning' : null,
    service_interest: data.service || null,
    desired_result: data.message || null,
    preferred_time: data.availability || null,
    notes: data.inspiration ? `Inspiration: ${data.inspiration}` : null,
    source_page: data.source_page || null,
    utm_source: data.utm_source || null,
    utm_medium: data.utm_medium || null,
    utm_campaign: data.utm_campaign || null,
    utm_content: data.utm_content || null,
    utm_term: data.utm_term || null,
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/appointment_inquiries`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return { ok: false, error: `supabase ${response.status}` };
    return { ok: true };
  } catch (error) {
    return { ok: false, error: `supabase ${error?.name || 'failed'}` };
  }
}
