"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "@/app/components/layout/Container";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import StarIcon from "@/app/assets/svgs/home/StarIcon";
import { CategorySkeleton } from "@/app/components/Loader";
import { FadeInStagger, FadeInItem } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import { useGetTopSellersQuery } from "@/app/redux/api/discoveryApiSlice";

const TopSellers = () => {
  const router = useRouter();
  const { data: topSellersData, isFetching: topSellersLoading } = useGet(useGetTopSellersQuery, "");
  const sellers = topSellersData?.sellers || [];

  return (
    <section id="top-sellers" className="py-8 md:py-12 scroll-mt-20">
      <Container>
        <h2 className="text-text-primary text-lg md:text-2xl font-semibold mb-5">
          Top Sellers
        </h2>

        {topSellersLoading ? (
          <CategorySkeleton />
        ) : (
          <FadeInStagger className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-1">
            {sellers.map((seller: any) => (
              <FadeInItem key={seller.id}>
                <button
                  onClick={() => router.push(`/seller-profile?id=${seller.id}`)}
                  className="flex-shrink-0 w-[150px] md:w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mb-2.5 bg-gray-100">
                    {seller.avatar && (
                      <Image src={seller.avatar} alt={seller.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-text-primary text-xs font-semibold truncate max-w-[110px]">
                      {seller.name || `${seller.first_name} ${seller.last_name}`}
                    </span>
                    {(seller.verified || seller.is_verified_seller) && <VerifiedIcon />}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <StarIcon filled />
                    <span className="text-text-secondary text-[11px]">
                      {seller.rating || seller.average_rating || 0} · {seller.itemsSold || seller.completed_sales_count || 0} sold
                    </span>
                  </div>
                </button>
              </FadeInItem>
            ))}
          </FadeInStagger>
        )}
      </Container>
    </section>
  );
};

export default TopSellers;
