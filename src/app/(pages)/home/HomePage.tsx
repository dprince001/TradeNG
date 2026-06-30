"use client";

import { useState } from "react";
import MenuIcon from "@/app/assets/svgs/home/MenuIcon";
import NotificationIcon from "@/app/assets/svgs/home/NotificationIcon";
import CartIcon from "@/app/assets/svgs/home/CartIcon";
import SearchIcon from "@/app/assets/svgs/home/SearchIcon";
import FilterIcon from "@/app/assets/svgs/home/FilterIcon";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import AddIcon from "@/app/assets/svgs/home/AddIcon";
import FilterOverlay from "@/app/(pages)/home/components/Filter";
import ProductCard from "@/app/(pages)/home/components/ProductCard";
import { useRouter } from "next/navigation";
import BottomNavbar from "@/app/components/layout/BottomNavbar";

const HomePage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  const categories = [
    { label: "Phones", emoji: "📱" },
    { label: "Fashion", emoji: "👕" },
    { label: "Home", emoji: "🏠" },
    { label: "Electronics", emoji: "💻" },
    { label: "Furniture", emoji: "🛋️" },
  ];

  const products = [
    {
      title: "iPhone 13 Pro Max",
      price: "₦450,000",
      store: "TechHub Store",
      negotiable: true,
    },
    {
      title: "iPhone 13 Pro Max",
      price: "₦450,000",
      store: "TechHub Store",
      negotiable: false,
    },
  ];

  return (
    <>
      {showFilter && <FilterOverlay onClose={() => setShowFilter(false)} />}

      <div className="w-full min-h-screen relative flex flex-col py-6 pb-24">
        {/* ── Nav ── */}
        <div className="flex items-center justify-between px-5 pb-1">
          <button className="w-[42px] h-[42px] rounded-full bg-gray-100 flex items-center justify-center">
            <MenuIcon />
          </button>
          <div className="flex items-center gap-2.5">
            <button className="w-[42px] h-[42px] rounded-full bg-gray-100 flex items-center justify-center">
              <NotificationIcon />
            </button>
            <button className="w-[42px] h-[42px] rounded-full bg-gray-100 flex items-center justify-center">
              <CartIcon />
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
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="flex flex-col flex-shrink-0 w-[74px] h-[78px] rounded-[12px] border border-gray-200 items-center justify-center text-[30px]"
              >
                {cat.emoji}
                <span className="text-[#374151] text-[10px] font-medium">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
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

          <div className="flex gap-3">
            {products.map((p, i) => (
              <ProductCard
                key={i}
                {...p}
                onClick={() => router.push("/item-detail")}
              />
            ))}
          </div>
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
