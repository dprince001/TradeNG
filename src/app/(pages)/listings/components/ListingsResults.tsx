"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import ProductCard from "@/app/(pages)/home/components/ProductCard";
import { ListingSkeleton } from "@/app/components/Loader";
import { FadeInStagger, FadeInItem } from "@/app/components/Motion";

interface ListingsResultsProps {
  listings: any[];
  isFetching: boolean;
  page: number;
  totalPages?: number;
  hasPrev?: boolean;
  hasNext?: boolean;
  onPageChange: (page: number) => void;
  emptyTitle?: string;
  emptyMessage?: string;
  showClearFilters?: boolean;
  onClearFilters?: () => void;
  gridClassName?: string;
}

const ListingsResults = ({
  listings,
  isFetching,
  page,
  totalPages,
  hasPrev,
  hasNext,
  onPageChange,
  emptyTitle = "No listings found",
  emptyMessage = "Check back soon — new listings are added all the time.",
  showClearFilters = false,
  onClearFilters,
  gridClassName = "grid grid-cols-2 sml:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4",
}: ListingsResultsProps) => {
  const router = useRouter();

  if (isFetching) {
    return (
      <div className="flex flex-col gap-3 md:gap-4">
        <ListingSkeleton />
        <ListingSkeleton />
        <ListingSkeleton />
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 gap-3">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
          <SearchX className="w-7 h-7 text-text-secondary" strokeWidth={1.5} />
        </div>
        <p className="text-text-primary font-semibold text-sm">{emptyTitle}</p>
        <p className="text-text-secondary text-xs max-w-xs">{emptyMessage}</p>
        {showClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-primary text-xs font-semibold hover:underline mt-1"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <FadeInStagger className={gridClassName}>
        {listings.map((listing: any) => (
          <FadeInItem key={listing.id}>
            <ProductCard {...listing} onClick={() => router.push(`/${listing.id}`)} />
          </FadeInItem>
        ))}
      </FadeInStagger>

      {(totalPages ?? 0) > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrev}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          </button>
          <span className="text-text-secondary text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNext}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      )}
    </>
  );
};

export default ListingsResults;
