export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const stripe = (await import('stripe')).default(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  const chunks = []; for await (const c of req) chunks.push(c); const rawBody = Buffer.concat(chunks);
  let event; try { event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET); }
  catch { return res.status(400).json({ error: 'Invalid signature' }); }
  if (event.type === 'checkout.session.completed') {
    const phone_number = event.data.object.metadata?.phone_number; // map payment -> phone
    const accessUpdate = { phone_number, has_access: true, credits: 0, plan_type: null }; void accessUpdate; // DB placeholder
  }
  return res.status(200).json({ received: true });
}
