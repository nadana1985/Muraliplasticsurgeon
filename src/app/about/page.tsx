import type { Metadata } from "next";
import { doctorInfo, clinicPhone, clinicPhoneHref } from "@/data/content";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Dr. Murali K – Aesthetic & Plastic Surgeon Chennai",
  description: `Meet ${doctorInfo.name}, ${doctorInfo.title} with ${doctorInfo.experience} experience. ${doctorInfo.bio.slice(0, 150)}...`,
  openGraph: {
    title: `About ${doctorInfo.name} – Plastic Surgeon Chennai`,
    description: `${doctorInfo.title} with ${doctorInfo.experience} of experience in aesthetic and plastic surgery.`,
    url: "https://drmuraliplastic.com/about",
    type: "profile",
  },
  alternates: {
    canonical: "https://drmuraliplastic.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd page="about" />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-16 text-white">
          <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              About {doctorInfo.name}
            </h1>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              {doctorInfo.title} with {doctorInfo.experience} of trusted care
            </p>
          </div>
        </section>

        {/* Doctor Bio */}
        <section className="section-padding bg-white">
          <div className="container-custom mx-auto">
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-bold text-gray-900">
                  {doctorInfo.name}
                </h2>
                <p className="mt-2 text-primary-500 font-medium">{doctorInfo.title}</p>
                <p className="mt-6 text-gray-600 leading-relaxed">{doctorInfo.bio}</p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  {doctorInfo.languages.map((lang) => (
                    <span key={lang} className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700">
                      🌐 {lang}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {doctorInfo.specializations.map((spec) => (
                    <span key={spec} className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
                      ✅ {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-8">
                <h3 className="font-display text-xl font-semibold text-gray-900">
                  Education & Qualifications
                </h3>
                <ul className="mt-4 space-y-4">
                  {doctorInfo.education.map((edu) => (
                    <li key={edu.degree} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                      <div>
                        <p className="font-medium text-gray-900">{edu.degree}</p>
                        <p className="text-sm text-gray-500">
                          {edu.institution}{edu.year ? ` (${edu.year})` : ""}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl bg-primary-50 p-4">
                  <p className="text-sm font-medium text-primary-700">
                    🏆 {doctorInfo.experience} of trusted care in aesthetic and plastic surgery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-primary-500 text-white">
          <div className="container-custom mx-auto text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Schedule a Consultation
            </h2>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Ready to discuss your aesthetic goals? Contact {doctorInfo.name} today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={clinicPhoneHref} className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
                📞 Call Now: {clinicPhone}
              </a>
              <a href="/contact" className="btn-secondary border-white text-white hover:bg-white/10">
                Book Online
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
