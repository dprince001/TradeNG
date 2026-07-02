"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import IphoneImage from "@/app/assets/images/IphoneImage.png";
import CartIcon from "@/app/components/layout/CartIcon";
import TopNavbar from "@/app/components/layout/TopNavbar";
import LocationIcon from "@/app/assets/svgs/home/LocationIcon";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import InfoIcon from "@/app/assets/svgs/home/InfoIcon";
import UserIcon from "@/app/assets/svgs/home/UserIcon";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import Button from "@/app/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import MakeOfferModal from "@/app/components/MakeOfferModal";
import Link from "next/link";

type DeliveryMethod = "meetup" | "delivery";

const ConfirmOrderContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "iPhone 13 Pro Max";
  const originalPrice = parseFloat(searchParams.get("price") || "450000");
  const initialOfferPrice = searchParams.get("offerPrice")
    ? parseFloat(searchParams.get("offerPrice")!)
    : null;
  const initialAddress =
    searchParams.get("address") || "12 Broad Street, Lagos";

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("delivery");
  const [offerPrice, setOfferPrice] = useState<number | null>(
    initialOfferPrice,
  );
  const [address, setAddress] = useState<string>(initialAddress);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const isOffer = offerPrice !== null;
  const itemPrice = isOffer ? offerPrice : originalPrice;
  const serviceFee = Math.round(itemPrice * 0.005);
  const grandTotal = itemPrice + serviceFee;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen relative flex flex-col">
      {/* ── Header ── */}
      <TopNavbar
        title="Confirm Order"
        onBack={() => router.back()}
        rightElement={
          <button
            id="confirm-order-cart-btn"
            className="w-[42px] h-[42px] rounded-full bg-[#F5F6FA] text-[#1D1E20] hover:bg-brand-orange hover:text-white flex items-center justify-center relative transition-all duration-200 active:scale-95"
          >
            <CartIcon count={1} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pt-3">
        {/* ── Product Summary Card ── */}
        <div className="bg-white mx-4 rounded-2xl px-4 py-4 mb-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[70px] h-[70px] rounded-xl bg-[#F0F1F5] overflow-hidden flex-shrink-0 relative">
              <Image
                src={IphoneImage}
                alt={name}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-sm font-semibold mb-1 truncate">
                {name}
              </p>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-text-primary font-extrabold text-base">
                  {formatNaira(itemPrice)}
                </span>
                {isOffer && (
                  <span className="text-[10px] text-primary bg-[#FFF5F3] border border-primary/10 px-2 py-0.5 rounded font-bold">
                    Offer Applied
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex justify-center items-center w-4 h-4 rounded-full bg-[#D1FAE5]">
                  <UserIcon />
                </div>
                <span className="text-[#4B5563] text-[10px]">
                  TechHub Store
                </span>
                <VerifiedIcon />
              </div>
            </div>
          </div>

          {/* Make an Offer strip */}
          <Button className="mb-2" variant="brand-outline" fullWidth>
            <Link href={"/make-offer"}>Make an Offer</Link>
          </Button>
        </div>

        {/* ── Delivery Method ── */}
        <div className="bg-white mx-4 rounded-2xl px-4 py-4 mb-5 shadow-sm">
          <h2 className="text-text-primary text-sm font-bold mb-3">
            Delivery Method
          </h2>

          <button
            id="delivery-meetup-btn"
            onClick={() => setDeliveryMethod("meetup")}
            className={`w-full flex items-start gap-3 p-3.5 rounded-[14px] border-2 mb-2.5 text-left transition-all ${
              deliveryMethod === "meetup"
                ? "border-primary bg-[#FFF5F3]"
                : "border-[#E5E7EB] bg-white"
            }`}
          >
            <div
              className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all ${
                deliveryMethod === "meetup"
                  ? "border-primary"
                  : "border-[#D1D5DB]"
              }`}
            >
              {deliveryMethod === "meetup" && (
                <div className="w-[8px] h-[8px] rounded-full bg-primary" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <LocationIcon />
                <span className="text-text-primary text-sm font-semibold">
                  Meet in person
                </span>
              </div>

              <p className="text-text-secondary text-sm">
                Arrange a safe meetup location with the seller
              </p>
            </div>
          </button>

          <button
            id="delivery-request-btn"
            onClick={() => setDeliveryMethod("delivery")}
            className={`w-full flex items-start gap-3 p-3.5 rounded-[14px] border-2 text-left transition-all ${
              deliveryMethod === "delivery"
                ? "border-primary bg-[#FFF5F3]"
                : "border-[#E5E7EB] bg-white"
            }`}
          >
            <div
              className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all ${
                deliveryMethod === "delivery"
                  ? "border-primary"
                  : "border-[#D1D5DB]"
              }`}
            >
              {deliveryMethod === "delivery" && (
                <div className="w-[8px] h-[8px] rounded-full bg-primary" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                🚚
                <span className="text-text-primary text-sm font-semibold">
                  Request delivery
                </span>
              </div>

              <p className="text-text-secondary text-sm">
                Delivery via verified partners
              </p>
            </div>
          </button>
        </div>

        {/* ── Escrow Protection ── */}
        <div className="mx-4 mb-7">
          <div className="bg-[#FFF0EC] border border-[#FFCAB7] rounded-2xl px-4 py-4 flex items-start gap-3">
            <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <SecureIcon size={25} color="white" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-text-primary text-sm font-bold">
                  Escrow Protection
                </span>
                <InfoIcon />
              </div>

              <p className="text-[#374151] text-xs leading-[1.6]">
                Your payment will be held securely until you confirm delivery.
                This protects both buyers and sellers in every transaction.
              </p>
            </div>
          </div>
        </div>

        {/* ── Total Cost ── */}
        <div className="bg-white mx-4 rounded-2xl p-4 shadow-sm mb-5">
          <h2 className="text-text-primary text-sm font-bold mb-4">
            Total Cost
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Item Price</span>
              <span className="text-text-primary text-sm font-semibold">
                {formatNaira(itemPrice)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Service Fee</span>
              <span className="text-text-primary text-sm font-semibold">
                {formatNaira(serviceFee)}
              </span>
            </div>

            <div className="h-px bg-[#F0F1F5]" />
            <div className="flex items-center justify-between">
              <span className="text-text-primary font-bold">Grand Total</span>
              <span className="text-text-primary font-bold">
                {formatNaira(grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <Button
          fullWidth
          onClick={() =>
            router.push(
              `/payment?name=${encodeURIComponent(name)}&price=${itemPrice}`,
            )
          }
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

const ConfirmOrderPage = () => {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-text-secondary">
          Loading checkout details...
        </div>
      }
    >
      <ConfirmOrderContent />
    </Suspense>
  );
};

export default ConfirmOrderPage;
