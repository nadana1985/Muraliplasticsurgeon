import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, email, message } = data;

    // Validate input
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
    
    if (webhookUrl) {
      // Dispatch webhook to WhatsApp messaging service
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: phone, // Assuming sending confirmation to patient or forwarding to clinic
        type: "text",
        text: {
          body: `New appointment request from website:\nName: ${name}\nPhone: ${phone}\nEmail: ${email || "Not provided"}\nMessage: ${message}`
        }
      };

      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!webhookResponse.ok) {
        console.error("WhatsApp webhook failed to respond successfully:", await webhookResponse.text());
        // We log the error but still return success to the patient to prevent a broken experience
      }
    } else {
      console.warn("WHATSAPP_WEBHOOK_URL is not set. WhatsApp dispatch skipped.");
    }

    return NextResponse.json({ success: true, message: "Lead processed successfully" });
  } catch (error) {
    console.error("Error in contact form endpoint:", error);
    return NextResponse.json(
      { error: "Failed to process appointment request" },
      { status: 500 }
    );
  }
}
