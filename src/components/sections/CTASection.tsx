import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary-600 py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 opacity-90" />
      <div className="container-custom relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Transform Your Appearance?
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            Schedule a consultation with Dr. Murali K today and take the first
            step towards achieving your aesthetic goals. Our team is here to
            guide you through every step of your transformation journey.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="tel:+918072582121" className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
              📞 Call Now: +91-8072582121
            </a>
            <Link
              href="/contact"
              className="btn-secondary border-white text-white hover:bg-white/10"
            >
              Book Online Appointment
            </Link>
          </div>
          <p className="mt-6 text-sm text-primary-200">
            Free initial consultation • Flexible appointment times • Confidential & professional
          </p>
        </div>
      </div>
    </section>
  );
}