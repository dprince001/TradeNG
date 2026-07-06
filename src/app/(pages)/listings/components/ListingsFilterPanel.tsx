"use client";

import Input from "@/app/components/Input";
import Select from "@/app/components/Select";
import Button from "@/app/components/Button";

export interface ListingsFilters {
  category_id: string;
  condition: string;
  min_price: string;
  max_price: string;
  location: string;
  verified_sellers_only: boolean;
}

export const emptyListingsFilters: ListingsFilters = {
  category_id: "",
  condition: "",
  min_price: "",
  max_price: "",
  location: "",
  verified_sellers_only: false,
};

interface Category {
  id: string;
  name: string;
}

interface ListingsFilterPanelProps {
  filters: ListingsFilters;
  onChange: (patch: Partial<ListingsFilters>) => void;
  onApply: () => void;
  onReset: () => void;
  categories: Category[];
  className?: string;
}

const CONDITIONS = [
  { value: "NEW", label: "New" },
  { value: "LIKE_NEW", label: "Like New" },
  { value: "USED", label: "Used" },
];

const ListingsFilterPanel = ({
  filters,
  onChange,
  onApply,
  onReset,
  categories,
  className,
}: ListingsFilterPanelProps) => {
  return (
    <div className={className}>
      <div className="mb-5">
        <Select
          label="Category"
          value={filters.category_id}
          onChange={(e) => onChange({ category_id: e.target.value })}
          options={[
            { value: "", label: "All Categories" },
            ...categories.map((c) => ({ value: c.id, label: c.name })),
          ]}
        />
      </div>

      <div className="mb-5">
        <p className="text-sm font-medium text-text-primary mb-2">Price Range (₦)</p>
        <div className="flex items-center gap-2.5">
          <Input
            type="number"
            placeholder="Min"
            value={filters.min_price}
            onChange={(e) => onChange({ min_price: e.target.value })}
          />
          <span className="text-text-secondary text-sm">to</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.max_price}
            onChange={(e) => onChange({ max_price: e.target.value })}
          />
        </div>
      </div>

      <div className="mb-5">
        <p className="text-sm font-medium text-text-primary mb-3">Item Condition</p>
        <div className="flex gap-2 flex-wrap">
          {CONDITIONS.map((cond) => (
            <button
              type="button"
              key={cond.value}
              onClick={() =>
                onChange({ condition: filters.condition === cond.value ? "" : cond.value })
              }
              className={`px-4 py-2 rounded-full border text-sm transition-all focus:outline-none ${
                filters.condition === cond.value
                  ? "border-primary text-primary bg-orange-50 font-medium"
                  : "border-[#D1D5DB] bg-white text-gray-700"
              }`}
            >
              {cond.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <Input
          label="Location"
          type="text"
          placeholder="e.g. Lagos"
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-2 mb-7">
        <Input
          type="checkbox"
          label="Verified Sellers Only"
          checked={filters.verified_sellers_only}
          onChange={(e) => onChange({ verified_sellers_only: e.target.checked })}
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="flex-1 py-3.5 text-sm border-[#D1D5DB] text-[#4B5563]"
        >
          Reset
        </Button>
        <Button type="button" variant="primary" onClick={onApply} className="flex-1 py-3.5 text-sm">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default ListingsFilterPanel;
