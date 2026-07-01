"use client";

import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

interface MakeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrice: number;
  onApplyOffer: (offerPrice: number, address: string) => void;
}

const MakeOfferModal = ({
  isOpen,
  onClose,
  initialPrice,
  onApplyOffer,
}: MakeOfferModalProps) => {
  const [offerPrice, setOfferPrice] = useState<string>(
    Math.round(initialPrice * 0.9).toString() // Default offer at 90%
  );
  const [address, setAddress] = useState("12 Broad Street, Lagos");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(offerPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError("Please enter a valid price");
      return;
    }
    if (priceNum >= initialPrice) {
      setError("Offer price should be less than the listing price");
      return;
    }
    setError("");
    onApplyOffer(priceNum, address);
  };

  const addressOptions = [
    { label: "12 Broad Street, Lagos", value: "12 Broad Street, Lagos" },
    { label: "45 Allen Avenue, Ikeja, Lagos", value: "45 Allen Avenue, Ikeja, Lagos" },
    { label: "8 Lekki Phase 1, Lagos", value: "8 Lekki Phase 1, Lagos" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Bottom Sheet Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-[60] bg-white rounded-t-[32px] px-6 pt-5 pb-8 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] max-w-md mx-auto animate-slideUp flex flex-col gap-6 border-t border-gray-100">
        {/* Handle bar */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto cursor-pointer" onClick={onClose} />

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[#1D1E20] text-xl font-extrabold tracking-tight">
              Make An Offer
            </h2>
            <p className="text-text-secondary text-xs mt-0.5">
              Suggest a price you are willing to pay for this item.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-primary hover:bg-gray-200 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Listing Price Info */}
          <div className="bg-[#FFF5F3] border border-primary/10 rounded-2xl px-4 py-3 flex justify-between items-center">
            <span className="text-xs font-semibold text-[#8F959E]">Listing Price</span>
            <span className="text-primary text-base font-extrabold">
              ₦{initialPrice.toLocaleString("en-NG")}
            </span>
          </div>

          {/* Offer Price Input */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-semibold text-text-primary">
              Offer Price (₦)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">
                ₦
              </span>
              <input
                type="number"
                value={offerPrice}
                onChange={(e) => {
                  setOfferPrice(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your offer"
                className={`w-full border rounded-lg pl-10 pr-4 py-3 text-sm font-bold text-text-primary placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-primary/20 ${
                  error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary"
                }`}
              />
            </div>
            {error && <span className="text-xs text-red-500 font-semibold">{error}</span>}
          </div>

          {/* Address Dropdown */}
          <Select
            label="Select / edit address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            options={addressOptions}
          />

          <Button type="submit" fullWidth variant="primary" className="py-3.5 font-bold mt-2 shadow-[0_4px_12px_rgba(255,67,4,0.2)]">
            Apply Offer
          </Button>
        </form>
      </div>
    </>
  );
};

export default MakeOfferModal;
