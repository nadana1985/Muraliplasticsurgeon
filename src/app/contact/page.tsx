import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us – Book Appointment Dr. Murali K Chennai",
  description: "Book an appointment with Dr. Murali K at Healwell Clinic, T Nagar Chennai. Call +91-8072582121 or fill the online form for consultation.",
  openGraph: {
    title: "Contact Dr. Murali K – Book Appointment Chennai",
    description: "Schedule your consultation at Healwell Clinic, T Nagar Chennai. Call +91-8072582121.",
    url: "https://drmuraliplastic.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://drmuraliplastic.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd page="contact" />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-16 text-white">
          <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              Book an Appointment
            </h1>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Got doubts &amp; questions? We&apos;d love to hear from you! Drop
              us a line below and we&apos;ll get back to you.
            </p>
          </div>
        </section>

        {/* Full Contact Section with Map, Hours, WhatsApp, and Form */}
        <ContactSection />
      </main>
    </>
  );
}
