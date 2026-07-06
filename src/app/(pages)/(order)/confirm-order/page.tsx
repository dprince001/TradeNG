"use client";

import { Suspense } from "react";
import CartIcon from "@/app/components/layout/CartIcon";
import TopNavbar from "@/app/components/layout/TopNavbar";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";
import LocationIcon from "@/app/assets/svgs/home/LocationIcon";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import InfoIcon from "@/app/assets/svgs/home/InfoIcon";
import UserIcon from "@/app/assets/svgs/home/UserIcon";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import Button from "@/app/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { formatNaira } from "@/lib/utils";
import { OrderSkeleton } from "@/app/components/Loader";
import { PageTransition } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import { useGetTransactionDetailQuery } from "@/app/redux/api/transactionsApiSlice";

const ConfirmOrderContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  const { data: transactionData, isFetching } = useGet(
    useGetTransactionDetailQuery,
    transactionId,
    Boolean(transactionId)
  );

  const transaction = transactionData?.transaction;
  const listing = transaction?.listing;
  const seller = transaction?.seller;

  return (
    <AppShell showFooter={false} showBottomNav={false}>
      <div className="w-full bg-[#F7F8FA] relative flex flex-col">
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

        <Container className="max-w-2xl flex-1 overflow-y-auto pt-3">
          {isFetching || !transaction ? (
            <OrderSkeleton />
          ) : (
            <PageTransition>
              <div className="bg-white rounded-2xl px-4 py-4 mb-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-[70px] h-[70px] rounded-xl bg-[#F0F1F5] overflow-hidden flex-shrink-0 relative">
                    <img
                      src={listing?.images?.[0]}
                      alt={listing?.item_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-sm font-semibold mb-1 truncate">
                      {listing?.item_name}
                    </p>
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-text-primary font-extrabold text-base">
                        {formatNaira(transaction.amount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex justify-center items-center w-4 h-4 rounded-full bg-[#D1FAE5]">
                        <UserIcon />
                      </div>
                      <span className="text-[#4B5563] text-[10px]">
                        {seller?.first_name} {seller?.last_name}
                      </span>
                      {seller?.is_verified_seller && <VerifiedIcon />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl px-4 py-4 mb-5 shadow-sm">
                <h2 className="text-text-primary text-sm font-bold mb-3">
                  Delivery Method
                </h2>

                <div className="w-full flex items-start gap-3 p-3.5 rounded-[14px] border-2 border-primary bg-[#FFF5F3] text-left">
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-primary flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-[8px] h-[8px] rounded-full bg-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <LocationIcon />
                      <span className="text-text-primary text-sm font-semibold">
                        As agreed with seller
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">
                      Delivery details are arranged directly with the seller via chat
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-7">
                <div className="bg-[#FFF0EC] border border-[#FFCAB7] rounded-2xl px-4 py-4 flex items-start gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <SecureIcon size={25} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-text-primary text-sm font-bold">Escrow Protection</span>
                      <InfoIcon />
                    </div>
                    <p className="text-[#374151] text-xs leading-[1.6]">
                      Your payment will be held securely until you confirm delivery. This protects
                      both buyers and sellers in every transaction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
                <h2 className="text-text-primary text-sm font-bold mb-4">Total Cost</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">Item Price</span>
                    <span className="text-text-primary text-sm font-semibold">
                      {formatNaira(transaction.amount - transaction.platform_fee)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">Platform Fee</span>
                    <span className="text-text-primary text-sm font-semibold">
                      {formatNaira(transaction.platform_fee)}
                    </span>
                  </div>

                  <div className="h-px bg-[#F0F1F5]" />
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary font-bold">Grand Total</span>
                    <span className="text-text-primary font-bold">
                      {formatNaira(transaction.amount)}
                    </span>
                  </div>
                </div>
              </div>
            </PageTransition>
          )}
        </Container>

        <Container className="max-w-2xl py-4">
          <Button
            fullWidth
            disabled={!transaction}
            onClick={() => router.push(`/payment/${transactionId}`)}
          >
            Proceed to Payment
          </Button>
        </Container>
      </div>
    </AppShell>
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
