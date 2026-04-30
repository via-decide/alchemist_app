export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return res.status(500).json({ error: 'Stripe misconfigured' });
  const stripe = (await import('stripe')).default(secretKey);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [],
    success_url: `${req.headers.origin}/?payment=success`,
    cancel_url: `${req.headers.origin}/?payment=cancelled`,
  });
  return res.status(200).json({ url: session.url });
}
