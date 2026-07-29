"use client";

import Lightbox from "@/components/ui/Lightbox";
import { useLightbox } from "@/hooks/useLightbox";
import Image from "next/image";

const clinicImages = [
  { src: "/images/clinic/reception.jpg", alt: "Clinic Reception Area", width: 1024, height: 768 },
  { src: "/images/clinic/consulting-room.jpg", alt: "Consultation Room", width: 1024, height: 768 },
  { src: "/images/clinic/outdoor.jpg", alt: "Clinic Exterior Entrance", width: 1024, height: 768 },
];

export default function HealwellPage() {
  const { isOpen, currentIndex, open, close, next, prev } = useLightbox(clinicImages);

  return (
    <>
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-16 text-white">
          <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              Healwell Clinic
            </h1>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Advanced aesthetic and plastic surgery care in the heart of Chennai.
              State-of-the-art facility with compassionate, personalized treatment.
            </p>
          </div>
        </section>

        {/* Clinic Info */}
        <section className="section-padding bg-white">
          <div className="container-custom mx-auto">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Info */}
              <div>
                <h2 className="font-display text-3xl font-bold text-gray-900">
                  Welcome to Healwell
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Healwell Clinic is Dr. Murali K&apos;s dedicated practice for aesthetic
                  and plastic surgery. Located in the bustling T Nagar area of Chennai,
                  the clinic offers a comfortable, modern environment for all procedures.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-xl">📍</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">
                        No.2, Bharathi Nagar 1st Street,<br />
                        Near North Usman Road,<br />
                        T Nagar, Chennai – 17
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-xl">📞</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <a
                        href="tel:+918072582121"
                        className="text-primary-500 hover:text-primary-600 font-medium"
                      >
                        +91-8072582121
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-xl">🕐</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Working Hours</h3>
                      <p className="text-gray-600">
                        Mon – Sat: 10:00 AM – 8:00 PM<br />
                        Sunday: By Appointment Only
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a href="tel:+918072582121" className="btn-primary">
                    📞 Book Appointment
                  </a>
                </div>
              </div>

              {/* Map Integration */}
              <div className="rounded-2xl bg-gray-100 overflow-hidden shadow-sm border border-gray-100 h-full min-h-[400px]">
                <iframe
                  src="https://maps.google.com/maps?cid=15059213551542694948&output=embed"
                  className="w-full h-full min-h-[400px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Healwell Clinic Google Maps Location"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom mx-auto">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
                Clinic Gallery
              </h2>
              <p className="mt-3 text-gray-500">
                Take a virtual tour of our facility
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clinicImages.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => open(index)}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <div className="overflow-hidden relative" style={{ aspectRatio: `${image.width}/${image.height}` }}>
                    <Image
                       src={image.src}
                       alt={image.alt}
                       fill
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       className="object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-medium">{image.alt}</p>
                    <p className="mt-1 text-sm text-white/80">Click to enlarge</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offer Section */}
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-custom mx-auto">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600 mb-3">
                Featured Package
              </span>
              <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
                Advanced Stapler Circumcision
              </h2>
              <p className="mt-3 text-gray-500">
                A modern, safe, and virtually bloodless procedure performed by Dr. Murali K.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 items-center">
              {/* Features List */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-display text-2xl font-bold text-gray-900">
                  Why Choose Stapler Circumcision?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Traditional circumcision methods involve scalpels, sutures, and longer recovery times. 
                  Our advanced disposable stapler device cuts and seals the wound simultaneously, 
                  offering superior cosmetic results and safety.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "No Pain", desc: "Performed safely under local anesthesia with minimal post-op discomfort." },
                    { title: "Stitch-Free", desc: "No sutures to remove; uses a special self-releasing silicone ring." },
                    { title: "Virtually Bloodless", desc: "The stapler automatically seals blood vessels as it cuts." },
                    { title: "Daycare Procedure", desc: "Takes only 10-15 minutes. Walk in, walk out the same day." },
                  ].map((feat, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-sm font-bold">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{feat.title}</h4>
                        <p className="mt-1 text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border-2 border-primary-500 bg-gradient-to-b from-primary-50 to-white p-6 shadow-lg relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-primary-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Special Offer
                  </div>
                  
                  <h4 className="font-display text-lg font-bold text-primary-900">All-Inclusive Package</h4>
                  <p className="text-xs text-gray-500 mt-1">Stapler Circumcision daycare treatment</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">₹19,999</span>
                    <span className="text-sm text-gray-400 line-through">₹45,000</span>
                    <span className="text-xs text-primary-600 font-semibold bg-primary-100/50 px-2 py-0.5 rounded ml-2 font-display">Save 55%</span>
                  </div>

                  <ul className="mt-6 space-y-3 border-t border-primary-100 pt-6">
                    {[
                      "Pre-op Consultation included",
                      "Advanced Stapler Device & disposable kit",
                      "Experienced Plastic Surgeon care",
                      "Follow-up dressing & post-op checkup",
                      "Free online consultation",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 space-y-3">
                    <a
                      href="tel:+918072582121"
                      className="btn-primary w-full text-center py-2.5 text-xs flex justify-center items-center gap-2"
                    >
                      📞 Call to Book: 8072582121
                    </a>
                    <a
                      href="/contact"
                      className="btn-secondary w-full text-center py-2.5 text-xs flex justify-center border-primary-200 text-primary-600 hover:bg-primary-50"
                    >
                      Request Callback
                    </a>
                  </div>

                  <p className="text-[10px] text-center text-gray-400 mt-4">
                    *Show screenshot of this page at the clinic to avail of the offer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary-500 text-white">
          <div className="container-custom mx-auto text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Ready to Transform?
            </h2>
            <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Book your consultation at Healwell Clinic today and take the first
              step towards achieving your aesthetic goals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="tel:+918072582121" className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
                📞 Call Now: +91-8072582121
              </a>
              <a href="/contact" className="btn-secondary border-white text-white hover:bg-white/10">
                Book Online
              </a>
            </div>
          </div>
        </section>
      </main>

      <Lightbox
        images={clinicImages}
        isOpen={isOpen}
        currentIndex={currentIndex}
        onClose={close}
        onNext={next}
        onPrev={prev}
      />
    </>
  );
}
