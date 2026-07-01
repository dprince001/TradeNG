import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      rightElement,
      className = "",
      type = "text",
      ...props
    },
    ref,
  ) => {
    const isCheckbox = type === "checkbox";

    if (isCheckbox) {
      return (
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              ref={ref}
              className={cn(
                "w-4 h-4 rounded border border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer",
                className,
              )}
              {...props}
            />
            {label && (
              <span className="text-sm text-text-primary font-medium">
                {label}
              </span>
            )}
          </label>

          {error && (
            <span className="text-xs text-red-500 font-medium">{error}</span>
          )}
          {helperText && !error && (
            <span className="text-xs text-text-secondary">{helperText}</span>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}

        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-gray-50 disabled:text-gray-400",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 font-medium">{error}</span>
        )}
        {helperText && !error && (
          <span className="text-xs text-text-secondary">{helperText}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
