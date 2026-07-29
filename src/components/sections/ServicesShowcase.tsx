"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Zap, Heart, Scissors, User, ShieldCheck, Smile, MapPin, Clock, ArrowRight, Check, ChevronRight } from "lucide-react";
import { serviceCategories } from "@/data/content";

/* ─── Lucide Icons per category ─── */
const ICONS: Record<string, React.ReactNode> = {
  Face: <Sparkles className="h-7 w-7" />,
  Body: <Zap className="h-7 w-7" />,
  Breast: <Heart className="h-7 w-7" />,
  Hair: <Scissors className="h-7 w-7" />,
  Male: <User className="h-7 w-7" />,
  Skin: <ShieldCheck className="h-7 w-7" />,
  Intimate: <Smile className="h-7 w-7" />,
};

/* ─── Procedure Comparison Data ─── */
const COMPARISON_DATA = [
  {
    feature: "Best For",
    gynecomastia: "Male breast enlargement (glandular + fatty tissue)",
    liposuction: "Stubborn fat deposits (abdomen, thighs, arms, chin)",
  },
  {
    feature: "Technique",
    gynecomastia: "Liposuction + gland excision combo",
    liposuction: "Power-assisted / micro-cannula liposuction",
  },
  {
    feature: "Duration",
    gynecomastia: "1–2 hours",
    liposuction: "1–4 hours (area dependent)",
  },
  {
    feature: "Anesthesia",
    gynecomastia: "General or local with sedation",
    liposuction: "General or local with sedation",
  },
  {
    feature: "Recovery",
    gynecomastia: "2–3 days desk work, 3 weeks gym",
    liposuction: "3–5 days desk work, 4–6 weeks exercise",
  },
  {
    feature: "Results",
    gynecomastia: "Visible in 2–4 weeks, final at 3 months",
    liposuction: "Visible in 3–6 weeks, final at 6 months",
  },
  {
    feature: "Scarring",
    gynecomastia: "Minimal (hidden in chest crease)",
    liposuction: "Tiny puncture marks (fade over time)",
  },
  {
    feature: "Permanence",
    gynecomastia: "Permanent with stable weight",
    liposuction: "Permanent (fat cells removed)",
  },
];

/* ─── Mouse-tracking glow card ─── */
function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--glow-x", `${x}px`);
      cardRef.current.style.setProperty("--glow-y", `${y}px`);
    },
    [prefersReduced]
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-500 hover:border-primary-200 hover:shadow-xl ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle 200px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(62,113,178,0.12), transparent 70%) no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animated Icon Badge ─── */
function IconBadge({ category }: { category: string }) {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/30">
      {ICONS[category] || <Sparkles className="h-7 w-7" />}
      {/* Glow ring on hover */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-primary-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

/* ─── Main Component ─── */
export default function ServicesShowcase() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const displayedCategories = activeCategory
    ? serviceCategories.filter((c) => c.name === activeCategory)
    : serviceCategories;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: prefersReduced ? 0 : 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="section-padding bg-gray-50/80" id="services">
      <div className="container-custom mx-auto">
        {/* ─── Header ─── */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
            What We Offer
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Comprehensive aesthetic and plastic surgery treatments delivered with precision, safety, and care by Dr. Murali K.
          </p>
        </div>

        {/* ─── Category Filter Chips ─── */}
        <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter services by category">
          <button
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeCategory === null
                ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600"
            }`}
          >
            All
          </button>
          {serviceCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              aria-pressed={activeCategory === cat.name}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.name
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ─── Animated Service Cards Grid ─── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {displayedCategories.map((cat) => (
            <motion.div key={cat.name} variants={item}>
              <GlowCard className="flex h-full flex-col p-6">
                <div className="flex items-start gap-4">
                  <IconBadge category={cat.name} />
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-gray-900">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                      {cat.services.length} {cat.services.length === 1 ? "treatment" : "treatments"}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {cat.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-2.5 text-sm text-gray-600 group-hover:text-gray-700"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-500">
                        <Check className="h-3 w-3" />
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <Link
                    href={`/services#${cat.name.toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    Explore {cat.name}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Total Treatments Count ─── */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-semibold text-primary-500">
              {displayedCategories.reduce((sum, c) => sum + c.services.length, 0)}
            </span>{" "}
            treatments across{" "}
            <span className="font-semibold text-primary-500">{displayedCategories.length}</span>{" "}
            categories
          </p>
        </div>

        {/* ─── Procedure Comparison Table ─── */}
        <div className="mt-20">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
              Compare Procedures
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              Gynecomastia vs Liposuction
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Understanding the differences helps you make an informed decision about the right procedure for your needs.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg" role="region" aria-label="Procedure comparison table">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full" aria-label="Comparison between Gynecomastia and Liposuction procedures">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider w-1/4">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center w-[37.5%]">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">Gynecomastia</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center w-[37.5%]">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-500">
                          <Zap className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">Liposuction</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_DATA.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`transition-colors hover:bg-primary-50/30 ${
                        i < COMPARISON_DATA.length - 1 ? "border-b border-gray-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">
                        {row.gynecomastia}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">
                        {row.liposuction}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {COMPARISON_DATA.map((row) => (
                <div key={row.feature} className="p-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {row.feature}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-primary-50/50 p-3">
                      <p className="text-[10px] font-semibold text-primary-600 uppercase mb-1">Gynecomastia</p>
                      <p className="text-xs text-gray-700">{row.gynecomastia}</p>
                    </div>
                    <div className="rounded-xl bg-primary-50/50 p-3">
                      <p className="text-[10px] font-semibold text-primary-600 uppercase mb-1">Liposuction</p>
                      <p className="text-xs text-gray-700">{row.liposuction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Pricing Highlight Card ─── */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-gray-900 p-[2px]">
            <div className="relative rounded-[22px] bg-white p-8 sm:p-10">
              {/* Decorative orbs */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-100/40 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary-50/60 blur-2xl" />

              <div className="relative flex flex-col lg:flex-row items-center gap-8">
                {/* Left: Offer */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary-600 mb-4">
                    <Sparkles className="h-3.5 w-3.5" />
                    Special Offer
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
                    Stapler Circumcision
                  </h3>
                  <p className="mt-3 text-gray-500 max-w-lg">
                    A modern, safe, and virtually bloodless procedure. Quick 15-minute outpatient surgery with fast recovery and excellent cosmetic results.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4 justify-center lg:justify-start">
                    {[
                      "Minimally Invasive",
                      "No Stitches Required",
                      "Same-Day Discharge",
                    ].map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                      >
                        <Check className="h-3 w-3 text-primary-500" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Price */}
                <div className="flex shrink-0 flex-col items-center rounded-2xl bg-gray-50 px-8 py-6 text-center border border-gray-100">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">All-Inclusive Price</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-sm font-semibold text-gray-500">₹</span>
                    <span className="font-display text-5xl font-bold text-gray-900">20,000</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">Consultation included</p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── View All ─── */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5"
          >
            View All Services &amp; Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
