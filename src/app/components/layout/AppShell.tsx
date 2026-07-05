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
  /** Locks the shell to the viewport height (no page scroll) so children can manage their own internal scroll areas — use for app-like screens such as chat. */
  fixedHeight?: boolean;
}

const AppShell = ({
  children,
  showFooter = true,
  showBottomNav = true,
  headerProps,
  className,
  fixedHeight = false,
}: AppShellProps) => {
  return (
    <div className={cn("flex flex-col", fixedHeight ? "h-dvh overflow-hidden" : "min-h-screen")}>
      <SiteHeader {...headerProps} />

      <main
        className={cn(
          "flex-1 w-full min-h-0",
          fixedHeight && "overflow-hidden",
          showBottomNav && "pb-16 mdl:pb-0",
          className
        )}
      >
        {children}
      </main>

      {showFooter && <SiteFooter />}
      {showBottomNav && <BottomNavbar />}
    </div>
  );
};

export default AppShell;
