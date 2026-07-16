const TERMS_VERSION = '2026-07-16';

function getSiteUrl(req) {
  if (process.env.PUBLIC_SITE_URL) {
    return process.env.PUBLIC_SITE_URL.replace(/\/$/, '');
  }

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) {
    return `https://${vercelHost}`;
  }

  return `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`;
}

function addTextField(params, index, key, label, maxLength) {
  params.set(`custom_fields[${index}][key]`, key);
  params.set(`custom_fields[${index}][label][type]`, 'custom');
  params.set(`custom_fields[${index}][label][custom]`, label);
  params.set(`custom_fields[${index}][type]`, 'text');
  params.set(`custom_fields[${index}][text][maximum_length]`, String(maxLength));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (
    !process.env.STRIPE_SECRET_KEY ||
    !process.env.STRIPE_CREATOR_PACK_PRICE_ID ||
    process.env.LEGAL_DETAILS_CONFIRMED !== 'true'
  ) {
    return res.status(503).json({
      error: 'Checkout is not open yet. Please email hello.reelgen@gmail.com to reserve a pack.'
    });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  if (body.immediateServiceConsent !== true || body.termsAccepted !== true) {
    return res.status(400).json({ error: 'Please accept the terms and service-start request.' });
  }

  const siteUrl = getSiteUrl(req);
  const params = new URLSearchParams({
    mode: 'payment',
    'line_items[0][price]': process.env.STRIPE_CREATOR_PACK_PRICE_ID,
    'line_items[0][quantity]': '1',
    customer_creation: 'always',
    billing_address_collection: 'required',
    success_url: `${siteUrl}/?checkout=success#creator-pack`,
    cancel_url: `${siteUrl}/?checkout=cancelled#creator-pack`,
    'metadata[offer]': 'founding_creator_pack',
    'metadata[terms_version]': TERMS_VERSION,
    'metadata[terms_accepted]': 'true',
    'metadata[immediate_service_consent]': 'true',
    'metadata[consent_recorded_at]': new Date().toISOString(),
    'custom_text[submit][message]': 'One-off payment. No subscription. Delivery starts after payment.'
  });

  addTextField(params, 0, 'brand', 'Brand or creator name', 100);
  addTextField(params, 1, 'niche', 'Niche and target audience', 200);
  addTextField(params, 2, 'platform', 'Main platform', 50);

  try {
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });
    const session = await stripeResponse.json();

    if (!stripeResponse.ok || !session.url) {
      console.error('Stripe checkout error', session.error?.message || session);
      return res.status(502).json({ error: 'Checkout could not be started. Please try again.' });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Checkout error', error);
    return res.status(500).json({ error: 'Checkout could not be started. Please try again.' });
  }
}
