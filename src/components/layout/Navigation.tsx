"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigationLinks, siteBranding, clinicPhoneHref, clinicPhoneFormatted } from "@/data/content";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-gray-100 bg-white/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "border-transparent bg-white"
      }`}
    >
      <nav className="container-custom mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Dr. Murali. K - Home"
        >
          <div className="relative">
            <Image
              src={siteBranding.logoUrl}
              alt={siteBranding.logoAlt}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full ring-2 ring-primary-500/20 transition-all duration-300 group-hover:ring-primary-500/40" />
          </div>
          <span className="font-display text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary-600">
            {siteBranding.siteTitle}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-primary-600 rounded-lg hover:bg-primary-50"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={clinicPhoneHref}
            className="btn-primary ml-2 text-sm"
          >
            📞 Book Appointment
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="relative md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <div className="relative h-6 w-6">
            {/* Hamburger icon with X animation */}
            <span
              className={`absolute left-0 top-0 h-[2px] w-6 bg-gray-700 transition-all duration-300 ease-in-out ${
                isOpen ? "translate-y-[11px] rotate-45" : "translate-y-0 rotate-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[11px] h-[2px] w-6 bg-gray-700 transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-6 bg-gray-700 transition-all duration-300 ease-in-out ${
                isOpen ? "translate-y-[-11px] -rotate-45" : "translate-y-0 rotate-0"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed left-0 right-0 top-[73px] z-50 md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
        role="menu"
        aria-hidden={!isOpen}
      >
        <div className="bg-white border-b border-gray-100 shadow-lg">
          <div className="container-custom mx-auto px-4 py-4 sm:px-6">
            {navigationLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-3 transition-all duration-200"
                onClick={() => setIsOpen(false)}
                role="menuitem"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={clinicPhoneHref}
              className="btn-primary mt-4 w-full text-sm text-center block"
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              📞 {clinicPhoneFormatted}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
