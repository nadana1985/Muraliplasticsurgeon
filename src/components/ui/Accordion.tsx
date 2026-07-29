"use client";

import { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
  icon?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = true }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index} className="group">
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg transition-colors duration-200 group-hover:bg-primary-100">
                    {item.icon}
                  </span>
                )}
                <span className="font-display text-lg font-semibold text-gray-900">
                  {item.title}
                </span>
              </div>
              <svg
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-primary-500" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-2">
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
