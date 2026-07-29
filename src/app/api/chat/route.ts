import { NextResponse } from "next/server";
import { doctorInfo, clinicAddress, allServices } from "@/data/content";

const CLINIC_PHONE = "+91 80725 82121";
const MAX_HISTORY = 10; // Limit conversation history to prevent token overflow

// Build the factual context string from local data sources
const CLINIC_CONTEXT = `
CLINIC AND SURGEON DIRECTORY INFO (TRUTH SOURCE):
- Surgeon Name: ${doctorInfo.name}
- Title: ${doctorInfo.title}
- Experience: ${doctorInfo.experience}
- Specializations: ${doctorInfo.specializations.join(", ")}
- Languages Spoken: ${doctorInfo.languages.join(", ")}
- Clinic Location: ${clinicAddress.full}
- Clinic Contact Number: ${CLINIC_PHONE}
- Standard Procedures Offered: ${allServices.map((s) => s.name).join(", ")}
- Special Offer: Stapler Circumcision is currently offered at a special price of ₹20,000/- all inclusive.

IMPORTANT NOTES FOR RESPONSES:
- You can reference visual guides on the website like Key Takeaways, Do's & Don'ts grids, Myth vs Fact cards, and Step-by-Step Timelines when explaining recovery protocols.
- For recovery questions, suggest the patient read the relevant blog post for detailed Do's & Don'ts guidance.
- Always end responses with an invitation to call for personalized consultation.
`;

// Strict system instruction to prevent hallucinations
const SYSTEM_PROMPT = `
You are the AI assistant for Dr. Murali K, a Consultant Aesthetic & Plastic Surgeon at Healwell Clinic in Chennai, India.

Your response MUST be generated based ONLY on the clinical facts provided in the "CLINIC AND SURGEON DIRECTORY INFO" below.

CRITICAL RULES:
1. NEVER diagnose a patient's symptoms or prescribe medicine.
2. NEVER provide specific medical advice or treatment recommendations.
3. If the user asks about pricing (except for the ₹20,000/- Circumcision special offer), say that prices vary by case and advise them to schedule a clinical consultation at ${CLINIC_PHONE}.
4. If the user query cannot be answered using the provided directory info, reply with:
   "I want to make sure you get the most accurate medical advice. I do not have that specific detail on hand, but you can consult Dr. Murali directly by calling us at ${CLINIC_PHONE}."
5. Do not talk about unrelated topics (such as weather, coding, or recipe instructions). Gently redirect the patient to relevant clinic services.
6. Keep responses concise (under 150 words) and professional.
7. Always be empathetic and reassuring in tone.
8. When discussing procedures, mention that Dr. Murali specializes in minimally invasive techniques with minimal scarring.
9. If a patient mentions a medical emergency, immediately advise them to call emergency services (108 in India) or visit the nearest hospital.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      console.error("GROQ_API_KEY is not set in environment variables.");
      return NextResponse.json(
        { error: "AI service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    // Limit conversation history to prevent token overflow
    const recentMessages = messages.slice(-MAX_HISTORY);

    // Format messages for Groq API (OpenAI-compatible format)
    // Context is injected once into the system message alongside the instructions
    const formattedMessages = [
      {
        role: "system" as const,
        content: `${SYSTEM_PROMPT}\n\n${CLINIC_CONTEXT}`,
      },
      ...recentMessages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.content,
      })),
    ];

    // Make the API Call to Groq Cloud endpoint
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: formattedMessages,
          temperature: 0.0, // Force greedy decoding for determinism
          top_p: 0.1, // Restrict token selection to top choices
          max_tokens: 500,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API returned an error:", errorText);

      if (response.status === 401) {
        return NextResponse.json(
          { error: "AI service authentication failed. Please contact the clinic." },
          { status: 500 }
        );
      }
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in a moment." },
          { status: 429 }
        );
      }
      throw new Error("Failed to generate response from Groq");
    }

    const responseData = await response.json();
    const responseText = responseData.choices[0].message.content;

    return NextResponse.json({ role: "assistant", content: responseText });
  } catch (error) {
    console.error("Error in chat route handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch response. Please try again." },
      { status: 500 }
    );
  }
}
