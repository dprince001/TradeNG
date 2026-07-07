import { useEffect, useRef } from "react";
import MessageBubble from "@/app/components/chat/MessageBubble";
import OfferMessageCard from "@/app/components/chat/OfferMessageCard";
import {
  canRespondToOffer,
  formatMessageTime,
  getOfferLabel,
  isOfferClosed,
} from "@/app/components/chat/chatHelpers";

interface ChatMessageListProps {
  messages: any[];
  userId?: string;
  sellerId?: string;
  counterpartReadAt?: string | null;
  acceptLoading?: boolean;
  declineLoading?: boolean;
  onAcceptOffer: (offerId: string) => void;
  onDeclineOffer: (offerId: string) => void;
  onCounterOffer: (offer: any) => void;
}

const ChatMessageList = ({
  messages,
  userId,
  sellerId,
  counterpartReadAt,
  acceptLoading,
  declineLoading,
  onAcceptOffer,
  onDeclineOffer,
  onCounterOffer,
}: ChatMessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {messages.map((message) => {
        const isMine = message.sender_id === userId;
        const time = formatMessageTime(message.created_at);

        if (message.message_type === "TEXT") {
          const isRead =
            isMine &&
            !!counterpartReadAt &&
            new Date(message.created_at) <= new Date(counterpartReadAt);
          return (
            <MessageBubble
              key={message.id}
              body={message.body}
              time={time}
              isMine={isMine}
              isRead={isRead}
            />
          );
        }

        if (message.message_type === "OFFER") {
          const offer = message?.offer;
          const isCounterOffer = !!offer?.parent_offer_id;
          const note = message.body?.split(" — ")[1];
          const closed = isOfferClosed(message);

          return (
            <OfferMessageCard
              key={message.id}
              amount={offer?.amount ?? 0}
              time={time}
              isMine={isMine}
              isCounterOffer={isCounterOffer}
              label={getOfferLabel(message, sellerId)}
              note={note}
              showActions={!closed && canRespondToOffer(message, isMine)}
              closed={closed}
              acceptLoading={acceptLoading}
              declineLoading={declineLoading}
              onAccept={() => onAcceptOffer(offer.id)}
              onDecline={() => onDeclineOffer(offer.id)}
              onCounter={() => onCounterOffer(offer)}
            />
          );
        }

        return null;
      })}

      <div ref={bottomRef} />
    </>
  );
};

export default ChatMessageList;
