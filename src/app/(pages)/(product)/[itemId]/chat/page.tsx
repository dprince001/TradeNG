// "use client";

// import { useState, useRef, useEffect, Suspense } from "react";
// import Image from "next/image";
// import { useRouter, useSearchParams, useParams } from "next/navigation";
// import TopNavbar from "@/app/components/layout/TopNavbar";
// import Button from "@/app/components/Button";
// import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
// import avatarImg from "@/app/assets/images/seller_avatar.png";
// import { useGetOffersForAListingQuery } from "@/app/redux/api/offersApiSlice";
// import useGet from "@/app/hooks/useGet";
// import { useSelector } from "react-redux";

// interface Message {
//   id: string;
//   sender: "buyer" | "seller" | "system";
//   text?: string;
//   time: string;
//   type?: "offer" | "counter" | "accepted";
//   amount?: number;
//   actions?: boolean;
// }

// const ChatContent = () => {
//   const router = useRouter();
//   const { itemId } = useParams()
//   const userId = useSelector((state: any) => state.app.userInfo?.user?.id);

//   const [mounted, setMounted] = useState(false);

// const { data: offers, isLoading: offersLoading } = useGet(useGetOffersForAListingQuery, itemId, !!itemId);

//   const [isCounterModalOpen, setIsCounterModalOpen] = useState(false);
//   const [inputText, setInputText] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [itemDetails, setItemDetails] = useState<{ image?: string; name?: string; price?: number, seller?: any } | null>(null);

//   const image = mounted ? itemDetails?.image || "" : "";
//   const itemName = mounted ? itemDetails?.name || "" : "";
//   const itemPrice = mounted ? Number(itemDetails?.price) || 0 : 0;
//   const sellerDetails = mounted ? itemDetails?.seller || null : null;

//   // Initialize messages simulating the mockup flow
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       sender: "buyer",
//       text: "Hi, is this still available?",
//       time: "10:30 AM",
//     },
//     {
//       id: "2",
//       sender: "seller",
//       text: "Yes, it is! Would you like to make an offer?",
//       time: "10:31 AM",
//     },
//     {
//       id: "3",
//       sender: "system",
//       type: "offer",
//       amount: itemPrice,
//       time: "10:32 AM",
//     },
//     {
//       id: "4",
//       sender: "system",
//       type: "counter",
//       amount: Math.round(itemPrice * 1.08), // Counter slightly higher
//       time: "10:32 AM",
//       actions: true,
//     },
//   ]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

// useEffect(() => {
//   setMounted(true);
//   const saved = sessionStorage.getItem(`make-offer-${itemId}`);

//   if (saved) {
//     try {
//       setItemDetails(JSON.parse(saved));
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }, [itemId]);

//   const handleSend = () => {
//     if (!inputText.trim()) return;

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       sender: "buyer",
//       text: inputText,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };

//     setMessages((prev) => [...prev, newMessage]);
//     setInputText("");

//     // Simulate seller automated reply
//     setTimeout(() => {
//       const sellerReply: Message = {
//         id: (Date.now() + 1).toString(),
//         sender: "seller",
//         text: "Please accept or make a new counter offer using the cards above so we can finalize.",
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };
//       setMessages((prev) => [...prev, sellerReply]);
//     }, 1200);
//   };

//   const handleAccept = (counterAmount: number) => {
//     // Disable actions on previous counter
//     setMessages((prev) =>
//       prev.map((msg) => (msg.type === "counter" ? { ...msg, actions: false } : msg))
//     );

//     // Add accepted messages
//     const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now().toString(),
//         sender: "buyer",
//         text: `Thanks for the offer. I will buy it at ₦${counterAmount.toLocaleString("en-NG")}`,
//         time: timeStamp,
//       },
//       {
//         id: (Date.now() + 1).toString(),
//         sender: "system",
//         type: "accepted",
//         amount: counterAmount,
//         time: timeStamp,
//       },
//     ]);
//   };

//   const handleDecline = () => {
//     setMessages((prev) =>
//       prev.map((msg) => (msg.type === "counter" ? { ...msg, actions: false } : msg))
//     );

//     const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now().toString(),
//         sender: "buyer",
//         text: "I decline this offer.",
//         time: timeStamp,
//       },
//       {
//         id: (Date.now() + 1).toString(),
//         sender: "seller",
//         text: "No worries! Let me know if you change your mind.",
//         time: timeStamp,
//       },
//     ]);
//   };

//   const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

//   return (
//     <div className="w-full bg-[#F7F8FA] min-h-screen relative flex flex-col max-w-md mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between px-5 pt-6 pb-3 bg-white border-b border-gray-100 shadow-sm flex-shrink-0">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => router.back()}
//             className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-primary hover:bg-gray-200 transition-colors"
//           >
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//             >
//               <polyline points="15 18 9 12 15 6" />
//             </svg>
//           </button>

//           {/* Seller profile info */}
//           <div className="flex items-center gap-2">
//             <div className="w-9 h-9 rounded-full overflow-hidden relative border border-gray-100">
//               <Image src={sellerDetails?.avatar || avatarImg} alt="Store" className="object-cover" />
//             </div>
//             <div>
//               <div className="flex items-center gap-1">
//                 <span className="text-[#1D1E20] text-sm font-bold">{sellerDetails?.first_name + " " + sellerDetails?.last_name || ""}</span>
//                 {sellerDetails?.is_verified_seller && <VerifiedIcon />}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Escrow banner notice */}
//       <div className="bg-[#FFF5F3] px-4 py-2 border-b border-primary/10 flex justify-center items-center gap-1.5 flex-shrink-0">
//         <span className="text-xs">🛡️</span>
//         <span className="text-primary text-[10px] font-bold">Payments are held safely and delivery is verified</span>
//       </div>

//       {/* Chat History */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
//         {messages.map((msg) => {
//           if (msg.sender === "system") {
//             if (msg.type === "offer") {
//               return (
//                 <div key={msg.id} className="flex justify-end animate-fadeIn">
//                   <div className="bg-white border border-gray-150 rounded-[20px] rounded-tr-none px-4 py-3.5 max-w-[280px] shadow-sm">
//                     <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider block mb-1">
//                       Buyer offered
//                     </span>
//                     <span className="text-text-primary font-black text-lg">
//                       {formatNaira(msg.amount || 0)}
//                     </span>
//                     <span className="text-[9px] text-text-secondary block mt-1.5 text-right font-medium">
//                       {msg.time}
//                     </span>
//                   </div>
//                 </div>
//               );
//             }

//             if (msg.type === "counter") {
//               return (
//                 <div key={msg.id} className="flex justify-start animate-fadeIn">
//                   <div className="bg-white border border-gray-150 rounded-[20px] rounded-tl-none px-4 py-3.5 max-w-[280px] shadow-sm flex flex-col gap-2">
//                     <div>
//                       <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1">
//                         Seller countered with
//                       </span>
//                       <span className="text-text-primary font-black text-lg">
//                         {formatNaira(msg.amount || 0)}
//                       </span>
//                     </div>

//                     {msg.actions && (
//                       <div className="flex gap-2 border-t border-gray-100 pt-2.5 mt-1">
//                         <button
//                           onClick={() => handleAccept(msg.amount || 0)}
//                           className="flex-1 text-center py-1.5 text-xs font-bold text-primary hover:bg-[#FFF5F3] rounded-lg transition-colors border border-transparent"
//                         >
//                           Accept
//                         </button>
//                         <button
//                           onClick={() => setIsCounterModalOpen(true)}
//                           className="flex-1 text-center py-1.5 text-xs font-bold text-text-secondary hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                           Counter
//                         </button>
//                         <button
//                           onClick={handleDecline}
//                           className="flex-1 text-center py-1.5 text-xs font-bold text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                           Decline
//                         </button>
//                       </div>
//                     )}

//                     <span className="text-[9px] text-text-secondary text-right font-medium">
//                       {msg.time}
//                     </span>
//                   </div>
//                 </div>
//               );
//             }

//             if (msg.type === "accepted") {
//               return (
//                 <div key={msg.id} className="w-full flex justify-center py-2 animate-scaleUp">
//                   <div className="bg-[#FFF0EC] border border-[#FFCAB7] rounded-2xl p-4 text-center max-w-[300px] shadow-sm flex flex-col items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold">
//                       ✓
//                     </div>
//                     <div>
//                       <h4 className="text-text-primary text-xs font-black">Offer Accepted!</h4>
//                       <p className="text-text-primary font-extrabold text-lg mt-0.5">
//                         {formatNaira(msg.amount || 0)}
//                       </p>
//                     </div>
//                     <Button
//                       fullWidth
//                       onClick={() =>
//                         router.push(
//                           `/confirm-order?name=${encodeURIComponent(
//                             itemName
//                           )}&price=${msg.amount}&offerPrice=${msg.amount}`
//                         )
//                       }
//                       className="py-2.5 text-xs font-bold shadow-md bg-primary"
//                     >
//                       Proceed to Secure Payment
//                     </Button>
//                   </div>
//                 </div>
//               );
//             }
//           }

//           const isBuyer = msg.sender === "buyer";
//           return (
//             <div
//               key={msg.id}
//               className={`flex w-full animate-fadeIn ${isBuyer ? "justify-end" : "justify-start"
//                 }`}
//             >
//               <div
//                 className={`max-w-[280px] px-4 py-3 rounded-2xl shadow-sm text-sm font-semibold leading-[1.5] ${isBuyer
//                   ? "bg-[#FF4304] text-white rounded-tr-none"
//                   : "bg-white text-text-primary rounded-tl-none border border-gray-100"
//                   }`}
//               >
//                 <p>{msg.text}</p>
//                 <span
//                   className={`text-[9px] block mt-1.5 text-right font-medium ${isBuyer ? "text-white/70" : "text-text-secondary"
//                     }`}
//                 >
//                   {msg.time}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="flex-1">
//         {offers?.offers?.map((offer: any) => {
//           const isCurrentUser = userId == offer?.buyer?.id;

//           return (
//             <div key={offer.id} className="flex justify-end animate-fadeIn mb-4">
//               <div className="bg-white border border-gray-150 rounded-[20px] rounded-tr-none px-4 py-3.5 max-w-[280px] shadow-sm">
//                 <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider block mb-1">
//                   Buyer offered
//                 </span>
//                 <span className="text-text-primary font-black text-lg">
//                   {formatNaira(offer.amount)}
//                 </span>
//                 <span className="text-[9px] text-text-secondary block mt-1.5 text-right font-medium">
//                   {offer.timestamp}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Input Message Footer */}
//       <div className="bg-white px-4 py-3.5 border-t border-gray-100 flex items-center gap-3 flex-shrink-0">
//         <input
//           type="text"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           placeholder="Type a message..."
//           className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-gray-50 font-medium text-text-primary"
//         />

//         <button
//           onClick={handleSend}
//           className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/95 transition-all shadow-md active:scale-95 flex-shrink-0"
//         >
//           <svg
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             className="rotate-45 -translate-x-0.5 translate-y-0.5"
//           >
//             <line x1="22" y1="2" x2="11" y2="13" />
//             <polygon points="22 2 15 22 11 13 2 9 22 2" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// const ChatPage = () => {
//   return (
//     <Suspense fallback={<div className="p-8 text-center text-sm text-text-secondary">Loading chat session...</div>}>
//       <ChatContent />
//     </Suspense>
//   );
// };

// export default ChatPage;




"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TopNavbar from "@/app/components/layout/TopNavbar";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import SecureIcon from "@/app/assets/svgs/home/SecureIcon";
import SuccessIcon from "@/app/assets/svgs/home/SuccessIcon";
import Button from "@/app/components/Button";
import IphoneImage from "@/app/assets/images/IphoneImage.png";
import Image from "next/image";
import Input from "@/app/components/Input";
import MessageIcon from "@/app/assets/svgs/home/MessageIcon";
import useGet from "@/app/hooks/useGet";
import { useGetOffersForAListingQuery, useAcceptAnOfferMutation, useDeclineAnOfferMutation, useCounterAnOfferMutation } from "@/app/redux/api/offersApiSlice";
import { useSelector } from "react-redux";
import usePost from "@/app/hooks/usePost";

const ChatPage = () => {
  const router = useRouter();
  const { itemId } = useParams();
  const [mounted, setMounted] = useState(false);
  const [itemDetails, setItemDetails] = useState<any>({});
  const userId = useSelector((state: any) => state.app.userInfo?.user?.id);

  const { data: offers, isLoading: offersLoading } = useGet(useGetOffersForAListingQuery, itemId, !!itemId);


  const { handlePost: acceptAnOffer, isLoading: acceptAnOfferLoading } = usePost(useAcceptAnOfferMutation);
  const { handlePost: declineAnOffer, isLoading: declineAnOfferLoading } = usePost(useDeclineAnOfferMutation);
  const { handlePost: counterAnOffer, isLoading: counterAnOfferLoading } = usePost(useCounterAnOfferMutation);


  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem(`make-offer-${itemId}`);

    if (saved) {
      try {
        setItemDetails(JSON.parse(saved));
      } catch (e) {
        console.log(e);
      }
    }
  }, [itemId]);

  const offersList = offers?.offers ?? offers?.data?.offers ?? [];
  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const sellerName = itemDetails?.seller
    ? `${itemDetails.seller.first_name ?? ""} ${itemDetails.seller.last_name ?? ""}`.trim()
    : "Seller";

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* ── Header ── */}
      <TopNavbar
        onBack={() => router.back()}
        title={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E5FFF4] text-[#00E58F] flex items-center justify-center overflow-hidden">
              {itemDetails?.seller?.avatar ? (
                <img src={itemDetails.seller.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                "👤"
              )}
            </div>

            <span className="text-text-primary font-semibold text-xs">{sellerName}</span>
            {itemDetails?.seller?.is_verified_seller && (
              <VerifiedIcon color="#10B981" size="14" />
            )}
          </div>
        }
      />

      <div className="px-5 py-3 flex items-center gap-3 border-b border-gray-100 z-10 bg-white">
        <div className="w-10 h-10 rounded flex-shrink-0 relative overflow-hidden bg-[#F0F1F5]">
          {itemDetails?.image ? (
            <img src={itemDetails.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        <span className="text-xs font-medium text-text-primary">{itemDetails?.name || "Item Details"}</span>
      </div>

      <div className="px-5 py-2.5 bg-[#F9E2DB] flex items-center gap-2 z-10 border-b border-[#F9E2DB]">
        <SecureIcon size={10} />

        <span className="text-[10px] text-primary">
          Payments are held safely until delivery is confirmed
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
        {/* Welcome Messages */}
        <div className="bg-primary text-white rounded-[16px] px-4 py-3 text-xs max-w-[80%] shadow-sm ml-auto mb-4">
          <p className="mb-2">
            Hi! Is this still available?
          </p>
          <span className="text-[10px] text-[#D1FAE5]">10:30 AM</span>
        </div>

        <div className="bg-white text-text-primary rounded-[16px] px-4 py-3 text-xs max-w-[80%] shadow-sm mr-auto mb-4">
          <p className="mb-2">
            Yes, it is! Would you like to make an offer?
          </p>
          <span className="text-[10px] text-[#6B7280]">10:32 AM</span>
        </div>

        {/* Dynamically Loaded Offers */}
        {offersList.map((offer: any) => {
          const formattedTime = new Date(offer.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          if (offer.status === "ACCEPTED") {
            return (
              <div key={offer.id} className="bg-[#FDF3F0] border-2 border-primary rounded-2xl text-primary p-5 text-center shadow-sm max-w-[80%] mx-auto mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <SuccessIcon color="#FF4304" size={20} />
                  <span className="text-xs font-bold">Offer accepted at</span>
                </div>

                <p className="text-[20px] font-bold mb-3 tracking-tight">{formatNaira(offer.amount)}</p>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => router.push(`/${itemId}/confirm-order?offerId=${offer.id}`)}
                >
                  Proceed to Secure Payment
                </Button>

                <p className="text-[10px] px-4 leading-relaxed mt-2 text-[#6B7280]">
                  Your payment will be held securely until you confirm delivery
                </p>
              </div>
            );
          }

          if (offer.status === "DECLINED") {
            return (
              <div key={offer.id} className="w-full flex justify-center py-2 animate-scaleUp mb-4">
                <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 text-center max-w-[80%] shadow-sm">
                  <span className="text-xs font-semibold text-gray-500">Offer of {formatNaira(offer.amount)} was declined</span>
                </div>
              </div>
            );
          }

          if (offer.parent_offer_id === null) {
            // Buyer Offer Card
            return (
              <div key={offer.id} className="flex flex-col items-end mb-4">
                <div className="bg-white border-2 border-[#FF4304] rounded-[16px] p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[12px]">
                      💰
                    </div>

                    <span className="text-xs font-semibold text-text-primary">Buyer offered</span>
                  </div>

                  <div className="text-[20px] font-bold text-primary mb-1">{formatNaira(offer.amount)}</div>
                  {offer.note && <p className="text-xs text-[#6B7280] italic max-w-[200px] mb-1">{offer.note}</p>}
                  <p className="text-[10px] text-[#6B7280] mt-1 text-center">{formattedTime}</p>
                </div>
              </div>
            );
          } else {
            // Seller Counter Offer Card
            return (
              <div key={offer.id} className="flex flex-col items-start mb-4">
                <div className="bg-white border-2 border-[#FF4304] rounded-[16px] p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[12px]">
                      💰
                    </div>

                    <span className="text-xs font-semibold text-text-primary">Seller Countered with</span>
                  </div>

                  <div className="text-[20px] font-bold text-primary mb-1">{formatNaira(offer.amount)}</div>
                  {offer.note && <p className="text-xs text-[#6B7280] italic max-w-[200px] mb-1">{offer.note}</p>}

                  <div className="flex items-center gap-2 mb-4 mt-2">
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={async () => {
                        await acceptAnOffer(offer.id);
                      }}
                      size="sm"
                      loading={acceptAnOfferLoading}
                    >
                      Accept
                    </Button>

                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        router.push(`/${itemId}/make-offer`);
                      }}
                      className="border-[#BBBBC8] text-[#BBBBC8]"
                      size="sm"
                    >
                      Counter
                    </Button>

                    <Button
                      variant="outline"
                      fullWidth
                      onClick={async () => {
                        await declineAnOffer(offer.id);
                      }}
                      size="sm"
                      className="border-[#BBBBC8] text-[#BBBBC8]"
                      loading={declineAnOfferLoading}
                    >
                      Decline
                    </Button>
                  </div>

                  <p className="text-[10px] text-[#6B7280] mt-1 text-center">{formattedTime}</p>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* ── Input Area ── */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
        <Input placeholder="Type a message..." className="bg-[#F3F4F6] rounded-full" />

        <button className="w-12 h-12 bg-[#FF4304] rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-orange-600 transition-colors shadow-sm active:scale-95">
          <MessageIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;