import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export default function IconButton({
  icon,
  ariaLabel,
  onClick,
  disabled = false,
  size = "md",
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center rounded-xl text-gray-600 transition-all duration-200",
        "hover:bg-gray-100 hover:text-gray-900",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeStyles[size],
        className
      )}
    >
      {icon}
    </button>
  );
}