"use client";

import { useRouter } from "next/navigation";
import Container from "@/app/components/layout/Container";
import { ListingSkeleton } from "@/app/components/Loader";
import ProductCard from "@/app/(pages)/home/components/ProductCard";
import useGet from "@/app/hooks/useGet";
import { useGetListingsQuery } from "@/app/redux/api/listingApiSlice";

const FeaturedListings = () => {
  const router = useRouter();
  const { data: listingsData, isFetching: listingsLoading } = useGet(useGetListingsQuery, "");

  return (
    <section id="listings" className="py-8 md:py-12 scroll-mt-20">
      <Container>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-text-primary text-lg md:text-2xl font-semibold">
            Featured Listings
          </h2>
          <button
            onClick={() => router.push("/listings")}
            className="text-text-secondary text-xs md:text-sm hover:text-primary"
          >
            View All
          </button>
        </div>

        {listingsLoading ? (
          <ListingSkeleton />
        ) : (
          <div className="grid grid-cols-2 sml:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
            {listingsData?.listings?.map((p: any, i: number) => (
              <ProductCard key={i} {...p} onClick={() => router.push(`/${p.id}`)} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedListings;
