import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  className?: string;
}

const paddingStyles = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  padding = "md",
  hover = false,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-100 bg-white shadow-sm",
        "transition-all duration-300",
        hover && "hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5",
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}