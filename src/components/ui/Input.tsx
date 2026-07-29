import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      error,
      helperText,
      disabled = false,
      required = false,
      id,
      name,
      className,
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className={cn("relative w-full", className)}>
        <input
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          placeholder={placeholder || " "}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={cn(
            "peer block w-full rounded-xl border bg-white px-4 pb-2.5 pt-6 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2",
            "placeholder:text-transparent focus:placeholder:text-gray-400",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-300 hover:border-gray-400 focus:border-primary-500 focus:ring-primary-500/20"
          )}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-4 top-4.5 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-400 duration-200",
              "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400",
              "peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary-500",
              error && "text-red-400 peer-focus:text-red-500"
            )}
          >
            {label}
            {required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
        )}
        {error && (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;