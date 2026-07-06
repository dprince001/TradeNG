import React from "react";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  children: React.ReactNode;
  heading?: string;
  subheading?: string;
  className?: string;
}

const AuthShell = ({
  children,
  heading = "Trade safely, sell smarter.",
  subheading = "Join thousands of buyers and sellers using TradeNG's escrow-protected, peer-to-peer marketplace.",
  className,
}: AuthShellProps) => {
  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden md:flex md:w-2/5 bg-brand-gradient items-center justify-center p-12 flex-shrink-0">
        <div className="max-w-sm">
          <span className="text-white font-bold text-xl tracking-tight">
            Trade<span className="text-white/70">NG</span>
          </span>
          <h2 className="text-white text-3xl font-bold mt-6 leading-tight">{heading}</h2>
          <p className="text-white/80 text-sm mt-4">{subheading}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sml:px-6 py-10 md:py-12 bg-[#F7F8FA] overflow-y-auto">
        <div className={cn("w-full max-w-md", className)}>{children}</div>
      </div>
    </div>
  );
};

export default AuthShell;
