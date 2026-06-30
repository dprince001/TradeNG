import { useState } from "react";
import PriceRangeSlider from "@/app/(pages)/home/components/PriceRangeSlider";
import Input from "@/app/components/Input";
import Select from "@/app/components/Select";
import Button from "@/app/components/Button";

interface FilterOverlayProps {
  onClose: () => void;
}

const FilterOverlay = ({ onClose }: FilterOverlayProps) => {
  const [condition, setCondition] = useState<string | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-t-3xl px-4 pt-6 pb-8 shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-5">
          <h2 className="text font-semibold">Filter Results</h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-text-primary rounded-full"
          >
            <svg
              width="18"
              height="18"
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
          </Button>
        </div>

        {/* Category */}
        <div className="mb-5">
          <Select
            label="Category"
            options={[
              {
                value: "all",
                label: "All Categories",
              },
              {
                value: "phones",
                label: "Phones",
              },
              {
                value: "fashion",
                label: "Fashion",
              },
              {
                value: "home",
                label: "Home",
              },
              {
                value: "electronics",
                label: "Electronics",
              },
              {
                value: "furniture",
                label: "Furniture",
              },
            ]}
          ></Select>
        </div>

        {/* Price Range */}
        <div className="mb-5">
          <p className="text-sm font-medium mb-2">Price Range</p>
          <PriceRangeSlider />
        </div>

        {/* Item Condition */}
        <div className="mb-5">
          <p className="text-sm font-medium mb-3">Item Condition</p>

          <div className="flex gap-2 flex-wrap">
            {["New", "Like New", "Used"].map((cond) => (
              <Button
                type="button"
                key={cond}
                variant="none"
                onClick={() => setCondition(cond === condition ? null : cond)}
                className={`px-4 py-2 rounded-full border text-sm transition-all focus:outline-none ${
                  condition === cond
                    ? "border-primary text-primary bg-orange-50 font-medium"
                    : "border-[#D1D5DB] bg-white text-gray-700"
                }`}
              >
                {cond}
              </Button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-5">
          <Input label="Location" type="text" placeholder="Enter location" />

          <Button
            variant="none"
            type="button"
            className="text-primary text-xs mt-2 block pl-1 hover:underline focus:outline-none"
          >
            Use my current location
          </Button>
        </div>

        {/* Verified Sellers Only */}
        <div className="flex items-center gap-2 mb-7">
          <Input
            type="checkbox"
            label="Verified Sellers Only"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 py-4 text-sm border-[#D1D5DB] text-[#4B5563]"
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="primary"
            className="flex-1 py-4 text-sm"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterOverlay;
