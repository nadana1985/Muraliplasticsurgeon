"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { User, ShieldCheck, Check, Play, X, Calendar, ChevronRight } from "lucide-react";
import { doctorInfo } from "@/data/content";

const LANG_FLAGS: Record<string, string> = {
  English: "🇬🇧",
  Tamil: "🇮🇳",
  Hindi: "🇮🇳",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AboutDoctor() {
  const [showVideo, setShowVideo] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Close video modal on Escape key
  useEffect(() => {
    if (!showVideo) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowVideo(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showVideo]);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid items-start gap-12 lg:grid-cols-12"
        >
          {/* Left: Photo + Video + Quick Stats */}
          <motion.div variants={item} className="lg:col-span-5">
            {/* Doctor Photo with Video Overlay */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-100 to-primary-50 shadow-xl shadow-primary-500/10">
                {/* Placeholder photo — replace /images/doctor.jpg with actual photo */}
                <div className="aspect-[3/4] bg-gradient-to-br from-primary-200 via-primary-100 to-white flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white/80 shadow-lg">
                      <User className="h-16 w-16 text-primary-400" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-primary-600">{doctorInfo.name}</p>
                    <p className="text-xs text-primary-400">Add /images/doctor.jpg</p>
                  </div>
                </div>
              </div>

              {/* Video Play Button Overlay */}
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/10"
                aria-label="Play doctor introduction video"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <Play className="h-7 w-7 text-primary-600 ml-0.5" />
                </motion.div>
              </button>

              {/* Experience Badge */}
              <div className="absolute -bottom-4 left-6 right-6">
                <div className="rounded-2xl bg-white p-4 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                      <ShieldCheck className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{doctorInfo.experience}</p>
                      <p className="text-xs text-gray-500">Trusted Care in Aesthetic Surgery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio + Timeline + Languages */}
          <motion.div variants={item} className="lg:col-span-7 lg:pt-4">
            {/* Header */}
            <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
              About the Doctor
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              {doctorInfo.name}
            </h2>
            <p className="mt-2 text-base font-medium text-primary-600">
              {doctorInfo.title}
            </p>

            {/* Bio */}
            <p className="mt-5 text-gray-600 leading-relaxed">
              {doctorInfo.bio}
            </p>

            {/* Languages with Flags */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Languages Spoken</h4>
              <div className="flex flex-wrap gap-2">
                {doctorInfo.languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 shadow-sm"
                  >
                    <span className="text-base">{LANG_FLAGS[lang] || "🌐"}</span>
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {doctorInfo.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-100"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* ─── Education Timeline ─── */}
            <div className="mt-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Education & Qualifications</h4>
              <div className="relative">
                {/* Vertical connecting line */}
                <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary-400 via-primary-300 to-gray-200" />

                <div className="space-y-5">
                  {doctorInfo.education.map((edu, index) => (
                    <div key={edu.degree} className="relative flex gap-4">
                      {/* Dot */}
                      <div className="relative z-10 mt-1.5">
                        <div className="h-3.5 w-3.5 rounded-full border-2 border-primary-400 bg-primary-500">
                          {index === 0 && (
                            <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-20" />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 rounded-xl bg-white p-4 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary-100">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-gray-900">{edu.degree}</p>
                            <p className="text-sm text-gray-500 mt-0.5">{edu.institution}</p>
                          </div>
                          {edu.year && (
                            <span className="shrink-0 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-600">
                              {edu.year}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <Calendar className="h-4 w-4" />
                Book Consultation
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300"
              >
                Full Profile
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Video Modal */}
        {showVideo && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowVideo(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Doctor introduction video"
          >
            <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close video"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="aspect-video rounded-2xl bg-gray-900 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Video coming soon — add your introduction video here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
