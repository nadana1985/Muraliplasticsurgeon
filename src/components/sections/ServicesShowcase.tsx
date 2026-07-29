import Link from "next/link";
import { serviceCategories } from "@/data/content";

export default function ServicesShowcase() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
            What We Offer
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-3 text-gray-500">
            Comprehensive aesthetic and plastic surgery treatments
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((cat) => (
            <div
              key={cat.name}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-display text-lg font-semibold text-gray-900">
                  {cat.name}
                </h3>
              </div>
              <ul className="mt-4 space-y-2">
                {cat.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary-400" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/services" className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
