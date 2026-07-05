"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/app/components/layout/AppShell";
import AddIcon from "@/app/assets/svgs/home/AddIcon";
import FilterOverlay from "@/app/(pages)/home/components/Filter";
import NotificationPanel, { NotificationItem } from "@/app/components/layout/NotificationPanel";
import HeroSection from "@/app/(pages)/home/components/HeroSection";
import CategoryRail from "@/app/(pages)/home/components/CategoryRail";
import EscrowBanner from "@/app/(pages)/home/components/EscrowBanner";
import FeaturedListings from "@/app/(pages)/home/components/FeaturedListings";
import TopSellers from "@/app/(pages)/home/components/TopSellers";
import useAuthGuard from "@/app/hooks/useAuthGuard";
import LoginRequiredModal from "@/app/components/auth/LoginRequiredModal";

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "New Offer Received",
    message: "You received a new offer of ₦420,000 on iPhone 13 Pro Max",
    time: "2 mins ago",
    unread: true,
    type: "offer",
  },
  {
    id: 2,
    title: "Order Confirmed",
    message: "Your payment for Nike Air Max was successfully processed.",
    time: "1 hour ago",
    unread: true,
    type: "success",
  },
  {
    id: 3,
    title: "Get Verified",
    message: "Verify your profile to unlock premium escrow protection badge.",
    time: "2 days ago",
    unread: false,
    type: "info",
  },
];

const HomePage = () => {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const { guard, promptOpen, closePrompt } = useAuthGuard("Sign in to start selling on TradeNG.");

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <>
      {showFilter && <FilterOverlay onClose={() => setShowFilter(false)} />}
      {promptOpen && <LoginRequiredModal onClose={closePrompt} message="Sign in to start selling on TradeNG." />}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDeleteNotification}
      />

      <AppShell
        headerProps={{
          cartCount: 1,
          notificationCount: unreadCount,
          onNotificationClick: () => setShowNotifications(true),
        }}
      >
        <HeroSection />
        <CategoryRail />
        <EscrowBanner />
        <FeaturedListings />
        <TopSellers />
      </AppShell>

      <button
        onClick={() => guard(() => router.push("/list-item"))}
        className="fixed bottom-20 right-5 mdl:bottom-8 mdl:right-8 z-40 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        aria-label="Add item"
      >
        <AddIcon />
      </button>
    </>
  );
};

export default HomePage;
