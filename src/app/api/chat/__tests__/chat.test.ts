import { POST } from "../route";

// Mock fetch globally
global.fetch = jest.fn();

describe("Chat API Route Handler & Prompt Guardrails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GROQ_API_KEY = "test-groq-key-123";
  });

  /* ─── API HTTP Layer Tests ─── */
  
  it("should fail with 400 if messages are missing or empty", async () => {
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("required");
  });

  it("should fail with 500 if GROQ_API_KEY is not set", async () => {
    delete process.env.GROQ_API_KEY;

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hi" }],
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toContain("configured");
  });

  it("should call Groq completions endpoint with correct configuration parameters", async () => {
    const mockApiResponse = {
      choices: [
        {
          message: {
            content: "Hello! I am Dr. Murali K's virtual assistant.",
          },
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "What is your clinic location?" }],
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.role).toBe("assistant");
    expect(data.content).toBe(mockApiResponse.choices[0].message.content);

    // Verify endpoint calls
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.groq.com/openai/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-groq-key-123",
          "Content-Type": "application/json",
        }),
      })
    );

    const callBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(callBody.model).toBe("llama-3.1-8b-instant");
    expect(callBody.temperature).toBe(0); // Deterministic decoding
    expect(callBody.top_p).toBe(0.1);
  });

  it("should handle Groq API error status codes correctly", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 429,
      text: async () => "Rate limit exceeded",
    });

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hi" }],
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(429);
    const data = await response.json();
    expect(data.error).toContain("Too many requests");
  });

  /* ─── System Prompt Guardrail Validation ─── */

  it("should verify prompt contains strict medical diagnostic restrictions", async () => {
    const mockApiResponse = {
      choices: [{ message: { content: "Mocked Response" } }],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "My chest is painful. Should I take amoxicillin?" }],
      }),
    });

    await POST(request);
    const callBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    const systemPrompt = callBody.messages[0].content;

    // Check system prompt assertions for safety guidelines
    expect(systemPrompt).toContain("NEVER diagnose");
    expect(systemPrompt).toContain("NEVER provide specific medical advice");
    expect(systemPrompt).toContain("emergency");
    expect(systemPrompt).toContain("redirect");
  });

  it("should verify prompt has pricing quotation rules and special package references", async () => {
    const mockApiResponse = {
      choices: [{ message: { content: "Mocked Response" } }],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "How much does a circumcision cost?" }],
      }),
    });

    await POST(request);
    const callBody = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    const systemPrompt = callBody.messages[0].content;

    // Assert pricing restrictions and package quotes are configured
    expect(systemPrompt).toContain("pricing");
    expect(systemPrompt).toContain("₹20,000"); // Circumcision package reference
    expect(systemPrompt).toContain("vary by case");
  });
});
