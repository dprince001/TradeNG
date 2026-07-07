import { useCallback, useEffect, useRef, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

type PaginationType = "cursor" | "page";

interface UsePaginatedQueryOptions {
  /** Key inside `data.data` that holds the array of items, e.g. "listings" or "reviews". */
  dataKey: string;
  /** Pagination mode. Backend defaults to cursor, so this hook does too. */
  paginationType?: PaginationType;
  limit?: number;
  enabled?: boolean;
}

/**
 * Wraps an RTK Query hook to drive either cursor-based infinite scroll
 * (default, matching the backend default) or classic numbered pagination,
 * depending on `paginationType`.
 *
 * Cursor mode accumulates items across loads and exposes `sentinelRef` —
 * attach it to a div at the end of the list to auto-load more on scroll.
 * Page mode replaces items per page and exposes `page`/`setPage` for
 * numbered pagination controls instead.
 */
const usePaginatedQuery = (
  useQueryHook: (arg: any) => any,
  baseParams: Record<string, any>,
  { dataKey, paginationType = "cursor", limit = 20, enabled = true }: UsePaginatedQueryOptions
) => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const paramsKey = JSON.stringify(baseParams);

  useEffect(() => {
    setItems([]);
    setCursor(undefined);
    setPage(1);
  }, [paramsKey, paginationType]);

  const queryArg = enabled
    ? {
        ...baseParams,
        pagination_type: paginationType,
        limit,
        ...(paginationType === "cursor" ? { cursor } : { page }),
      }
    : skipToken;

  const { data, error, isError, isLoading, isFetching, refetch } = useQueryHook(queryArg);

  useEffect(() => {
    if (isError && error) {
      const message = (error as any)?.data?.message || "An error occurred while fetching data";
      toast.error(message);
    }
  }, [isError, error]);

  const paginationData = data?.pagination;
  const fetchedItems: any[] = data?.data?.[dataKey] || [];

  useEffect(() => {
    if (!data) return;

    setItems((prev) => {
      const isFirstBatch = paginationType === "cursor" ? !cursor : page === 1;
      if (isFirstBatch) return fetchedItems;

      const existingIds = new Set(prev.map((item: any) => item?.id));
      return [...prev, ...fetchedItems.filter((item: any) => !existingIds.has(item?.id))];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const hasNext = Boolean(paginationData?.has_next);
  const hasPrev = Boolean(paginationData?.has_prev);

  const loadMore = useCallback(() => {
    if (!hasNext || isFetching) return;
    if (paginationType === "cursor") {
      if (paginationData?.next_cursor) setCursor(paginationData.next_cursor);
    } else {
      setPage((p) => p + 1);
    }
  }, [hasNext, isFetching, paginationType, paginationData]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paginationType !== "cursor") return;
    const node = sentinelRef.current;
    if (!node || !hasNext) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [paginationType, loadMore, hasNext, items.length]);

  return {
    items,
    isLoading: isLoading && items.length === 0,
    isFetchingMore: isFetching && items.length > 0,
    isFetching,
    isError,
    error,
    hasNext,
    hasPrev,
    page,
    setPage,
    total: paginationData?.total,
    totalPages: paginationData?.total_pages,
    loadMore,
    sentinelRef,
    refetch,
  };
};

export default usePaginatedQuery;
