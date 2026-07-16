# ReelGen

ReelGen is a free short-form script drafting tool plus a productized, human-reviewed Creator Pack. The launch offer is £19 once for ten scripts, one revision round and delivery within 48 hours.

The service-first offer is intentional: it can validate demand and earn revenue without first building user accounts, subscriptions, entitlements or a large paid acquisition funnel.

## Architecture

- `index.html` — generator, honest product copy and Creator Pack checkout
- `generate.js` — validated Vercel function calling Anthropic
- `checkout.js` — Stripe-hosted one-time checkout with fulfilment questions
- `legal.html` — terms, cancellation information and privacy notice
- `vercel.json` — root-file routing for the static pages and functions
- `LAUNCH.md` — practical launch and fulfilment workflow

## Required Vercel environment variables

| Variable | Required for | Value |
|---|---|---|
| `ANTHROPIC_API_KEY` | Free generator | Anthropic API key |
| `ANTHROPIC_MODEL` | Optional | Defaults to `claude-haiku-4-5-20251001` |
| `PUBLIC_SITE_URL` | Checkout redirects | Production URL, no trailing slash |
| `STRIPE_SECRET_KEY` | Paid checkout | Stripe restricted/secret key |
| `STRIPE_CREATOR_PACK_PRICE_ID` | Paid checkout | One-time £19 GBP Price ID |
| `LEGAL_DETAILS_CONFIRMED` | Paid checkout safety gate | Set to `true` only after the legal checklist below |

Do not commit keys. If checkout is not configured, the page gives a contact fallback and accepts no payment.

## Pre-sale legal checklist

The code deliberately keeps checkout closed until `LEGAL_DETAILS_CONFIRMED=true`. Before setting it:

1. Confirm the operator's legal name and a geographical trading address.
2. Add both to the Stripe public business profile and customer receipts.
3. Replace the pre-launch notice and generic seller wording in `legal.html` with those confirmed details.
4. Confirm the contact email is monitored.
5. Review the terms/privacy text for the actual business; it is operational drafting, not legal advice.
6. Configure the Stripe product as a **one-time** £19 GBP price, not recurring.
7. Decide sole-trader/company status and meet applicable HMRC, ICO, tax and record-keeping duties.

## Deploy

Import this GitHub repository in Vercel or reconnect the existing project, add the required environment variables, and deploy. The old homepage URL returned 404 because the Vercel configuration expected nonexistent `public/` and `api/` directories; routing now matches the repository's actual root layout.

After deployment verify:

```text
GET  /                 -> 200 and the ReelGen page
GET  /legal.html       -> 200
POST /api/generate     -> JSON script (with Anthropic configured)
POST /api/checkout     -> Stripe URL (after every checkout variable is configured)
```

## Data flow

- Generator options and the optional prompt are sent to Anthropic. Inputs are allowlisted and custom text is capped at 500 characters.
- Checkout is hosted by Stripe. ReelGen's server receives only a Checkout Session response, not card details.
- Stripe collects brand, niche/audience and main platform to make paid orders fulfilment-ready.
- Immediate-service consent and the accepted terms version are recorded in Stripe Checkout Session metadata.

AI output still requires human review. ReelGen does not claim or guarantee reach, engagement, followers or revenue.
