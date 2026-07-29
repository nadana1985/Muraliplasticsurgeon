"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle, Search } from "lucide-react";
import { navigationLinks, siteBranding, clinicPhoneHref, clinicPhoneFormatted } from "@/data/content";
import SearchModal from "../search/SearchModal";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      {/* ─── Desktop: Floating Pill (md+) ─── */}
      <motion.header
        initial={false}
        animate={{
          y: isScrolled ? 12 : 0,
          scale: isScrolled ? 0.95 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
              isScrolled
                ? "bg-white/80 shadow-xl shadow-black/5 backdrop-blur-xl border border-white/20"
                : "bg-white/95 shadow-sm border border-transparent"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5" aria-label="Dr. Murali. K - Home">
              <motion.div
                animate={{ scale: isScrolled ? 0.85 : 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <Image
                  src={siteBranding.logoUrl}
                  alt={siteBranding.logoAlt}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </motion.div>
              <motion.span
                animate={{ fontSize: isScrolled ? "0.9rem" : "1.1rem" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="font-display font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary-600"
              >
                {siteBranding.siteTitle}
              </motion.span>
            </Link>

            {/* Nav Links with layoutId indicator */}
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              {navigationLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      isActive ? "text-primary-600" : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-primary-50"
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Search + Pulsing Book CTA */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-primary-600 transition-colors shadow-sm"
                aria-label="Search site content (Cmd+K)"
              >
                <Search className="h-4.5 w-4.5" />
              </button>

              <a
                href={clinicPhoneHref}
                className="relative group overflow-hidden rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25"
              >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-xl border-2 border-primary-400 animate-pulse opacity-20 motion-reduce:animate-none" />
                <span className="relative flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Book Now
                </span>
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile: Standard sticky header ─── */}
      <header className="sticky top-0 z-50 md:hidden border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <nav className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Dr. Murali. K - Home">
            <Image
              src={siteBranding.logoUrl}
              alt={siteBranding.logoAlt}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-display text-lg font-semibold text-gray-900">
              {siteBranding.siteTitle}
            </span>
          </Link>

          <div className="flex items-center gap-1.5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 hover:text-primary-600 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
              className="relative h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="relative h-5 w-5">
                <span className={`absolute left-0 top-0 h-[2px] w-5 bg-gray-700 transition-all duration-300 ${isOpen ? "translate-y-[9px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[9px] h-[2px] w-5 bg-gray-700 transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`absolute left-0 bottom-0 h-[2px] w-5 bg-gray-700 transition-all duration-300 ${isOpen ? "translate-y-[-9px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* ─── iOS-Style Mobile Drawer ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-[85vw] max-w-[280px] bg-white shadow-2xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex h-full flex-col">
                {/* Drawer header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={siteBranding.logoUrl}
                      alt={siteBranding.logoAlt}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="font-display text-base font-semibold text-gray-900">
                      {siteBranding.siteTitle}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Nav links with stagger */}
                <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
                  <div className="space-y-1">
                    {navigationLinks.map((item, index) => {
                      const isActive = pathname === item.href;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          <Link
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? "bg-primary-50 text-primary-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                            }`}
                          >
                            {isActive && (
                              <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                            )}
                            <span className={isActive ? "" : "ml-[10px]"}>{item.label}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* Drawer footer CTA */}
                <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                  <a
                    href={clinicPhoneHref}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-600"
                  >
                    <Phone className="h-4 w-4" />
                    Call: {clinicPhoneFormatted}
                  </a>
                  <a
                    href="https://wa.me/918072582121"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-medium text-green-700 transition-all duration-300 hover:bg-green-100"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
