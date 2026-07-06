"use client";

import { formatNaira } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { TableRowSkeleton } from "@/app/components/Loader";
import { FadeInStagger, FadeInItem } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import {
  useGetMyListingsQuery,
  useUpdateListingMutation,
  useDeleteListingMutation,
  usePublishListingMutation,
} from "@/app/redux/api/listingApiSlice";

const TABS = [
  { key: "ACTIVE", label: "active" },
  { key: "SOLD", label: "sold" },
  { key: "DRAFT", label: "drafts" },
] as const;

const ListingsComponent = () => {
  const [listingsTab, setListingsTab] = useState<"ACTIVE" | "SOLD" | "DRAFT">("ACTIVE");
  const router = useRouter();

  const { data: listingsData, isFetching, refetch } = useGet(useGetMyListingsQuery, "");
  const listings = listingsData?.listings || [];

  const { handlePost: saveEdit, isLoading: savingEdit } = usePost(useUpdateListingMutation);
  const { handlePost: deleteListingPost } = usePost(useDeleteListingMutation);
  const { handlePost: publishListingPost } = usePost(usePublishListingMutation);

  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editNegotiable, setEditNegotiable] = useState(false);

  const handleSaveEdit = async () => {
    if (!editItem || !editTitle || !editPrice) return;
    const response = await saveEdit({
      id: editItem.id,
      item_name: editTitle,
      price: parseFloat(editPrice),
      allow_price_negotiation: editNegotiable,
    });
    if (response?.success !== false) {
      setEditItem(null);
      refetch();
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteItemId) return;
    const response = await deleteListingPost(deleteItemId);
    if (response?.success !== false) {
      setDeleteItemId(null);
      refetch();
    }
  };

  const handlePublish = async (id: string) => {
    const response = await publishListingPost(id);
    if (response?.success !== false) refetch();
  };

  const filteredListings = listings.filter((item: any) => item.status === listingsTab);

  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-24 md:px-8 md:py-8">
      <div className="flex bg-[#F5F6FA] p-1 rounded-xl mb-5 shadow-inner md:max-w-sm">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setListingsTab(tab.key)}
            className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg transition-all capitalize ${
              listingsTab === tab.key
                ? "bg-[#FF4304] text-white shadow-sm scale-[1.02]"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {isFetching ? (
          <TableRowSkeleton rows={4} />
        ) : filteredListings.length > 0 ? (
          <FadeInStagger className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {filteredListings.map((item: any) => (
              <FadeInItem
                key={item.id}
                className="bg-white border border-gray-100 rounded-3xl p-3 flex gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.015)] relative items-center"
              >
                <div className="relative w-[100px] h-[100px] rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={item.images?.[0]}
                    alt={item.item_name}
                    className="w-full h-full object-cover"
                  />
                  {item.allow_price_negotiation && (
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-[#FF4304] text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-sm">
                      <span>Negotiable</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <h4 className="text-sm font-bold text-[#1D1E20] leading-snug truncate">
                      {item.item_name}
                    </h4>
                    <span className="text-[#1D1E20] text-lg font-extrabold block mt-1">
                      {formatNaira(item.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#8F959E] font-medium mt-1">
                    <span>{item.view_count ?? 0} views</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between h-[84px] items-center flex-shrink-0 pl-2">
                  {item.status === "DRAFT" && (
                    <button
                      onClick={() => handlePublish(item.id)}
                      className="text-green-600 hover:text-green-700 transition-colors p-1.5 hover:bg-green-50 rounded-lg text-[9px] font-bold"
                      aria-label="Publish item"
                    >
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditItem(item);
                      setEditTitle(item.item_name);
                      setEditPrice(item.price.toString());
                      setEditNegotiable(item.allow_price_negotiation);
                    }}
                    className="text-gray-500 hover:text-primary transition-colors p-1.5 hover:bg-gray-50 rounded-lg"
                    aria-label="Edit item"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteItemId(item.id)}
                    className="text-[#FF4304]/60 hover:text-[#FF4304] transition-colors p-1.5 hover:bg-[#FFF5F3] rounded-lg"
                    aria-label="Cancel item"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20 gap-4 bg-white/40 border border-dashed border-gray-150 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="9" x2="15" y2="15" />
                <line x1="15" y1="9" x2="9" y2="15" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-text-primary block">No items found</span>
              <span className="text-[10px] text-text-secondary mt-1 block">
                You don&apos;t have any listings in this tab.
              </span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => router.push("/list-item")}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform z-30"
        aria-label="Create listing"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <Dialog open={editItem !== null} onOpenChange={(open) => { if (!open) setEditItem(null); }}>
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
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 text-[#1D1E20] border-gray-200" onClick={() => setEditItem(null)}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" loading={savingEdit} onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteItemId !== null} onOpenChange={(open) => { if (!open) setDeleteItemId(null); }}>
        <DialogContent className="max-w-sm rounded-3xl p-6 bg-white border border-gray-150">
          <DialogHeader>
            <DialogTitle className="text-base font-extrabold text-[#1D1E20] leading-none mb-1">
              Cancel Listing
            </DialogTitle>
            <DialogDescription className="text-[10px] text-[#8F959E] leading-normal mb-4">
              Are you sure you want to cancel this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 mt-2">
            <Button variant="outline" className="flex-1 text-[#1D1E20] border-gray-200" onClick={() => setDeleteItemId(null)}>
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
