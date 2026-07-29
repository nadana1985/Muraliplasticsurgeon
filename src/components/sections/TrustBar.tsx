import Image from "next/image";

const partners = [
  { name: "Healwell Clinic", logo: "/images/logo-256.png" },
  { name: "Chennai Plastic Surgery", logo: "/images/logo-256.png" },
  { name: "Aesthetic Surgery Center", logo: "/images/logo-256.png" },
  { name: "Beauty Enhancement Clinic", logo: "/images/logo-256.png" },
  { name: "Medical Excellence Hospital", logo: "/images/logo-256.png" },
];

export default function TrustBar() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Trusted by Leading Healthcare Providers
          </h3>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}