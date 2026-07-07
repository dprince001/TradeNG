"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/app/components/layout/AppShell";
import AddIcon from "@/app/assets/svgs/home/AddIcon";
import HeroSection from "@/app/(pages)/home/components/HeroSection";
import CategoryRail from "@/app/(pages)/home/components/CategoryRail";
import EscrowBanner from "@/app/(pages)/home/components/EscrowBanner";
import DiscoverySection from "@/app/(pages)/home/components/DiscoverySection";
import PlatformStats from "@/app/(pages)/home/components/PlatformStats";
import TopSellers from "@/app/(pages)/home/components/TopSellers";
import useAuthGuard from "@/app/hooks/useAuthGuard";
import LoginRequiredModal from "@/app/components/auth/LoginRequiredModal";
import {
  useGetBestSellingListingsQuery,
  useGetFeaturedListingsQuery,
  useGetRecentFromVerifiedSellersQuery,
} from "@/app/redux/api/discoveryApiSlice";

const DISCOVERY_PREVIEW_LIMIT = 10;

const HomePage = () => {
  const router = useRouter();
  const { guard, promptOpen, closePrompt } = useAuthGuard("Sign in to start selling on TradeNG.");

  return (
    <>
      {promptOpen && <LoginRequiredModal onClose={closePrompt} />}

      <AppShell>
        <HeroSection />
        <PlatformStats />
        <CategoryRail />
        <EscrowBanner />
        <DiscoverySection
          id="best-selling"
          title="Best Selling"
          slug="best-selling"
          useQuery={useGetBestSellingListingsQuery}
          queryArg={{ page: 1, limit: DISCOVERY_PREVIEW_LIMIT }}
        />
        <DiscoverySection
          id="listings"
          title="Featured Listings"
          slug="featured-listings"
          useQuery={useGetFeaturedListingsQuery}
          queryArg={{ pagination_type: "page", page: 1, limit: DISCOVERY_PREVIEW_LIMIT }}
        />
        <DiscoverySection
          id="verified-sellers"
          title="Listings From Verified Sellers"
          slug="verified-sellers"
          useQuery={useGetRecentFromVerifiedSellersQuery}
          queryArg={{ pagination_type: "page", page: 1, limit: DISCOVERY_PREVIEW_LIMIT }}
        />
        <TopSellers />
      </AppShell>

      <button
        onClick={() => guard(() => router.push("/list-item"))}
        className="fixed bottom-20 right-5 mdl:bottom-8 mdl:right-8 z-40 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        aria-label="Add item"
      >
        <AddIcon />
      </button>
    </>
  );
};

export default HomePage;
