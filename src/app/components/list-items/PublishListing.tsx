import React from "react";
import Button from "../Button";
import { StarIcon } from "lucide-react";

interface PublishListingProps {
  itemName: string;
  condition: string;
  price: string;
  negotiable: boolean;
  deliveryOption: string;
  description: string;
  photos: string[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  activePhotoIndex: number;
  setActivePhotoIndex: React.Dispatch<React.SetStateAction<number>>;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (index: number) => void;
}

const PublishListing = ({
  itemName,
  condition,
  price,
  negotiable,
  deliveryOption,
  description,
  photos,
  setStep,
  activePhotoIndex,
  setActivePhotoIndex,
  handlePhotoUpload,
  removePhoto,
}: PublishListingProps) => {
  return (
    <div className="flex-1 flex flex-col gap-6 pb-4">
      <div>
        <h2 className="text-[#1D1E20] text-xl font-bold leading-tight">
          Review & Publish Your Listing
        </h2>
        <p className="text-text-secondary text-xs mt-1 leading-relaxed">
          Complete your item details to make it easier for buyers to find
        </p>
      </div>

      {/* Listing Preview Card */}
      <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] bg-white flex flex-col">
        {/* Image Carousel */}
        <div className="relative aspect-[4/3] bg-gray-100 w-full overflow-hidden">
          {photos.length > 0 ? (
            <>
              <img
                src={photos[activePhotoIndex]}
                alt="Listing Preview"
                className="w-full h-full object-cover"
              />

              {/* Carousel Nav arrows if > 1 photo */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActivePhotoIndex((prev) =>
                        prev === 0 ? photos.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1D1E20"
                      strokeWidth="2.5"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setActivePhotoIndex((prev) =>
                        prev === photos.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1D1E20"
                      strokeWidth="2.5"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}

              {/* Page Indicator Dots */}
              <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 px-2 py-1 rounded-full backdrop-blur-[2px]">
                {photos.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      i === activePhotoIndex ? "bg-primary w-3" : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-secondary text-xs">
              No photo uploaded
            </div>
          )}
        </div>

        {/* Card details */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[#1D1E20] text-base font-bold tracking-tight">
                {itemName || "Untitled Item"}
              </h3>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary text-white leading-tight uppercase tracking-wider">
                {condition}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-primary text-lg font-extrabold">
                ${price}
              </span>
              {negotiable && (
                <span className="text-text-secondary text-[10px] font-medium bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  Negotiable
                </span>
              )}
            </div>

            <span className="text-[#8F959E] text-[10px] block mt-1.5 flex items-center gap-1">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lagos, Nigeria ({deliveryOption})
            </span>
          </div>

          <p className="text-[#374151] text-xs leading-[1.65] font-light">
            {description || "No description provided."}
          </p>

        </div>
      </div>

      <div className="mt-auto pt-6">
        <Button onClick={() => setStep(7)} fullWidth variant="primary">
          Publish Listing
        </Button>
      </div>
    </div>
  );
};

export default PublishListing;
