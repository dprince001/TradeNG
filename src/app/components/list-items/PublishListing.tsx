"use client";

import React from "react";
import Button from "../Button";
import { useFormContext } from "react-hook-form";
import { ListingFormValues } from "@/app/(pages)/(product)/list-item/page";
import ImageCarousel from "@/app/(pages)/(product)/component/ImageCarousel";

interface PublishListingProps {
  photos: string[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  activePhotoIndex: number;
  setActivePhotoIndex: React.Dispatch<React.SetStateAction<number>>;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (index: number) => void;
  onPublish: () => void;
  onDraft: () => void;
  isPublishing?: boolean;
}

const CONDITION_LABELS: Record<string, string> = {
  NEW: "New",
  LIKE_NEW: "Like New",
  USED: "Used",
  FOR_PARTS: "For Parts",
};

const DELIVERY_LABELS: Record<string, string> = {
  PICKUP: "Pickup",
  SELF_DELIVERY: "Self Delivery",
};

const PublishListing = ({
  photos,
  setStep,
  activePhotoIndex,
  setActivePhotoIndex,
  handlePhotoUpload,
  removePhoto,
  onPublish,
  onDraft,
  isPublishing = false,
}: PublishListingProps) => {
  const { watch } = useFormContext<ListingFormValues>();

  const itemName = watch("item_name");
  const condition = watch("condition");
  const price = watch("price");
  const negotiable = watch("allow_price_negotiation");
  const deliveryOption = watch("delivery_options");
  const description = watch("description");

  return (
    <div className="flex-1 flex flex-col gap-6 pb-4">
      <div>
        <h2 className="text-[#1D1E20] text-xl font-bold leading-tight">
          Review &amp; Publish Your Listing
        </h2>
        <p className="text-text-secondary text-xs mt-1 leading-relaxed">
          Complete your item details to make it easier for buyers to find
        </p>
      </div>

      <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] bg-white flex flex-col">
       <ImageCarousel photos={photos} setActivePhotoIndex={setActivePhotoIndex} activePhotoIndex={activePhotoIndex} />

        <div className="p-5 flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[#1D1E20] text-base font-bold tracking-tight">
                {itemName || "Untitled Item"}
              </h3>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary text-white leading-tight uppercase tracking-wider">
                {CONDITION_LABELS[condition] ?? condition}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-primary text-lg font-extrabold">
                ₦{Number(price).toLocaleString("en-NG")}
              </span>
              {negotiable && (
                <span className="text-text-secondary text-[10px] font-medium bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  Negotiable
                </span>
              )}
            </div>

            <span className="text-[#8F959E] text-[10px] block mt-1.5 flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Nigeria ({DELIVERY_LABELS[deliveryOption] ?? deliveryOption})
            </span>
          </div>

          <p className="text-[#374151] text-xs leading-[1.65] font-light">
            {description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-6 flex gap-5">
        <Button onClick={onDraft} fullWidth variant="outline" loading={isPublishing} className="border-primary text-primary">
          Save As Draft
        </Button>

        <Button onClick={onPublish} fullWidth variant="primary" loading={isPublishing}>
          Publish Listing
        </Button>
      </div>
    </div>
  );
};

export default PublishListing;
