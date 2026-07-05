import React from "react";
import SiteHeader from "@/app/components/layout/SiteHeader";
import SiteFooter from "@/app/components/layout/SiteFooter";
import BottomNavbar from "@/app/components/layout/BottomNavbar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  showFooter?: boolean;
  showBottomNav?: boolean;
  headerProps?: React.ComponentProps<typeof SiteHeader>;
  className?: string;
}

const AppShell = ({
  children,
  showFooter = true,
  showBottomNav = true,
  headerProps,
  className,
}: AppShellProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader {...headerProps} />

      <main className={cn("flex-1 w-full", showBottomNav && "pb-16 mdl:pb-0", className)}>
        {children}
      </main>

      {showFooter && <SiteFooter />}
      {showBottomNav && <BottomNavbar />}
    </div>
  );
};

export default AppShell;
