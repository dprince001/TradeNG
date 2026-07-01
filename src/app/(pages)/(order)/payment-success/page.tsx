"use client";

import { Suspense } from "react";
import Image from "next/image";
import IphoneImage from "@/app/assets/images/IphoneImage.png";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import SuccessIcon from "@/app/assets/svgs/home/SuccessIcon";
import Button from "@/app/components/Button";
import ShippingIcon from "@/app/assets/svgs/home/ShippingIcon";
import DeliveryIcon from "@/app/assets/svgs/home/DeliveryIcon";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const itemName = searchParams.get("name") || "iPhone 13 Pro Max";
  const totalAmount = parseFloat(searchParams.get("total") || "457250");

  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] flex flex-col">
      <div className="flex flex-col items-center pt-14 mb-4 px-6 text-center">
        <div className="p-2 bg-[#FFE8E0] rounded-full">
          <div className="bg-primary rounded-full flex items-center justify-center w-20 h-20">
            <SuccessIcon size={48} />
          </div>
        </div>

        <h2 className="text-xl font-bold my-2">Payment Successful!</h2>

        <p className="text-sm leading-[1.65] text-[#4B5563]">
          Your payment is held safely in escrow. We will notify the seller to
          deliver your item.
        </p>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[56px] h-[56px] rounded-xl bg-[#F0F1F5] overflow-hidden flex-shrink-0 relative">
            <Image
              src={IphoneImage}
              alt={itemName}
              fill
              className="object-contain"
            />
          </div>

          <div>
            <p className="text-text-primary text-sm font-semibold mb-1">
              {itemName}
            </p>
            <p className="text-text-tertiary text-xs">Order #DEC-2024-001</p>
          </div>
        </div>

        {/* Escrow badge */}
        <div className="flex items-center gap-2 bg-[#FFE8E0] border border-[#FFB899] rounded-xl px-3 py-2.5">
          <SecureIcon size={16} color="#FF4304" />
          <span className="text-[#C03000] text-[10px] font-bold">
            {formatNaira(totalAmount)} held in escrow
          </span>
        </div>
      </div>

      {/* ── Order Timeline ── */}
      <div className="mx-4 my-4 bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-text-primary text-sm font-bold mb-4">Order Timeline</h2>

        <div className="relative pl-8">
          {/* Vertical connecting line */}
          <div className="absolute left-[15px] top-[22px] w-[2px] bg-[#E5E7EB] bottom-[22px]" />

          {/* Completed */}
          <div className="relative flex flex-col mb-6">
            <div className="absolute -left-8 w-[30px] h-[30px] rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <SuccessIcon size={20} />
            </div>

            <div className="ml-2">
              <p className="text-text-primary text-sm font-semibold">
                Payment Held in Escrow
              </p>
              <p className="text-text-tertiary text-xs my-1">
                Your payment is secured
              </p>
              <span className="text-primary text-[10px] block font-bold">Completed</span>
            </div>
          </div>

          {/* In Progress */}
          <div className="relative flex flex-col mb-6">
            <div className="absolute -left-8 w-[30px] h-[30px] rounded-full bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center flex-shrink-0">
              <ShippingIcon size={16} color="#D97706" />
            </div>

            <div className="ml-2">
              <p className="text-text-primary text-sm font-semibold">
                Seller Ships Item
              </p>
              <p className="text-text-tertiary text-xs my-1">
                Waiting for seller to dispatch
              </p>
              <span className="text-[#D97706] text-[10px] block font-bold">In Progress</span>
            </div>
          </div>

          {/* Pending */}
          <div className="relative flex flex-col">
            <div className="absolute -left-8 w-[30px] h-[30px] rounded-full bg-[#F3F4F6] border-2 border-[#9CA3AF] flex items-center justify-center flex-shrink-0">
              <DeliveryIcon size={16} color="#9CA3AF" />
            </div>

            <div className="ml-2">
              <p className="text-text-primary text-sm font-semibold">
                Confirm Delivery
              </p>
              <p className="text-text-tertiary text-xs my-1">
                Release payment to seller
              </p>
              <span className="text-[#6B7280] text-[10px] block font-bold">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTAs ── */}
      <div className="px-5 pt-6 pb-4 space-y-3 mt-auto">
        <Button
          fullWidth
          onClick={() =>
            router.push(
              `/confirm-delivery?name=${encodeURIComponent(
                itemName
              )}&total=${totalAmount}`
            )
          }
          className="font-bold shadow-[0_4px_12px_rgba(255,67,4,0.15)]"
        >
          Track Order
        </Button>

        <Button
          variant="outline"
          fullWidth
          className="border-primary text-primary font-bold hover:bg-[#FFF5F3]/50 transition-colors"
          onClick={() => {}} // TODO: Message seller
        >
          Message Seller
        </Button>

        <Button
          variant="ghost"
          fullWidth
          onClick={() => router.push("/")}
          className="text-text-tertiary font-medium hover:bg-gray-100 transition-colors"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-text-secondary">Loading payment confirmation...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
