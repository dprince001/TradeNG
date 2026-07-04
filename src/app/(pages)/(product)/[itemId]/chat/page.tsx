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
import { useGetOffersForAListingQuery, useAcceptAnOfferMutation, useDeclineAnOfferMutation, useCounterAnOfferMutation, useGetAllOffersReceivedQuery } from "@/app/redux/api/offersApiSlice";
import { useGetAllConversationsQuery, useGetMessageInAConversationQuery, useSendMessageMutation, useMarkMessageAsReadMutation } from "@/app/redux/api/chatApiSlice";
import { useGetListingDetailQuery } from "@/app/redux/api/listingApiSlice";
import { useSelector } from "react-redux";
import usePost from "@/app/hooks/usePost";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/app/components/Loader";

const ChatPage = () => {
  const router = useRouter();
  const { itemId } = useParams();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("c_id");
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const userId = useSelector((state: any) => state.app.userInfo?.user?.id);

  // const { data: offers, isLoading: offersLoading } = useGet(useGetOffersForAListingQuery, itemId, !!itemId);
  const { data: conversationData, isLoading: conversationLoading } = useGet(useGetMessageInAConversationQuery, conversationId, !!conversationId)
  const { data: itemDetails, isLoading: itemDetailsLoading } = useGet(useGetListingDetailQuery, itemId, !!itemId)

  const { handlePost: acceptAnOffer, isLoading: acceptAnOfferLoading } = usePost(useAcceptAnOfferMutation);
  const { handlePost: declineAnOffer, isLoading: declineAnOfferLoading } = usePost(useDeclineAnOfferMutation);
  const { handlePost: counterAnOffer, isLoading: counterAnOfferLoading } = usePost(useCounterAnOfferMutation);
  const { handlePost: sendMessage, isLoading: sendMessageLoading } = usePost(useSendMessageMutation);

  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const sellerName = itemDetails?.listing?.seller
    ? `${itemDetails?.listing?.seller.first_name ?? ""} ${itemDetails?.listing?.seller.last_name ?? ""}`.trim()
    : "Seller";

  // reverse messages
  const messages = [...(conversationData?.messages || [])].reverse();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const res = await sendMessage(
      {
        id: conversationId,
        data: {
          body: message,
        }
      },
      { showSuccessToast: false }
    );

    if (res?.success) {
      setMessage("");
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#FAFAFA] h-dvh">
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
          {itemDetails?.listing?.images?.[0] ? (
            <img src={itemDetails?.listing?.images[0]} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        <span className="text-xs font-medium text-text-primary">{itemDetails?.listing?.item_name || "Item Details"}</span>
      </div>

      <div className="px-5 py-2.5 bg-[#F9E2DB] flex items-center gap-2 z-10 border-b border-[#F9E2DB]">
        <SecureIcon size={10} />

        <span className="text-[10px] text-primary">
          Payments are held safely until delivery is confirmed
        </span>
      </div>

      <div className="w-full flex-1 overflow-y-auto">
        {conversationLoading || itemDetailsLoading ? <Spinner /> : <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
          {messages?.map((message: any) => {
            const isMine = message.sender_id === userId;

            const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            const offer = message?.offer;
            const isCounterOffer = !!offer?.parent_offer_id; 
            const isDeclinedOffer = offer?.status === "DECLINED"; 
            const note = message.body?.split(" — ")[1];

            // text messages
            if (message.message_type === "TEXT") {
              return isMine ? (
                <div
                  key={message.id}
                  className="bg-primary text-white rounded-[16px] px-4 py-3 text-xs max-w-[80%] w-fit shadow-sm ml-auto mb-4"
                >
                  <p className="mb-1">{message.body}</p>

                  <span className="text-[10px] text-[#D1FAE5]">
                    {formattedTime}
                  </span>
                </div>
              ) : (
                <div
                  key={message.id}
                  className="bg-white text-text-primary rounded-[16px] px-4 py-3 text-xs max-w-[80%] w-fit shadow-sm mr-auto mb-4"
                >
                  <p className="mb-1">{message.body}</p>

                  <span className="text-[10px] text-[#6B7280]">
                    {formattedTime}
                  </span>
                </div>
              );
            }

            // offer messages - buyer's own offer OR a seller counter shown to buyer
            if (message.message_type === "OFFER" && isMine) {
              return (
                <div key={message.id} className="flex flex-col items-end mb-4">
                  <div className="bg-white border-2 border-[#FF4304] rounded-[16px] p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[12px]">
                        💰
                      </div>

                      <span className="text-xs font-semibold text-text-primary">
                        {isDeclinedOffer ? "You declined" : isCounterOffer ? "You countered with" : "You offered"}
                      </span>
                    </div>

                    <div className="text-[20px] font-bold text-primary mb-1">
                      {formatNaira(offer?.amount ?? 0)}
                    </div>


                    <p className="text-[10px] text-[#6B7280] mt-1 text-center">
                      {formattedTime}
                    </p>
                  </div>

                  {note && (
                    <div
                      key={message.id}
                      className="bg-primary text-white rounded-[16px] px-4 py-3 text-xs max-w-[80%] w-fit shadow-sm ml-auto mt-4"
                    >
                      <p className="mb-1">{note}</p>

                      <span className="text-[10px] text-[#D1FAE5]">
                        {formattedTime}
                      </span>
                    </div>
                  )}


                </div>
              );
            }

            // seller counter shown to buyer (not mine, isCounterOffer)
            if (message.message_type === "OFFER" && !isMine && isCounterOffer) {
              return (
                <div key={message.id} className="flex flex-col items-start mb-4">
                  <div className="bg-white border-2 border-primary rounded-[16px] p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[12px]">
                        🔄
                      </div>

                      <span className="text-xs font-semibold text-primary">
                        Seller countered with
                      </span>
                    </div>

                    <div className="text-[20px] font-bold text-primary mb-1">
                      {formatNaira(offer?.amount ?? 0)}
                    </div>

                    {/* Buyer can Accept, Counter back, or Decline */}
                    <div className="flex items-center gap-2 mb-3 mt-2">
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={async () => await acceptAnOffer(offer.id)}
                        loading={acceptAnOfferLoading}
                        size="sm"
                      >
                        Accept
                      </Button>

                      <Button
                        variant="outline"
                        fullWidth
                        size="sm"
                        className="border-[#BBBBC8] text-[#BBBBC8]"
                        onClick={() => {
                          sessionStorage.setItem(
                            `counter-offer-${itemId}`,
                            JSON.stringify({ offerId: offer.id, conversationId })
                          );
                          router.push(`/${itemId}/make-offer?mode=counter&c_id=${conversationId}`);
                        }}
                      >
                        Counter
                      </Button>

                      <Button
                        variant="outline"
                        fullWidth
                        size="sm"
                        className="border-[#BBBBC8] text-[#BBBBC8]"
                        loading={declineAnOfferLoading}
                        onClick={async () => await declineAnOffer(offer.id)}
                      >
                        Decline
                      </Button>
                    </div>

                    <p className="text-[10px] text-[#6B7280] mt-1 text-center">
                      {formattedTime}
                    </p>
                  </div>

                  {note && (
                    <div
                      className="bg-white text-text-primary rounded-[16px] px-4 py-3 text-xs max-w-[80%] w-fit shadow-sm mr-auto mt-4"
                    >
                      <p className="mb-1">{note}</p>
                      <span className="text-[10px] text-[#6B7280]">{formattedTime}</span>
                    </div>
                  )}
                </div>
              );
            }

            // offer messages - seller side
            if (message.message_type === "OFFER") {
              return (
                <div key={message.id} className="flex flex-col items-start mb-4">
                  <div className="bg-white border-2 border-[#FF4304] rounded-[16px] p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[12px]">
                        💰
                      </div>

                      <span className="text-xs font-semibold text-text-primary">
                        Buyer Offered
                      </span>
                    </div>

                    <div className="text-[20px] font-bold text-primary mb-1">
                      {formatNaira(offer?.amount ?? 0)}
                    </div>

                    <div className="flex items-center gap-2 mb-4 mt-2">
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={async () => await acceptAnOffer(offer.id)}
                        loading={acceptAnOfferLoading}
                        size="sm"
                      >
                        Accept
                      </Button>

                      <Button
                        variant="outline"
                        fullWidth
                        size="sm"
                        className="border-[#BBBBC8] text-[#BBBBC8]"
                        onClick={() => {
                          sessionStorage.setItem(
                            `counter-offer-${itemId}`,
                            JSON.stringify({ offerId: offer.id, conversationId })
                          );
                          router.push(`/${itemId}/make-offer?mode=counter&c_id=${conversationId}`);
                        }}
                      >
                        Counter
                      </Button>

                      <Button
                        variant="outline"
                        fullWidth
                        size="sm"
                        className="border-[#BBBBC8] text-[#BBBBC8]"
                        loading={declineAnOfferLoading}
                        onClick={async () => await declineAnOffer(offer.id)}
                      >
                        Decline
                      </Button>
                    </div>

                    <p className="text-[10px] text-[#6B7280] mt-1 text-center">
                      {formattedTime}
                    </p>
                  </div>

                  {note && (
                    <div
                      key={message.id}
                      className="bg-white text-text-primary rounded-[16px] px-4 py-3 text-xs max-w-[80%] w-fit shadow-sm mr-auto mt-4"
                    >
                      <p className="mb-1">{note}</p>

                      <span className="text-[10px] text-[#6B7280]">
                        {formattedTime}
                      </span>
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>}
      </div>


      {/* ── Input Area ── */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3 mt-auto">
        <Input placeholder="Type a message..." className="bg-[#F3F4F6] rounded-full" value={message} onChange={(e) => setMessage(e.target.value)} />

        <button className="w-12 h-12 bg-[#FF4304] rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-orange-600 transition-colors shadow-sm active:scale-95" onClick={handleSendMessage}>
          <MessageIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;