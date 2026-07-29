import { doctorInfo, clinicAddress, clinicPhone, siteBranding } from "@/data/content";

interface JsonLdProps {
  page?: "home" | "about" | "services" | "contact" | "blog";
}

export default function JsonLd({ page = "home" }: JsonLdProps) {
  const baseUrl = "https://drmuraliplastic.com";

  const medicalBusiness = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `${siteBranding.siteTitle} – ${doctorInfo.title}`,
    description: siteBranding.tagline,
    url: baseUrl,
    logo: `${baseUrl}${siteBranding.logoUrl}`,
    image: `${baseUrl}/images/hero.png`,
    telephone: clinicPhone,
    email: "info@drmuraliplastic.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinicAddress.line1,
      addressLocality: clinicAddress.area,
      addressRegion: "Tamil Nadu",
      postalCode: clinicAddress.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.04,
      longitude: 80.23,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    medicalSpecialty: [
      "Plastic Surgery",
      "Cosmetic Surgery",
      "Aesthetic Medicine",
    ],
    physician: {
      "@type": "Physician",
      name: doctorInfo.name,
      jobTitle: doctorInfo.title,
      description: doctorInfo.bio,
      medicalSpecialty: doctorInfo.specializations,
      alumniOf: doctorInfo.education.map((edu) => ({
        "@type": "EducationalOrganization",
        name: edu.institution,
      })),
      knowsLanguage: doctorInfo.languages,
    },
    areaServed: {
      "@type": "City",
      name: "Chennai",
      containedInPlace: {
        "@type": "State",
        name: "Tamil Nadu",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plastic Surgery Services",
      itemListElement: [
        ...Object.entries({
          Face: ["Rhinoplasty", "Blepharoplasty", "Fillers", "Thread Lift", "Face Lift"],
          Body: ["Liposuction", "Abdominoplasty", "Body Sculpting"],
          Breast: ["Breast Augmentation", "Breast Lift", "Breast Reduction"],
          Hair: ["Hair Transplant", "PRP"],
          Male: ["Gynaecomastia"],
        }).flatMap(([category, services]) =>
          services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalProcedure",
              name: service,
              procedureType: "http://schema.org/SurgicalProcedure",
            },
          }))
        ),
      ],
    },

  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page === "home" ? medicalBusiness.name : `${page.charAt(0).toUpperCase() + page.slice(1)} | ${siteBranding.siteTitle}`,
    description: medicalBusiness.description,
    url: page === "home" ? baseUrl : `${baseUrl}/${page}`,
    publisher: {
      "@type": "Organization",
      name: siteBranding.siteTitle,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}${siteBranding.logoUrl}`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
    </>
  );
}
