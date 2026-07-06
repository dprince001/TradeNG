"use client";

import Button from "@/app/components/Button";
import ListingsFilterPanel, { ListingsFilters } from "./ListingsFilterPanel";

interface Category {
  id: string;
  name: string;
}

interface ListingsFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ListingsFilters;
  onChange: (patch: Partial<ListingsFilters>) => void;
  onApply: () => void;
  onReset: () => void;
  categories: Category[];
}

const ListingsFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onApply,
  onReset,
  categories,
}: ListingsFilterDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-fadeIn lg:hidden"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-t-3xl px-4 pt-6 pb-8 shadow-2xl animate-slideUp max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-5">
          <h2 className="text-text-primary font-semibold">Filter Listings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-text-primary rounded-full"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
        </div>

        <ListingsFilterPanel
          filters={filters}
          onChange={onChange}
          onApply={() => {
            onApply();
            onClose();
          }}
          onReset={onReset}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default ListingsFilterDrawer;
