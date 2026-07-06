"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import ProductCard from "../../home/components/ProductCard";
import ProgressBar from "@/app/components/ProgressBar";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";
import BackButton from "@/app/components/layout/BackButton";
import { ProfileSkeleton, ListingSkeleton } from "@/app/components/Loader";
import { FadeInStagger, FadeInItem, PageTransition } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import useAuthGuard from "@/app/hooks/useAuthGuard";
import LoginRequiredModal from "@/app/components/auth/LoginRequiredModal";
import { useGetListingsQuery } from "@/app/redux/api/listingApiSlice";
import { useGetReviewsForAUserQuery } from "@/app/redux/api/reviewsApiSlice";
import usePost from "@/app/hooks/usePost";
import { useStartConversationMutation } from "@/app/redux/api/chatApiSlice";

const renderStars = (rating: number, size = 12) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={star <= Math.round(rating) ? "#F59E0B" : "none"}
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const PROFILE_TABS = ["listings", "reviews", "about"] as const;
type ProfileTab = (typeof PROFILE_TABS)[number];

const SellerProfileContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sellerId = searchParams.get("id");

  // Fallback display info passed by the linking page (e.g. a chat thread)
  // for users who have no listings, since there's no "get user by id" endpoint.
  const fallbackName = searchParams.get("name");
  const fallbackAvatar = searchParams.get("avatar");
  const fallbackVerified = searchParams.get("verified") === "true";

  const { guard, promptOpen, closePrompt } = useAuthGuard("Sign in to message this seller.");
  const { handlePost: startConversation } = usePost(useStartConversationMutation);

  const { data: listingsData, isFetching: listingsLoading } = useGet(useGetListingsQuery, "");
  const { data: reviewsData, isFetching: reviewsLoading } = useGet(
    useGetReviewsForAUserQuery,
    sellerId,
    Boolean(sellerId)
  );

  const allListings = listingsData?.listings || [];
  const sellerListings = sellerId ? allListings.filter((l: any) => l.seller?.id === sellerId) : [];
  const hasListings = sellerListings.length > 0;

  const seller = sellerListings[0]?.seller ?? (sellerId
    ? {
        id: sellerId,
        first_name: fallbackName?.split(" ")?.[0] ?? "",
        last_name: fallbackName?.split(" ")?.slice(1).join(" ") ?? "",
        profile_photo: fallbackAvatar || undefined,
        is_verified_seller: fallbackVerified,
      }
    : null);

  const reviews = reviewsData?.reviews || [];
  const avgRating = reviews.length
    ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
    : 0;

  const availableTabs = PROFILE_TABS.filter((tab) => tab !== "listings" || hasListings);
  const [activeTab, setActiveTab] = useState<ProfileTab>("listings");
  const resolvedTab = availableTabs.includes(activeTab) ? activeTab : availableTabs[0];

  const handleMessageSeller = () => {
    guard(async () => {
      const firstListing = sellerListings[0];
      if (!firstListing) return;
      const response = await startConversation({ listing_id: firstListing.id }, { showSuccessToast: false });
      if (response?.success) {
        router.push(`/chat?c_id=${response?.data?.conversation?.id}`);
      }
    });
  };

  if (listingsLoading) {
    return (
      <AppShell showFooter={false} showBottomNav={false}>
        <Container className="max-w-5xl py-8">
          <ProfileSkeleton />
        </Container>
      </AppShell>
    );
  }

  return (
    <AppShell showFooter={false} showBottomNav={false}>
      {promptOpen && <LoginRequiredModal onClose={closePrompt} message="Sign in to message this seller." />}

      <div className="w-full bg-[#F9FAFB] flex flex-col relative pb-8">
        <div className="relative w-full h-[160px] md:h-[220px] bg-gradient-to-br from-[#0D0500] via-[#7A1E00] to-[#C03300]">
          <BackButton
            fallbackHref="/home"
            className="absolute top-4 left-4 w-9 h-9 bg-white shadow-md hover:scale-105"
          />
        </div>

        <Container className="max-w-5xl -mt-10 relative z-10 md:grid md:grid-cols-3 md:gap-8 md:items-start">
          <PageTransition className="flex flex-col items-center md:col-span-1">
            <div className="w-[88px] h-[88px] rounded-full border-4 border-white shadow-md overflow-hidden bg-white flex items-center justify-center text-2xl font-extrabold text-primary bg-primary/10 relative">
              {seller?.profile_photo ? (
                <Image src={seller.profile_photo} alt={seller?.first_name || "Seller"} fill className="object-cover" />
              ) : (
                <span>{seller?.first_name?.[0]}{seller?.last_name?.[0]}</span>
              )}
            </div>

            <div className="text-center space-y-2 mt-3">
              <h1 className="text-lg font-extrabold text-[#1D1E20] leading-none">
                {seller ? `${seller.first_name} ${seller.last_name}` : "Seller"}
              </h1>

              {seller?.is_verified_seller && (
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Verified Seller
                </span>
              )}
              <div className="flex items-center justify-center gap-1 text-xs text-[#8F959E] font-medium">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>{avgRating.toFixed(1)} ({reviews.length} reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-gray-100 border border-gray-100 rounded-2xl py-4 bg-white shadow-sm mt-5 text-center w-full max-w-sm md:max-w-none">
              <div>
                <span className="text-sm font-extrabold text-[#1D1E20] block">{sellerListings.length}</span>
                <span className="text-[9px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
                  Active Listings
                </span>
              </div>
              <div>
                <span className="text-sm font-extrabold text-[#1D1E20] block">{avgRating.toFixed(1)}</span>
                <span className="text-[9px] text-[#8F959E] font-bold uppercase tracking-wider mt-0.5 block">
                  Avg. Rating
                </span>
              </div>
            </div>

            {hasListings && (
              <div className="flex gap-3 mt-5 w-full max-w-sm md:max-w-none">
                <button
                  onClick={handleMessageSeller}
                  className="flex-1 bg-primary text-white hover:bg-primary/95 active:scale-95 transition-all text-xs font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-primary/10"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Message Seller
                </button>
              </div>
            )}
          </PageTransition>

          <div className="mt-6 md:mt-0 md:col-span-2">
            <div className="border-b border-gray-150 bg-white w-full flex sticky top-0 z-20">
              {availableTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-4 text-xs font-bold transition-all relative capitalize ${
                    resolvedTab === tab ? "text-primary" : "text-[#8F959E]"
                  }`}
                >
                  {tab}
                  {resolvedTab === tab && (
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-primary rounded-full animate-fadeIn" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex-1 w-full py-5">
              {resolvedTab === "listings" &&
                (sellerListings.length === 0 ? (
                  <p className="text-text-secondary text-sm text-center py-10">No active listings.</p>
                ) : (
                  <FadeInStagger className="grid grid-cols-2 sml:grid-cols-3 gap-3.5">
                    {sellerListings.map((product: any) => (
                      <FadeInItem key={product.id}>
                        <ProductCard {...product} onClick={() => router.push(`/${product.id}`)} />
                      </FadeInItem>
                    ))}
                  </FadeInStagger>
                ))}

              {resolvedTab === "reviews" && (
                <div className="flex flex-col gap-4">
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm">
                    <span className="text-3xl font-extrabold text-[#1D1E20]">{avgRating.toFixed(1)}</span>
                    <div className="mt-1.5">{renderStars(avgRating, 14)}</div>
                    <span className="text-[10px] text-[#8F959E] font-medium mt-1">{reviews.length} ratings</span>
                  </div>

                  {reviewsLoading ? (
                    <ListingSkeleton />
                  ) : reviews.length === 0 ? (
                    <p className="text-text-secondary text-sm text-center py-6">No reviews yet.</p>
                  ) : (
                    <FadeInStagger className="flex flex-col gap-3">
                      {reviews.map((review: any) => (
                        <FadeInItem
                          key={review.id}
                          className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_2px_6px_rgba(0,0,0,0.01)] flex flex-col gap-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4304]/10 to-[#FF8C39]/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/5">
                                {review.reviewer_id?.slice(0, 2).toUpperCase()}
                              </div>
                              <span className="text-[9px] text-[#8F959E] font-medium mt-0.5 block">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            {renderStars(review.rating, 10)}
                          </div>
                          <p className="text-xs leading-[1.6] text-[#4B5563]">{review.comment}</p>
                        </FadeInItem>
                      ))}
                    </FadeInStagger>
                  )}
                </div>
              )}

              {resolvedTab === "about" && (
                <div className="flex flex-col gap-4">
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                    <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider">
                      Seller Information
                    </h3>
                    <div className="flex items-center gap-2.5 text-xs text-[#4B5563]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8F959E" strokeWidth="2.5">
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{sellerListings[0]?.location || "Nigeria"}</span>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-2.5">
                    <ProgressBar
                      title="Verification"
                      progress={seller?.is_verified_seller ? 100 : 40}
                      comment={seller?.is_verified_seller ? "Fully verified seller" : "Seller not yet fully verified"}
                      color={seller?.is_verified_seller ? "bg-green-500" : "bg-amber-500"}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </AppShell>
  );
};

const SellerProfilePage = () => {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-text-secondary">Loading seller profile...</div>
      }
    >
      <SellerProfileContent />
    </Suspense>
  );
};

export default SellerProfilePage;
