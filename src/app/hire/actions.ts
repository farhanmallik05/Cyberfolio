"use server";

import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Supabase URL used for attachment URL validation
const SUPABASE_STORAGE_HOST = "snyvarunuobcpfadkpmc.supabase.co";
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;

export const briefSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  project_name: z.string().min(2, "Project name is required"),
  budget_range: z.string().min(1, "Budget range is required"),
  timeline: z.string().min(1, "Timeline is required"),
  description: z.string().min(10, "Please provide a brief description"),
  attachment_url: z
    .string()
    .url()
    .refine(
      (url) => url.includes(SUPABASE_STORAGE_HOST),
      "Invalid attachment URL"
    )
    .optional(),
  turnstile_token: z.string().optional(),
});

export type BriefPayload = z.infer<typeof briefSchema>;

async function verifyTurnstile(token: string): Promise<boolean> {
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET!,
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

export async function submitBrief(data: BriefPayload) {
  try {
    const validatedData = briefSchema.parse(data);

    // 1. Verify Turnstile token (skip if no secret is configured — dev mode)
    if (TURNSTILE_SECRET) {
      if (!validatedData.turnstile_token) {
        return { success: false, error: "Security check required." };
      }
      const isHuman = await verifyTurnstile(validatedData.turnstile_token);
      if (!isHuman) {
        return { success: false, error: "Security verification failed. Please try again." };
      }
    }

    // 2. Insert into Supabase
    const { data: insertedData, error: dbError } = await supabase
      .from("briefs")
      .insert([
        {
          company_name: validatedData.company_name,
          project_name: validatedData.project_name,
          budget_range: validatedData.budget_range,
          timeline: validatedData.timeline,
          description: validatedData.description,
          attachment_url: validatedData.attachment_url,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return { success: false, error: "Failed to submit brief to database." };
    }

    // 3. Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "mallikfarhan10@gmail.com",
      subject: `[New Brief] ${validatedData.project_name} from ${validatedData.company_name}`,
      html: `
        <h2>New Project Brief Received</h2>
        <p><strong>Company:</strong> ${validatedData.company_name}</p>
        <p><strong>Project:</strong> ${validatedData.project_name}</p>
        <p><strong>Budget:</strong> ${validatedData.budget_range}</p>
        <p><strong>Timeline:</strong> ${validatedData.timeline}</p>
        <h3>Description:</h3>
        <p>${validatedData.description.replace(/\n/g, "<br/>")}</p>
        ${
          validatedData.attachment_url
            ? `<h3>Attachment:</h3><p><a href="${validatedData.attachment_url}">View Attachment</a></p>`
            : ""
        }
      `,
    });

    if (emailError) {
      // Brief is safely stored in DB — email failure is non-fatal
      console.error("Resend email error:", emailError);
    }

    return { success: true, message: "Brief submitted successfully." };
  } catch (error) {
    console.error("Brief submission error:", error);
    return { success: false, error: "Invalid submission data." };
  }
}
