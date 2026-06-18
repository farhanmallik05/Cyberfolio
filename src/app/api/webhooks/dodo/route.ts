import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/utils/supabase/server";
import { sendDeliveryEmail } from "@/lib/email";

function verifySignature(payload: string, webhookId: string, timestamp: string, signature: string, secret: string) {
  const signedContent = `${webhookId}.${timestamp}.${payload}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(signedContent);
  const expectedSignature = hmac.digest("base64");
  
  const signatureParts = signature.split(',');
  const extractedSignature = signatureParts.find(p => p.startsWith('v1,'))?.substring(3) || signature;
  return extractedSignature === expectedSignature; 
}

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
    const { type, data } = parsedBody;

    if (type === "payment.succeeded") {
      const supabase = await createClient();
      
      const productId = data.metadata?.product_id;
      const amount = data.total_amount || 0;
      const customerEmail = data.customer?.email || "";

      // 1. Idempotent Upsert into orders table
      const { error: orderError } = await supabase
        .from("orders")
        .upsert(
          {
            dodo_payment_id: data.payment_id,
            product_id: productId,
            customer_email: customerEmail,
            amount: amount,
            status: "successful",
          },
          { onConflict: "dodo_payment_id" }
        )
        .select()
        .single();

      if (orderError) {
        console.error("Failed to upsert order:", orderError);
        return NextResponse.json({ message: "Database Error" }, { status: 500 });
      }

      // If the order was just created/updated successfully, deliver the product
      if (productId && customerEmail) {
        // Fetch product details
        const { data: product } = await supabase
            .from("products")
            .select("*")
            .eq("id", productId)
            .single();

        if (product && product.file_path) {
            // Generate signed URL
            const { data: signedUrlData, error: signedUrlError } = await supabase
                .storage
                .from("store-files")
                .createSignedUrl(product.file_path, 86400); // 24 hours

            if (signedUrlError) {
                console.error("Signed URL Error:", signedUrlError);
            } else if (signedUrlData?.signedUrl) {
                // Send email via Resend
                await sendDeliveryEmail(customerEmail, product.name, signedUrlData.signedUrl);
            }
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ message: "System Error" }, { status: 500 });
  }
}
