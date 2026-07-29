"use client";

interface KeyTakeawaysProps {
  title?: string;
  items: string[];
}

export default function KeyTakeaways({ title = "Key Takeaways", items }: KeyTakeawaysProps) {
  return (
    <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-xl">
          💡
        </div>
        <h3 className="font-display text-lg font-bold text-primary-900">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
              {index + 1}
            </span>
            <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
