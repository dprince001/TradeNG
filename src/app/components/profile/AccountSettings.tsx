"use client";

import React, { useState } from "react";
import LogoutButton from "../auth/LogoutButton";
import { toast } from "sonner";
import { SwitchComponent } from "../SwitchComponent";

const AccountSettings = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [offersEnabled, setOffersEnabled] = useState(false);

  return (
    <div>
      <div className="flex-1 flex flex-col px-5 pt-6 pb-24 gap-6">
        {/* Account Settings group */}
        <div>
          <span className="text-[10px] font-bold text-[#8F959E] uppercase tracking-wider block mb-2.5">
            Account Settings
          </span>
          <div className="bg-white pt-4 pb-4 space-y-4 border border-gray-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-50">
            {[
              {
                label: "Edit Profile",
                view: "edit",
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
              },
              {
                label: "Change Password",
                view: null,
                action: () => toast.success("Change password dialog!"),
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
              },
              {
                label: "Manage Verification",
                view: null,
                action: () => toast.success("Verification center!"),
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <button
                key={item.label}
                // onClick={() =>
                //   item.view ? setView(item.view as any) : item.action?.()
                // }
                className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold text-[#1D1E20] hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary">{item.icon}</div>
                  <span>{item.label}</span>
                </div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8F959E"
                  strokeWidth="2.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications group */}
        <div>
          <span className="text-[10px] font-bold text-[#8F959E] uppercase tracking-wider block mb-2.5">
            Notifications
          </span>
          <div className="bg-white pt-4 pb-4 space-y-4 border border-gray-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-50">
            {[
              {
                label: "Push Notifications",
                val: pushEnabled,
                set: setPushEnabled,
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                ),
              },
              {
                label: "Email Notifications",
                val: emailEnabled,
                set: setEmailEnabled,
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
              },
              {
                label: "Offers Updates",
                val: offersEnabled,
                set: setOffersEnabled,
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="px-4 py-3.5 flex items-center justify-between text-xs font-bold text-[#1D1E20]"
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary">{item.icon}</div>
                  <span>{item.label}</span>
                </div>

                {/* Toggle Switch */}
                <SwitchComponent
                  checked={item.val}
                  onCheckedChange={item.set}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Help & Support group */}
        <div>
          <span className="text-[10px] font-bold text-[#8F959E] uppercase tracking-wider block mb-2.5">
            Help & Support
          </span>
          <div className="bg-white pt-4 pb-4 space-y-4 border border-gray-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-50">
            {[
              { label: "FAQs", action: () => toast.success("FAQ Page!") },
              {
                label: "Contact Support",
                action: () => toast.success("Connecting with support!"),
              },
              {
                label: "Report a Seller",
                action: () => toast.success("Report details form!"),
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold text-[#1D1E20] hover:bg-gray-50 transition-colors"
              >
                <span>{item.label}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8F959E"
                  strokeWidth="2.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
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
