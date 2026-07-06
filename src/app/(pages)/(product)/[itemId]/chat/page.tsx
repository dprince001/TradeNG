"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import BackButton from "@/app/components/layout/BackButton";
import Container from "@/app/components/layout/Container";
import AppShell from "@/app/components/layout/AppShell";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import { useAcceptAnOfferMutation, useDeclineAnOfferMutation, useCounterAnOfferMutation } from "@/app/redux/api/offersApiSlice";
import { useGetMessageInAConversationQuery, useSendMessageMutation } from "@/app/redux/api/chatApiSlice";
import { useGetListingDetailQuery } from "@/app/redux/api/listingApiSlice";
import { useSelector } from "react-redux";
import { Spinner } from "@/app/components/Loader";
import ChatMessageList from "@/app/components/chat/ChatMessageList";
import ChatComposer from "@/app/components/chat/ChatComposer";
import AcceptedOfferBanner from "@/app/components/chat/AcceptedOfferBanner";
import EscrowNoticeBar from "@/app/components/chat/EscrowNoticeBar";

const ChatPage = () => {
  const router = useRouter();
  const { itemId } = useParams();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("c_id");
  const [message, setMessage] = useState("");
  const userId = useSelector((state: any) => state.app.userInfo?.user?.id);

  const { data: conversationData, isLoading: conversationLoading } = useGet(useGetMessageInAConversationQuery, conversationId, !!conversationId)
  const { data: itemDetails, isLoading: itemDetailsLoading } = useGet(useGetListingDetailQuery, itemId, !!itemId)

  const { handlePost: acceptAnOffer, isLoading: acceptAnOfferLoading } = usePost(useAcceptAnOfferMutation);
  const { handlePost: declineAnOffer, isLoading: declineAnOfferLoading } = usePost(useDeclineAnOfferMutation);
  const { handlePost: sendMessage } = usePost(useSendMessageMutation);

  const sellerId = itemDetails?.listing?.seller?.id;
  const isSeller = !!userId && !!sellerId && userId === sellerId;

  const sellerName = itemDetails?.listing?.seller
    ? `${itemDetails?.listing?.seller.first_name ?? ""} ${itemDetails?.listing?.seller.last_name ?? ""}`.trim()
    : "Seller";

  const messages = [...(conversationData?.messages || [])].reverse();

  const latestAcceptedOffer = [...messages]
    .reverse()
    .find((m) => m.message_type === "OFFER" && m.offer?.status === "ACCEPTED")?.offer;

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const res = await sendMessage(
      { id: conversationId, data: { body: message } },
      { showSuccessToast: false }
    );

    if (res?.success) setMessage("");
  };

  const handleCounterOffer = (offer: any) => {
    sessionStorage.setItem(
      `counter-offer-${itemId}`,
      JSON.stringify({ offerId: offer.id, conversationId })
    );
    router.push(`/${itemId}/make-offer?mode=counter&c_id=${conversationId}`);
  };

  return (
    <AppShell fixedHeight showFooter={false} showBottomNav={false}>
    <div className="w-full h-full flex flex-col bg-[#FAFAFA]">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-50/50 sticky top-0 z-30">
        <Container className="max-w-2xl flex items-center gap-3 pt-6 pb-4">
          <BackButton />

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
        </Container>
      </div>

      <div className="flex items-center gap-3 border-b border-gray-100 z-10 bg-white">
        <Container className="max-w-2xl py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded flex-shrink-0 relative overflow-hidden bg-[#F0F1F5]">
            {itemDetails?.listing?.images?.[0] ? (
              <img src={itemDetails?.listing?.images[0]} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full" />
            )}
          </div>

          <span className="text-xs font-medium text-text-primary">{itemDetails?.listing?.item_name || "Item Details"}</span>
        </Container>
      </div>

      <div className="bg-[#F9E2DB] z-10 border-b border-[#F9E2DB]">
        <Container className="max-w-2xl">
          <EscrowNoticeBar className="px-0" />
        </Container>
      </div>

      <div className="w-full flex-1 overflow-y-auto">
        {conversationLoading || itemDetailsLoading ? <Spinner /> : <Container className="max-w-2xl flex-1 overflow-y-auto pt-6 pb-4">
          <ChatMessageList
            messages={messages}
            userId={userId}
            sellerId={sellerId}
            isSeller={isSeller}
            acceptLoading={acceptAnOfferLoading}
            declineLoading={declineAnOfferLoading}
            onAcceptOffer={(offerId) => acceptAnOffer(offerId)}
            onDeclineOffer={(offerId) => declineAnOffer(offerId)}
            onCounterOffer={handleCounterOffer}
          />
        </Container>}

        {latestAcceptedOffer && !isSeller && (
          <Container className="max-w-2xl pb-4">
            <AcceptedOfferBanner
              amount={latestAcceptedOffer.amount ?? 0}
              onProceed={() => router.push("/profile/orders")}
            />
          </Container>
        )}
      </div>

      {/* ── Input Area ── */}
      <div className="bg-white border-t border-gray-100 mt-auto">
        <Container className="max-w-2xl py-4">
          <ChatComposer value={message} onChange={setMessage} onSend={handleSendMessage} />
        </Container>
      </div>
    </div>
    </AppShell>
  );
};

export default ChatPage;
