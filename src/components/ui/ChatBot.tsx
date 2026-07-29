"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hello! I'm Dr. Murali's virtual clinic assistant. 👋\n\nI can help you with:\n• Understanding our procedures\n• Recovery information & Do's/Don'ts\n• Clinic hours & location\n• Booking an appointment\n\nHow can I assist you today?",
};

const QUICK_SUGGESTIONS = [
  "What procedures does Dr. Murali offer?",
  "Tell me about gynecomastia treatment",
  "What are the clinic hours?",
  "Book an appointment",
];

const MAX_CLIENT_HISTORY = 12; // Keep client history limited to prevent overflow

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const userMsg: Message = { role: "user", content: messageText };
    setMessages((prev) => {
      const updated = [...prev, userMsg];
      if (updated.length > MAX_CLIENT_HISTORY) {
        return [WELCOME_MESSAGE, ...updated.slice(-MAX_CLIENT_HISTORY)];
      }
      return updated;
    });
    setInput("");
    setLoading(true);
    setHasError(false);

    // Compute history payload dynamically
    const historyPayload = [...messages, userMsg];
    const recentPayload = historyPayload.length > MAX_CLIENT_HISTORY
      ? [WELCOME_MESSAGE, ...historyPayload.slice(-MAX_CLIENT_HISTORY)]
      : historyPayload;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: recentPayload }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      setMessages((prev) => {
        const updated = [...prev, { role: "assistant" as const, content: data.content }];
        if (updated.length > MAX_CLIENT_HISTORY) {
          return [WELCOME_MESSAGE, ...updated.slice(-MAX_CLIENT_HISTORY)];
        }
        return updated;
      });
    } catch {
      setHasError(true);
      setMessages((prev) => {
        const updated = [
          ...prev,
          {
            role: "assistant" as const,
            content:
              "I'm having trouble connecting right now. Please call us directly at +91 80725 82121 for immediate assistance. 📞",
          },
        ];
        if (updated.length > MAX_CLIENT_HISTORY) {
          return [WELCOME_MESSAGE, ...updated.slice(-MAX_CLIENT_HISTORY)];
        }
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const retryLastMessage = async () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMessage) {
      // Remove the last assistant message (which was the error alert)
      setMessages((prev) => prev.slice(0, -1));
      setHasError(false);
      await sendMessage(lastUserMessage.content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-body">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white shadow-xl transition-all duration-300 hover:bg-primary-700 hover:scale-110 hover:shadow-2xl"
          aria-label="Open chat assistant"
        >
          <svg
            className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {/* Notification Pulse */}
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transition-all duration-300 max-sm:inset-0 max-sm:h-full max-sm:w-full max-sm:rounded-none">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-semibold">
                    Dr. Murali&apos;s Assistant
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-primary-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Online • Healwell Clinic
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 transition-colors hover:bg-white/20"
                aria-label="Close chat"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-4"
            aria-live="polite"
            role="log"
            aria-label="Chat message history"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary-600 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}
                >
                  {m.content.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < m.content.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                  {hasError && idx === messages.length - 1 && (
                    <button
                      onClick={retryLastMessage}
                      className="mt-2 flex items-center gap-1 rounded bg-white px-2.5 py-1 text-xs font-semibold text-primary-600 shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      🔄 Retry
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Suggestions (only show at start) */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {QUICK_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition-all hover:bg-primary-100 hover:border-primary-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Medical Disclaimer */}
          <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
            <p className="text-[10px] text-gray-400 leading-tight">
              ⚕️ This AI provides general information only and is not a
              substitute for professional medical advice. Always consult
              Dr. Murali for personalized treatment.
            </p>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about procedures, recovery..."
                disabled={loading}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white transition-all hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>

            {/* Call CTA */}
            <a
              href="tel:+918072582121"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-green-50 py-2 text-xs font-medium text-green-700 transition-colors hover:bg-green-100"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Dr. Murali: +91 80725 82121
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
