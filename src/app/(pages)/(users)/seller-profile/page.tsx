"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import coverImg from "@/app/assets/images/seller_cover.png";
import avatarImg from "@/app/assets/images/seller_avatar.png";
import airpodsImg from "@/app/assets/images/airpods.png";
import macbookImg from "@/app/assets/images/macbook.png";
import headphonesImg from "@/app/assets/images/headphones.png";
import iphoneImg from "@/app/assets/images/IphoneImage.png";
import Image from "next/image";
import ProductCard from "../../home/components/ProductCard";
import ProgressBar from "@/app/components/ProgressBar";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";

const SellerProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"listings" | "reviews" | "about">(
    "listings",
  );
  const [isSellerFavorited, setIsSellerFavorited] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    airpods: false,
    iphone: false,
    macbook: false,
    sony: false,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleFavoriteItem = (id: string) => {
    setFavorites((prev) => {
      const nextVal = !prev[id];
      triggerToast(
        nextVal ? "Added item to Favourites!" : "Removed item from Favourites.",
      );
      return { ...prev, [id]: nextVal };
    });
  };

  const toggleSellerFavorite = () => {
    setIsSellerFavorited((prev) => {
      const nextVal = !prev;
      triggerToast(
        nextVal
          ? "Saved Sarah Johnson to Favourites!"
          : "Removed seller from Favourites.",
      );
      return nextVal;
    });
  };

  const sellerProducts = [
    {
      id: "airpods",
      title: "Apple AirPods Pro 2nd Gen",
      price: "₦45,000",
      negotiable: true,
      image: airpodsImg.src,
      location: "Lagos",
      verified: true,
    },
    {
      id: "iphone",
      title: "iPhone 13 Pro Max 256GB",
      price: "₦320,000",
      negotiable: false,
      image: iphoneImg.src,
      location: "Lagos",
      verified: true,
    },
    {
      id: "macbook",
      title: "MacBook Air M1 2020",
      price: "₦450,000",
      negotiable: true,
      image: macbookImg.src,
      location: "Lagos",
      verified: true,
    },
    {
      id: "sony",
      title: "Sony WH-1000XM4 Headphones",
      price: "₦85,000",
      negotiable: false,
      image: headphonesImg.src,
      location: "Lagos",
      verified: true,
    },
  ];

  const sellerReviews = [
    {
      author: "Michael Chen",
      rating: 5,
      date: "2 days ago",
      content:
        "Great seller! Item exactly as described. Fast shipping and excellent communication.",
      boughtItem: "AirPods Pro",
      avatar: "MC",
    },
    {
      author: "Amaka Obi",
      rating: 5,
      date: "1 week ago",
      content:
        "Very professional seller. The MacBook was in perfect condition. Highly recommend!",
      boughtItem: "MacBook Air M1",
      avatar: "AO",
    },
    {
      author: "David Okafor",
      rating: 4,
      date: "2 weeks ago",
      content:
        "Good experience overall. Item was as described but delivery took a bit longer than expected.",
      boughtItem: "iPhone 13 Pro",
      avatar: "DO",
    },
  ];

  // Helper star renderer
  const renderStars = (rating: number, size = 12) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={star <= rating ? "#F59E0B" : "none"}
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <AppShell showFooter={false} showBottomNav={false}>
    <div className="w-full bg-[#F9FAFB] flex flex-col relative select-none pb-8">
      {/* ── Toast Alert ── */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs font-semibold py-3 rounded-full shadow-lg z-50 animate-slideDown flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF4304"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {toastMessage}
        </div>
      )}

      {/* ── Header Cover Image ── */}
      <div className="relative w-full h-[160px] md:h-[220px] bg-gray-200">
        <Image
          height={10}
          width={10}
          src={coverImg.src}
          alt="Seller Cover"
          className="w-full h-full object-cover grayscale brightness-90"
        />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
          aria-label="Back"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1D1E20"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      </div>

      {/* ── Profile Details Overlapping Card ── */}
      <Container className="max-w-5xl -mt-10 relative z-10 md:grid md:grid-cols-3 md:gap-8 md:items-start">
      <div className="flex flex-col items-center md:col-span-1">
        {/* Avatar */}
        <div className="w-[88px] h-[88px] rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
          <Image
            height={10}
            width={10}
            src={avatarImg.src}
            alt="Sarah Johnson"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="text-center space-y-2 mt-3">
          <h1 className="text-lg font-extrabold text-[#1D1E20] leading-none">
            Sarah Johnson
          </h1>

          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Verified Seller
          </span>
          <div className="flex items-center gap-1 text-xs text-[#8F959E] font-medium">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="#F59E0B"
              stroke="#F59E0B"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>4.8 (56 reviews)</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border border-gray-100 rounded-2xl py-4 bg-white shadow-sm mt-5 text-center w-full max-w-sm md:max-w-none">
          <div>
            <span className="text-sm font-extrabold text-[#1D1E20] block">
              32
            </span>
            <span className="text-[9px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
              Items Sold
            </span>
          </div>
          <div>
            <span className="text-sm font-extrabold text-[#1D1E20] block">
              8
            </span>
            <span className="text-[9px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
              Active Listings
            </span>
          </div>
          <div>
            <span className="text-sm font-extrabold text-[#1D1E20] block">
              4.8
            </span>
            <span className="text-[9px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
              Avg. Rating
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex gap-3 mt-5 w-full max-w-sm md:max-w-none">
          <button
            onClick={() => triggerToast("Connecting chat with Sarah...")}
            className="flex-1 bg-primary text-white hover:bg-primary/95 active:scale-95 transition-all text-xs font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-primary/10"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Message Seller
          </button>

          <button
            onClick={toggleSellerFavorite}
            className={`w-[48px] h-[48px] rounded-xl flex items-center justify-center border shadow-sm transition-all ${
              isSellerFavorited
                ? "bg-red-50 border-red-200 text-red-500 scale-[1.05]"
                : "bg-white border-gray-200 text-gray-400 hover:text-[#1D1E20]"
            }`}
            aria-label="Favorite Seller"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isSellerFavorited ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-6 md:mt-0 md:col-span-2">
      {/* ── Sub-tabs Navigation Bar ── */}
      <div className="border-b border-gray-150 bg-white w-full flex sticky top-0 z-20">
        {(["listings", "reviews", "about"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-4 text-xs font-bold transition-all relative capitalize ${
              activeTab === tab ? "text-primary" : "text-[#8F959E]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-primary rounded-full animate-fadeIn" />
            )}
          </button>
        ))}
      </div>

      {/* ── Tab Content Container ── */}
      <div className="flex-1 w-full py-5">
        {/* TAB 1: LISTINGS */}
        {activeTab === "listings" && (
          <div className="grid grid-cols-2 sml:grid-cols-3 gap-3.5">
            {sellerProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                negotiable={product.negotiable}
                onClick={() => {
                  router.push(`/${product.id}`);
                }}
              />
            ))}
          </div>
        )}

        {/* TAB 2: REVIEWS */}
        {activeTab === "reviews" && (
          <div className="flex flex-col gap-4">
            {/* Reviews Summary */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm">
              <span className="text-3xl font-extrabold text-[#1D1E20]">
                4.8
              </span>
              <div className="mt-1.5">{renderStars(5, 14)}</div>
              <span className="text-[10px] text-[#8F959E] font-medium mt-1">
                56 ratings
              </span>
            </div>

            {/* Reviews List */}
            <div className="flex flex-col gap-3">
              {sellerReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_2px_6px_rgba(0,0,0,0.01)] flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4304]/10 to-[#FF8C39]/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/5">
                        {review.avatar}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1D1E20] block leading-tight">
                          {review.author}
                        </span>
                        <span className="text-[9px] text-[#8F959E] font-medium mt-0.5 block">
                          {review.date}
                        </span>
                      </div>
                    </div>
                    {renderStars(review.rating, 10)}
                  </div>

                  <p className="text-xs leading-[1.6] text-[#4B5563]">
                    {review.content}
                  </p>

                  <div className="flex items-center gap-1.5 bg-[#F9FAFB] rounded-lg px-2.5 py-1.5 w-fit">
                    <span className="text-[9px] text-[#8F959E] font-medium">
                      Bought:
                    </span>
                    <span className="text-[9px] font-bold text-[#1D1E20]">
                      {review.boughtItem}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ABOUT */}
        {activeTab === "about" && (
          <div className="flex flex-col gap-4">
            {/* About text */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider mb-2">
                About
              </h3>
              <p className="text-xs leading-[1.65] text-[#4B5563]">
                Quality gadgets at fair prices. Fast shipping and excellent
                customer service. All items tested before listing.
              </p>
            </div>

            {/* Seller Information */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider">
                Seller Information
              </h3>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 text-xs text-[#4B5563]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8F959E"
                    strokeWidth="2.5"
                  >
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#4B5563]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8F959E"
                    strokeWidth="2.5"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Member since 2024</span>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider">
                Verification Status
              </h3>

              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Email", verified: true },
                  { label: "Phone Number", verified: true },
                  { label: "Government ID", verified: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-xs text-[#4B5563]"
                  >
                    <span>{item.label}</span>
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Score */}
            <div className="bg-white  border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-2.5">
              {/* Progress bar */}
              <ProgressBar
                title="Trust Score"
                progress={92}
                comment="Based on verification, reviews, and transaction history"
                color="bg-green-500"
              />
            </div>
          </div>
        )}
      </div>
      </div>
      </Container>
    </div>
    </AppShell>
  );
};

export default SellerProfilePage;
