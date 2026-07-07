"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { XCircle, RotateCcw, AlertTriangle } from "lucide-react";
import SuccessIcon from "@/app/assets/svgs/home/SuccessIcon";
import ShippingIcon from "@/app/assets/svgs/home/ShippingIcon";
import DeliveryIcon from "@/app/assets/svgs/home/DeliveryIcon";
import Button from "@/app/components/Button";
import ProductInEscrow from "../../confirm-delivery/ProductInEscrow";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";
import { formatNaira } from "@/lib/utils";
import { Spinner } from "@/app/components/Loader";
import { PageTransition } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import {
  useGetTransactionDetailQuery,
  useLazyVerifyCheckoutPaymentQuery,
} from "@/app/redux/api/transactionsApiSlice";
import { useStartConversationMutation } from "@/app/redux/api/chatApiSlice";

type VerificationPhase =
  | "checking"
  | "success"
  | "failed"
  | "reversed"
  | "disputed";

const MAX_VERIFY_ATTEMPTS = 6;
const VERIFY_RETRY_DELAY_MS = 3000;

const phaseFromStatus = (status?: string): VerificationPhase | null => {
  if (
    status === "PAID" ||
    status === "RECEIPT_CONFIRMED" ||
    status === "RELEASED"
  )
    return "success";
  if (status === "REFUNDED") return "reversed";
  if (status === "DISPUTED") return "disputed";
  return null;
};

const PaymentStatusPage = () => {
  const router = useRouter();
  const { transactionId } = useParams<{ transactionId: string }>();

  const [phase, setPhase] = useState<VerificationPhase>("checking");
  const [retryKey, setRetryKey] = useState(0);
  const attemptsRef = useRef(0);
  const cancelledRef = useRef(false);

  const [triggerVerify] = useLazyVerifyCheckoutPaymentQuery();

  useEffect(() => {
    if (!transactionId) return;
    cancelledRef.current = false;
    attemptsRef.current = 0;

    const runCheck = async () => {
      attemptsRef.current += 1;
      const result = await triggerVerify(transactionId)
        .unwrap()
        .catch(() => null);
      if (cancelledRef.current) return;

      const resolvedPhase = phaseFromStatus(result?.data?.status);
      if (resolvedPhase) {
        setPhase(resolvedPhase);
        return;
      }

      if (attemptsRef.current >= MAX_VERIFY_ATTEMPTS) {
        setPhase("failed");
        return;
      }

      setTimeout(runCheck, VERIFY_RETRY_DELAY_MS);
    };

    runCheck();

    return () => {
      cancelledRef.current = true;
    };
  }, [transactionId, triggerVerify, retryKey]);

  const { data: transactionData, isFetching: transactionLoading } = useGet(
    useGetTransactionDetailQuery,
    transactionId,
    phase !== "checking" && Boolean(transactionId),
  );
  const { handlePost: startConversation, isLoading: messaging } = usePost(
    useStartConversationMutation,
  );

  const transaction = transactionData?.transaction;
  const listing = transaction?.listing;
  const itemName = listing?.item_name || "your item";

  const handleMessageSeller = async () => {
    if (!listing?.id) return;
    const response = await startConversation(
      { listing_id: listing.id },
      { showSuccessToast: false },
    );
    if (response?.success) {
      router.push(`/chat?c_id=${response?.data?.conversation?.id}`);
    }
  };

  const handleRetryVerification = () => {
    setPhase("checking");
    setRetryKey((k) => k + 1);
  };

  if (phase === "checking") {
    return (
      <AppShell showFooter={false} showBottomNav={false}>
        <div className="w-full min-h-[70vh] bg-[#F7F8FA] flex flex-col items-center justify-center text-center px-6">
          <Spinner className="w-10 h-10 text-primary" />
          <h2 className="text-text-primary text-lg font-bold mt-5">
            Verifying your payment...
          </h2>
          <p className="text-text-secondary text-sm mt-2 max-w-xs leading-relaxed">
            Please hold on while we confirm your payment with Nomba. This can
            take a few seconds.
          </p>
        </div>
      </AppShell>
    );
  }

  if (phase === "failed") {
    return (
      <AppShell showFooter={false} showBottomNav={false}>
        <div className="w-full min-h-[70vh] bg-[#F7F8FA] flex flex-col items-center justify-center text-center px-6">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-text-primary text-xl font-bold mt-5">
            Payment not completed
          </h2>
          <p className="text-text-secondary text-sm mt-2 max-w-sm leading-relaxed">
            We couldn't confirm your payment. It may have been cancelled or
            declined. No funds have left your account for this attempt.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs mt-7">
            <Button
              fullWidth
              onClick={() => router.push(`/payment/${transactionId}`)}
            >
              Try Payment Again
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={handleRetryVerification}
            >
              Check Again
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => router.push("/profile/orders")}
            >
              View My Orders
            </Button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (phase === "reversed") {
    return (
      <AppShell showFooter={false} showBottomNav={false}>
        <div className="w-full min-h-[70vh] bg-[#F7F8FA] flex flex-col items-center justify-center text-center px-6">
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
            <RotateCcw className="w-9 h-9 text-amber-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-text-primary text-xl font-bold mt-5">
            Payment refunded
          </h2>
          <p className="text-text-secondary text-sm mt-2 max-w-sm leading-relaxed">
            This payment was reversed and refunded back to your original payment
            method.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs mt-7">
            <Button fullWidth onClick={() => router.push("/profile/wallet")}>
              View Wallet
            </Button>
            <Button variant="ghost" fullWidth onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (phase === "disputed") {
    return (
      <AppShell showFooter={false} showBottomNav={false}>
        <div className="w-full min-h-[70vh] bg-[#F7F8FA] flex flex-col items-center justify-center text-center px-6">
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
            <AlertTriangle
              className="w-9 h-9 text-amber-500"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="text-text-primary text-xl font-bold mt-5">
            Transaction under review
          </h2>
          <p className="text-text-secondary text-sm mt-2 max-w-sm leading-relaxed">
            This transaction has an open dispute. Our team is reviewing it and
            funds will stay in escrow until it's resolved.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs mt-7">
            <Button fullWidth onClick={() => router.push("/dispute-center")}>
              Go to Dispute Center
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => router.push("/profile/orders")}
            >
              View My Orders
            </Button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell showFooter={false} showBottomNav={false}>
      <div className="w-full bg-[#F7F8FA] flex flex-col">
        <div className="flex flex-col items-center pt-14 mb-4 px-6 text-center">
          <div className="p-2 bg-[#FFE8E0] rounded-full">
            <div className="bg-primary rounded-full flex items-center justify-center w-20 h-20">
              <SuccessIcon size={48} />
            </div>
          </div>

          <h2 className="text-2xl font-bold my-2">Payment Successful!</h2>

          <p className="text-sm px-10 leading-[1.65] text-[#4B5563]">
            Your payment is held safely in escrow. We will notify the seller to
            deliver your item.
          </p>
        </div>

        <Container className="max-w-2xl">
          {transactionLoading || !transaction ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : (
            <PageTransition>
              <ProductInEscrow
                itemName={itemName}
                totalAmount={transaction.amount}
                formatNaira={formatNaira}
                image={listing?.images?.[0]}
                orderRef={transaction.id?.slice(-8)}
              />

              <div className="my-4 bg-white rounded-2xl p-4 shadow-sm">
                <h2 className="text-text-primary text-sm font-bold mb-4">
                  Order Timeline
                </h2>

                <div className="relative pl-8">
                  <div className="absolute left-[15px] top-[22px] w-[2px] bg-[#E5E7EB] bottom-[22px]" />

                  <div className="relative flex flex-col mb-10">
                    <div className="absolute -left-8 w-[30px] h-[30px] rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <SuccessIcon size={20} />
                    </div>
                    <div className="ml-2">
                      <p className="text-text-primary text-md font-semibold">
                        Payment Held in Escrow
                      </p>
                      <p className="text-text-tertiary text-sm my-1">
                        Your payment is secured
                      </p>
                      <span className="text-primary text-sm block font-bold">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="relative flex flex-col mb-10">
                    <div className="absolute -left-8 w-[30px] h-[30px] rounded-full bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center flex-shrink-0">
                      <ShippingIcon size={16} color="#D97706" />
                    </div>
                    <div className="ml-2">
                      <p className="text-text-primary text-md font-semibold">
                        Seller Ships Item
                      </p>
                      <p className="text-text-tertiary text-sm my-1">
                        Waiting for seller to dispatch
                      </p>
                      <span className="text-[#D97706] text-sm block font-bold">
                        In Progress
                      </span>
                    </div>
                  </div>

                  <div className="relative flex flex-col">
                    <div className="absolute -left-8 w-[30px] h-[30px] rounded-full bg-[#F3F4F6] border-2 border-[#9CA3AF] flex items-center justify-center flex-shrink-0">
                      <DeliveryIcon size={16} color="#9CA3AF" />
                    </div>
                    <div className="ml-2">
                      <p className="text-text-primary text-md font-semibold">
                        Confirm Delivery
                      </p>
                      <p className="text-text-tertiary text-sm my-1">
                        Release payment to seller
                      </p>
                      <span className="text-[#6B7280] text-sm block font-bold">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </PageTransition>
          )}
        </Container>

        <Container className="max-w-2xl pt-6 pb-4 space-y-3 mt-auto">
          <Button
            fullWidth
            disabled={!transaction}
            onClick={() => router.push(`/profile/orders`)}
            className="font-bold text-md"
          >
            View Orders
          </Button>

          <Button
            variant="outline"
            fullWidth
            loading={messaging}
            disabled={!listing}
            className="border-primary text-md text-primary font-bold hover:bg-[#FFF5F3]/50 transition-colors"
            onClick={handleMessageSeller}
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
        </Container>
      </div>
    </AppShell>
  );
};

export default PaymentStatusPage;
