import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  alignment = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        alignment === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}