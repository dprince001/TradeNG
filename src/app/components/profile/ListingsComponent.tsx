"use client";

import { formatNaira } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import IphoneImage from "@/app/assets/images/IphoneImage.png";

interface ListingItem {
  id: number;
  title: string;
  price: number;
  date: string;
  status: "active" | "sold" | "drafts";
  negotiable: boolean;
  image: string;
}

// Listings state array

const ListingsComponent = () => {
  const [listingsTab, setListingsTab] = useState<"active" | "sold" | "drafts">(
    "active",
  );
  const router = useRouter();

  const [listings, setListings] = useState<ListingItem[]>([
    {
      id: 1,
      title: "iPhone 13 Pro Max",
      price: 450000,
      date: "5 days ago",
      status: "active",
      negotiable: true,
      image: IphoneImage?.src,
    },
    {
      id: 2,
      title: "Nike Air Max Sneakers",
      price: 35000,
      date: "1 week ago",
      status: "active",
      negotiable: true,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
    },
    {
      id: 3,
      title: "MacBook Pro M1",
      price: 650000,
      date: "2 weeks ago",
      status: "sold",
      negotiable: false,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80",
    },
    {
      id: 4,
      title: "Sony WH-1000XM4",
      price: 120000,
      date: "3 weeks ago",
      status: "drafts",
      negotiable: true,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    },
  ]);

  const handleDeleteListing = (id: number) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
    toast.success("Listing deleted successfully!");
  };

  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-24">
      {/* Custom Sub tabs */}
      <div className="flex bg-[#F5F6FA] p-1 rounded-xl mb-5 shadow-inner">
        {(["active", "sold", "drafts"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setListingsTab(tab)}
            className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg transition-all capitalize ${
              listingsTab === tab
                ? "bg-[#FF4304] text-white shadow-sm scale-[1.02]"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="flex flex-col gap-3 flex-1">
        {listings.filter((i) => i.status === listingsTab).length > 0 ? (
          listings
            .filter((item) => item.status === listingsTab)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 rounded-2xl p-3 flex gap-3 shadow-[0_2px_6px_rgba(0,0,0,0.01)] relative group"
              >
                {/* Product Thumbnail */}
                <div className="w-[84px] h-[84px] rounded-xl bg-gray-50 border border-gray-100 overflow-hidden relative flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.negotiable && (
                    <span className="absolute top-1 left-1 text-[7px] font-bold px-1.5 py-0.5 rounded-md bg-[#FFF5F3] border border-primary/20 text-primary uppercase tracking-wider">
                      Neg.
                    </span>
                  )}
                </div>

                {/* Product Text details */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="text-xs font-extrabold text-[#1D1E20] leading-snug tracking-tight">
                      {item.title}
                    </h4>
                    <span className="text-primary text-sm font-extrabold block mt-1">
                      {formatNaira(item.price)}
                    </span>
                  </div>
                  <span className="text-[9px] text-[#8F959E] font-medium block">
                    Listed {item.date}
                  </span>
                </div>

                {/* Action buttons (Edit & Delete) */}
                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() =>
                      toast.success(
                        `Edit functionality triggered for ${item.title}`,
                      )
                    }
                    className="p-1.5 text-text-secondary hover:text-primary transition-colors hover:bg-gray-50 rounded-lg"
                    aria-label="Edit item"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteListing(item.id)}
                    className="p-1.5 text-text-secondary hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg"
                    aria-label="Delete item"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20 gap-4 bg-white/40 border border-dashed border-gray-150 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="9" x2="15" y2="15" />
                <line x1="15" y1="9" x2="9" y2="15" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-text-primary block">
                No items found
              </span>
              <span className="text-[10px] text-text-secondary mt-1 block">
                You don&apos;t have any listings in this tab.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Add Item Button */}
      <button
        onClick={() => router.push("/list-item")}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform z-30"
        aria-label="Create listing"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
};

export default ListingsComponent;
