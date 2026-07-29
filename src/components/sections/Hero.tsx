"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, ChevronDown, Star, Users, ShieldCheck } from "lucide-react";
import { siteBranding, doctorInfo } from "@/data/content";

const ROTATING_WORDS = [
  "Crafting beauty",
  "Restoring form",
  "Transforming lives",
];

/* ─── Floating Trust Badge ─── */
function TrustBadge({
  icon,
  label,
  sublabel,
  className = "",
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 ${className}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-white/70">{sublabel}</p>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-900 min-h-[600px] lg:min-h-[700px]">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Dr. Murali K Clinic"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/90 to-primary-900/80" />
        {/* Decorative gradient orbs */}
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary-400/15 blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-custom relative mx-auto flex min-h-[600px] items-center px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8 w-full">
          {/* Left: 60% — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm border border-white/10"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {doctorInfo.title}
            </motion.p>

            {/* Heading with rotating keyword */}
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              <span className="text-primary-300">Sculpting dreams,</span>
              <br />
              <span className="relative block h-[1.2em] w-full overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute left-0 text-primary-200 whitespace-nowrap"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg"
            >
              Welcome to the practice of <strong className="text-white">{doctorInfo.name}</strong>, an expert{" "}
              {doctorInfo.title.toLowerCase()} in Chennai with {doctorInfo.experience} of experience, specializing in{" "}
              {doctorInfo.specializations.join(" and ")}.
            </motion.p>

            {/* CTA Buttons with shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {/* Primary CTA — Shimmer glassmorphism */}
              <Link
                href="/contact"
                className="group relative overflow-hidden rounded-2xl bg-primary-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-primary-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-0.5"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </span>
              </Link>

              {/* Secondary CTA — Glassmorphism */}
              <Link
                href="/services"
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  View Services
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center gap-6 text-sm text-gray-400"
            >
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-primary-400" />
                <span className="font-medium text-white">4.9</span> Rating
              </span>
              <span className="h-4 w-px bg-gray-600" />
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary-400" />
                <span className="font-medium text-white">1000+</span> Patients
              </span>
              <span className="h-4 w-px bg-gray-600" />
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary-400" />
                <span className="font-medium text-white">Board</span> Certified
              </span>
            </motion.div>
          </motion.div>

          {/* Right: 40% — Floating Trust Badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:col-span-5 lg:block"
          >
            <div className="relative flex flex-col gap-4">
              <TrustBadge
                icon={<ShieldCheck className="h-5 w-5" />}
                label="Board Certified"
                sublabel="Plastic & Reconstructive Surgery"
                delay={0.5}
              />
              <TrustBadge
                icon={<Star className="h-5 w-5" />}
                label="4.9 Google Rating"
                sublabel="Verified patient reviews"
                delay={0.7}
              />
              <TrustBadge
                icon={<Users className="h-5 w-5" />}
                label="1000+ Happy Patients"
                sublabel="Successful transformations"
                delay={0.9}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        role="presentation"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-white/50 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
