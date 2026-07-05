import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("max-w-screen-2xl mx-auto w-full px-4 sml:px-6 md:px-8", className)}>
      {children}
    </div>
  );
};

export default Container;
