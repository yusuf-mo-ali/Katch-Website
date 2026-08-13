const rateBuckets = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email) && email.length <= 254;
}

function isRateLimited(request) {
  const ip = String(request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const existing = rateBuckets.get(ip) || [];
  const recent = existing.filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  rateBuckets.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function originIsAllowed(request) {
  const configured = process.env.ALLOWED_ORIGINS;
  if (!configured) return true;
  const allowed = configured.split(',').map((origin) => origin.trim()).filter(Boolean);
  const origin = request.headers.origin;
  return !origin || allowed.includes(origin);
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed.' });
  }

  if (!originIsAllowed(request)) {
    return response.status(403).json({ message: 'Request origin is not allowed.' });
  }

  const contentLength = Number(request.headers['content-length'] || 0);
  if (contentLength > 20_000) {
    return response.status(413).json({ message: 'Request is too large.' });
  }

  if (isRateLimited(request)) {
    return response.status(429).json({ message: 'Too many requests. Please wait a few minutes and try again.' });
  }

  let body = request.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return response.status(400).json({ message: 'Invalid request.' });
    }
  }

  // Bots commonly fill this hidden field. Respond successfully without sending.
  if (body.website) return response.status(200).json({ ok: true });

  const submission = {
    name: clean(body.name, 100),
    email: clean(body.email, 254),
    company: clean(body.company, 140),
    projectType: clean(body.projectType, 100),
    budget: clean(body.budget, 100),
    details: clean(body.details, 5000),
    submittedAt: clean(body.submittedAt, 80),
  };

  if (
    submission.name.length < 2 ||
    !isValidEmail(submission.email) ||
    !submission.projectType ||
    !submission.budget ||
    submission.details.length < 20
  ) {
    return response.status(422).json({ message: 'Please complete all required fields with valid information.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.KATCH_CONTACT_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !contactEmail || !fromEmail) {
    console.error('Contact form environment variables are not configured.');
    return response.status(503).json({ message: 'Project requests are temporarily unavailable. Please try again shortly.' });
  }

  const safe = Object.fromEntries(Object.entries(submission).map(([key, value]) => [key, escapeHtml(value)]));
  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [contactEmail],
      reply_to: submission.email,
      subject: `New Katch project request — ${submission.projectType}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Company: ${submission.company || 'Not provided'}`,
        `Project type: ${submission.projectType}`,
        `Budget: ${submission.budget}`,
        '',
        'Project details:',
        submission.details,
        '',
        `Submitted: ${submission.submittedAt || new Date().toISOString()}`,
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#11110f">
          <p style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#666">Katch / New project request</p>
          <h1 style="font-size:32px;line-height:1.1">${safe.projectType}</h1>
          <table style="width:100%;border-collapse:collapse;margin:28px 0">
            <tr><td style="padding:10px 0;border-bottom:1px solid #ddd;color:#666">Name</td><td style="padding:10px 0;border-bottom:1px solid #ddd">${safe.name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #ddd;color:#666">Email</td><td style="padding:10px 0;border-bottom:1px solid #ddd">${safe.email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #ddd;color:#666">Company</td><td style="padding:10px 0;border-bottom:1px solid #ddd">${safe.company || 'Not provided'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #ddd;color:#666">Budget</td><td style="padding:10px 0;border-bottom:1px solid #ddd">${safe.budget}</td></tr>
          </table>
          <h2 style="font-size:18px">Project details</h2>
          <p style="line-height:1.7;white-space:pre-wrap">${safe.details}</p>
        </div>
      `,
    }),
  });

  if (!emailResponse.ok) {
    const providerError = await emailResponse.text();
    console.error('Resend request failed:', emailResponse.status, providerError);
    return response.status(502).json({ message: 'We could not send your request. Please try again in a moment.' });
  }

  return response.status(200).json({ ok: true });
}
