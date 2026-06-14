import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  projectType: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

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

    const { name, email, projectType, message } = parsed.data;

    const supabase = await createClient();

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
