import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;

    if (webhookUrl) {
      // Forward newsletter sign-up details to webhook
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "newsletter-signup",
        type: "text",
        text: {
          body: `New Newsletter Subscription:\nEmail: ${email}`
        }
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } else {
      console.warn("WHATSAPP_WEBHOOK_URL is not set. Newsletter dispatch skipped.");
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Error in newsletter subscription:", error);
    return NextResponse.json(
      { error: "Failed to process newsletter subscription" },
      { status: 500 }
    );
  }
}
