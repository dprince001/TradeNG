import MessageBubble from "@/app/components/chat/MessageBubble";
import OfferMessageCard from "@/app/components/chat/OfferMessageCard";
import { canRespondToOffer, formatMessageTime, getOfferLabel } from "@/app/components/chat/chatHelpers";

interface ChatMessageListProps {
  messages: any[];
  userId?: string;
  sellerId?: string;
  isSeller: boolean;
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
  isSeller,
  acceptLoading,
  declineLoading,
  onAcceptOffer,
  onDeclineOffer,
  onCounterOffer,
}: ChatMessageListProps) => {
  return (
    <>
      {messages.map((message) => {
        const isMine = message.sender_id === userId;
        const time = formatMessageTime(message.created_at);

        if (message.message_type === "TEXT") {
          return <MessageBubble key={message.id} body={message.body} time={time} isMine={isMine} />;
        }

        if (message.message_type === "OFFER") {
          const offer = message?.offer;
          const isCounterOffer = !!offer?.parent_offer_id;
          const note = message.body?.split(" — ")[1];

          return (
            <OfferMessageCard
              key={message.id}
              amount={offer?.amount ?? 0}
              time={time}
              isMine={isMine}
              isCounterOffer={isCounterOffer}
              label={getOfferLabel(message, sellerId)}
              note={note}
              showActions={canRespondToOffer(message, isSeller, isMine)}
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
    </>
  );
};

export default ChatMessageList;
