"use client";

import { formatNaira } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import IphoneImage from "@/app/assets/images/IphoneImage.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";

interface ListingItem {
  id: number;
  title: string;
  price: number;
  date: string;
  status: "active" | "sold" | "drafts";
  negotiable: boolean;
  image: string;
  views?: number;
  offers?: number;
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
      views: 120,
      offers: 3,
    },
    {
      id: 2,
      title: "Nike Air Max Sneakers",
      price: 50000,
      date: "1 week ago",
      status: "active",
      negotiable: true,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
      views: 24,
      offers: 1,
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
      views: 45,
      offers: 0,
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
      views: 12,
      offers: 1,
    },
  ]);

  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<ListingItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editNegotiable, setEditNegotiable] = useState(false);
  const [editStatus, setEditStatus] = useState<"active" | "sold" | "drafts">("active");

  const handleSaveEdit = () => {
    if (!editItem) return;
    if (!editTitle || !editPrice) {
      toast.error("Please fill in all fields");
      return;
    }
    setListings((prev) =>
      prev.map((item) =>
        item.id === editItem.id
          ? {
              ...item,
              title: editTitle,
              price: parseFloat(editPrice),
              negotiable: editNegotiable,
              status: editStatus,
            }
          : item
      )
    );
    toast.success("Listing updated successfully!");
    setEditItem(null);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId === null) return;
    setListings((prev) => prev.filter((item) => item.id !== deleteItemId));
    toast.success("Listing deleted successfully!");
    setDeleteItemId(null);
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
                className="bg-white border border-gray-100 rounded-3xl p-3 flex gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.015)] relative items-center"
              >
                {/* Product Thumbnail with Negotiable Badge */}
                <div className="relative w-[100px] h-[100px] rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.negotiable && (
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-[#FF4304] text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-sm">
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
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>Negotiable</span>
                    </div>
                  )}
                </div>

                {/* Product Text details */}
                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <h4 className="text-sm font-bold text-[#1D1E20] leading-snug truncate">
                      {item.title}
                    </h4>
                    <span className="text-[#1D1E20] text-lg font-extrabold block mt-1">
                      {formatNaira(item.price)}
                    </span>
                  </div>

                  {/* Views & Offers indicator row */}
                  <div className="flex items-center gap-3 text-xs text-[#8F959E] font-medium mt-1">
                    <span>{item.views ?? 0} views</span>
                    <span className="flex items-center gap-1">
                      <span className="text-[#FF4304] font-bold">{item.offers ?? 0}</span>
                      <span className="text-[#FF4304] font-bold">{(item.offers ?? 0) === 1 ? "offer" : "offers"}</span>
                    </span>
                  </div>
                </div>

                {/* Action buttons (Edit & Delete) stacked on the right */}
                <div className="flex flex-col justify-between h-[84px] items-center flex-shrink-0 pl-2">
                  <button
                    onClick={() => {
                      setEditItem(item);
                      setEditTitle(item.title);
                      setEditPrice(item.price.toString());
                      setEditNegotiable(item.negotiable);
                      setEditStatus(item.status);
                    }}
                    className="text-gray-500 hover:text-primary transition-colors p-1.5 hover:bg-gray-50 rounded-lg"
                    aria-label="Edit item"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteItemId(item.id)}
                    className="text-[#FF4304]/60 hover:text-[#FF4304] transition-colors p-1.5 hover:bg-[#FFF5F3] rounded-lg"
                    aria-label="Delete item"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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

      {/* Edit Listing Dialog */}
      <Dialog
        open={editItem !== null}
        onOpenChange={(open) => {
          if (!open) setEditItem(null);
        }}
      >
        <DialogContent className="max-w-sm rounded-3xl p-6 bg-white border border-gray-150">
          <DialogHeader>
            <DialogTitle className="text-base font-extrabold text-[#1D1E20] leading-none mb-1">
              Edit Listing
            </DialogTitle>
            <DialogDescription className="text-[10px] text-text-secondary leading-normal mb-4">
              Update details for your marketplace listing item.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mb-5">
            <Input
              label="Item Name"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Enter item name"
            />

            <Input
              label="Price (₦)"
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              placeholder="Enter price"
            />

            <div className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <span className="text-xs font-bold text-[#1D1E20]">Negotiable</span>
              <input
                type="checkbox"
                checked={editNegotiable}
                onChange={(e) => setEditNegotiable(e.target.checked)}
                className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary/20 accent-[#FF4304]"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-medium text-text-primary">Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as any)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              >
                <option value="active">Active</option>
                <option value="sold">Sold</option>
                <option value="drafts">Draft</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 text-[#1D1E20] border-gray-200"
              onClick={() => setEditItem(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteItemId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteItemId(null);
        }}
      >
        <DialogContent className="max-w-sm rounded-3xl p-6 bg-white border border-gray-150">
          <DialogHeader>
            <DialogTitle className="text-base font-extrabold text-[#1D1E20] leading-none mb-1">
              Delete Listing
            </DialogTitle>
            <DialogDescription className="text-[10px] text-[#8F959E] leading-normal mb-4">
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              className="flex-1 text-[#1D1E20] border-gray-200"
              onClick={() => setDeleteItemId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1 bg-red-500 hover:bg-red-600 border-red-500 text-white"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListingsComponent;
