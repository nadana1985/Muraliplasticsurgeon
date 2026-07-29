"use client";

const certifications = [
  {
    name: "Association of Plastic Surgeons of India",
    abbrev: "APSI",
    description: "Member of the Association of Plastic Surgeons of India",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Board Certified",
    abbrev: "Certified",
    description: "Board Certified in Plastic & Reconstructive Surgery",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    name: "ISAPS Member",
    abbrev: "ISAPS",
    description: "International Society of Aesthetic Plastic Surgery",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    name: "Medical Council",
    abbrev: "MCI",
    description: "Registered with the Medical Council of India",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    name: "State Medical Council",
    abbrev: "TNMC",
    description: "Registered with the Tamil Nadu Medical Council",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    name: "Healwell Clinic",
    abbrev: "Healwell",
    description: "NABH-Ready Clinic Infrastructure",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
  },
];

/* ─── Single certification badge ─── */
function CertBadge({ cert }: { cert: typeof certifications[0] }) {
  return (
    <div className="group relative mx-6 flex flex-col items-center gap-2 md:mx-8">
      {/* Badge */}
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:border-gray-300 ${cert.bgColor}/30`}
      >
        <span className={`text-sm font-bold ${cert.color}`}>{cert.abbrev}</span>
      </div>
      {/* Tooltip */}
      <div className="pointer-events-none absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 translate-y-full opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-xl whitespace-nowrap">
          {cert.description}
          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900" />
        </div>
      </div>
      {/* Name below badge */}
      <p className="hidden text-center text-[10px] font-medium text-gray-400 transition-colors duration-300 group-hover:text-gray-600 md:block">
        {cert.name}
      </p>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="bg-gray-50 py-10 overflow-hidden">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Board Certified &amp; Professionally Affiliated
          </h3>
        </div>

        {/* ─── Desktop: Static badge grid ─── */}
        <div className="mt-8 hidden items-center justify-center md:flex">
          {certifications.map((cert) => (
            <CertBadge key={cert.name} cert={cert} />
          ))}
        </div>

        {/* ─── Mobile: Infinite CSS Marquee ─── */}
        <div className="mt-8 md:hidden">
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent" />
            <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent" />

            {/* Pause marquee on hover for readability */}

            {/* Marquee track — pauses on hover */}
            <div className="flex w-max animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
              {[...certifications, ...certifications].map((cert, i) => (
                <div key={`${cert.name}-${i}`} className="mx-4 flex flex-col items-center gap-2">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 active:scale-95 ${cert.bgColor}/30`}
                  >
                    <span className={`text-[10px] font-bold ${cert.color}`}>{cert.abbrev}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Dr. Murali K maintains active membership in leading medical associations
        </p>
      </div>


    </section>
  );
}
