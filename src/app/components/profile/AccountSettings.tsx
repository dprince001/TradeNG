"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LogoutButton from "../auth/LogoutButton";
import { SwitchComponent } from "../SwitchComponent";
import ChangePasswordModal from "./ChangePasswordModal";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import {
  useGetMyProfileQuery,
  useUpdateNotificationSettingsMutation,
  useRequestSellerVerificationMutation,
} from "@/app/redux/api/profileApiSlice";

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8F959E" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const AccountSettings = () => {
  const router = useRouter();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { data: profileData } = useGet(useGetMyProfileQuery, "");
  const { handlePost: updateSettings } = usePost(useUpdateNotificationSettingsMutation);
  const { handlePost: requestVerification, isLoading: verifyLoading } = usePost(
    useRequestSellerVerificationMutation
  );

  const [inAppGeneral, setInAppGeneral] = useState(true);
  const [emailGeneral, setEmailGeneral] = useState(true);
  const [inAppOffers, setInAppOffers] = useState(false);

  useEffect(() => {
    const settings = profileData?.user?.notification_settings;
    if (settings) {
      setInAppGeneral(settings.in_app_general ?? true);
      setEmailGeneral(settings.email_general ?? true);
      setInAppOffers(settings.in_app_offers ?? false);
    }
  }, [profileData]);

  const persistSettings = (patch: Record<string, boolean>) => {
    updateSettings(
      {
        in_app_general: inAppGeneral,
        email_general: emailGeneral,
        in_app_offers: inAppOffers,
        ...patch,
      },
      { showSuccessToast: false }
    );
  };

  const accountItems = [
    { label: "Edit Profile", icon: <UserIcon />, action: () => router.push("/profile/edit") },
    { label: "Change Password", icon: <LockIcon />, action: () => setShowChangePassword(true) },
    {
      label: "Manage Verification",
      icon: <ShieldIcon />,
      action: () => requestVerification(undefined),
      loading: verifyLoading,
    },
  ];

  return (
    <div>
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}

      <div className="flex-1 flex flex-col px-5 pt-6 pb-24 gap-6">
        <div>
          <span className="text-[10px] font-bold text-[#8F959E] uppercase tracking-wider block mb-2.5">
            Account Settings
          </span>
          <div className="bg-white pt-4 pb-4 space-y-4 border border-gray-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-50">
            {accountItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                disabled={item.loading}
                className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold text-[#1D1E20] hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary">{item.icon}</div>
                  <span>{item.label}</span>
                </div>
                <ChevronIcon />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-[#8F959E] uppercase tracking-wider block mb-2.5">
            Notifications
          </span>
          <div className="bg-white pt-4 pb-4 space-y-4 border border-gray-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-50">
            {[
              {
                label: "Push Notifications",
                val: inAppGeneral,
                set: (v: boolean) => {
                  setInAppGeneral(v);
                  persistSettings({ in_app_general: v });
                },
              },
              {
                label: "Email Notifications",
                val: emailGeneral,
                set: (v: boolean) => {
                  setEmailGeneral(v);
                  persistSettings({ email_general: v });
                },
              },
              {
                label: "Offers Updates",
                val: inAppOffers,
                set: (v: boolean) => {
                  setInAppOffers(v);
                  persistSettings({ in_app_offers: v });
                },
              },
            ].map((item) => (
              <div
                key={item.label}
                className="px-4 py-3.5 flex items-center justify-between text-xs font-bold text-[#1D1E20]"
              >
                <span>{item.label}</span>
                <SwitchComponent checked={item.val} onCheckedChange={item.set} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-[#8F959E] uppercase tracking-wider block mb-2.5">
            Help & Support
          </span>
          <div className="bg-white pt-4 pb-4 space-y-4 border border-gray-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-50">
            {[
              { label: "FAQs", action: () => router.push("/faqs") },
              { label: "Contact Support", action: () => router.push("/contact") },
              { label: "Report a Seller", action: () => router.push("/dispute-center") },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold text-[#1D1E20] hover:bg-gray-50 transition-colors"
              >
                <span>{item.label}</span>
                <ChevronIcon />
              </button>
            ))}
          </div>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default AccountSettings;
