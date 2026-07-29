"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar } from "lucide-react";

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
        <Phone className="h-4 w-4" />
        Call Now
      </a>
      <Link
        href="/contact"
        className="flex items-center gap-2 rounded-full border-2 border-primary-600 bg-white px-5 py-3 text-sm font-medium text-primary-600 shadow-xl transition-all hover:bg-primary-50 hover:shadow-2xl hover:-translate-y-0.5"
      >
        <Calendar className="h-4 w-4" />
        Book
      </Link>
    </div>
  );
}
