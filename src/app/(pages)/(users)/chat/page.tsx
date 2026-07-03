"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import TopNavbar from "@/app/components/layout/TopNavbar";
import Button from "@/app/components/Button";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import avatarImg from "@/app/assets/images/seller_avatar.png";

interface Message {
  id: string;
  sender: "buyer" | "seller" | "system";
  text?: string;
  time: string;
  type?: "offer" | "counter" | "accepted";
  amount?: number;
  actions?: boolean;
}

const ChatContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const itemName = searchParams.get("name") || "iPhone 13 Pro Max";
  const itemPrice = parseFloat(searchParams.get("price") || "450000");
  const initialOffer = parseFloat(searchParams.get("offerPrice") || "350000");

  const [isCounterModalOpen, setIsCounterModalOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages simulating the mockup flow
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "buyer",
      text: "Hi, is this still available?",
      time: "10:30 AM",
    },
    {
      id: "2",
      sender: "seller",
      text: "Yes, it is! Would you like to make an offer?",
      time: "10:31 AM",
    },
    {
      id: "3",
      sender: "system",
      type: "offer",
      amount: initialOffer,
      time: "10:32 AM",
    },
    {
      id: "4",
      sender: "system",
      type: "counter",
      amount: Math.round(initialOffer * 1.08), // Counter slightly higher
      time: "10:32 AM",
      actions: true,
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "buyer",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Simulate seller automated reply
    setTimeout(() => {
      const sellerReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "seller",
        text: "Please accept or make a new counter offer using the cards above so we can finalize.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, sellerReply]);
    }, 1200);
  };

  const handleAccept = (counterAmount: number) => {
    // Disable actions on previous counter
    setMessages((prev) =>
      prev.map((msg) => (msg.type === "counter" ? { ...msg, actions: false } : msg))
    );

    // Add accepted messages
    const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "buyer",
        text: `Thanks for the offer. I will buy it at ₦${counterAmount.toLocaleString("en-NG")}`,
        time: timeStamp,
      },
      {
        id: (Date.now() + 1).toString(),
        sender: "system",
        type: "accepted",
        amount: counterAmount,
        time: timeStamp,
      },
    ]);
  };

  const handleDecline = () => {
    setMessages((prev) =>
      prev.map((msg) => (msg.type === "counter" ? { ...msg, actions: false } : msg))
    );

    const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "buyer",
        text: "I decline this offer.",
        time: timeStamp,
      },
      {
        id: (Date.now() + 1).toString(),
        sender: "seller",
        text: "No worries! Let me know if you change your mind.",
        time: timeStamp,
      },
    ]);
  };

  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen relative flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3 bg-white border-b border-gray-100 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-primary hover:bg-gray-200 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Seller profile info */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden relative border border-gray-100">
              <Image src={avatarImg} alt="TechHub Store" className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[#1D1E20] text-sm font-bold">TechHub Store</span>
                <VerifiedIcon />
              </div>
              <span className="text-text-secondary text-[10px] block">Active 5m ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Escrow banner notice */}
      <div className="bg-[#FFF5F3] px-4 py-2 border-b border-primary/10 flex justify-center items-center gap-1.5 flex-shrink-0">
        <span className="text-xs">🛡️</span>
        <span className="text-primary text-[10px] font-bold">Payments are held safely and delivery is verified</span>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
        {messages.map((msg) => {
          if (msg.sender === "system") {
            if (msg.type === "offer") {
              return (
                <div key={msg.id} className="flex justify-end animate-fadeIn">
                  <div className="bg-white border border-gray-150 rounded-[20px] rounded-tr-none px-4 py-3.5 max-w-[280px] shadow-sm">
                    <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider block mb-1">
                      Buyer offered
                    </span>
                    <span className="text-text-primary font-black text-lg">
                      {formatNaira(msg.amount || 0)}
                    </span>
                    <span className="text-[9px] text-text-secondary block mt-1.5 text-right font-medium">
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            }

            if (msg.type === "counter") {
              return (
                <div key={msg.id} className="flex justify-start animate-fadeIn">
                  <div className="bg-white border border-gray-150 rounded-[20px] rounded-tl-none px-4 py-3.5 max-w-[280px] shadow-sm flex flex-col gap-2">
                    <div>
                      <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1">
                        Seller countered with
                      </span>
                      <span className="text-text-primary font-black text-lg">
                        {formatNaira(msg.amount || 0)}
                      </span>
                    </div>

                    {msg.actions && (
                      <div className="flex gap-2 border-t border-gray-100 pt-2.5 mt-1">
                        <button
                          onClick={() => handleAccept(msg.amount || 0)}
                          className="flex-1 text-center py-1.5 text-xs font-bold text-primary hover:bg-[#FFF5F3] rounded-lg transition-colors border border-transparent"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => setIsCounterModalOpen(true)}
                          className="flex-1 text-center py-1.5 text-xs font-bold text-text-secondary hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Counter
                        </button>
                        <button
                          onClick={handleDecline}
                          className="flex-1 text-center py-1.5 text-xs font-bold text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    <span className="text-[9px] text-text-secondary text-right font-medium">
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            }

            if (msg.type === "accepted") {
              return (
                <div key={msg.id} className="w-full flex justify-center py-2 animate-scaleUp">
                  <div className="bg-[#FFF0EC] border border-[#FFCAB7] rounded-2xl p-4 text-center max-w-[300px] shadow-sm flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-text-primary text-xs font-black">Offer Accepted!</h4>
                      <p className="text-text-primary font-extrabold text-lg mt-0.5">
                        {formatNaira(msg.amount || 0)}
                      </p>
                    </div>
                    <Button
                      fullWidth
                      onClick={() =>
                        router.push(
                          `/confirm-order?name=${encodeURIComponent(
                            itemName
                          )}&price=${msg.amount}&offerPrice=${msg.amount}`
                        )
                      }
                      className="py-2.5 text-xs font-bold shadow-md bg-primary"
                    >
                      Proceed to Secure Payment
                    </Button>
                  </div>
                </div>
              );
            }
          }

          const isBuyer = msg.sender === "buyer";
          return (
            <div
              key={msg.id}
              className={`flex w-full animate-fadeIn ${
                isBuyer ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[280px] px-4 py-3 rounded-2xl shadow-sm text-sm font-semibold leading-[1.5] ${
                  isBuyer
                    ? "bg-[#FF4304] text-white rounded-tr-none"
                    : "bg-white text-text-primary rounded-tl-none border border-gray-100"
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[9px] block mt-1.5 text-right font-medium ${
                    isBuyer ? "text-white/70" : "text-text-secondary"
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Footer */}
      <div className="bg-white px-4 py-3.5 border-t border-gray-100 flex items-center gap-3 flex-shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-gray-50 font-medium text-text-primary"
        />
        <button
          onClick={handleSend}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/95 transition-all shadow-md active:scale-95 flex-shrink-0"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="rotate-45 -translate-x-0.5 translate-y-0.5"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ChatPage = () => {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-text-secondary">Loading chat session...</div>}>
      <ChatContent />
    </Suspense>
  );
};

export default ChatPage;
