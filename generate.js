export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { niche, style, platform, tone, customPrompt } = req.body;

  if (!niche || !style || !platform || !tone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const styleLabels = {
    hook_reveal: 'Hook & Reveal', listicle: 'Listicle',
    storytime: 'Storytime', did_you_know: 'Did You Know',
    before_after: 'Before/After Transformation', pov: 'POV (Point of View)'
  };

  const platformInstructions = {
    tiktok: 'TikTok (fast pacing, very short sentences, trending slang ok, 30-45 seconds read time)',
    instagram: 'Instagram Reels (slightly polished, visual hooks, 30-60 seconds)',
    youtube: 'YouTube Shorts (punchy, educational hook, 45-60 seconds)'
  };

  const systemPrompt = `You are a world-class viral short-form video scriptwriter. You have studied thousands of viral TikTok, Instagram Reels, and YouTube Shorts. You know exactly what hooks stop thumbs mid-scroll and what pacing keeps viewers watching to the end.

You MUST respond ONLY with a valid JSON object. No markdown, no code fences, no explanation. The JSON must have these exact keys:
{
  "hook": "string - the powerful opening line (1-2 sentences, thumb-stopping)",
  "script": "string - the full word-for-word script including the hook, body, and CTA. Use newlines between sections. Mark [PAUSE] where they should pause dramatically.",
  "caption": "string - the post caption with line breaks and a CTA at the end",
  "hashtags": "string - 20-25 hashtags separated by spaces",
  "captions_preview": ["string", "string", "string"],
  "virality_score": number between 60 and 98
}`;

  const userPrompt = `Create a viral ${platformInstructions[platform]} script.

Niche: ${niche}
Style: ${styleLabels[style] || style}
Tone: ${tone}
${customPrompt ? `Custom angle: ${customPrompt}` : ''}

Make the hook impossible to scroll past. Write like a real creator who has gone viral, not a copywriter.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Anthropic API error' });
    }

    const raw = data.content.map(b => b.text || '').join('');
    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);

  } catch (err) {
    console.error('Generate error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
