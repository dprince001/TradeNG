"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "@/app/components/layout/Container";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import StarIcon from "@/app/assets/svgs/home/StarIcon";
import { mockTopSellers } from "@/app/(pages)/home/data/mockSellers";

const TopSellers = () => {
  const router = useRouter();

  return (
    <section className="py-8 md:py-12">
      <Container>
        <h2 className="text-text-primary text-lg md:text-2xl font-semibold mb-5">
          Top Sellers
        </h2>

        <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-1">
          {mockTopSellers.map((seller) => (
            <button
              key={seller.id}
              onClick={() => router.push("/seller-profile")}
              className="flex-shrink-0 w-[150px] md:w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden mb-2.5">
                <Image src={seller.avatar} alt={seller.name} fill className="object-cover" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-text-primary text-xs font-semibold truncate max-w-[110px]">
                  {seller.name}
                </span>
                {seller.verified && <VerifiedIcon />}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <StarIcon filled />
                <span className="text-text-secondary text-[11px]">
                  {seller.rating} · {seller.itemsSold} sold
                </span>
              </div>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TopSellers;
