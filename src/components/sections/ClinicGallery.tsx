"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { clinicImages } from "@/data/content";

export default function ClinicGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % clinicImages.length;
    });
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + clinicImages.length) % clinicImages.length;
    });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
            Our Facility
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Healwell Clinic Gallery
          </h2>
          <p className="mt-3 text-gray-500">
            A modern, clean, and comfortable environment for your care
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clinicImages.map((image, index) => (
            <button
              key={image.src}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
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
                <p className="font-display text-lg font-semibold">{image.alt}</p>
                <p className="mt-1 text-sm text-gray-200">Click to enlarge</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
            autoFocus
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Previous image"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Next image"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={clinicImages[lightboxIndex].src}
              alt={clinicImages[lightboxIndex].alt}
              width={clinicImages[lightboxIndex].width}
              height={clinicImages[lightboxIndex].height}
              className="max-h-[85vh] rounded-lg object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-center text-lg font-semibold text-white">
                {clinicImages[lightboxIndex].alt}
              </p>
              <p className="text-center text-sm text-gray-300">
                {lightboxIndex + 1} / {clinicImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
