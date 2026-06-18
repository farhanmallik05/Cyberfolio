import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendDeliveryEmail(to: string, productName: string, downloadUrl: string) {
    if (!resend) {
        console.warn("Resend API key missing. Email not sent.");
        return null;
    }
    try {
        const data = await resend.emails.send({
            from: 'Farhan Mallik <delivery@farhanmallik.com>',
            to: [to],
            subject: `Your download: ${productName}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Thank you for your purchase!</h2>
                    <p>You can download <strong>${productName}</strong> using the secure link below:</p>
                    <p>
                        <a href="${downloadUrl}" style="background-color: #00e5ff; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                            Download File
                        </a>
                    </p>
                    <p style="font-size: 12px; color: #666; margin-top: 20px;">
                        Note: This link expires in 24 hours.
                    </p>
                </div>
            `,
        });
        return data;
    } catch (error) {
        console.error("Resend Error:", error);
        throw error;
    }
}
