import { formatNaira } from "@/lib/utils";
import React, { useState } from "react";
import IphoneImage from "@/app/assets/images/IphoneImage.png";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  date: string;
  status: "Awaiting Payment" | "Delivered" | "In Transit";
  type: "buying" | "selling";
  image: string;
  seller?: string;
}

const OrdersComponent = () => {
  const [ordersTab, setOrdersTab] = useState<"buying" | "selling">("buying");

  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 1,
      title: "iPhone 13 Pro Max",
      price: 450000,
      date: "Jan 15, 2025",
      status: "Awaiting Payment",
      type: "buying",
      image: IphoneImage.src,
      seller: "TechHub Store",
    },
    {
      id: 2,
      title: "Sony WH-1000XM4",
      price: 120000,
      date: "Jan 10, 2025",
      status: "Delivered",
      type: "buying",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      seller: "AudioWorld",
    },
    {
      id: 3,
      title: "iPad Pro 11-inch",
      price: 380000,
      date: "Dec 28, 2024",
      status: "Delivered",
      type: "selling",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&q=80",
      seller: "Hassan Saidu",
    },
  ]);

  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-24">
      {/* Custom tabs */}
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

      {/* Orders list */}
      <div className="flex flex-col gap-4 flex-1">
        {orders.filter((item) => item.type === ordersTab).length > 0 ? (
          orders
            .filter((item) => item.type === ordersTab)
            .map((item) => {
              // Status configuration
              const getStatusDetails = (status: OrderItem["status"]) => {
                switch (status) {
                  case "Awaiting Payment":
                    return {
                      badgeText: "Payment in Escrow",
                      progress: 50,
                      badgeBg: "bg-[#FFF2EC]",
                      badgeColor: "text-[#E25C22]",
                    };
                  case "In Transit":
                    return {
                      badgeText: "In Transit",
                      progress: 75,
                      badgeBg: "bg-[#F0F5FF]",
                      badgeColor: "text-[#2F80ED]",
                    };
                  case "Delivered":
                    return {
                      badgeText: "Delivered",
                      progress: 100,
                      badgeBg: "bg-[#E8F8F0]",
                      badgeColor: "text-[#27AE60]",
                    };
                }
              };

              const details = getStatusDetails(item.status);

              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#F2F2F7] rounded-[20px] p-4 flex flex-col gap-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-[100px] h-[100px] rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100/50">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Content Column */}
                      <div className="flex flex-col justify-between py-0.5">
                        <div>
                          <h4 className="text-sm font-semibold text-[#1D1E20]">
                            {item.title}
                          </h4>
                          <span className="text-base font-black text-[#1D1E20] block mt-0.5">
                            {formatNaira(item.price)}
                          </span>
                          <span className="text-xs text-[#8F959E] block mt-0.5">
                            {item.type === "buying" ? "Seller" : "Buyer"}:{" "}
                            {item.seller || "TechHub Store"}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div
                          className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium w-fit mt-1.5 ${details.badgeBg} ${details.badgeColor}`}
                        >
                          {item.status === "Awaiting Payment" ||
                          item.status === "In Transit" ? (
                            <>
                              <svg
                                className="w-3 h-3 flex-shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{details.badgeText}</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-3 h-3 flex-shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>{details.badgeText}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Chevron Right */}
                    <div className="flex-shrink-0 pr-1">
                      <ChevronRight />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#F5F6FA] h-1.5 rounded-full overflow-hidden mt-1">
                    <div
                      className="bg-[#FF4304] h-full rounded-full transition-all duration-300"
                      style={{ width: `${details.progress}%` }}
                    />
                  </div>

                  {/* Date */}
                  <div className="text-[11px] text-[#8F959E] font-semibold">
                    {item.date}
                  </div>
                </div>
              );
            })
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20 gap-4 bg-white/40 border border-dashed border-gray-150 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-text-primary block">
                No orders yet
              </span>
              <span className="text-[10px] text-text-secondary mt-1 block">
                You haven&apos;t transactioned any orders.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersComponent;
