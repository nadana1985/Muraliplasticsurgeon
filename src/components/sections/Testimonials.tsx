"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import { Star, BadgeCheck, Quote } from "lucide-react";
import { testimonials } from "@/data/content";

const PROCEDURE_FILTERS = [
  "All",
  ...Array.from(new Set(testimonials.map((t) => t.procedure).filter(Boolean) as string[])),
];

const averageRating =
  testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

/* ─── Star Rating ─── */
function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

/* ─── Verified Badge ─── */
function VerifiedBadge({ size = "md" }: { size?: "sm" | "md" }) {
  if (size === "sm") {
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-blue-500">
        <BadgeCheck className="h-2.5 w-2.5 fill-blue-500 text-white" />
        Verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
      <BadgeCheck className="h-3 w-3 fill-blue-500 text-white" />
      Google Verified
    </span>
  );
}

/* ─── Avatar Initial ─── */
function AvatarInitial({ name, avatar }: { name: string; avatar?: string }) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="h-10 w-10 rounded-full object-cover shadow-sm"
      />
    );
  }
  const initial = name.charAt(0).toUpperCase();
  const gradients = [
    "from-primary-400 to-primary-600",
    "from-emerald-400 to-emerald-600",
    "from-purple-400 to-purple-600",
    "from-amber-400 to-amber-600",
    "from-rose-400 to-rose-600",
  ];
  const idx = name.charCodeAt(0) % gradients.length;
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradients[idx]} text-sm font-semibold text-white shadow-sm`}
    >
      {initial}
    </div>
  );
}

/* ─── Featured Card (desktop: 2-col × 2-row span) ─── */
function FeaturedCard({ testimonial }: { testimonial: typeof testimonials[number] }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-white via-primary-50/30 to-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 md:col-span-2 md:row-span-2 sm:p-8 md:p-8">
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary-100/40 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-primary-200/30" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary-50/60 blur-2xl" />
      <div className="relative">
        {/* Quote icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-500">
          <Quote className="h-5 w-5" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {testimonial.procedure && (
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
              {testimonial.procedure}
            </span>
          )}
          {testimonial.verified && <VerifiedBadge />}
        </div>

        <blockquote className="mt-5 text-base leading-relaxed text-gray-700 italic sm:text-lg">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <div className="mt-4">
          <StarRating rating={testimonial.rating} />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <AvatarInitial name={testimonial.author} avatar={testimonial.avatar} />
          <div>
            <p className="font-semibold text-gray-900">{testimonial.author}</p>
            {testimonial.date && <p className="text-xs text-gray-400">{testimonial.date}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Compact Card (1 cell) ─── */
function CompactCard({ testimonial }: { testimonial: typeof testimonials[number] }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Quote icon */}
      <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-400">
        <Quote className="h-3.5 w-3.5" />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {testimonial.procedure && (
          <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-600">
            {testimonial.procedure}
          </span>
        )}
        {testimonial.verified && <VerifiedBadge size="sm" />}
      </div>

      <blockquote
        className="mt-3 flex-1 overflow-hidden text-sm leading-relaxed text-gray-600 italic"
        style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="mt-3">
        <StarRating rating={testimonial.rating} size="sm" />
      </div>

      <div className="mt-3 flex items-center gap-2.5 border-t border-gray-50 pt-3">
        <AvatarInitial name={testimonial.author} avatar={testimonial.avatar} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-900">{testimonial.author}</p>
          {testimonial.date && <p className="text-[10px] text-gray-400">{testimonial.date}</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: !prefersReducedMotion, align: "start", containScroll: "trimSnaps" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const filtered =
    activeFilter === "All" ? testimonials : testimonials.filter((t) => t.procedure === activeFilter);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); emblaApi.off("reInit", onSelect); };
  }, [emblaApi, onSelect]);

  // Re-init carousel when filter changes to reset scroll position and dots
  useEffect(() => {
    if (!emblaApi) return;
    requestAnimationFrame(() => {
      emblaApi.reInit();
      setSelectedIndex(0);
      setScrollSnaps(emblaApi.scrollSnapList());
    });
  }, [activeFilter, emblaApi]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom mx-auto">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
            Testimonials
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Patient Testimonials
          </h2>
          <p className="mt-3 text-gray-500">Real stories from our satisfied patients</p>
        </div>

        {/* Filter Chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter testimonials by procedure">
          {PROCEDURE_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              aria-label={`Filter by ${filter}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-gray-400">No testimonials found for this procedure.</p>
        )}

        {/* Desktop: Bento Grid */}
        {filtered.length > 0 && (
          <div className="mt-10 hidden md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {featured && <FeaturedCard testimonial={featured} />}
            {rest.slice(0, 5).map((t) => (
              <CompactCard key={t.author} testimonial={t} />
            ))}
          </div>
        )}

        {/* Mobile: Embla Carousel */}
        {filtered.length > 0 && (
          <div className="mt-10 md:hidden">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {filtered.slice(0, 6).map((testimonial) => (
                  <div key={testimonial.author} className="min-w-0 flex-[0_0_85%] pl-4">
                    <CompactCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full ${prefersReducedMotion ? "" : "transition-all duration-300"} ${
                    i === selectedIndex ? "w-8 bg-primary-500" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Google rating summary */}
        <div            className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="font-medium text-gray-700">{averageRating.toFixed(1)}</span>
          <span>·</span>
          <span>Verified by Google Reviews</span>
        </div>
      </div>
    </section>
  );
}
