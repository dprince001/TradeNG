"use client";

import { useState } from "react";
import CartIcon from "@/app/components/layout/CartIcon";
import StarIcon from "@/app/assets/svgs/home/StarIcon";
import LoveIcon from "@/app/assets/svgs/home/LoveIcon";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import avatarImg from "@/app/assets/images/seller_avatar.png";
import TopNavbar from "@/app/components/layout/TopNavbar";
import useGet from "@/app/hooks/useGet";
import { useGetListingDetailQuery } from "@/app/redux/api/listingApiSlice";
import { useParams } from "next/navigation";
import ImageCarousel from "@/app/(pages)/(product)/component/ImageCarousel";
import { Spinner } from "@/app/components/Loader";
import { useGetReviewsForAUserQuery } from "@/app/redux/api/reviewsApiSlice";
import { useSelector } from "react-redux";

const CONDITION_LABELS: Record<string, string> = {
  NEW: "New",
  LIKE_NEW: "Like New",
  USED: "Used",
  FOR_PARTS: "For Parts",
};

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [liked, setLiked] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const router = useRouter();
  const userId = useSelector((state: any) => state.app.userInfo?.user?.id);


  const { data: listingDetailData, isLoading: listingDetailLoading } = useGet(
    useGetListingDetailQuery,
    itemId,
  );

  const listing = listingDetailData?.listing ?? listingDetailData?.data ?? listingDetailData;
  const images: string[] = listing?.images ?? [];
  const itemName = listing?.item_name ?? "";
  const price = listing?.price ?? 0;
  const condition = listing?.condition ?? "";
  const description = listing?.description ?? "";
  const location = listing?.location ?? "";
  const negotiable = listing?.allow_price_negotiation ?? false;
  const seller = listing?.seller ?? listing?.user ?? null;
  const sellerName = seller
    ? `${seller.first_name ?? ""} ${seller.last_name ?? ""}`.trim()
    : "Seller";

  const { data: reviewsData, isLoading: reviewsLoading } = useGet(
    useGetReviewsForAUserQuery,
    seller?.id,
    !!seller?.id,
  );

  const reviews = reviewsData?.reviews ?? [];
  const rating = reviewsData?.rating ?? 0;

  if (listingDetailLoading || reviewsLoading) return <Spinner />;

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* ── Header ── */}
      <TopNavbar
        title="Item Details"
        onBack={() => router.back()}
        rightElement={
          <button
            id="item-detail-cart-btn"
            onClick={() => router.push("/confirm-order")}
            className="w-[42px] h-[42px] rounded-full bg-[#F5F6FA] text-[#1D1E20] hover:bg-brand-orange hover:text-white flex items-center justify-center relative transition-all duration-200 active:scale-95"
          >
            <CartIcon count={1} />
          </button>
        }
      />

      {/* ── Image Carousel ── */}
      <div className="relative w-full">
        <ImageCarousel
          photos={images}
          activePhotoIndex={activePhotoIndex}
          setActivePhotoIndex={setActivePhotoIndex}
          aspectRatio="aspect-[4/3]"
        />

        {/* Like button overlay */}
        <button
          id="item-detail-like-btn"
          onClick={() => setLiked((l) => !l)}
          className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center z-10"
        >
          <LoveIcon liked={liked} />
        </button>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Product Info */}
        <div className="px-5 pt-5">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-lg font-bold">{itemName || "Item"}</h1>

            {condition && (
              <span className="text-[6px] px-1 py-0.5 rounded-sm bg-primary text-white leading-tight uppercase">
                {CONDITION_LABELS[condition] ?? condition}
              </span>
            )}
          </div>

          <div className="flex items-start gap-2 mb-1">
            <span className="text-[#FF4304] text-xl font-bold">
              ₦{Number(price).toLocaleString("en-NG")}
            </span>

            {negotiable && (
              <span className="text-[#8E8E93] text-[8px] mt-1">Negotiable</span>
            )}
          </div>

          {location && (
            <p className="text-[#4B5563] text-[10px] mb-4">{location}</p>
          )}

          {description && (
            <p className="text-[#374151] text-xs leading-[1.65] mb-5">{description}</p>
          )}

          {/* Seller Card */}
          <div className="flex items-center justify-between bg-white rounded-2xl border border-[#F0F1F5] shadow-[0_4px_4px_0px_rgba(0,0,0,0.1)] px-4 py-3.5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center overflow-hidden">
                <img
                  src={seller?.avatar ?? avatarImg.src}
                  alt={sellerName}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-xs font-semibold">{sellerName}</span>
            </div>

            <button
              onClick={() => router.push("/seller-profile")}
              className="flex items-center gap-1.5 text-primary text-xs font-semibold"
            >
              view seller
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="#FF4304"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Seller's Review */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold">Seller's Review</h2>

              <div className="flex items-center gap-1.5">
                <StarIcon size={13} />
                <span className="text-xs">{reviews?.length || 0} reviews</span>
              </div>
            </div>

            {/* Review Card */}
            {reviews.length > 0 ? (
              reviews?.slice(0, 2).map((review: any) => (
                <div key={review.id} className="bg-[#FFF5F3] rounded-2xl p-5 mb-3 text-xs">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: rating }).map((_, i) => (
                      <StarIcon key={i} size={14} />
                    ))}

                    <span className="font-semibold ml-1">({rating}/5)</span>
                  </div>

                  <p className="font-semibold mb-1.5">{review?.reviewer_name}</p>

                  <p className="leading-[1.6] mb-4 text-[#374151]">
                    {review?.comment}
                  </p>

                  <p className="text-[#6B7280]">{review?.created_at}</p>
                </div>
              ))) : <p className="text-[#6B7280] text-sm text-center">No reviews yet</p>}

            {reviews.length > 2 && <button className="w-full text-center text-primary text-xs font-light py-1">
              See all reviews
            </button>}
          </div>
        </div>
      </div>

      {seller?.id !== userId && <div className="px-5 py-4 flex gap-3">
        {negotiable && <Button
          variant="outline"
          onClick={() => {
            sessionStorage.setItem(
              `make-offer-${itemId}`,
              JSON.stringify({
                name: itemName,
                price: price,
                image: images[0] || "",
                seller: seller
              })
            );
            router.push(`/${itemId}/make-offer`);
          }}
          fullWidth
          className="text-primary border-primary"
        >
          Make Offer
        </Button>}

        <Button
          variant="primary"
          onClick={() =>
            router.push(
              `/confirm-order`,
            )
          }
          fullWidth
        >
          Buy Now
        </Button>
      </div>}

      {seller?.id === userId && <div className="px-5 py-4 flex gap-3">
        <Button variant="outline" onClick={() => router.push(`/${itemId}/offers`)} fullWidth className="text-primary border-primary">
          View Offers
        </Button>

        <Button variant="primary" onClick={() => { }} fullWidth>
          Edit Item
        </Button>
      </div>}
    </div>
  );
};

export default ItemDetailPage;
