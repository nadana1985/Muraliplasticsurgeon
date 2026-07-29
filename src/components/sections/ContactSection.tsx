import { clinicAddress, clinicPhone, clinicPhoneHref, contactFormConfig } from "@/data/content";

export default function ContactSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
              Get in Touch
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Book an Appointment
            </h2>
            <p className="mt-3 text-gray-500">
              {contactFormConfig.description}
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Your full name"
                  className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  placeholder="Your phone number"
                  className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email (optional)"
                  className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Tell us about your concerns or questions"
                  className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Clinic Info + Map */}
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

            {/* Google Maps Embed */}
            <div className="overflow-hidden rounded-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0!2d80.23!3d13.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzI0LjAiTiA4MMKwMTMnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Healwell Clinic Location"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
