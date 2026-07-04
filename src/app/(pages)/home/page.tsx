"use client";

import { useState } from "react";
import MenuIcon from "@/app/assets/svgs/home/MenuIcon";
import NotificationIcon from "@/app/components/layout/NotificationIconComponent";
import CartIcon from "@/app/components/layout/CartIcon";
import SearchIcon from "@/app/assets/svgs/home/SearchIcon";
import FilterIcon from "@/app/assets/svgs/home/FilterIcon";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import AddIcon from "@/app/assets/svgs/home/AddIcon";
import FilterOverlay from "@/app/(pages)/home/components/Filter";
import ProductCard from "@/app/(pages)/home/components/ProductCard";
import { useRouter } from "next/navigation";
import BottomNavbar from "@/app/components/layout/BottomNavbar";
import NotificationPanel, { NotificationItem } from "@/app/components/layout/NotificationPanel";
import useGet from "@/app/hooks/useGet";
import { useGetCategoriesQuery } from "@/app/redux/api/categoriesApiSlice";
import { useGetListingsQuery } from "@/app/redux/api/listingApiSlice";
import Image from "next/image";
import { CategorySkeleton, ListingSkeleton } from "@/app/components/Loader";

const HomePage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();
  const { data: categoriesData, isFetching: categoriesLoading } = useGet(useGetCategoriesQuery, "");
  const { data: listingsData, isFetching: listingsLoading } = useGet(useGetListingsQuery, "");


  const [notifications, setNotifications] = useState<NotificationItem[]>([
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
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const mockCategories = [
    { label: "Phones", emoji: "📱" },
    { label: "Gadgets", emoji: "📱" },
    { label: "Fashion", emoji: "👕" },
    { label: "Home", emoji: "🏠" },
    { label: "Electronics", emoji: "💻" },
    { label: "Furniture", emoji: "🛋️" },
    { label: "Others", emoji: "-" },
  ];

  const categories = categoriesData?.categories?.map((cat: any) => {
    return {
      label: cat.name,
      emoji: mockCategories.find((c: any) => c.label === cat.name)?.emoji || "",
    };
  });

  console.log(categories);


  return (
    <>
      {showFilter && <FilterOverlay onClose={() => setShowFilter(false)} />}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDeleteNotification}
      />

      <div className="w-full min-h-screen relative flex flex-col py-6 pb-24">
        {/* ── Nav ── */}
        <div className="flex items-center justify-between px-5 pb-1">
          <button className="w-[42px] h-[42px] rounded-full bg-gray-100 flex items-center justify-center">
            <MenuIcon />
          </button>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowNotifications(true)}
              className="w-[42px] h-[42px] rounded-full bg-gray-100 flex items-center justify-center relative hover:scale-105 active:scale-95 transition-transform"
            >
              <NotificationIcon color="#1D1E20" count={unreadCount} />
            </button>
            <button
              onClick={() => router.push("/confirm-order")}
              className="w-[42px] h-[42px] rounded-full bg-gray-100 flex items-center justify-center relative hover:scale-105 active:scale-95 transition-transform"
            >
              <CartIcon color="#1D1E20" count={1} />
            </button>
          </div>
        </div>

        <div className="px-5 pt-5 mb-8">
          <h1 className="text-text-primary text-2xl font-semibold leading-tight">
            Olamilekan
          </h1>
          <p className="text-text-secondary text-sm mt-0.5">
            Welcome to TradeNG.
          </p>
        </div>

        {/* ── Search and filter ── */}
        <div className="px-5 flex gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2.5 bg-[#F5F6FA] rounded-lg px-4 py-3.5">
            <SearchIcon />
            <span className="text-text-secondary">Search...</span>
          </div>

          <button
            onClick={() => setShowFilter(true)}
            className="w-[50px] h-[50px] rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 bg-primary"
          >
            <FilterIcon />
          </button>
        </div>

        {/* ── Categories ── */}
        <div className="px-5 mb-5">
          {categoriesLoading ? (
            <CategorySkeleton />
          ) : (
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {/* {categoriesData?.categories?.map((cat: any) => (
                <div
                  key={cat.id}
                  className="flex flex-col flex-shrink-0 w-[74px] h-[78px] rounded-[12px] border border-gray-200 items-center justify-center text-[30px]"
                >
                  <div className="max-h-[32px] max-w-[24px] relative">
                    <img src={cat?.image} alt="category image" className="object-contain" />
                  </div>

                  <span className="text-[#374151] text-[10px] font-medium">
                    {cat.name}
                  </span>
                </div>
              ))} */}

              {categories?.map((cat: any) => (
                <div
                  key={cat.id}
                  className="flex flex-col flex-shrink-0 w-[74px] h-[78px] rounded-[12px] border border-gray-200 items-center justify-center text-[30px]"
                >
                  {cat.emoji}
                  <span className="text-[#374151] text-[10px] font-medium">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Safe Escrow Banner ── */}
        <div className="px-5 mb-5">
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(100deg, #0D0500 0%, #7A1E00 45%, #C03300 100%)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <div>
                <p className="text-white text-[15px] font-bold leading-snug">
                  Buy Safely with Escrow
                </p>
                <p className="text-white/65 text-xs mt-1">
                  Your money is protected until delivery
                </p>
              </div>
              <SecureIcon color="white" />
            </div>
          </div>
        </div>

        {/* ── Featured Items ── */}
        <div className="px-5 mb-2">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-text-primary text-sm font-medium">
              Featured Item
            </h2>

            <button className="text-text-secondary text-xs">View All</button>
          </div>

          {listingsLoading ? (
            <ListingSkeleton />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {listingsData?.listings?.map((p: any, i: number) => (
                <ProductCard
                  key={i}
                  {...p}
                  onClick={() => router.push(`/${p.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ─Add Item Button ── */}
        <div className="absolute bottom-24 right-5 z-40">
          <button
            onClick={() => router.push("/list-item")}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            <AddIcon />
          </button>
        </div>

        {/* ── Bottom Navigation Bar ── */}
        <BottomNavbar />
      </div>
    </>
  );
};

export default HomePage;
