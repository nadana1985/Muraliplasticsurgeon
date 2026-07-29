interface StepItem {
  step: number;
  title: string;
  description?: string;
  icon?: string;
}

interface StepTimelineProps {
  title?: string;
  steps: StepItem[];
}

export default function StepTimeline({ title, steps }: StepTimelineProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {title && (
        <h3 className="font-display text-xl font-bold text-gray-900 mb-6">{title}</h3>
      )}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-primary-200" />
        
        <div className="space-y-6">
          {steps.map((item, index) => (
            <div key={index} className="relative flex gap-4">
              {/* Step number circle */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white font-bold shadow-lg">
                {item.icon || item.step}
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-2">
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                {item.description && (
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
