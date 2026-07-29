"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import ReactCompareImage from "react-compare-image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { ChevronsUpDown, ZoomIn, Image as ImageIcon, Film, Eye } from "lucide-react";
import { clinicImages } from "@/data/content";

/* ─── Before/After pairs ─── */
// TODO: Replace with actual patient procedure before/after photos
const beforeAfterPairs = [
  {
    before: "/images/clinic/reception.jpg",
    after: "/images/clinic/consulting-room.jpg",
    label: "Clinic Interior — Before & After Renovation",
  },
  {
    before: "/images/clinic/outdoor.jpg",
    after: "/images/clinic/reception.jpg",
    label: "Entrance → Reception Area",
  },
];

/* ─── Categories ─── */
const CATEGORIES = ["All", "Reception", "Rooms", "Equipment", "Before/After"];

const categoryMap: Record<string, string> = {
  "/images/clinic/reception.jpg": "Reception",
  "/images/clinic/consulting-room.jpg": "Rooms",
  "/images/clinic/outdoor.jpg": "Equipment",
};

export default function ClinicGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const galleryRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? clinicImages
        : clinicImages.filter((img) => categoryMap[img.src] === activeCategory),
    [activeCategory]
  );

  /* ─── PhotoSwipe init ─── */
  useEffect(() => {
    if (!galleryRef.current) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: "a[data-pswp]",
      pswpModule: () => import("photoswipe"),
    });

    // PhotoSwipe handles image counter UI automatically

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, [filtered.length]);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-500">Our Facility</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Healwell Clinic Gallery
          </h2>
          <p className="mt-3 text-gray-500">A modern, clean, and comfortable environment for your care</p>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ─── Before/After Section ─── */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
            <h3 className="font-display text-xl font-semibold text-gray-900">Before & After</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {beforeAfterPairs.map((pair, i) => (
              <div key={i} className="group rounded-2xl border border-gray-100 bg-gray-50 p-3 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="overflow-hidden rounded-xl">
                  <ReactCompareImage
                    leftImage={pair.before}
                    rightImage={pair.after}
                    sliderPositionPercentage={0.5}
                    skeleton={
                      <div className="flex h-[250px] items-center justify-center bg-gray-100">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
                      </div>
                    }
                    handle={
                      <div className="flex h-full w-1 items-center justify-center bg-white shadow-lg">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg">
                          <ChevronsUpDown className="h-5 w-5" />
                        </div>
                      </div>
                    }
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-2">
                  <p className="text-sm font-medium text-gray-700">{pair.label}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-500">Drag to compare</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Masonry Gallery Grid (PhotoSwipe) ─── */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
            <h3 className="font-display text-xl font-semibold text-gray-900">Clinic Tour</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
          </div>

          <div
            ref={galleryRef}
            id="clinic-gallery"
            className="grid grid-cols-2 gap-4 md:grid-cols-3 auto-rows-[200px]"
          >
            {filtered.map((image, index) => (
              <a
                key={image.src}
                href={image.src}
                data-pswp-width={image.width}
                data-pswp-height={image.height}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-2xl shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 row-span-1"
              >
                <div className="h-full overflow-hidden bg-gray-100 relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="font-display text-lg font-semibold">{image.alt}</p>
                  <p className="mt-1 text-sm text-gray-200 flex items-center gap-1">
                    <ZoomIn className="h-3.5 w-3.5" />
                    Click to enlarge
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <ImageIcon className="h-4 w-4 text-primary-400" />
            {clinicImages.length} Photos
          </span>
          <span className="flex items-center gap-1.5">
            <Film className="h-4 w-4 text-primary-400" />
            {beforeAfterPairs.length} Comparisons
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-primary-400" />
            Pinch-to-Zoom
          </span>
        </div>
      </div>
    </section>
  );
}
