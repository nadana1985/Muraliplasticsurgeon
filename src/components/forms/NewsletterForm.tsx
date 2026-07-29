"use client";

import { useState, FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) throw new Error("Failed to subscribe");

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to subscribe. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <span className="text-xl">✅</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-green-800">
          Subscribed Successfully!
        </h3>
        <p className="mt-2 text-sm text-green-600">
          Thank you for subscribing. Check your inbox for a confirmation email.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-3 text-sm font-medium text-green-700 underline hover:text-green-800"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-3">
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        disabled={status === "loading"}
        className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Subscribing...
          </span>
        ) : (
          "Subscribe"
        )}
      </button>
      {status === "error" && (
        <p className="absolute -bottom-6 left-0 text-sm text-red-600">{errorMessage}</p>
      )}
    </form>
  );
}
