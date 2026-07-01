import React from "react";
import Button from "../Button";

type PricingAndDeliveryProps = {
  price: string;
  setPrice: (value: string) => void;
  negotiable: boolean;
  setNegotiable: (value: boolean) => void;
  deliveryOption: string;
  setDeliveryOption: (value: string) => void;
  pickupAddress: string;
  setPickupAddress: (value: string) => void;
  showDeliveryDropdown: boolean;
  setShowDeliveryDropdown: (value: boolean) => void;
  step: number;
  setStep: (value: number) => void;
};

const PricingAndDelivery = ({
  price,
  setPrice,
  negotiable,
  setNegotiable,
  deliveryOption,
  setDeliveryOption,
  pickupAddress,
  setPickupAddress,
  showDeliveryDropdown,
  setShowDeliveryDropdown,
  step,
  setStep,
}: PricingAndDeliveryProps) => {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div>
        <h2 className="text-[#1D1E20] text-xl font-bold leading-tight">
          Set Your Price & Delivery details
        </h2>
        <p className="text-text-secondary text-xs mt-1 leading-relaxed">
          What&apos;s the cost of your item and what are your delivery options
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Item Price */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-text-primary">
            Item Price (₦)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
              ₦
            </span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Price Negotiation Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-gray-50/50">
          <span className="text-sm font-medium text-text-primary">
            Allow price negotiation?
          </span>
          <button
            onClick={() => setNegotiable(!negotiable)}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
              negotiable ? "bg-primary" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                negotiable ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Delivery Options Custom Selector */}
        <div className="flex flex-col gap-1.5 w-full relative">
          <label className="text-sm font-medium text-text-primary">
            Delivery options
          </label>
          <button
            onClick={() => {
              setShowDeliveryDropdown(!showDeliveryDropdown);
              setStep(showDeliveryDropdown ? 3 : 4);
            }}
            className={`w-full border rounded-lg px-4 py-3 text-sm text-text-primary bg-white text-left flex justify-between items-center transition-all ${
              step === 4
                ? "border-primary"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="font-medium">{deliveryOption}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={step === 4 ? "#FF4304" : "#1D1E20"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${step === 4 ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Custom Dropdown (Step 4 state) */}
          {step === 4 && (
            <div className="w-full bg-white border border-gray-150 rounded-xl mt-1.5 shadow-lg z-10 overflow-hidden divide-y divide-gray-50">
              {["Self delivery", "Pickup", "Home delivery"].map((option) => {
                const isSelected = deliveryOption === option;
                return (
                  <button
                    key={option}
                    onClick={() => {
                      setDeliveryOption(option);
                      setShowDeliveryDropdown(false);
                      setStep(3);
                    }}
                    className={`w-full text-left px-4 py-3.5 text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#FFF5F3] text-primary"
                        : "text-[#374151] hover:bg-gray-50"
                    }`}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF4304"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Pickup Address (If Pickup is chosen) */}
        {(deliveryOption === "Pickup" ||
          deliveryOption === "Home delivery") && (
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-primary">
              Pickup address
            </label>
            <textarea
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="Enter pickup address"
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
            />
          </div>
        )}
      </div>

      <div className="mt-auto pt-6">
        <Button
          onClick={() => {
            setShowDeliveryDropdown(false);
            setStep(5);
          }}
          fullWidth
          variant="primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PricingAndDelivery;
