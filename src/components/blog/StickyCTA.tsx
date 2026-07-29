"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (roughly 400px)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 sm:flex-row">
      <a
        href="tel:+918072582121"
        className="flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-medium text-white shadow-xl transition-all hover:bg-primary-700 hover:shadow-2xl hover:-translate-y-0.5"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Now
      </a>
      <Link
        href="/contact"
        className="flex items-center gap-2 rounded-full border-2 border-primary-600 bg-white px-5 py-3 text-sm font-medium text-primary-600 shadow-xl transition-all hover:bg-primary-50 hover:shadow-2xl hover:-translate-y-0.5"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Book
      </Link>
    </div>
  );
}
