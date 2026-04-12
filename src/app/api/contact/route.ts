import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { name, email, projectType, message } = await req.json();

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
