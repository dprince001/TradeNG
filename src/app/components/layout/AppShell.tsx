import React from "react";
import SiteHeader from "@/app/components/layout/SiteHeader";
import SiteFooter from "@/app/components/layout/SiteFooter";
import BottomNavbar from "@/app/components/layout/BottomNavbar";
import { cn } from "@/lib/utils";
import { useGetMyBuyingOrdersQuery } from "@/app/redux/api/ordersApiSlice";
import useGet from "@/app/hooks/useGet";
import { useGetUnreadNotificationCountQuery } from "@/app/redux/api/notificationsApiSlice";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { useState } from "react";
import FilterOverlay from "@/app/(pages)/home/components/Filter";
import NotificationPanel from "@/app/components/layout/NotificationPanel";
import LoginRequiredModal from "@/app/components/auth/LoginRequiredModal";
import useAuthGuard from "@/app/hooks/useAuthGuard";

interface AppShellProps {
  children: React.ReactNode;
  showFooter?: boolean;
  showBottomNav?: boolean;
  className?: string;
  /** Locks the shell to the viewport height (no page scroll) so children can manage their own internal scroll areas — use for app-like screens such as chat. */
  fixedHeight?: boolean;
}

const AppShell = ({
  children,
  showFooter = true,
  showBottomNav = true,
  className,
  fixedHeight = false,
}: AppShellProps) => {
  const { isLoggedIn } = useCurrentUser();
  const [showFilter, setShowFilter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const { guard, promptOpen, closePrompt } = useAuthGuard("Sign in to start selling on TradeNG.");

  const { data: unreadData } = useGet(useGetUnreadNotificationCountQuery, "", isLoggedIn);
  const unreadCount = unreadData?.unread_count ?? 0;

  const { data: ordersData } = useGet(useGetMyBuyingOrdersQuery, "", isLoggedIn);
  const cartCount = ordersData?.orders?.length

  return (
    <div className={cn("flex flex-col w-full", fixedHeight ? "fixed inset-0 overflow-hidden" : "min-h-screen")}>

      {showFilter && <FilterOverlay onClose={() => setShowFilter(false)} />}
      {promptOpen && <LoginRequiredModal onClose={closePrompt} message="Sign in to start selling on TradeNG." />}
      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      <SiteHeader
        cartCount={cartCount}
        notificationCount={unreadCount}
        onNotificationClick={() => setShowNotifications(true)}
      />

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
