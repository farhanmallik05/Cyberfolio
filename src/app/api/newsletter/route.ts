import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/utils/supabase/server';
import { checkRateLimit } from '@/lib/rate-limit';
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { email, source = 'newsletter_page' } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = await checkRateLimit(ip, 'newsletter', 5, 24);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const supabase = await createClient(true);

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json({ message: 'Already subscribed!' }, { status: 200 });
    }

    // Insert into Supabase
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert([{ email, source, created_at: new Date().toISOString() }]);

    if (dbError) {
      console.error('Newsletter DB Error:', dbError);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    // Send Welcome Email
    if (resend) {
      await resend.emails.send({
        from: 'Farhan Mallik <hello@farhanmallik.com>',
        to: email,
        subject: 'Welcome to the Matrix.',
        html: `
          <div style="font-family: monospace; background: #000; color: #fff; padding: 40px; border: 1px solid #00f5ff;">
            <h1 style="color: #00f5ff; text-transform: uppercase;">System Access Granted</h1>
            <p>You've successfully subscribed to the inner circle.</p>
            <p>Expect updates on projects, articles, and free tools.</p>
            <br/>
            <p style="color: #666;">-- Farhan</p>
          </div>
        `
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
