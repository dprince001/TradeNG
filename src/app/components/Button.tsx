import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "brand-outline"
    | "destructive"
    | "destructive-outline"
    | "ghost"
    | "link"
    | "none";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      loading,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary/95 shadow-sm active:bg-primary/90",
      secondary:
        "bg-gray-100 text-text-primary hover:bg-gray-200/80 active:bg-gray-200",
      outline:
        "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100",
      "brand-outline":
        "bg-white border-2 border-primary text-primary hover:bg-[#FFF5F3]/50 font-bold",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 shadow-sm active:bg-red-800",
      "destructive-outline":
        "bg-white border border-red-500 text-red-500 hover:bg-red-50 font-bold",
      ghost:
        "bg-transparent text-text-primary hover:bg-gray-100 active:bg-gray-200",
      link: "bg-transparent text-primary hover:underline underline-offset-4 font-normal p-0 h-auto",
      none: "",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-3 text-sm",
      lg: "px-6 py-4 text-base",
      icon: "w-10 h-10 p-0 rounded-full",
    };

    return (
      <button
        ref={ref}
        disabled={loading}
        className={cn(
          variant !== "none" && baseStyles,
          variants[variant],
          variant !== "none" && sizes[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
