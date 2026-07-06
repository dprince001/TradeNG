"use client";

import { Suspense } from "react";
import { useParams, useRouter, useSearchParams, usePathname } from "next/navigation";
import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import BackButton from "@/app/components/layout/BackButton";
import { PageTransition } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import ListingsResults from "@/app/(pages)/listings/components/ListingsResults";
import {
  useGetBestSellingListingsQuery,
  useGetFeaturedListingsQuery,
  useGetRecentFromVerifiedSellersQuery,
} from "@/app/redux/api/discoveryApiSlice";
import { DISCOVERY_SECTIONS, DiscoverySlug } from "@/app/(pages)/discovery/discoverySections";

const PAGE_SIZE = 20;

const DiscoveryContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  const page = Number(searchParams.get("page")) || 1;
  const meta = DISCOVERY_SECTIONS[slug as DiscoverySlug];

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage > 1) params.set("page", String(nextPage));
    else params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bestSelling = useGet(
    useGetBestSellingListingsQuery,
    { page, limit: PAGE_SIZE },
    slug === "best-selling"
  );
  const featured = useGet(
    useGetFeaturedListingsQuery,
    { pagination_type: "page", page, limit: PAGE_SIZE },
    slug === "featured-listings"
  );
  const verifiedSellers = useGet(
    useGetRecentFromVerifiedSellersQuery,
    { pagination_type: "page", page, limit: PAGE_SIZE },
    slug === "verified-sellers"
  );

  const active =
    slug === "best-selling"
      ? bestSelling
      : slug === "featured-listings"
      ? featured
      : slug === "verified-sellers"
      ? verifiedSellers
      : null;

  if (!meta || !active) {
    return (
      <AppShell>
        <Container className="py-16 text-center">
          <p className="text-text-primary font-semibold text-sm">Section not found</p>
          <p className="text-text-secondary text-xs mt-1">This discovery section doesn't exist.</p>
        </Container>
      </AppShell>
    );
  }

  const { data, paginationData, isFetching } = active;
  const listings = data?.listings || [];

  return (
    <AppShell>
      <Container className="py-6 md:py-10">
        <PageTransition>
          <div className="flex items-center gap-3 mb-1">
            <BackButton fallbackHref="/home" />
            <h1 className="text-text-primary text-xl md:text-2xl font-semibold">{meta.title}</h1>
          </div>
          <p className="text-text-secondary text-sm mb-6">
            {paginationData?.total !== undefined
              ? `${paginationData.total} item${paginationData.total === 1 ? "" : "s"} found`
              : meta.description}
          </p>
        </PageTransition>

        <ListingsResults
          listings={listings}
          isFetching={isFetching}
          page={page}
          totalPages={paginationData?.total_pages}
          hasPrev={paginationData?.has_prev}
          hasNext={paginationData?.has_next}
          onPageChange={goToPage}
          emptyTitle={meta.emptyTitle}
          emptyMessage={meta.emptyMessage}
        />
      </Container>
    </AppShell>
  );
};

const DiscoveryPage = () => {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-text-secondary">Loading...</div>
      }
    >
      <DiscoveryContent />
    </Suspense>
  );
};

export default DiscoveryPage;
