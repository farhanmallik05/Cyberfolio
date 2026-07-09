import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  projectType: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  turnstileToken: z.string().optional(),
});

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: secret,
          response: token,
        }),
      }
    );
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid payload", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = await checkRateLimit(ip, 'contact', 5, 24);
    if (!rateLimit.allowed) {
      return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
    }

    const { name, email, projectType, message, turnstileToken } = parsed.data;

    // Verify Turnstile
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json({ message: "Security check required" }, { status: 400 });
      }
      const isHuman = await verifyTurnstile(turnstileToken);
      if (!isHuman) {
        return NextResponse.json({ message: "Security verification failed" }, { status: 400 });
      }
    }

    const supabase = await createClient(true);

    const { error } = await supabase
      .from("enquiries")
      .insert([
        {
          name,
          email,
          subject: projectType,
          message: message,
          status: "pending",
        },
      ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ message: "Database link failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Transmission successful" }, { status: 200 });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: "System Error" }, { status: 500 });
  }
}
