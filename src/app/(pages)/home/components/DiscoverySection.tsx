"use client";

import { useRouter } from "next/navigation";
import Container from "@/app/components/layout/Container";
import ProductCard from "@/app/(pages)/home/components/ProductCard";
import { ListingSkeleton } from "@/app/components/Loader";
import { FadeInStagger, FadeInItem } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import { DiscoverySlug } from "@/app/(pages)/discovery/discoverySections";

interface DiscoverySectionProps {
  id: string;
  title: string;
  slug: DiscoverySlug;
  useQuery: (arg: any) => any;
  queryArg?: Record<string, any>;
}

const DiscoverySection = ({ id, title, slug, useQuery, queryArg }: DiscoverySectionProps) => {
  const router = useRouter();
  const { data, isFetching, isSuccess } = useGet(useQuery, queryArg);
  const listings = data?.listings || [];

  if (isSuccess && listings.length === 0) return null;

  return (
    <section id={id} className="py-8 md:py-12 scroll-mt-20">
      <Container>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-text-primary text-lg md:text-2xl font-semibold">{title}</h2>
          <button
            onClick={() => router.push(`/discovery/${slug}`)}
            className="text-text-secondary text-xs md:text-sm hover:text-primary"
          >
            View All
          </button>
        </div>

        {isFetching ? (
          <ListingSkeleton />
        ) : (
          <FadeInStagger className="grid grid-cols-2 sml:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
            {listings.map((listing: any) => (
              <FadeInItem key={listing.id}>
                <ProductCard {...listing} onClick={() => router.push(`/${listing.id}`)} />
              </FadeInItem>
            ))}
          </FadeInStagger>
        )}
      </Container>
    </section>
  );
};

export default DiscoverySection;
