"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatNaira } from "@/lib/utils";
import {
  Shield,
  Clock,
  LayoutGrid,
  ShoppingBag,
  Wallet,
  Settings,
  Check,
  Activity,
  ArrowDown,
  MessageSquare,
} from "lucide-react";

const quickActions = [
  { label: "My Listings", href: "/profile/listings", color: "bg-primary/10 text-primary", icon: LayoutGrid },
  { label: "My Orders", href: "/profile/orders", color: "bg-green-50 text-green-600", icon: ShoppingBag },
  { label: "Chats", href: "/chat", color: "bg-blue-50 text-blue-600", icon: MessageSquare },
  { label: "Wallet", href: "/profile/wallet", color: "bg-amber-50 text-amber-600", icon: Wallet },
  { label: "Settings", href: "/profile/settings", color: "bg-purple-50 text-purple-600", icon: Settings },
];

const activityFeed = [
  {
    type: "sold",
    title: "Sold Wall Console",
    subTitle: "TRN-1234567890",
    price: 450000,
    date: "2 hours ago",
    color: "bg-green-50 text-green-600",
    icon: Check,
  },
  {
    type: "bought",
    title: "Bought Samsung S22",
    price: -120000,
    date: "1 day ago",
    color: "bg-blue-50 text-blue-600",
    icon: Activity,
  },
  {
    type: "deposit",
    title: "Deposited to Wallet",
    price: 50000,
    date: "2 days ago",
    color: "bg-amber-50 text-amber-600",
    icon: ArrowDown,
  },
];

export default function ProfilePage() {
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [walletBalance] = useState(245200);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVerificationStatus(localStorage.getItem("verificationStatus"));
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-24">
      {/* Avatar Header area */}
      <div className="flex flex-col items-center text-center mt-2">
        <Image
          src="/images/user.png"
          alt="Avatar"
          width={120}
          height={120}
          className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#FF4304] to-[#FF8C39] flex items-center justify-center text-white text-2xl font-extrabold shadow-md border-4 border-white"
        />
        <h2 className="text-[#1D1E20] text-xl font-bold mt-3.5 tracking-tight flex items-center justify-center gap-1.5">
          Hassan Saidu
          {verificationStatus === "verified" && (
            <span className="inline-flex items-center justify-center bg-[#D1FAE5] text-green-700 text-[8px] font-extrabold px-2 py-0.5 rounded-full ml-1">
              ✓ Verified
            </span>
          )}
        </h2>
        <span className="text-[#8F959E] text-sm mt-0.5">
          {verificationStatus === "verified" ? "Verified Seller" : "Seller"} since 2023
        </span>
        <Link href="/profile/edit" className="text-primary text-xs font-semibold mt-2 hover:underline">
          Edit Profile
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 divide-x divide-gray-100 border border-gray-50 rounded-lg py-2.5 bg-white shadow-sm mt-4 text-center">
        <div>
          <span className="text-xs font-black text-[#1D1E20] block">10</span>
          <span className="text-[8px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
            Listings
          </span>
        </div>
        <div>
          <span className="text-xs font-black text-[#1D1E20] block">15</span>
          <span className="text-[8px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
            Items sold
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-black text-[#1D1E20] block">4.8</span>
          <span className="text-[8px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
            Avg rating
          </span>
        </div>
        <div>
          <span className="text-xs font-black text-primary block">
            {formatNaira(walletBalance).replace(/,000$/, "K")}
          </span>
          <span className="text-[8px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
            Earnings
          </span>
        </div>
      </div>

      {/* Verification Banner */}
      {(!verificationStatus || verificationStatus === "none") && (
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
            href="/verify"
            className="py-1 px-2.5 bg-primary text-white text-[10px] font-bold rounded-lg shadow-sm hover:bg-primary/95 transition-colors"
          >
            Verify
          </Link>
        </div>
      )}

      {verificationStatus === "pending" && (
        <div className="bg-[#FFFDF5] border border-amber-200/50 rounded-xl px-3 py-2 mt-4 flex items-center justify-between shadow-sm border-dashed">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" strokeWidth={1.5} />
            <div>
              <span className="text-[11px] font-bold text-[#1D1E20] block">
                Verification under review
              </span>
              <span className="text-[9px] text-[#8F959E] block">
                TradeNG is reviewing your application.
              </span>
            </div>
          </div>
          <span className="text-[10px] text-amber-600 font-extrabold uppercase tracking-wider">
            Pending
          </span>
        </div>
      )}

      {/* Quick Actions */}
      <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider mt-6 mb-3">
        Quick Actions
      </h3>

      <div className="grid grid-cols-4 sml:grid-cols-5 gap-2.5">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white border border-gray-50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:scale-105 active:scale-95 transition-all group"
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
          );
        })}
      </div>

      {/* My Activity */}
      <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider mt-7 mb-3">
        My Activity
      </h3>

      <div className="flex flex-col gap-3">
        {activityFeed.map((activity, i) => {
          const Icon = activity.icon;
          return (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${activity.color} flex items-center justify-center`}>
                  <Icon className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1D1E20] block">{activity.title}</span>
                  {activity.subTitle && (
                    <span className="text-[10px] text-[#8F959E] block mt-0.5">{activity.subTitle}</span>
                  )}
                  <span className="text-xs text-[#8F959E] font-medium mt-0.5 block">{activity.date}</span>
                </div>
              </div>
              <span className={`text-xs font-bold ${activity.price > 0 ? "text-green-600" : "text-red-500"}`}>
                {activity.price > 0 ? "+" : ""}
                {formatNaira(activity.price)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
