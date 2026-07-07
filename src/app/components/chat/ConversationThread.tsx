"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import VerifiedIcon from "@/app/assets/svgs/home/VerifiedIcon";
import { Spinner } from "@/app/components/Loader";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import {
  useGetMessageInAConversationQuery,
  useSendMessageMutation,
} from "@/app/redux/api/chatApiSlice";
import {
  useAcceptAnOfferMutation,
  useDeclineAnOfferMutation,
} from "@/app/redux/api/offersApiSlice";
import ChatMessageList from "@/app/components/chat/ChatMessageList";
import ChatComposer from "@/app/components/chat/ChatComposer";
import AcceptedOfferBanner from "@/app/components/chat/AcceptedOfferBanner";
import EscrowNoticeBar from "@/app/components/chat/EscrowNoticeBar";
import {
  getConversationCounterpart,
  getConversationItemId,
  getFullName,
} from "@/app/components/chat/chatHelpers";
import { useSocket } from "@/app/context/SocketContext";

interface ConversationThreadProps {
  conversation: any;
  currentUserId?: string;
  onBack?: () => void;
}

const ConversationThread = ({
  conversation,
  currentUserId,
  onBack,
}: ConversationThreadProps) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [liveMessages, setLiveMessages] = useState<any[]>([]);
  const { joinConversation, leaveConversation, onTyping, onStopTyping, isConnected } = useSocket();
  const [isTyping, setIsTyping] = useState(false);

  const conversationId = conversation?.id;
  const itemId = getConversationItemId(conversation);
  const listing = conversation?.listing ?? {};
  const sellerId = conversation?.seller?.id ?? listing?.seller?.id;
  const isSeller = !!currentUserId && !!sellerId && currentUserId === sellerId;

  const counterpart = getConversationCounterpart(conversation, currentUserId);
  const counterpartName = getFullName(counterpart);

  const goToCounterpartProfile = () => {
    if (!counterpart?.id) return;
    const params = new URLSearchParams({ id: counterpart.id });
    if (counterpartName) params.set("name", counterpartName);
    if (counterpart?.avatar) params.set("avatar", counterpart.avatar);
    if (counterpart?.is_verified_seller) params.set("verified", "true");
    router.push(`/seller-profile?${params.toString()}`);
  };

  const { data: conversationData, isLoading: messagesLoading } = useGet(
    useGetMessageInAConversationQuery,
    conversationId,
    !!conversationId,
  );

  const { handlePost: acceptAnOffer, isLoading: acceptAnOfferLoading } =
    usePost(useAcceptAnOfferMutation);
  const { handlePost: declineAnOffer, isLoading: declineAnOfferLoading } =
    usePost(useDeclineAnOfferMutation);
  const { handlePost: sendMessage } = usePost(useSendMessageMutation);

  const messages = [...(conversationData?.messages || [])].reverse();

  const latestAcceptedOffer = [...messages]
    .reverse()
    .find(
      (m) => m.message_type === "OFFER" && m.offer?.status === "ACCEPTED",
    )?.offer;

  // Join / leave conversation room
  useEffect(() => {
    if (!conversationId || !isConnected) return;
    joinConversation(conversationId);
    return () => leaveConversation(conversationId);
  }, [conversationId, joinConversation, leaveConversation]);

  // Listen for typing events
  useEffect(() => {
    if (!isConnected) return;

    const unsubStart = onTyping((payload) => {
      console.log(payload)
      if (
        payload.conversation_id === conversationId
      ) {
        setIsTyping(true);
      }
    });

    const unsubStop = onStopTyping((payload) => {
      if (
        payload.conversation_id === conversationId
      ) {
        setIsTyping(false);
      }
    });

    return () => {
      unsubStart();
      unsubStop();
    };
  }, [conversationId, currentUserId, onTyping, onStopTyping]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const res = await sendMessage(
      { id: conversationId, data: { body: message } },
      { showSuccessToast: false },
    );

    if (res?.success) setMessage("");
  };

  const handleCounterOffer = (offer: any) => {
    sessionStorage.setItem(
      `counter-offer-${itemId}`,
      JSON.stringify({ offerId: offer.id, conversationId }),
    );
    router.push(`/${itemId}/make-offer?mode=counter&c_id=${conversationId}`);
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#FAFAFA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-white flex-shrink-0">
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden w-8 h-8 rounded-full bg-[#F5F6FA] flex items-center justify-center flex-shrink-0"
            aria-label="Back to conversations"
          >
            <ChevronLeft
              className="w-4 h-4 text-text-primary"
              strokeWidth={2.5}
            />
          </button>
        )}

        <button
          onClick={goToCounterpartProfile}
          className="w-9 h-9 rounded-full bg-[#E5FFF4] text-[#00E58F] flex items-center justify-center overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
          aria-label={`View ${counterpartName || "user"}'s profile`}
        >
          {counterpart?.avatar ? (
            <img
              src={counterpart.avatar}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            "👤"
          )}
        </button>

        <button
          onClick={goToCounterpartProfile}
          className="min-w-0 flex-1 text-left"
          aria-label={`View ${counterpartName || "user"}'s profile`}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-text-primary font-semibold text-sm truncate hover:underline">
              {counterpartName}
            </span>
            {counterpart?.is_verified_seller && (
              <VerifiedIcon color="#10B981" size="14" />
            )}
          </div>
          <span className="text-text-secondary text-xs truncate block">
            {listing?.item_name || "Item"} {isTyping && <span className="text-primary italic ml-1">Typing...</span>}
          </span>
        </button>
      </div>

      <EscrowNoticeBar className="flex-shrink-0" />

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4 min-h-0">
        {messagesLoading ? (
          <Spinner />
        ) : (
          <ChatMessageList
            messages={messages}
            userId={currentUserId}
            sellerId={sellerId}
            isSeller={isSeller}
            acceptLoading={acceptAnOfferLoading}
            declineLoading={declineAnOfferLoading}
            onAcceptOffer={(offerId) => acceptAnOffer(offerId)}
            onDeclineOffer={(offerId) => declineAnOffer(offerId)}
            onCounterOffer={handleCounterOffer}
          />
        )}

        {latestAcceptedOffer && !isSeller && (
          <AcceptedOfferBanner
            amount={latestAcceptedOffer.amount ?? 0}
            onProceed={() =>
              router.push(`/payment/${latestAcceptedOffer.transaction_id}`)
            }
          />
        )}

        {isTyping && (
          <div className="flex gap-1.5 mt-4 mb-2 items-center bg-[#F5F6FA] w-fit px-3.5 py-2.5 rounded-2xl rounded-bl-sm border border-gray-100">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        )}
      </div>

      <div className="px-5 py-4 bg-white border-t border-gray-100 flex-shrink-0">
        <ChatComposer
          value={message}
          onChange={setMessage}
          onSend={handleSendMessage}
          conversationId={conversationId}
        />
      </div>
    </div>
  );
};

export default ConversationThread;
