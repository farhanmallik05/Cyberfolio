import { NextResponse } from "next/server";
import { z } from "zod";

const checkoutSchema = z.object({
  productId: z.string().uuid("Invalid product ID format"),
  email: z.string().email("Invalid email address"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid payload", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { productId, email } = parsed.data;

    // TODO: Phase 17 - Integrate Dodo Payments checkout session creation here
    // const session = await dodoPaymentsClient.createCheckoutSession(...)

    return NextResponse.json({ message: "Checkout endpoint ready" }, { status: 200 });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json({ message: "System Error" }, { status: 500 });
  }
}
