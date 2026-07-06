"use client";

import { useRouter } from "next/navigation";
import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import { ListingSkeleton } from "@/app/components/Loader";
import { FadeInStagger, FadeInItem, PageTransition } from "@/app/components/Motion";
import ProductCard from "@/app/(pages)/home/components/ProductCard";
import Button from "@/app/components/Button";
import useGet from "@/app/hooks/useGet";
import { useGetMyWishlistQuery } from "@/app/redux/api/profileApiSlice";

const FavouritesPage = () => {
  const router = useRouter();
  const { data: wishlistData, isFetching } = useGet(useGetMyWishlistQuery, "");
  const listings = (wishlistData?.wishlist || []).map((w: any) => w.listing);

  return (
    <AppShell>
      <Container className="py-8 md:py-12">
        <PageTransition>
          <h1 className="text-text-primary text-xl md:text-2xl font-semibold mb-6">
            My Favourites
          </h1>
        </PageTransition>

        {isFetching ? (
          <ListingSkeleton />
        ) : listings.length === 0 ? (
          <PageTransition className="flex flex-col items-center text-center py-20 gap-3">
            <p className="text-text-primary font-medium">No favourites yet</p>
            <p className="text-text-secondary text-sm max-w-xs">
              Tap the heart icon on any listing to save it here for later.
            </p>
            <Button onClick={() => router.push("/#listings")} className="mt-2">
              Browse listings
            </Button>
          </PageTransition>
        ) : (
          <FadeInStagger className="grid grid-cols-2 sml:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
            {listings.map((p: any, i: number) => (
              <FadeInItem key={p.id || i}>
                <ProductCard {...p} onClick={() => router.push(`/${p.id}`)} />
              </FadeInItem>
            ))}
          </FadeInStagger>
        )}
      </Container>
    </AppShell>
  );
};

export default FavouritesPage;
