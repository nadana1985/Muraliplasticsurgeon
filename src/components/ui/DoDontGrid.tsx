interface DoDontItem {
  text: string;
}

interface DoDontGridProps {
  dos: DoDontItem[];
  donts: DoDontItem[];
}

export default function DoDontGrid({ dos, donts }: DoDontGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Do's */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="font-display text-lg font-bold text-emerald-800">Do&apos;s</h4>
        </div>
        <ul className="space-y-3">
          {dos.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[10px] font-bold text-emerald-700">
                ✓
              </span>
              <span className="text-sm text-emerald-900 leading-relaxed">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Don'ts */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h4 className="font-display text-lg font-bold text-red-800">Don&apos;ts</h4>
        </div>
        <ul className="space-y-3">
          {donts.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-[10px] font-bold text-red-700">
                ✕
              </span>
              <span className="text-sm text-red-900 leading-relaxed">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
