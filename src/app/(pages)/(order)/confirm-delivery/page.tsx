"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import BackIcon from "@/app/assets/svgs/home/BackIcon";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import InfoIcon from "@/app/assets/svgs/home/InfoIcon";
import Button from "@/app/components/Button";
import ConfirmReleaseModal from "./ConfirmReleaseItem";
import { useRouter, useSearchParams } from "next/navigation";
import ProductInEscrow from "./ProductInEscrow";
import TopNavbar from "@/app/components/layout/TopNavbar";

const ConfirmDeliveryContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const itemName = searchParams.get("name") || "iPhone 13 Pro Max";
  const totalAmount = parseFloat(searchParams.get("total") || "457250");

  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] flex flex-col relative">
      {/* ── Header ── */}
      <TopNavbar title="Confirm delivery" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pt-4 pb-6">
        {/* ── Order Card ── */}
        <ProductInEscrow
          itemName={itemName}
          totalAmount={totalAmount}
          formatNaira={formatNaira}
        />

        {/* ── Have you received section ── */}
        <div className="mx-4 mt-4 bg-white rounded-2xl p-5 m-4 flex flex-col items-center text-center shadow-sm">
          <div className="w-[64px] h-[64px] rounded-full bg-[#FFF0EC] flex items-center justify-center mb-4">
            <span className="text-[30px]">📦</span>
          </div>

          <h2 className="text-text-primary text-lg font-bold mb-4">
            Have you received your item?
          </h2>
          <p className="text-text-tertiary text-md leading-[1.65] mb-5">
            Please confirm that you have received your {itemName} in good
            condition.
          </p>

          <Button
            fullWidth
            onClick={() => setShowConfirmModal(true)}
            className="mb-3 font-bold shadow-[0_4px_12px_rgba(255,67,4,0.15)]"
          >
            Yes, Release Payment
          </Button>

          <Button
            variant="outline"
            fullWidth
            className="border-primary text-primary font-bold hover:bg-[#FFF5F3]/50 transition-all"
            onClick={() => {}} // TODO: Handle Report Problem
          >
            Report a Problem
          </Button>
        </div>

        {/* ── Escrow Protection Active ── */}
        <div className="mx-4 bg-[#FFE8E0] border border-[#FFB899] rounded-2xl p-4 mb-4 flex items-start gap-3 shadow-sm">
          <div className="mt-0.5 flex-shrink-0">
            <SecureIcon size={18} color="#FF4304" />
          </div>

          <div className="text-[#C03000]">
            <p className="text-lg font-bold mb-1">Escrow Protection Active</p>
            <p className="text-md leading-[1.6] font-medium">
              Once you confirm delivery, the funds will be released to the
              seller. If there is an issue, report it and we will help resolve
              the matter.
            </p>
          </div>
        </div>

        {/* ── Important Notice ── */}
        <div className="mx-4 bg-[#F3F4F6] rounded-2xl p-4 flex items-start gap-3 shadow-sm">
          <div className="mt-0.5 flex-shrink-0">
            <InfoIcon color="#4B5563" />
          </div>

          <div className="text-[#374151]">
            <p className="text-text-primary text-lg font-semibold mb-1">
              Important Notice
            </p>
            <p className="text-md leading-[1.6] font-medium">
              Only confirm delivery if you have physically received and
              inspected the item. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      {/* ── Confirm Release Modal ── */}
      {showConfirmModal && (
        <ConfirmReleaseModal
          amount={totalAmount}
          onConfirm={() => {
            setShowConfirmModal(false);
            router.push("/");
          }}
          onCancel={() => setShowConfirmModal(false)}
          onReportProblem={() => {
            setShowConfirmModal(false);
          }}
        />
      )}
    </div>
  );
};

const ConfirmDeliveryPage = () => {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-text-secondary">
          Loading delivery details...
        </div>
      }
    >
      <ConfirmDeliveryContent />
    </Suspense>
  );
};

export default ConfirmDeliveryPage;
