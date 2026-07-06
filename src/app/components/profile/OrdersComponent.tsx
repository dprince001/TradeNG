"use client";

import { formatNaira } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProgressBar from "../ProgressBar";
import { OrderSkeleton } from "@/app/components/Loader";
import { FadeInStagger, FadeInItem } from "@/app/components/Motion";
import useGet from "@/app/hooks/useGet";
import { useGetMyBuyingOrdersQuery, useGetMySellingOrdersQuery } from "@/app/redux/api/ordersApiSlice";

const statusMeta: Record<string, { progress: number; comment: string; color: string; dot: string; text: string }> = {
  PENDING_PAYMENT: {
    progress: 15,
    comment: "Waiting for payment to complete",
    color: "bg-amber-500",
    dot: "bg-amber-500 animate-pulse",
    text: "text-amber-600",
  },
  PAID: {
    progress: 45,
    comment: "Payment secured in escrow, awaiting delivery",
    color: "bg-blue-500",
    dot: "bg-blue-500",
    text: "text-blue-600",
  },
  RECEIPT_CONFIRMED: {
    progress: 80,
    comment: "Buyer confirmed receipt, payout in progress",
    color: "bg-blue-500",
    dot: "bg-blue-500",
    text: "text-blue-600",
  },
  RELEASED: {
    progress: 100,
    comment: "Order complete, funds released",
    color: "bg-green-500",
    dot: "bg-green-500",
    text: "text-green-600",
  },
  DISPUTED: {
    progress: 60,
    comment: "Under dispute review",
    color: "bg-red-500",
    dot: "bg-red-500 animate-pulse",
    text: "text-red-600",
  },
  REFUNDED: {
    progress: 100,
    comment: "Order refunded to buyer",
    color: "bg-gray-400",
    dot: "bg-gray-400",
    text: "text-gray-500",
  },
};

const OrdersComponent = () => {
  const router = useRouter();
  const [ordersTab, setOrdersTab] = useState<"buying" | "selling">("buying");

  const { data: buyingData, isFetching: buyingLoading } = useGet(useGetMyBuyingOrdersQuery, "", ordersTab === "buying");
  const { data: sellingData, isFetching: sellingLoading } = useGet(useGetMySellingOrdersQuery, "", ordersTab === "selling");

  const orders = ordersTab === "buying" ? buyingData?.orders || [] : sellingData?.orders || [];
  const isFetching = ordersTab === "buying" ? buyingLoading : sellingLoading;

  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-24">
      <div className="flex bg-[#F5F6FA] p-1 rounded-xl mb-5 shadow-inner">
        {(["buying", "selling"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setOrdersTab(tab)}
            className={`flex-1 text-center py-2.5 text-xs font-bold rounded-lg transition-all capitalize ${
              ordersTab === tab
                ? "bg-[#FF4304] text-white shadow-sm scale-[1.02]"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {isFetching ? (
          <OrderSkeleton />
        ) : orders.length > 0 ? (
          <FadeInStagger className="flex flex-col gap-4">
            {orders.map((item: any) => {
              const meta = statusMeta[item.status] || statusMeta.PENDING_PAYMENT;
              const counterparty = ordersTab === "buying" ? item.seller : item.buyer;

              return (
                <FadeInItem
                  key={item.id}
                  onClick={() =>
                    router.push(
                      item.status === "PENDING_PAYMENT"
                        ? `/payment/${item.id}`
                        : `/confirm-delivery?id=${item.id}`
                    )
                  }
                  className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.01)] cursor-pointer hover:border-primary/30 transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="relative w-[100px] h-[100px] rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={item.listing?.images?.[0]}
                        alt={item.listing?.item_name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-sm font-extrabold text-[#1D1E20] leading-snug tracking-tight">
                          {item.listing?.item_name}
                        </h4>
                        <span className="text-[#8F959E] text-[10px] font-medium block mt-1">
                          Order #{item.id?.slice(-8)}
                        </span>
                      </div>
                      <div>
                        <span className="text-primary text-sm font-extrabold block">
                          {formatNaira(item.amount)}
                        </span>
                        <span className="text-[10px] text-gray-500 block mt-0.5">
                          {ordersTab === "buying" ? "Seller" : "Buyer"}: {counterparty?.first_name} {counterparty?.last_name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-50 pt-4 flex flex-col gap-3">
                    <ProgressBar
                      title="Order Status"
                      progress={meta.progress}
                      comment={meta.comment}
                      color={meta.color}
                    />

                    <div className="flex justify-between items-center text-[10px] text-[#8F959E] font-semibold mt-1">
                      <span>Ordered on: {new Date(item.created_at).toLocaleDateString()}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                        <span className={meta.text}>{item.status?.replace(/_/g, " ")}</span>
                      </div>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20 gap-4 bg-white/40 border border-dashed border-gray-150 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-text-primary block">No orders yet</span>
              <span className="text-[10px] text-text-secondary mt-1 block">
                You haven&apos;t transacted any orders.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersComponent;
