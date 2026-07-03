import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputOption {
  label: string;
  value: string | number;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  rightElement?: any;
  options?: InputOption[];
  value?: any;
  onChange?: (e: any) => void;
}

const Input = forwardRef<any, InputProps>(
  (
    {
      label,
      error,
      helperText,
      rightElement,
      className = "",
      type = "text",
      options,
      value,
      onChange,
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
              value={value}
              onChange={onChange}
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

    if (type === "select") {
      return (
        <div className="flex flex-col gap-1.5 w-full">
          {label && (
            <label className="text-sm font-medium text-text-primary">
              {label}
            </label>
          )}

          <div className="relative w-full">
            <select
              ref={ref}
              className={cn(
                "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary appearance-none bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-gray-50 disabled:text-gray-400",
                error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                className,
              )}
              value={value}
              onChange={onChange}
              {...(props as any)}
            >
              <option disabled value={""}>
                Select {label || "Option"}
              </option>

              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1D1E20"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {error && (
            <span className="text-xs text-red-500 font-medium">{error}</span>
          )}
          {helperText && !error && (
            <span className="text-xs text-text-secondary">{helperText}</span>
          )}
        </div>
      );
    }

    const inputElement = (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-gray-50 disabled:text-gray-400",
          rightElement && "pr-10",
          error &&
            "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className,
        )}
        value={value}
        onChange={onChange}
        {...props}
      />
    );

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}

        {rightElement ? (
          <div className="relative w-full">
            {inputElement}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
              {rightElement}
            </div>
          </div>
        ) : (
          inputElement
        )}

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
