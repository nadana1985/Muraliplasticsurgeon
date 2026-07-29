"use client";

import { statsData } from "@/data/content";
import { useInView } from "@/hooks/useInView";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const count = useAnimatedCounter({ end: value, duration: 2000, isInView });

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl font-bold text-primary-500 sm:text-4xl">
        {count}{suffix}
      </div>
      <div className="mt-1 text-sm text-gray-500">{label}</div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-white py-12">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statsData.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
