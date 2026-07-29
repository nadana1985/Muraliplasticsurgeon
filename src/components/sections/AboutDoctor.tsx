import { doctorInfo } from "@/data/content";

export default function AboutDoctor() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
              About the Doctor
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              {doctorInfo.name}
            </h2>
            <p className="mt-2 text-sm font-medium text-primary-500">
              {doctorInfo.title}
            </p>
            <p className="mt-6 text-gray-600 leading-relaxed">
              {doctorInfo.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {doctorInfo.languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700"
                >
                  🌐 {lang}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {doctorInfo.specializations.map((spec) => (
                <span
                  key={spec}
                  className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700"
                >
                  ✅ {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-gray-900">
              Education & Qualifications
            </h3>
            <ul className="mt-4 space-y-3">
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
  );
}
