import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "none";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-primary text-white hover:bg-primary/95 shadow-sm",
      secondary: "bg-gray-100 text-text-primary hover:bg-gray-200/80",
      outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
      ghost: "bg-transparent text-text-primary hover:bg-gray-100",
      none: "",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-3 text-sm",
      lg: "px-6 py-4 text-base",
      icon: "w-10 h-10 p-0 rounded-full",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`${variant !== "none" ? baseStyles : ""} ${variants[variant]} ${variant !== "none" ? sizes[size] : ""} ${widthClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
