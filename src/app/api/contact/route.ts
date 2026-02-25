import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, projectType, message } = await req.json();

    // Log the submission (would be sent via email in production)
    console.log(`[SECURE TRANSMISSION] ${projectType} from ${name} (${email}): ${message}`);

    // In production, use nodemailer or a service like SendGrid/Resend:
    // import nodemailer from "nodemailer";
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    // });
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: "farhan.mallik@example.com",
    //   subject: `[SECURE TRANSMISSION] New ${projectType} query from ${name}`,
    //   text: `From: ${name} (${email})\nProject Type: ${projectType}\n\nMessage:\n${message}`,
    // });

    // Emulate network delay representing secure encryption/transmission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({ message: "Transmission successful" }, { status: 200 });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: "System Error" }, { status: 500 });
  }
}
