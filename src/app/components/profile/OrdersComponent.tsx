import { formatNaira } from "@/lib/utils";
import React, { useState } from "react";
import IphoneImage from "@/app/assets/images/IphoneImage.png";
import Image from "next/image";
import ProgressBar from "../ProgressBar";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  date: string;
  status: "Awaiting Payment" | "Delivered" | "In Transit";
  type: "buying" | "selling";
  image: string;
}

const OrdersComponent = () => {
  const [ordersTab, setOrdersTab] = useState<"buying" | "selling">("buying");

  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 1,
      title: "iPhone 13 Pro Max",
      price: 450000,
      date: "Jul 15, 2026",
      status: "Awaiting Payment",
      type: "buying",
      image: IphoneImage.src,
    },
    {
      id: 2,
      title: "Sony WH-1000XM4",
      price: 120000,
      date: "Jul 10, 2026",
      status: "Delivered",
      type: "buying",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    },
    {
      id: 3,
      title: "iPad Pro 11-inch",
      price: 380000,
      date: "Jun 28, 2026",
      status: "Delivered",
      type: "selling",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&q=80",
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
            .map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
              >
                <div className="flex gap-4">
                  <div className="relative w-[100px] h-[100px] rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#1D1E20] leading-snug tracking-tight">
                        {item.title}
                      </h4>
                      <span className="text-[#8F959E] text-[10px] font-medium block mt-1">
                        Order #{2024000 + item.id}
                      </span>
                    </div>
                    <div>
                      <span className="text-primary text-sm font-extrabold block">
                        {formatNaira(item.price)}
                      </span>
                      <span className="text-[10px] text-gray-500 block mt-0.5">
                        {item.type === "buying" ? "Seller" : "Buyer"}: Hassan Saidu
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress & Status section */}
                <div className="border-t border-gray-50 pt-4 flex flex-col gap-3">
                  <ProgressBar
                    title="Order Status"
                    progress={
                      item.status === "Awaiting Payment"
                        ? 25
                        : item.status === "In Transit"
                          ? 65
                          : 100
                    }
                    comment={
                      item.status === "Awaiting Payment"
                        ? "Waiting for buyer's payment confirmation"
                        : item.status === "In Transit"
                          ? "Package is with the courier"
                          : "Package delivered successfully"
                    }
                    color={
                      item.status === "Awaiting Payment"
                        ? "bg-amber-500"
                        : item.status === "In Transit"
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }
                  />

                  <div className="flex justify-between items-center text-[10px] text-[#8F959E] font-semibold mt-1">
                    <span>Ordered on: {item.date}</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "Awaiting Payment"
                            ? "bg-amber-500 animate-pulse"
                            : item.status === "In Transit"
                              ? "bg-blue-500"
                              : "bg-green-500"
                        }`}
                      />
                      <span
                        className={
                          item.status === "Awaiting Payment"
                            ? "text-amber-600"
                            : item.status === "In Transit"
                              ? "text-blue-600"
                              : "text-green-600"
                        }
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
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
