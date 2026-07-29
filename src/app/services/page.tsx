import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, clinicPhoneHref, clinicPhone } from "@/data/content";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Our Services – Plastic Surgery & Aesthetic Treatments Chennai",
  description: "Comprehensive plastic surgery services in Chennai: Rhinoplasty, Liposuction, Breast Augmentation, Gynaecomastia, Hair Transplant, Face Lift and more by Dr. Murali K.",
  openGraph: {
    title: "Plastic Surgery Services – Dr. Murali K Chennai",
    description: "Expert plastic surgery and aesthetic treatments including Rhinoplasty, Liposuction, Breast Augmentation, Gynaecomastia, Hair Transplant.",
    url: "https://drmuraliplastic.com/services",
    type: "website",
  },
  alternates: {
    canonical: "https://drmuraliplastic.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd page="services" />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-16 text-white">
          <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Comprehensive aesthetic and plastic surgery treatments tailored to your needs
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom mx-auto">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <h2 className="font-display text-xl font-semibold text-gray-900">
                      {cat.name}
                    </h2>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {cat.services.map((service) => (
                      <li key={service} className="flex items-center gap-2 text-gray-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary-500 text-white">
          <div className="container-custom mx-auto text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Not Sure Which Service Is Right for You?
            </h2>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Schedule a consultation with Dr. Murali K to discuss your goals and find the best treatment plan.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={clinicPhoneHref} className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
                📞 Call Now: {clinicPhone}
              </a>
              <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white/10">
                Book Online
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
