"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, Sparkles, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SearchResult {
  type: "service" | "blog";
  title: string;
  description: string;
  href: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Reset query and close on route change
  useEffect(() => {
    setQuery("");
    setResults([]);
    onClose();
  }, [pathname]);

  // Key listeners: Cmd+K/Ctrl+K to open, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Perform search queries
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Failed to query search:", err);
      } finally {
        setLoading(false);
      }
    }, 250); // 250ms debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto p-4 pt-[15vh] sm:p-6 lg:p-20">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal content box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative mx-auto max-w-2xl transform divide-y divide-gray-100 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all"
            role="dialog"
            aria-modal="true"
            aria-label="Search site content"
          >
            {/* Input row */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-4.5 h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search procedures, blogs, or advice... (Gynecomastia, Rhinoplasty...)"
                className="h-14 w-full border-0 bg-transparent pl-12 pr-12 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-3.5 flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close search"
              >
                <X className="h-4.5 w-4.5 text-gray-500" />
              </button>
            </div>

            {/* Results section */}
            <div className="max-h-80 scroll-py-2 overflow-y-auto p-2">
              {loading && (
                <div className="flex items-center justify-center py-12 text-gray-500 gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
                  <span>Searching site content...</span>
                </div>
              )}

              {!loading && results.length > 0 && (
                <ul className="text-sm text-gray-700 space-y-1">
                  {results.map((item, index) => (
                    <li key={`${item.href}-${index}`}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 select-none transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600">
                          {item.type === "service" ? (
                            <Sparkles className="h-4 w-4 text-primary-500" />
                          ) : (
                            <FileText className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="font-medium truncate">{item.title}</p>
                          <p className="text-xs text-gray-400 truncate">{item.description}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {!loading && query && results.length === 0 && (
                <div className="py-14 text-center sm:px-14">
                  <p className="text-sm text-gray-500">No results found for &ldquo;{query}&rdquo;.</p>
                  <p className="mt-1.5 text-xs text-gray-400">Try searching for other terms like &ldquo;Lipo&rdquo;, &ldquo;Glands&rdquo;, or &ldquo;Recovery&rdquo;.</p>
                </div>
              )}

              {!query && (
                <div className="py-8 text-center text-xs text-gray-400">
                  Type to search blogs, facilities, and aesthetics offerings...
                </div>
              )}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between bg-gray-50 px-4 py-2.5 text-xs text-gray-400 rounded-b-2xl">
              <span>Press <kbd className="font-semibold text-gray-500">ESC</kbd> to close.</span>
              <span>Quick Search Overlay v1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
