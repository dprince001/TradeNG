"use client";

import React from "react";
import Button from "../Button";
import { useFormContext } from "react-hook-form";
import { ListingFormValues } from "@/app/(pages)/(product)/list-item/page";
import { Controller } from "react-hook-form";
import Input from "../Input";

type PricingAndDeliveryProps = {
  showDeliveryDropdown: boolean;
  setShowDeliveryDropdown: (value: boolean) => void;
  step: number;
  setStep: (value: number) => void;
};


const PricingAndDelivery = ({
  showDeliveryDropdown,
  setShowDeliveryDropdown,
  step,
  setStep,
}: PricingAndDeliveryProps) => {
  const {
    register,
    watch,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useFormContext<ListingFormValues>();

  const negotiable = watch("allow_price_negotiation");
  const deliveryOption = watch("delivery_options");
  const needsAddress = deliveryOption === "PICKUP";

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div>
        <h2 className="text-[#1D1E20] text-xl font-bold leading-tight">
          Set Your Price &amp; Delivery details
        </h2>
        <p className="text-text-secondary text-xs mt-1 leading-relaxed">
          What&apos;s the cost of your item and what are your delivery options
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Item Price */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-text-primary">Item Price (₦)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₦</span>
            <input
              type="number"
              placeholder="0.00"
              {...register("price")}
              className={`w-full border rounded-lg pl-10 pr-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 ${errors.price ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200"
                }`}
            />
          </div>
          {errors.price && (
            <span className="text-xs text-red-500 font-medium">{errors.price.message}</span>
          )}
        </div>

        {/* Price Negotiation Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-gray-50/50">
          <span className="text-sm font-medium text-text-primary">Allow price negotiation?</span>
          <button
            type="button"
            onClick={() => setValue("allow_price_negotiation", !negotiable)}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${negotiable ? "bg-primary" : "bg-gray-200"
              }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${negotiable ? "translate-x-5" : "translate-x-0"
                }`}
            />
          </button>
        </div>

        <Controller
          control={control}
          name="delivery_options"
          render={({ field }) => (
            <Input
              type="select"
              label="Delivery options"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              options={[
                { label: "Self Delivery", value: "SELF_DELIVERY" },
                { label: "Pickup", value: "PICKUP" },
              ]}
              error={errors.category_id?.message}
            />
          )}
        />

        {/* Pickup / Home delivery address */}
        {needsAddress && (
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-primary">Pickup address</label>
            <textarea
              {...register("pickup_address")}
              placeholder="Enter pickup address"
              rows={3}
              className={`w-full border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none ${errors.pickup_address ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200"
                }`}
            />
            {errors.pickup_address &&
              <p className="text-xs text-red-500 font-medium">{errors.pickup_address.message}</p>
            }
          </div>
        )}
      </div>

      <div className="mt-auto pt-6">
        <Button
          type="button"
          onClick={() => setStep(3)}
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
