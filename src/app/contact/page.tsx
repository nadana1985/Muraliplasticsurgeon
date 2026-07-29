import type { Metadata } from "next";
import { clinicAddress, clinicPhone, clinicPhoneHref } from "@/data/content";
import JsonLd from "@/components/seo/JsonLd";
import ContactForm from "@/components/forms/ContactForm";

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

        {/* Contact Form + Info */}
        <section className="section-padding bg-white">
          <div className="container-custom mx-auto">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Form */}
              <div>
                <h2 className="font-display text-3xl font-bold text-gray-900">
                  Send Us a Message
                </h2>
                <p className="mt-3 text-gray-500">
                  Fill out the form below and we&apos;ll get back to you shortly.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>

              {/* Clinic Info */}
              <div className="space-y-6">
                <div className="rounded-2xl bg-gray-50 p-8">
                  <h3 className="font-display text-xl font-semibold text-gray-900">
                    Healwell Clinic
                  </h3>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📍</span>
                      <address className="not-italic text-sm text-gray-600">
                        {clinicAddress.line1}<br />
                        {clinicAddress.landmark}<br />
                        {clinicAddress.area}, {clinicAddress.city} – {clinicAddress.pincode}
                      </address>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📞</span>
                      <a
                        href={clinicPhoneHref}
                        className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        {clinicPhone}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🕐</span>
                      <p className="text-sm text-gray-600">
                        Mon – Sat: 10:00 AM – 8:00 PM<br />
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Call CTA */}
                <div className="rounded-2xl bg-primary-500 p-6 text-white">
                  <h3 className="font-display text-lg font-semibold">
                    Need Immediate Assistance?
                  </h3>
                  <p className="mt-2 text-primary-100 text-sm">
                    Call us directly for urgent consultations or queries.
                  </p>
                  <a
                    href={clinicPhoneHref}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    📞 Call {clinicPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
