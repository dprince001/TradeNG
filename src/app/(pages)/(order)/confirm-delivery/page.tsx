"use client";

import { useState, Suspense } from "react";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import InfoIcon from "@/app/assets/svgs/home/InfoIcon";
import Button from "@/app/components/Button";
import ConfirmReleaseModal from "./ConfirmReleaseItem";
import ReportProblemModal from "./ReportProblemModal";
import { useRouter, useSearchParams } from "next/navigation";
import ProductInEscrow from "./ProductInEscrow";
import BackButton from "@/app/components/layout/BackButton";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";
import { formatNaira } from "@/lib/utils";
import { OrderSkeleton } from "@/app/components/Loader";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import {
  useGetTransactionDetailQuery,
  useReleasePaymentMutation,
  useRaiseDisputeMutation,
} from "@/app/redux/api/transactionsApiSlice";

const ConfirmDeliveryContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("id");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const { data: transactionData, isFetching } = useGet(
    useGetTransactionDetailQuery,
    transactionId,
    Boolean(transactionId)
  );
  const { handlePost: releasePayment, isLoading: releasing } = usePost(useReleasePaymentMutation);
  const { handlePost: raiseDispute, isLoading: disputing } = usePost(useRaiseDisputeMutation);

  const transaction = transactionData?.transaction;
  const listing = transaction?.listing;
  const itemName = listing?.item_name || "your item";

  const handleConfirmRelease = async () => {
    if (!transactionId) return;
    const response = await releasePayment(transactionId);
    if (response?.success !== false) {
      setShowConfirmModal(false);
      router.push("/profile/orders");
    }
  };

  const handleReportProblem = async (description: string) => {
    if (!transactionId) return;
    const response = await raiseDispute({ id: transactionId, description });
    if (response?.success !== false) {
      setShowReportModal(false);
      router.push("/dispute-center");
    }
  };

  return (
    <AppShell showFooter={false} showBottomNav={false}>
      <div className="w-full bg-[#F7F8FA] flex flex-col relative">
        <Container className="max-w-2xl flex items-center gap-3 pt-6 pb-4">
          <BackButton />
          <h1 className="text-text-primary font-semibold text-base tracking-wide">Confirm delivery</h1>
        </Container>

        <Container className="max-w-2xl flex-1 overflow-y-auto pt-4 pb-6">
          {isFetching || !transaction ? (
            <OrderSkeleton />
          ) : (
            <>
              <ProductInEscrow
                itemName={itemName}
                totalAmount={transaction.amount}
                formatNaira={formatNaira}
                image={listing?.images?.[0]}
                orderRef={transaction.id?.slice(-8)}
              />

              <div className="mt-4 bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
                <div className="w-[64px] h-[64px] rounded-full bg-[#FFF0EC] flex items-center justify-center mb-4">
                  <span className="text-[30px]">📦</span>
                </div>

                <h2 className="text-text-primary text-lg font-bold mb-4">
                  Have you received your item?
                </h2>
                <p className="text-text-tertiary text-md leading-[1.65] mb-5">
                  Please confirm that you have received your {itemName} in good condition.
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
                  onClick={() => setShowReportModal(true)}
                >
                  Report a Problem
                </Button>
              </div>

              <div className="mt-4 bg-[#FFE8E0] border border-[#FFB899] rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                <div className="mt-0.5 flex-shrink-0">
                  <SecureIcon size={18} color="#FF4304" />
                </div>
                <div className="text-[#C03000]">
                  <p className="text-lg font-bold mb-1">Escrow Protection Active</p>
                  <p className="text-md leading-[1.6] font-medium">
                    Once you confirm delivery, the funds will be released to the seller. If there
                    is an issue, report it and we will help resolve the matter.
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-[#F3F4F6] rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                <div className="mt-0.5 flex-shrink-0">
                  <InfoIcon color="#4B5563" />
                </div>
                <div className="text-[#374151]">
                  <p className="text-text-primary text-lg font-semibold mb-1">Important Notice</p>
                  <p className="text-md leading-[1.6] font-medium">
                    Only confirm delivery if you have physically received and inspected the item.
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </>
          )}
        </Container>

        {showConfirmModal && (
          <ConfirmReleaseModal
            amount={transaction?.amount || 0}
            onConfirm={handleConfirmRelease}
            onCancel={() => setShowConfirmModal(false)}
            isLoading={releasing}
          />
        )}

        {showReportModal && (
          <ReportProblemModal
            isLoading={disputing}
            onSubmit={handleReportProblem}
            onCancel={() => setShowReportModal(false)}
          />
        )}
      </div>
    </AppShell>
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
