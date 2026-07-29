"use client";

import { useState } from "react";

interface MythFactItem {
  myth: string;
  fact: string;
}

interface MythFactCardProps {
  items: MythFactItem[];
}

export default function MythFactCard({ items }: MythFactCardProps) {
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isRevealed = revealedIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
              isRevealed
                ? "border-emerald-200 bg-white shadow-lg"
                : "border-gray-200 bg-white shadow-sm hover:shadow-md"
            }`}
          >
            {/* Myth */}
            <div className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-xl">
                ❌
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">Myth</span>
                <p className="mt-1 font-medium text-gray-900">{item.myth}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative px-5">
              <div className="absolute inset-x-5 top-0 border-t border-dashed border-gray-200" />
              <div className="flex justify-center -mt-px">
                <button
                  onClick={() => setRevealedIndex(isRevealed ? null : index)}
                  className="relative z-10 bg-white px-4 py-1 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                >
                  {isRevealed ? "Hide Fact ▲" : "Reveal Fact ▼"}
                </button>
              </div>
            </div>

            {/* Fact */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isRevealed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex items-center gap-4 p-5 pt-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                    ✅
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Fact</span>
                    <p className="mt-1 text-gray-600 leading-relaxed">{item.fact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
