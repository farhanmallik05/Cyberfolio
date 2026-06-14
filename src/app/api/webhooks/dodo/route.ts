import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { createClient } from "@/utils/supabase/server";

// Standard Webhooks specification HMAC verification
function verifySignature(payload: string, webhookId: string, timestamp: string, signature: string, secret: string) {
  const signedContent = `${webhookId}.${timestamp}.${payload}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(signedContent);
  const expectedSignature = hmac.digest("base64");
  
  // Note: Dodo/Standard Webhooks sometimes use v1, signature prefix format, e.g., "v1,..."
  // This skeleton assumes basic base64 validation or parsing if the prefix is stripped.
  return signature.includes(expectedSignature); 
}

const webhookPayloadSchema = z.object({
  type: z.string(),
  data: z.object({
    payment_id: z.string(),
    status: z.string(),
    customer_email: z.string().email().optional(),
  }).passthrough(),
}).passthrough();

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headers = req.headers;
    
    const webhookId = headers.get("webhook-id") || "";
    const webhookSignature = headers.get("webhook-signature") || "";
    const webhookTimestamp = headers.get("webhook-timestamp") || "";
    const secret = process.env.DODO_PAYMENTS_WEBHOOK_KEY;

    if (!secret) {
      console.error("Missing DODO_PAYMENTS_WEBHOOK_KEY in environment");
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
    }

    // Security Verification
    const isValid = verifySignature(rawBody, webhookId, webhookTimestamp, webhookSignature, secret);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    // Parse Payload
    const parsedBody = JSON.parse(rawBody);
    const parsed = webhookPayloadSchema.safeParse(parsedBody);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload format", errors: parsed.error.format() }, { status: 400 });
    }

    const { type, data } = parsed.data;

    // Idempotency Logic via Supabase upsert
    const supabase = await createClient();
    
    if (type === "payment.succeeded") {
      const { error } = await supabase
        .from("orders")
        .upsert(
          {
            payment_id: data.payment_id,
            buyer_email: data.customer_email,
            status: "completed",
            // Additional mapping needed here later
          },
          { onConflict: "payment_id" }
        );

      if (error) {
        console.error("Failed to upsert order:", error);
        return NextResponse.json({ message: "Database Error" }, { status: 500 });
      }
    }

    // Must return 2xx immediately
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ message: "System Error" }, { status: 500 });
  }
}
