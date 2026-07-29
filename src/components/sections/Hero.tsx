import Link from "next/link";
import Image from "next/image";
import { siteBranding, doctorInfo } from "@/data/content";

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Clinic Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/80 via-primary-600/70 to-primary-500/60" />
      </div>
      <div className="container-custom relative mx-auto px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-200">
            {doctorInfo.title}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {siteBranding.tagline}
          </h1>
          <p className="mt-6 text-lg text-primary-100 sm:text-xl">
            Welcome to the practice of <strong>{doctorInfo.name}</strong>, an expert
            {doctorInfo.title.toLowerCase()} in Chennai with {doctorInfo.experience} of
            experience, specializing in {doctorInfo.specializations.join(" and ")}.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
              Book Appointment
            </Link>
            <Link
              href="/services"
              className="btn-secondary border-white text-white hover:bg-white/10"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
