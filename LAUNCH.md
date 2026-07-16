# ReelGen launch operating plan

## The offer

**Free tool:** a first-draft short-form script generator.

**Paid offer:** “10 tailored scripts, reviewed for clarity and claims, with hooks, captions, CTAs and one revision. Delivered within 48 hours. £19 once.”

**Initial customer:** UK solo service providers and small creators who already post on Instagram/TikTok but do so inconsistently—personal trainers, beauty professionals, food businesses, tutors and trades. Start with one niche per outreach batch so messages and samples stay specific.

The first objective is not “go viral.” It is to get five genuine prospect conversations, the first paid order, and evidence about which niche has the clearest recurring content problem.

## Tomorrow: owner actions in order

These actions require the owner's identity or financial accounts and cannot safely be done by a coding agent.

1. Confirm the legal operator name, trading address and whether the business starts as a sole trader or existing company.
2. Update `legal.html` with those details.
3. Create/complete Stripe at no setup fee. Add the legal details to the public business profile and receipts.
4. Create a one-time product named **ReelGen Founding Creator Pack**, GBP £19. Copy its `price_...` ID.
5. Add the Vercel environment variables listed in `README.md`. Set `LEGAL_DETAILS_CONFIRMED=true` only after steps 1–3.
6. Reconnect/deploy the GitHub repository in Vercel and test one Stripe **test-mode** purchase before switching to live keys.
7. Put **£5 maximum** into Anthropic API credit if no free/usable credit exists. Keep the other **£15 unspent**.
8. Send the first ten personalised messages manually. Do not buy ads, followers, lead lists or a logo.

## Free customer acquisition

### Build a prospect list

Find accounts that meet all four checks:

- a real service or creator offer is visible;
- they posted at least once in the past 30 days;
- their videos have useful expertise but weak/inconsistent hooks;
- a public business contact route exists.

Record: name, business, niche, platform URL, one recent post, a specific improvement idea, date contacted, response and next action. Do not collect unnecessary personal data or mass-scrape profiles.

### Message 1: permission-based

> Hi [name] — I watched your post about [specific topic]. The useful part is [real detail], but the strongest payoff appears quite late. I drafted a tighter 30-second opening for it. Want me to send it over? No pitch required.

If they say yes:

> Here it is: “[custom 2–3 line hook].” I’m launching ReelGen and doing a founding pack: 10 complete scripts tailored to your audience, reviewed and delivered within 48 hours, for £19 once. If that would remove next week’s content planning, details are at [live URL]. Either way, you’re welcome to use this hook.

Follow up once after three days:

> Just closing the loop—was the sample hook useful? No problem if the timing is wrong; I won’t keep chasing.

Use public business channels, personalise every message, identify yourself, keep a suppression list and honour opt-outs. Do not automate unsolicited messages or market to personal emails without confirming the applicable UK PECR/data-protection basis.

### Daily launch loop

1. Research ten qualified prospects in one niche.
2. Write one genuinely specific sample hook for each.
3. Send ten permission-based messages manually.
4. Reply to interested prospects and direct them to the secure checkout.
5. Log outcomes.
6. Change one element only after a batch of 20 messages: niche, opening line, sample format or offer—not all at once.

## Fulfilment standard

1. Stripe sends payment/customer details and stores the three brief fields.
2. Reply within the same working day, confirm the audience and ask at most three missing questions.
3. Generate 15 candidate scripts with ReelGen; do not deliver raw output.
4. Select and edit the best 10. Check every factual claim, remove invented statistics/testimonials, fit spoken length and ensure each CTA matches the customer's offer.
5. Deliver a clearly labelled document containing platform, hook, spoken script, filming cue, caption and CTA for every concept.
6. Ask for consolidated revision notes; complete one reasonable revision round.
7. Ask for a truthful testimonial only after acceptance. Never write or imply one yourself.
8. Keep order, expense and refund records.

## Quality checklist per script

- Hook is accurate and understandable without context.
- The payoff starts early and provides something specific.
- Spoken wording sounds natural and fits the target duration.
- No guaranteed income, health, reach or other outcome claim.
- Regulated topics include appropriate caveats and customer review.
- No unverified trend, statistic, testimonial or personal story.
- CTA asks for one clear next action.
- Caption and tags match the actual content.

## Numbers to track

| Metric | Initial decision rule |
|---|---|
| Qualified messages sent | 20 before changing an offer element |
| Positive replies | Below 2/20: improve targeting or sample quality |
| Checkout visits | Interest without visits: CTA/link problem |
| Purchases | Visits without purchases: trust, legal details or offer problem |
| Fulfilment time | Keep below the promised 48 hours |
| Revision causes | Repeated cause becomes a new intake question/check |
| Gross revenue | Sales × £19 |
| Direct cost | AI usage + Stripe fee + refunds |

Do not describe revenue as profit until direct costs, tax and the value of fulfilment time are accounted for.

## When to spend the remaining £15

Spend only against observed evidence:

- **API credit:** when generation is blocked.
- **Domain/email:** when prospects click but question trust, and only after the legal seller details are ready.
- **Nothing:** when response quality is the bottleneck; improve targeting and samples.

Do not use the initial budget for paid social ads. At £19 per order, a tiny untested ad budget is more likely to buy inconclusive traffic than a customer.

## After the first five orders

Review which niche bought, common brief fields, time per pack and revision patterns. Then choose one:

- keep the £19 pack as a lead offer and raise the full-price package;
- offer a transparent monthly done-for-you service with easy cancellation;
- build accounts and paid SaaS limits only if buyers repeatedly ask for self-service generation.

Product development follows paid evidence, not the other way around.
