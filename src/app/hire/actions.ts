"use server";

import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/zip",
  "application/x-zip-compressed",
];

export const briefSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  project_name: z.string().min(2, "Project name is required"),
  budget_range: z.string().min(1, "Budget range is required"),
  timeline: z.string().min(1, "Timeline is required"),
  description: z.string().min(10, "Please provide a brief description"),
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

export async function submitBrief(formData: FormData) {
  try {
    const company_name = formData.get("company_name") as string;
    const project_name = formData.get("project_name") as string;
    const budget_range = formData.get("budget_range") as string;
    const timeline = formData.get("timeline") as string;
    const description = formData.get("description") as string;
    const turnstile_token = formData.get("turnstile_token") as string | null;
    const file = formData.get("attachment") as File | null;

    const validatedData = briefSchema.parse({
      company_name,
      project_name,
      budget_range,
      timeline,
      description,
    });

    if (TURNSTILE_SECRET) {
      if (!turnstile_token) {
        return { success: false, error: "Security check required." };
      }
      const isHuman = await verifyTurnstile(turnstile_token);
      if (!isHuman) {
        return { success: false, error: "Security verification failed." };
      }
    }

    let attachment_url = null;

    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return { success: false, error: "File exceeds 10MB limit." };
      }
      
      const ext = file.name.split(".").pop()?.toLowerCase();
      const validExtensions = ["pdf", "png", "jpg", "jpeg", "zip"];
      
      if (!ALLOWED_MIME_TYPES.includes(file.type) && (!ext || !validExtensions.includes(ext))) {
        return { success: false, error: "Invalid file type. Allowed: PDF, PNG, JPG, ZIP." };
      }

      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
      const filePath = `briefs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("brief-attachments")
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return { success: false, error: "Failed to upload attachment." };
      }

      const { data: publicUrlData } = supabase.storage
        .from("brief-attachments")
        .getPublicUrl(filePath);

      attachment_url = publicUrlData.publicUrl;
    }

    const { error: dbError } = await supabase
      .from("briefs")
      .insert([
        {
          ...validatedData,
          attachment_url,
        },
      ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return { success: false, error: "Failed to submit brief to database." };
    }

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
          attachment_url
            ? `<h3>Attachment:</h3><p><a href="${attachment_url}">View Attachment</a></p>`
            : ""
        }
      `,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
    }

    return { success: true, message: "Brief submitted successfully." };
  } catch (error) {
    console.error("Brief submission error:", error);
    return { success: false, error: "Invalid submission data." };
  }
}
