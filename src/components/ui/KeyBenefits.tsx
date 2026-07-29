interface BenefitItem {
  icon: string;
  title: string;
  description: string;
  color?: "blue" | "green" | "purple" | "orange";
}

interface KeyBenefitsProps {
  title?: string;
  items: BenefitItem[];
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-100 text-blue-600",
    border: "border-blue-100 hover:border-blue-200",
  },
  green: {
    bg: "bg-emerald-50",
    icon: "bg-emerald-100 text-emerald-600",
    border: "border-emerald-100 hover:border-emerald-200",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "bg-purple-100 text-purple-600",
    border: "border-purple-100 hover:border-purple-200",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "bg-orange-100 text-orange-600",
    border: "border-orange-100 hover:border-orange-200",
  },
};

export default function KeyBenefits({ title, items }: KeyBenefitsProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {title && (
        <h3 className="font-display text-xl font-bold text-gray-900 mb-6">{title}</h3>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => {
          const colors = colorMap[item.color || "blue"];
          return (
            <div
              key={index}
              className={`flex items-start gap-4 rounded-xl border ${colors.border} p-4 transition-all duration-200 hover:shadow-sm`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.icon} text-2xl`}>
                {item.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
