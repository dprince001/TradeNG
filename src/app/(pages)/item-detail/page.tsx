"use client";

import { useState } from "react";
import BackIcon from "@/app/assets/svgs/home/BackIcon";
import CartIcon from "@/app/assets/svgs/home/CartIcon";
import StarIcon from "@/app/assets/svgs/home/StarIcon";
import LoveIcon from "@/app/assets/svgs/home/LoveIcon";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import avatarImg from "@/app/assets/images/seller_avatar.png";

const ItemDetailPage = () => {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3 bg-white">
        <button
          onClick={() => router.back()}
          className="w-[38px] h-[38px] rounded-full bg-[#FF4304] flex items-center justify-center"
        >
          <BackIcon />
        </button>

        <span className="text-[#1D1E20] font-semibold">Item Details</span>

        <button
          id="item-detail-cart-btn"
          className="w-[38px] h-[38px] rounded-full bg-[#FF4304] flex items-center justify-center"
        >
          <CartIcon />
        </button>
      </div>

      <div className="relative w-full bg-[#F0F1F5] h-[280px] overflow-hidden">
        {/* <Image src={IphoneImage} alt="iPhone" fill className="object-cover" />
         */}

        <div className="bg-[#F0F1F5] w-[280px] h-[280px]"></div>

        <button
          id="item-detail-like-btn"
          onClick={() => setLiked((l) => !l)}
          className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          <LoveIcon liked={liked} />
        </button>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Product Info */}
        <div className="px-5 pt-5">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-lg font-bold">iPhone 11 in Black</h1>

            <span className="text-[6px] px-1 py-0.5 rounded-sm bg-primary text-white leading-tight">
              Like New
            </span>
          </div>

          <div className="flex items-start gap-2 mb-1">
            <span className="text-[#FF4304] text-xl font-bold">$399</span>

            <span className="text-[#8E8E93] text-[8px] mt-1">Negotiable</span>
          </div>

          <p className="text-[#4B5563] text-[10px] mb-4">Lagos</p>

          <p className="text-[#374151] text-xs leading-[1.65] mb-5">
            Stunning 6.1-inch Liquid Retina display, device is a must-have for
            anyone looking to Bionic chip for lightning-fast performance. This
            system for breathtaking photos, and A13 system for breathtaking
            photos, and A13
          </p>

          {/* Seller Card */}
          <div className="flex items-center justify-between bg-white rounded-2xl border border-[#F0F1F5] shadow-[0_4px_4px_0px_rgba(0,0,0,0.1)] px-4 py-3.5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center overflow-hidden">
                <img
                  src={avatarImg.src}
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-xs font-semibold">Sarah Johnson</span>
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
                <span className="text-xs">99+ reviews</span>
              </div>
            </div>

            {/* Review Card */}
            <div className="bg-[#FFF5F3] rounded-2xl p-5 mb-3 text-xs">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} size={14} />
                ))}

                <span className="font-semibold ml-1">(5/5)</span>
              </div>

              <p className="font-semibold mb-1.5">Sofia L.</p>

              <p className="leading-[1.6] mb-4 text-[#374151]">
                &ldquo;Looks brand new! The fabric feels fresh and crisp.
                Can&apos;t believe I got this for half the price.&rdquo;
              </p>

              <p className="text-[#6B7280]">July 28, 2025</p>
            </div>

            <button className="w-full text-center text-primary text-xs font-light py-1">
              See all reviews
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 flex gap-3">
        <Button
          variant="outline"
          onClick={() => {}}
          fullWidth
          className="text-primary border-primary"
        >
          Make Offer
        </Button>

        <Button
          variant="primary"
          onClick={() => router.push("/confirm-order")}
          fullWidth
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default ItemDetailPage;
