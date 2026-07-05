"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/app/components/layout/TopNavbar";
import Container from "@/app/components/layout/Container";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import BottomNavbar from "@/app/components/layout/BottomNavbar";
import Image from "next/image";
import AccountSettings from "@/app/components/profile/AccountSettings";
import OrdersComponent from "../../../components/profile/OrdersComponent";
import WalletComponent from "../../../components/profile/WalletComponent";
import { toast } from "sonner";
import ListingsComponent from "../../../components/profile/ListingsComponent";
import ProfileSidebar, { ProfileView } from "@/app/components/profile/ProfileSidebar";
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
  Pencil,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const [view, setView] = useState<ProfileView>("main");

  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setVerificationStatus(localStorage.getItem("verificationStatus"));
    }
  }, []);

  // Edit Profile fields

  const [walletBalance, setWalletBalance] = useState(245200);

  // Handle Save Profile
  const handleSaveProfile = () => {
    setView("main");
    toast.success("Profile updated successfully!");
  };

  const handleBack = () => {
    if (view === "main") {
      router.push("/");
    } else {
      setView("main");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] flex flex-col relative select-none">
      {/* ── Top Header Navigation (mobile/tablet only — desktop uses the sidebar) ── */}
      {view !== "main" && (
        <div className="md:hidden">
          <TopNavbar
            title={
              view === "edit"
                ? "Edit Profile"
                : view === "listings"
                  ? "My Listings"
                  : view === "orders"
                    ? "My Orders"
                    : view === "wallet"
                      ? "My Wallet"
                      : "Settings"
            }
            onBack={handleBack}
          />
        </div>
      )}

      <Container className="max-w-screen-xl flex-1 flex flex-col md:flex-row md:gap-8 md:py-8">
        <ProfileSidebar active={view} onSelect={setView} />

        {/* ── View Renderers ── */}
        <div className="flex-1 flex flex-col overflow-y-auto md:bg-white md:rounded-2xl md:border md:border-gray-100 md:shadow-sm">
        {/* VIEW 1: Main Profile View */}
        {view === "main" && (
          <div className="flex-1 flex flex-col px-5 pt-6 pb-24">
            {/* Avatar Header area */}
            <div className="flex flex-col items-center text-center mt-2">
              <Image
                src="/images/user.png"
                alt="Avatar"
                width={120}
                height={120}
                className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#FF4304] to-[#FF8C39] flex items-center justify-center text-white text-2xl font-extrabold shadow-md border-4 border-white"
              ></Image>
              <h2 className="text-[#1D1E20] text-xl font-bold mt-3.5 tracking-tight flex items-center justify-center gap-1.5">
                Hassan Saidu
                {verificationStatus === "verified" && (
                  <span className="inline-flex items-center justify-center bg-[#D1FAE5] text-green-700 text-[8px] font-extrabold px-2 py-0.5 rounded-full ml-1">
                    ✓ Verified
                  </span>
                )}
              </h2>
              <span className="text-[#8F959E] text-sm mt-0.5">
                {verificationStatus === "verified"
                  ? "Verified Seller"
                  : "Seller"}{" "}
                since 2023
              </span>
              <Button
                onClick={() => setView("edit")}
                className="text-primary text-xs font-semibold mt-2 hover:underline cursor-pointer"
              >
                Edit Profile
              </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 divide-x divide-gray-100 border border-gray-50 rounded-lg py-2.5 bg-white shadow-sm mt-4 text-center">
              <div>
                <span className="text-xs font-black text-[#1D1E20] block">
                  10
                </span>
                <span className="text-[8px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
                  Listings
                </span>
              </div>
              <div>
                <span className="text-xs font-black text-[#1D1E20] block">
                  15
                </span>
                <span className="text-[8px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
                  Items sold
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs font-black text-[#1D1E20] block">
                  4.8
                </span>
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

            {/* Payer Verification Banner */}
            {(!verificationStatus || verificationStatus === "none") && (
              <div className="bg-[#FFF5F3] border border-primary/10 rounded-xl px-3 py-2 mt-4 flex items-center justify-between shadow-[0_2px_8px_rgba(255,67,4,0.02)]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  <div>
                    <span className="text-[11px] font-bold text-[#1D1E20] block">
                      Get Verified to sell faster
                    </span>
                    <span className="text-[9px] text-[#8F959E] block">
                      Build trust with buyers
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/verify")}
                  className="py-1 px-2.5 bg-primary text-white text-[10px] font-bold rounded-lg shadow-sm hover:bg-primary/95 transition-colors"
                >
                  Verify
                </button>
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

            {/* Quick Actions Title */}
            <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider mt-6 mb-3">
              Quick Actions
            </h3>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {[
                {
                  label: "My Listings",
                  view: "listings",
                  color: "bg-primary/10 text-primary",
                  icon: <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />,
                },
                {
                  label: "My Orders",
                  view: "orders",
                  color: "bg-green-50 text-green-600",
                  icon: <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />,
                },
                {
                  label: "Wallet",
                  view: "wallet",
                  color: "bg-amber-50 text-amber-600",
                  icon: <Wallet className="w-4 h-4" strokeWidth={1.5} />,
                },
                {
                  label: "Settings",
                  view: "settings",
                  color: "bg-purple-50 text-purple-600",
                  icon: <Settings className="w-4 h-4" strokeWidth={1.5} />,
                },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => setView(action.view as any)}
                  className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white border border-gray-50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:scale-105 active:scale-95 transition-all group"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}
                  >
                    {action.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 text-center mt-1.5 leading-tight">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>

            {/* My Activity Title */}
            <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider mt-7 mb-3">
              My Activity
            </h3>

            {/* My Activity list */}
            <div className="flex flex-col gap-3">
              {[
                {
                  type: "sold",
                  title: "Sold Wall Console",
                  subTitle: "TRN-1234567890",
                  price: 450000,
                  date: "2 hours ago",
                  icon: (
                    <div className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                      <Check className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    </div>
                  ),
                },
                {
                  type: "bought",
                  title: "Bought Samsung S22",
                  price: -120000,
                  date: "1 day ago",
                  icon: (
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Activity
                        className="w-[18px] h-[18px]"
                        strokeWidth={2.5}
                      />
                    </div>
                  ),
                },
                {
                  type: "deposit",
                  title: "Deposited to Wallet",
                  price: 50000,
                  date: "2 days ago",
                  icon: (
                    <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                      <ArrowDown
                        className="w-[18px] h-[18px]"
                        strokeWidth={2.5}
                      />
                    </div>
                  ),
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
                >
                  <div className="flex items-center gap-3">
                    {activity.icon}
                    <div>
                      <span className="text-xs font-bold text-[#1D1E20] block">
                        {activity.title}
                      </span>
                      <span className="text-sm my-2">{activity.subTitle}</span>
                      <span className="text-xs text-[#8F959E] font-medium mt-0.5 block">
                        {activity.date}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold ${activity.price > 0 ? "text-green-600" : "text-red-500"}`}
                  >
                    {activity.price > 0 ? "+" : ""}
                    {formatNaira(activity.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: Edit Profile View */}
        {view === "edit" && <ProfileComponent setView={setView} />}

        {/* VIEW 3: My Listings View */}
        {view === "listings" && <ListingsComponent />}

        {/* VIEW 4: My Orders View */}
        {view === "orders" && <OrdersComponent />}

        {/* VIEW 5: My Wallet View */}
        {view === "wallet" && <WalletComponent />}

        {/* VIEW 6: Settings View */}
        {view === "settings" && <AccountSettings />}
        </div>
      </Container>

      <BottomNavbar />
    </div>
  );
}

const ProfileComponent = ({
  setView,
}: {
  setView: (
    view: "main" | "edit" | "listings" | "orders" | "wallet" | "settings",
  ) => void;
}) => {
  const [fullName, setFullName] = useState("Olamilekan Daniel");
  const [phoneNumber, setPhoneNumber] = useState("+234 812 345 6789");
  const [address, setAddress] = useState("12 Broad Street, Lagos");
  const [bio, setBio] = useState(
    "Trusted seller of quality electronics and gadgets.",
  );
  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
    setView("main");
  };
  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-24">
      {/* Edit Avatar */}
      <div className="flex flex-col items-center text-center mt-2 mb-6">
        <div className="relative cursor-pointer group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FF4304] to-[#FF8C39] flex items-center justify-center text-white text-2xl font-extrabold shadow-md border-4 border-white group-hover:brightness-95 transition-all">
            OD
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary border-2 border-white shadow-sm flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform">
            <Pencil className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
        </div>
        <span className="text-xs text-[#8F959E] font-semibold mt-2.5">
          Tap to change profile picture
        </span>
      </div>

      {/* Edit Form */}
      <div className="flex flex-col gap-4">
        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter full name"
        />
        <Input
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <Input
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-sm font-medium text-text-primary">
            Short Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell buyers about yourself..."
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-gray-400 bg-white transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button onClick={handleSaveProfile} fullWidth variant="primary">
          Save Changes
        </Button>
      </div>
    </div>
  );
};
