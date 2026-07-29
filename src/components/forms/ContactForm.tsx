"use client";

import { useState, FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      form.reset();

      // High-conversion enhancement: Trigger click-to-chat redirect to clinic's WhatsApp
      const waMessage = encodeURIComponent(
        `Hi Dr. Murali, I'd like to book an appointment.\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || "Not provided"}\nMessage: ${data.message}`
      );
      window.open(`https://wa.me/918072582121?text=${waMessage}`, "_blank");
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or call us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <span className="text-2xl">✅</span>
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-green-800">
          Message Sent Successfully!
        </h3>
        <p className="mt-2 text-sm text-green-600">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-green-700 underline hover:text-green-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          placeholder="Your full name"
          disabled={status === "loading"}
          className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          required
          placeholder="Your phone number"
          disabled={status === "loading"}
          className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          placeholder="Your email (optional)"
          disabled={status === "loading"}
          className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="Tell us about your concerns or questions"
          disabled={status === "loading"}
          className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
