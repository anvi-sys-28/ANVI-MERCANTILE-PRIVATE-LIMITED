import type { RequestContext } from '@vercel/functions';

export interface QuoteRequestBody {
  name: string;
  email: string;
  phone: string;
  company?: string;
  origin: string;
  destination: string;
  serviceType: string;
  cargoDescription: string;
  weightKg?: string;
  volumeCbm?: string;
  incoterm?: string;
  notes?: string;
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body: QuoteRequestBody = await request.json();

    // Server-side validation
    if (!body.name || !body.email || !body.phone || !body.origin || !body.destination || !body.serviceType) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.QUOTE_RECEIVER_EMAIL || 'quotes@anvimercantile.com';

    if (!apiKey) {
      console.warn('RESEND_API_KEY not configured. Simulating successful quote request dispatch.');
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Quote request received successfully (Simulation mode - RESEND_API_KEY not configured).',
          data: body,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Call Resend API directly via fetch to avoid extra SDK dependencies in serverless edge/node runtime
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ANVI MERCANTILE PRIVATE LIMITED Quote Engine <quotes@anvimercantile.com>',
        to: [receiverEmail],
        subject: `New Trade Quote Request from ${body.company ? body.company + ' (' + body.name + ')' : body.name}`,
        html: `
          <h2>New Logistics & Trade Quote Request</h2>
          <p><strong>Client Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Company:</strong> ${body.company || 'N/A'}</p>
          <hr/>
          <p><strong>Service Type:</strong> ${body.serviceType}</p>
          <p><strong>Route:</strong> ${body.origin} ➔ ${body.destination}</p>
          <p><strong>Incoterm:</strong> ${body.incoterm || 'N/A'}</p>
          <p><strong>Cargo Description:</strong> ${body.cargoDescription}</p>
          <p><strong>Weight:</strong> ${body.weightKg ? body.weightKg + ' kg' : 'N/A'}</p>
          <p><strong>Volume:</strong> ${body.volumeCbm ? body.volumeCbm + ' CBM' : 'N/A'}</p>
          <p><strong>Additional Notes:</strong> ${body.notes || 'None'}</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errorText = await emailRes.text();
      console.error('Resend API Error:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to dispatch email via Resend' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote request submitted successfully!',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('Server error processing quote request:', err);
    return new Response(
      JSON.stringify({ error: err?.message || 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
