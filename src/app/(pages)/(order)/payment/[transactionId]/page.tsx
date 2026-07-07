"use client";

import BackButton from "@/app/components/layout/BackButton";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import LockIcon from "@/app/assets/svgs/home/LockIcon";
import Button from "@/app/components/Button";
import { useRouter, useParams } from "next/navigation";
import { formatNaira } from "@/lib/utils";
import { OrderSkeleton } from "@/app/components/Loader";
import { PageTransition } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import {
  useGetTransactionDetailQuery,
  useStartCheckoutMutation,
} from "@/app/redux/api/transactionsApiSlice";

const PaymentPage = () => {
  const router = useRouter();
  const { transactionId } = useParams<{ transactionId: string }>();

  const { data: transactionData, isFetching } = useGet(
    useGetTransactionDetailQuery,
    transactionId,
    Boolean(transactionId),
  );
  const { handlePost: startCheckout, isLoading: checkingOut } = usePost(
    useStartCheckoutMutation,
  );

  const transaction = transactionData?.transaction;

  const handlePay = async () => {
    if (!transactionId) return;

    const response = await startCheckout(
      { id: transactionId },
      { showSuccessToast: false },
    );
    const checkoutLink = response?.data?.checkout_link;

    if (checkoutLink) {
      window.location.href = checkoutLink;
    }
  };

  return (
    <AppShell showFooter={false} showBottomNav={false}>
      <div className="w-full bg-[#F7F8FA] relative flex flex-col">
        <Container className="max-w-2xl flex items-center gap-3 pt-6 pb-4">
          <BackButton />
          <h1 className="text-text-primary font-semibold text-base tracking-wide">
            Payment
          </h1>
        </Container>

        <Container className="max-w-2xl flex-1 overflow-y-auto pt-3">
          {isFetching || !transaction ? (
            <OrderSkeleton />
          ) : (
            <PageTransition>
              <div className="bg-white rounded-2xl p-4 shadow-md mb-5">
                <h2 className="text-text-primary text-sm font-bold mb-4">
                  Payment Summary
                </h2>

                <div className="space-y-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">
                      Item Total
                    </span>
                    <span className="text-text-primary text-sm font-semibold">
                      {formatNaira(
                        transaction.amount - transaction.platform_fee,
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">
                      Platform Fee
                    </span>
                    <span className="text-text-primary text-sm font-semibold">
                      {formatNaira(transaction.platform_fee)}
                    </span>
                  </div>

                  <div className="h-px bg-[#F0F1F5]" />
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary font-bold">
                      Total Amount
                    </span>
                    <span className="text-text-primary font-bold">
                      {formatNaira(transaction.amount)}
                    </span>
                  </div>
                </div>

                <div className="bg-[#FFE8E0] border border-[#FFB899] rounded-[12px] px-3.5 py-3 flex gap-2 items-center">
                  <SecureIcon size={22} color="#FF4304" />
                  <p className="text-[#C03000] text-[10px] leading-[1.5]">
                    Your payment will be held securely in escrow until you
                    confirm delivery
                  </p>
                </div>
              </div>

              <div className="pb-2">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-11 h-11 rounded-full bg-[#FFE8E0] flex items-center justify-center">
                      <LockIcon size={20} color="#FF4304" />
                    </div>
                    <span className="text-[#4B5563] text-[10px]">Secure</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-11 h-11 rounded-full bg-[#FFE8E0] flex items-center justify-center">
                      <SecureIcon size={20} color="#FF4304" />
                    </div>
                    <span className="text-[#4B5563] text-[10px]">
                      Protected
                    </span>
                  </div>
                </div>
              </div>
            </PageTransition>
          )}
        </Container>

        <Container className="max-w-2xl py-4">
          <Button
            onClick={handlePay}
            disabled={!transaction}
            loading={checkingOut}
            fullWidth
            className="font-bold bg-primary border-primary hover:bg-primary/95 text-white py-3.5 rounded-xl shadow-[0_4px_12px_rgba(255,67,4,0.15)]"
          >
            Pay {transaction ? formatNaira(transaction.amount) : ""} Securely
          </Button>
        </Container>
      </div>
    </AppShell>
  );
};

export default PaymentPage;
