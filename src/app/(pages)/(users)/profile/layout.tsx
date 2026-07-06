"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import AppShell from "@/app/components/layout/AppShell";
import Container from "@/app/components/layout/Container";
import TopNavbar from "@/app/components/layout/TopNavbar";
import ProfileSidebar from "@/app/components/profile/ProfileSidebar";

const PAGE_TITLES: Record<string, string> = {
  "/profile/edit": "Edit Profile",
  "/profile/listings": "My Listings",
  "/profile/orders": "My Orders",
  "/profile/wallet": "My Wallet",
  "/profile/settings": "Settings",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isRoot = pathname === "/profile";

  return (
    <AppShell showFooter={false}>
      {!isRoot && (
        <div className="md:hidden">
          <TopNavbar
            title={PAGE_TITLES[pathname] ?? "Profile"}
            onBack={() => router.push("/profile")}
          />
        </div>
      )}

      <Container className="max-w-screen-xl flex-1 flex flex-col md:flex-row md:gap-8 md:py-8">
        <ProfileSidebar />

        <div className="flex-1 flex flex-col overflow-y-auto md:bg-white md:rounded-2xl md:border md:border-gray-100 md:shadow-sm">
          {children}
        </div>
      </Container>
    </AppShell>
  );
}
