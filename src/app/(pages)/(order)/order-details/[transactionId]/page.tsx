"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BadgeCheck,
  PackageCheck,
  Undo2,
  Star,
} from "lucide-react";
import BackButton from "@/app/components/layout/BackButton";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";
import Button from "@/app/components/Button";
import ProgressBar from "@/app/components/ProgressBar";
import { OrderSkeleton } from "@/app/components/Loader";
import { PageTransition } from "@/app/components/Motion";
import { formatNaira } from "@/lib/utils";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { statusMeta } from "@/app/components/profile/OrdersComponent";
import {
  useGetTransactionDetailQuery,
  useConfirmReceiptMutation,
  useReleasePaymentMutation,
  useRaiseDisputeMutation,
} from "@/app/redux/api/transactionsApiSlice";
import { useLeaveATransactionReviewMutation } from "@/app/redux/api/reviewsApiSlice";
import ConfirmReceiptModal from "./ConfirmReceiptModal";
import ConfirmReleaseModal from "../../confirm-delivery/ConfirmReleaseItem";
import ReportProblemModal from "../../confirm-delivery/ReportProblemModal";
import ReviewModal from "./ReviewModal";

const OrderDetailsPage = () => {
  const router = useRouter();
  const { transactionId } = useParams<{ transactionId: string }>();
  const { user } = useCurrentUser();
  const currentUserId = user?.user?.id;

  const [showConfirmReceipt, setShowConfirmReceipt] = useState(false);
  const [showConfirmRelease, setShowConfirmRelease] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const { data: transactionData, isFetching } = useGet(
    useGetTransactionDetailQuery,
    transactionId,
    Boolean(transactionId)
  );
  const { handlePost: confirmReceipt, isLoading: confirmingReceipt } = usePost(useConfirmReceiptMutation);
  const { handlePost: releasePayment, isLoading: releasing } = usePost(useReleasePaymentMutation);
  const { handlePost: raiseDispute, isLoading: disputing } = usePost(useRaiseDisputeMutation);
  const { handlePost: leaveReview, isLoading: submittingReview } = usePost(useLeaveATransactionReviewMutation);

  const transaction = transactionData?.transaction;
  const listing = transaction?.listing;
  const itemName = listing?.item_name || "this item";
  const isBuyer = Boolean(currentUserId && transaction?.buyer?.id === currentUserId);
  const counterparty = isBuyer ? transaction?.seller : transaction?.buyer;
  const counterpartyLabel = isBuyer ? "Seller" : "Buyer";
  const meta = statusMeta[transaction?.status] || statusMeta.PENDING_PAYMENT;

  const reviewedStorageKey = transactionId ? `reviewed_txn_${transactionId}` : "";

  useEffect(() => {
    if (reviewedStorageKey && localStorage.getItem(reviewedStorageKey) === "1") {
      setHasReviewed(true);
    }
  }, [reviewedStorageKey]);

  const markReviewed = () => {
    setHasReviewed(true);
    if (reviewedStorageKey) localStorage.setItem(reviewedStorageKey, "1");
  };

  const handleConfirmReceipt = async () => {
    if (!transactionId) return;
    const response = await confirmReceipt(transactionId);
    if (response?.success !== false) setShowConfirmReceipt(false);
  };

  const handleConfirmRelease = async () => {
    if (!transactionId) return;
    const response = await releasePayment(transactionId);
    if (response?.success !== false) {
      setShowConfirmRelease(false);
      if (isBuyer && !hasReviewed) setShowReviewModal(true);
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

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!transactionId || rating === 0) return;
    const response = await leaveReview(
      { transactionId, review: { rating, comment: comment || undefined } },
      { showSuccessToast: true }
    );
    if (response?.success !== false) {
      markReviewed();
      setShowReviewModal(false);
    } else if (response?.error?.toLowerCase().includes("already reviewed")) {
      markReviewed();
      setShowReviewModal(false);
    }
  };

  return (
    <AppShell showFooter={false} showBottomNav={false}>
      <div className="w-full bg-[#F7F8FA] min-h-full flex flex-col relative">
        <Container className="max-w-2xl flex items-center gap-3 pt-6 pb-4">
          <BackButton fallbackHref="/profile/orders" />
          <h1 className="text-text-primary font-semibold text-base tracking-wide">Order Details</h1>
        </Container>

        <Container className="max-w-2xl flex-1 pb-10">
          {isFetching || !transaction ? (
            <OrderSkeleton />
          ) : (
            <PageTransition className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex gap-4">
                  <div className="w-[84px] h-[84px] rounded-xl bg-[#F0F1F5] overflow-hidden flex-shrink-0 relative">
                    {listing?.images?.[0] && (
                      <img
                        src={listing.images[0]}
                        alt={itemName}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <h2 className="text-text-primary text-sm font-bold leading-snug truncate">
                        {itemName}
                      </h2>
                      <p className="text-text-tertiary text-xs mt-1">
                        Order #{transaction.id?.slice(-8)}
                      </p>
                    </div>
                    <div>
                      <span className="text-primary text-base font-extrabold block">
                        {formatNaira(transaction.amount)}
                      </span>
                      <span className="text-[10px] text-text-tertiary block mt-0.5">
                        Ordered on {new Date(transaction.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-50 mt-4 pt-4">
                  <ProgressBar
                    title="Order Status"
                    progress={meta.progress}
                    comment={meta.comment}
                    color={meta.color}
                  />
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                    <span className={`text-[10px] font-semibold ${meta.text}`}>
                      {transaction.status?.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => counterparty?.id && router.push(`/profile/${counterparty.id}`)}
                className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FF4304]/10 to-[#FF8C39]/10 text-primary flex items-center justify-center text-sm font-bold border border-primary/5 flex-shrink-0">
                    {counterparty?.first_name?.[0]}
                    {counterparty?.last_name?.[0]}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-text-tertiary font-semibold uppercase tracking-wider block">
                      {counterpartyLabel}
                    </span>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-text-primary text-sm font-bold truncate">
                        {counterparty?.first_name} {counterparty?.last_name}
                      </span>
                      {counterparty?.is_verified_seller && (
                        <BadgeCheck size={14} className="text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
              </button>

              <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                <h3 className="text-text-primary text-xs font-extrabold uppercase tracking-wider">
                  Payment Breakdown
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Item Price</span>
                  <span className="text-text-primary font-semibold">
                    {formatNaira(transaction.amount - transaction.platform_fee)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Platform Fee</span>
                  <span className="text-text-primary font-semibold">
                    {formatNaira(transaction.platform_fee)}
                  </span>
                </div>
                <div className="h-px bg-[#F0F1F5]" />
                <div className="flex items-center justify-between">
                  <span className="text-text-primary font-bold">Total</span>
                  <span className="text-text-primary font-bold">{formatNaira(transaction.amount)}</span>
                </div>
              </div>

              {transaction.status === "PENDING_PAYMENT" && (
                <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
                  <div className="w-[56px] h-[56px] rounded-full bg-amber-50 flex items-center justify-center mb-4">
                    <Clock size={26} className="text-amber-500" />
                  </div>
                  {isBuyer ? (
                    <>
                      <h2 className="text-text-primary text-base font-bold mb-2">Payment Pending</h2>
                      <p className="text-text-tertiary text-sm leading-[1.6] mb-4">
                        Complete payment to move this order into escrow.
                      </p>
                      <Button fullWidth onClick={() => router.push(`/payment/${transaction.id}`)}>
                        Pay {formatNaira(transaction.amount)} Now
                      </Button>
                    </>
                  ) : (
                    <p className="text-text-tertiary text-sm leading-[1.6]">
                      Waiting for the buyer to complete payment.
                    </p>
                  )}
                </div>
              )}

              {transaction.status === "PAID" && (
                <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
                  <div className="w-[56px] h-[56px] rounded-full bg-[#FFF0EC] flex items-center justify-center mb-4">
                    <PackageCheck size={26} className="text-primary" />
                  </div>
                  {isBuyer ? (
                    <>
                      <h2 className="text-text-primary text-base font-bold mb-2">
                        Have you received your item?
                      </h2>
                      <p className="text-text-tertiary text-sm leading-[1.6] mb-5">
                        Confirm receipt of {itemName} to start the release process, or report a
                        problem if something is wrong.
                      </p>
                      <Button
                        fullWidth
                        onClick={() => setShowConfirmReceipt(true)}
                        className="mb-3 font-bold shadow-[0_4px_12px_rgba(255,67,4,0.15)]"
                      >
                        Confirm Receipt
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        className="border-primary text-primary font-bold"
                        onClick={() => setShowReportModal(true)}
                      >
                        Report a Problem
                      </Button>
                    </>
                  ) : (
                    <p className="text-text-tertiary text-sm leading-[1.6]">
                      Payment is secured in escrow. Waiting for the buyer to confirm receipt.
                    </p>
                  )}
                </div>
              )}

              {transaction.status === "RECEIPT_CONFIRMED" && (
                <div className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
                  <div className="w-[56px] h-[56px] rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <ShieldCheck size={26} className="text-blue-500" />
                  </div>
                  <h2 className="text-text-primary text-base font-bold mb-2">Receipt Confirmed</h2>
                  <p className="text-text-tertiary text-sm leading-[1.6] mb-5">
                    {transaction.auto_release_at
                      ? `Funds auto-release to the seller on ${new Date(
                          transaction.auto_release_at
                        ).toLocaleString()} unless a dispute is raised.`
                      : "Funds will auto-release to the seller unless a dispute is raised."}
                  </p>

                  {isBuyer && (
                    <>
                      <Button
                        fullWidth
                        onClick={() => setShowConfirmRelease(true)}
                        className="mb-3 font-bold shadow-[0_4px_12px_rgba(255,67,4,0.15)]"
                      >
                        Release Payment Now
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        className="border-primary text-primary font-bold"
                        onClick={() => setShowReportModal(true)}
                      >
                        Report a Problem
                      </Button>
                    </>
                  )}
                </div>
              )}

              {transaction.status === "DISPUTED" && (
                <div className="bg-[#FFE8E0] border border-[#FFB899] rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
                  <div className="w-[56px] h-[56px] rounded-full bg-white flex items-center justify-center mb-4">
                    <AlertTriangle size={26} className="text-red-500" />
                  </div>
                  <h2 className="text-[#C03000] text-base font-bold mb-2">Dispute Under Review</h2>
                  <p className="text-[#C03000] text-sm leading-[1.6] mb-5">
                    Payment is on hold while our team reviews this dispute.
                  </p>
                  <Button fullWidth onClick={() => router.push("/dispute-center")}>
                    View Dispute Center
                  </Button>
                </div>
              )}

              {transaction.status === "RELEASED" && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
                  <div className="w-[56px] h-[56px] rounded-full bg-white flex items-center justify-center mb-4">
                    <CheckCircle2 size={26} className="text-green-600" />
                  </div>
                  <h2 className="text-green-700 text-base font-bold mb-2">Order Complete</h2>
                  <p className="text-green-700 text-sm leading-[1.6] mb-4">
                    Funds have been released to the seller.
                  </p>

                  {isBuyer &&
                    (hasReviewed ? (
                      <div className="flex items-center gap-1.5 text-green-700 text-xs font-semibold">
                        <Star size={14} fill="#F59E0B" stroke="#F59E0B" />
                        Thanks for reviewing this order
                      </div>
                    ) : (
                      <Button
                        fullWidth
                        onClick={() => setShowReviewModal(true)}
                        className="font-bold shadow-[0_4px_12px_rgba(255,67,4,0.15)]"
                      >
                        Leave a Review
                      </Button>
                    ))}
                </div>
              )}

              {transaction.status === "REFUNDED" && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
                  <div className="w-[56px] h-[56px] rounded-full bg-white flex items-center justify-center mb-4">
                    <Undo2 size={26} className="text-gray-500" />
                  </div>
                  <h2 className="text-gray-700 text-base font-bold mb-2">Order Refunded</h2>
                  <p className="text-gray-500 text-sm leading-[1.6]">
                    This order was refunded to the buyer.
                  </p>
                </div>
              )}

              <div className="bg-[#F3F4F6] rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                <ShieldCheck size={18} className="text-[#4B5563] mt-0.5 flex-shrink-0" />
                <p className="text-[#374151] text-xs leading-[1.6] font-medium">
                  Escrow protection keeps your payment secure until the buyer confirms delivery. If
                  something goes wrong, either party can report it for platform review.
                </p>
              </div>
            </PageTransition>
          )}
        </Container>

        {showConfirmReceipt && (
          <ConfirmReceiptModal
            itemName={itemName}
            onConfirm={handleConfirmReceipt}
            onCancel={() => setShowConfirmReceipt(false)}
            isLoading={confirmingReceipt}
          />
        )}

        {showConfirmRelease && (
          <ConfirmReleaseModal
            amount={transaction?.amount || 0}
            onConfirm={handleConfirmRelease}
            onCancel={() => setShowConfirmRelease(false)}
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

        {showReviewModal && (
          <ReviewModal
            revieweeName={`${counterparty?.first_name || ""} ${counterparty?.last_name || ""}`.trim() || counterpartyLabel}
            revieweeLabel={counterpartyLabel.toLowerCase()}
            onSubmit={handleSubmitReview}
            onCancel={() => setShowReviewModal(false)}
            isLoading={submittingReview}
          />
        )}
      </div>
    </AppShell>
  );
};

export default OrderDetailsPage;
