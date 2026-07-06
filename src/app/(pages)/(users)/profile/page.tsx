"use client";

import Link from "next/link";
import Image from "next/image";
import { formatNaira } from "@/lib/utils";
import { ProfileSkeleton } from "@/app/components/Loader";
import { FadeInStagger, FadeInItem, PageTransition } from "@/app/components/Motion";
import {
  Shield,
  LayoutGrid,
  ShoppingBag,
  Wallet,
  Settings,
  Check,
  Activity,
  ArrowDown,
  MessageSquare,
} from "lucide-react";
import useGet from "@/app/hooks/useGet";
import { useGetMyProfileQuery, useGetMySellerStatsQuery, useGetMyTrustScoreQuery } from "@/app/redux/api/profileApiSlice";
import { useGetWalletLedgerQuery } from "@/app/redux/api/walletApiSlice";

const quickActions = [
  { label: "My Listings", href: "/profile/listings", color: "bg-primary/10 text-primary", icon: LayoutGrid },
  { label: "My Orders", href: "/profile/orders", color: "bg-green-50 text-green-600", icon: ShoppingBag },
  { label: "Chats", href: "/chat", color: "bg-blue-50 text-blue-600", icon: MessageSquare },
  { label: "Wallet", href: "/profile/wallet", color: "bg-amber-50 text-amber-600", icon: Wallet },
  { label: "Settings", href: "/profile/settings", color: "bg-purple-50 text-purple-600", icon: Settings },
];

const ledgerTypeMeta: Record<string, { color: string; icon: any }> = {
  ESCROW_HOLD: { color: "bg-blue-50 text-blue-600", icon: Activity },
  ESCROW_RELEASE: { color: "bg-green-50 text-green-600", icon: Check },
  WITHDRAWAL_HOLD: { color: "bg-amber-50 text-amber-600", icon: ArrowDown },
  WITHDRAWAL_REVERSAL: { color: "bg-amber-50 text-amber-600", icon: ArrowDown },
};

export default function ProfilePage() {
  const { data: profileData, isFetching: profileLoading } = useGet(useGetMyProfileQuery, "");
  const { data: statsData, isFetching: statsLoading } = useGet(useGetMySellerStatsQuery, "");
  const { data: trustData } = useGet(useGetMyTrustScoreQuery, "");
  const { data: ledgerData } = useGet(useGetWalletLedgerQuery, "");

  const user = profileData?.user;
  const stats = statsData || {};
  const verificationStatus = trustData?.verification_status;
  const activityFeed = (ledgerData?.ledger || []).slice(0, 5);

  if (profileLoading || statsLoading) {
    return (
      <div className="flex-1 px-5 pt-6 pb-24">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-24">
      <PageTransition className="flex flex-col items-center text-center mt-2">
        <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#FF4304] to-[#FF8C39] flex items-center justify-center text-white text-2xl font-extrabold shadow-md border-4 border-white overflow-hidden relative">
          {user?.profile_photo ? (
            <Image src={user.profile_photo} alt="Avatar" fill className="object-cover" />
          ) : (
            <span>{user?.first_name?.[0]}{user?.last_name?.[0]}</span>
          )}
        </div>
        <h2 className="text-[#1D1E20] text-xl font-bold mt-3.5 tracking-tight flex items-center justify-center gap-1.5">
          {user?.first_name} {user?.last_name}
          {verificationStatus === "SELLER_VERIFIED" && (
            <span className="inline-flex items-center justify-center bg-[#D1FAE5] text-green-700 text-[8px] font-extrabold px-2 py-0.5 rounded-full ml-1">
              ✓ Verified
            </span>
          )}
        </h2>
        <span className="text-[#8F959E] text-sm mt-0.5">
          {verificationStatus === "SELLER_VERIFIED" ? "Verified Seller" : "Seller"}
          {user?.created_at && ` since ${new Date(user.created_at).getFullYear()}`}
        </span>
        <Link href="/profile/edit" className="text-primary text-xs font-semibold mt-2 hover:underline">
          Edit Profile
        </Link>
      </PageTransition>

      <div className="grid grid-cols-4 divide-x divide-gray-100 border border-gray-50 rounded-lg py-2.5 bg-white shadow-sm mt-4 text-center">
        <div>
          <span className="text-xs font-black text-[#1D1E20] block">{stats.total_listings ?? 0}</span>
          <span className="text-[8px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
            Listings
          </span>
        </div>
        <div>
          <span className="text-xs font-black text-[#1D1E20] block">{stats.items_sold ?? 0}</span>
          <span className="text-[8px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
            Items sold
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-black text-[#1D1E20] block">{stats.avg_rating ?? 0}</span>
          <span className="text-[8px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
            Avg rating
          </span>
        </div>
        <div>
          <span className="text-xs font-black text-primary block">
            {formatNaira(stats.earnings ?? 0).replace(/,000$/, "K")}
          </span>
          <span className="text-[8px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
            Earnings
          </span>
        </div>
      </div>

      {verificationStatus !== "SELLER_VERIFIED" && (
        <div className="bg-[#FFF5F3] border border-primary/10 rounded-xl px-3 py-2 mt-4 flex items-center justify-between shadow-[0_2px_8px_rgba(255,67,4,0.02)]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" strokeWidth={1.5} />
            <div>
              <span className="text-[11px] font-bold text-[#1D1E20] block">
                Get Verified to sell faster
              </span>
              <span className="text-[9px] text-[#8F959E] block">Build trust with buyers</span>
            </div>
          </div>
          <Link
            href="/profile/settings"
            className="py-1 px-2.5 bg-primary text-white text-[10px] font-bold rounded-lg shadow-sm hover:bg-primary/95 transition-colors"
          >
            Verify
          </Link>
        </div>
      )}

      <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider mt-6 mb-3">
        Quick Actions
      </h3>

      <FadeInStagger className="grid grid-cols-4 sml:grid-cols-5 gap-2.5">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <FadeInItem key={action.label}>
              <Link
                href={action.href}
                className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white border border-gray-50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:scale-105 active:scale-95 transition-all group w-full"
              >
                <div
                  className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold text-gray-600 text-center mt-1.5 leading-tight">
                  {action.label}
                </span>
              </Link>
            </FadeInItem>
          );
        })}
      </FadeInStagger>

      <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider mt-7 mb-3">
        My Activity
      </h3>

      {activityFeed.length === 0 ? (
        <p className="text-text-secondary text-xs">No recent activity yet.</p>
      ) : (
        <FadeInStagger className="flex flex-col gap-3">
          {activityFeed.map((entry: any) => {
            const meta = ledgerTypeMeta[entry.type] || ledgerTypeMeta.DEPOSIT;
            const Icon = meta.icon;
            const isPositive = entry.amount > 0;
            return (
              <FadeInItem
                key={entry.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${meta.color} flex items-center justify-center`}>
                    <Icon className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1D1E20] block capitalize">
                      {entry.type?.toLowerCase()} · {entry.bucket?.toLowerCase()}
                    </span>
                    <span className="text-xs text-[#8F959E] font-medium mt-0.5 block">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <span className={`text-xs font-bold ${isPositive ? "text-green-600" : "text-red-500"}`}>
                  {isPositive ? "+" : ""}
                  {formatNaira(entry.amount)}
                </span>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      )}
    </div>
  );
}
