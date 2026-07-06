"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import SearchIcon from "@/app/assets/svgs/home/SearchIcon";
import { PageTransition } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import { useGetListingsQuery } from "@/app/redux/api/listingApiSlice";
import { useGetCategoriesQuery } from "@/app/redux/api/categoriesApiSlice";
import ListingsFilterPanel, {
  ListingsFilters,
  emptyListingsFilters,
} from "@/app/(pages)/listings/components/ListingsFilterPanel";
import ListingsFilterDrawer from "@/app/(pages)/listings/components/ListingsFilterDrawer";
import ListingsResults from "@/app/(pages)/listings/components/ListingsResults";

const PAGE_SIZE = 20;

const readFiltersFromParams = (searchParams: { get(key: string): string | null }): ListingsFilters => ({
  category_id: searchParams.get("category_id") || "",
  condition: searchParams.get("condition") || "",
  min_price: searchParams.get("min_price") || "",
  max_price: searchParams.get("max_price") || "",
  location: searchParams.get("location") || "",
  verified_sellers_only: searchParams.get("verified_sellers_only") === "true",
});

const ListingsContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;
  const urlFilters = readFiltersFromParams(searchParams);

  const [searchInput, setSearchInput] = useState(q);
  const [draftFilters, setDraftFilters] = useState<ListingsFilters>(urlFilters);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  useEffect(() => {
    setSearchInput(q);
    setDraftFilters(readFiltersFromParams(searchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const pushParams = (patch: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = () => {
    pushParams({ q: searchInput || undefined, page: undefined });
  };

  const handleApplyFilters = () => {
    pushParams({
      category_id: draftFilters.category_id || undefined,
      condition: draftFilters.condition || undefined,
      min_price: draftFilters.min_price || undefined,
      max_price: draftFilters.max_price || undefined,
      location: draftFilters.location || undefined,
      verified_sellers_only: draftFilters.verified_sellers_only ? "true" : undefined,
      page: undefined,
    });
  };

  const handleResetFilters = () => {
    setDraftFilters(emptyListingsFilters);
    pushParams({
      category_id: undefined,
      condition: undefined,
      min_price: undefined,
      max_price: undefined,
      location: undefined,
      verified_sellers_only: undefined,
      page: undefined,
    });
  };

  const goToPage = (nextPage: number) => {
    pushParams({ page: nextPage > 1 ? String(nextPage) : undefined });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { data: categoriesData } = useGet(useGetCategoriesQuery, "");
  const categories = categoriesData?.categories || [];

  const { data: listingsData, paginationData, isFetching } = useGet(useGetListingsQuery, {
    q,
    ...urlFilters,
    verified_sellers_only: urlFilters.verified_sellers_only || undefined,
    pagination_type: "page",
    page,
    limit: PAGE_SIZE,
  });

  const listings = listingsData?.listings || [];
  const hasActiveFilters =
    Boolean(q) ||
    Boolean(urlFilters.category_id) ||
    Boolean(urlFilters.condition) ||
    Boolean(urlFilters.min_price) ||
    Boolean(urlFilters.max_price) ||
    Boolean(urlFilters.location) ||
    urlFilters.verified_sellers_only;

  return (
    <AppShell>
      <Container className="py-6 md:py-10">
        <PageTransition>
          <h1 className="text-text-primary text-xl md:text-2xl font-semibold mb-1">
            {q ? `Search results for "${q}"` : "All Listings"}
          </h1>
          <p className="text-text-secondary text-sm mb-5">
            {paginationData?.total !== undefined
              ? `${paginationData.total} item${paginationData.total === 1 ? "" : "s"} found`
              : "Browse everything for sale on TradeNG"}
          </p>

          <div className="flex items-center gap-2.5 mb-6">
            <div className="flex-1 flex items-center gap-2.5 bg-white border border-gray-200 rounded-lg px-4 py-3">
              <SearchIcon />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                type="text"
                placeholder="Search for phones, fashion, furniture..."
                className="bg-transparent outline-none text-sm text-text-primary placeholder:text-text-secondary w-full"
              />
            </div>
            <button
              onClick={() => setShowFilterDrawer(true)}
              className="lg:hidden flex-shrink-0 w-11 h-11 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-text-primary hover:border-primary transition-colors"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </PageTransition>

        <div className="flex gap-8 items-start">
          <aside className="hidden lg:block w-[280px] flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-5 sticky top-24">
            <h2 className="text-text-primary font-semibold text-sm mb-4">Filters</h2>
            <ListingsFilterPanel
              filters={draftFilters}
              onChange={(patch) => setDraftFilters((prev) => ({ ...prev, ...patch }))}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              categories={categories}
            />
          </aside>

          <div className="flex-1 min-w-0">
            <ListingsResults
              listings={listings}
              isFetching={isFetching}
              page={page}
              totalPages={paginationData?.total_pages}
              hasPrev={paginationData?.has_prev}
              hasNext={paginationData?.has_next}
              onPageChange={goToPage}
              emptyMessage={
                hasActiveFilters
                  ? "Try adjusting or clearing your filters to see more results."
                  : "Check back soon — new listings are added all the time."
              }
              showClearFilters={hasActiveFilters}
              onClearFilters={handleResetFilters}
            />
          </div>
        </div>
      </Container>

      <ListingsFilterDrawer
        isOpen={showFilterDrawer}
        onClose={() => setShowFilterDrawer(false)}
        filters={draftFilters}
        onChange={(patch) => setDraftFilters((prev) => ({ ...prev, ...patch }))}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        categories={categories}
      />
    </AppShell>
  );
};

const ListingsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-text-secondary">Loading listings...</div>
      }
    >
      <ListingsContent />
    </Suspense>
  );
};

export default ListingsPage;
