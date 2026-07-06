"use client";

import { Users, ShieldCheck, PackageSearch, CheckCircle2, Wallet, Star } from "lucide-react";
import Container from "@/app/components/layout/Container";
import { FadeInStagger, FadeInItem } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import { useGetPlatformStatsQuery } from "@/app/redux/api/discoveryApiSlice";
import { formatNaira } from "@/lib/utils";

const PlatformStats = () => {
  const { data, isFetching, isSuccess } = useGet(useGetPlatformStatsQuery, "");
  const stats = data?.stats;

  if (isSuccess && !stats) return null;

  const tiles = [
    { icon: Users, label: "Active Users", value: stats?.active_users?.toLocaleString() },
    { icon: ShieldCheck, label: "Verified Sellers", value: stats?.verified_sellers?.toLocaleString() },
    { icon: PackageSearch, label: "Active Listings", value: stats?.active_listings?.toLocaleString() },
    { icon: CheckCircle2, label: "Completed Sales", value: stats?.completed_sales?.toLocaleString() },
    { icon: Wallet, label: "Sales Volume", value: stats ? formatNaira(stats.gross_sales_volume) : undefined },
    {
      icon: Star,
      label: "Avg. Rating",
      value: stats ? `${stats.review_average?.toFixed(1)} (${stats.review_count?.toLocaleString()})` : undefined,
    },
  ];

  return (
    <section className="py-8 md:py-12">
      <Container>
        <FadeInStagger className="grid grid-cols-2 sml:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {tiles.map(({ icon: Icon, label, value }) => (
            <FadeInItem key={label}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center gap-1.5">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={2} />
                </div>
                {isFetching ? (
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <span className="text-text-primary text-sm md:text-base font-bold">{value ?? "—"}</span>
                )}
                <span className="text-text-secondary text-[11px] md:text-xs">{label}</span>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
};

export default PlatformStats;
