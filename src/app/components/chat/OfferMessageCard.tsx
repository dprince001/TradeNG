import { Lock } from "lucide-react";
import Button from "@/app/components/Button";
import MessageBubble from "@/app/components/chat/MessageBubble";
import { formatNaira } from "@/lib/utils";

interface OfferMessageCardProps {
  amount: number;
  time: string;
  isMine: boolean;
  isCounterOffer: boolean;
  label: string;
  note?: string;
  showActions: boolean;
  closed?: boolean;
  acceptLoading?: boolean;
  declineLoading?: boolean;
  onAccept?: () => void;
  onCounter?: () => void;
  onDecline?: () => void;
}

const OfferMessageCard = ({
  amount,
  time,
  isMine,
  isCounterOffer,
  label,
  note,
  showActions,
  closed,
  acceptLoading,
  declineLoading,
  onAccept,
  onCounter,
  onDecline,
}: OfferMessageCardProps) => {
  const borderColor = isCounterOffer ? "border-primary" : "border-[#FF4304]";

  return (
    <div className={`flex flex-col mb-4 ${isMine ? "items-end" : "items-start"}`}>
      <div className={`bg-white border-2 ${borderColor} rounded-[16px] p-5 shadow-sm`}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[12px]">
            {isCounterOffer ? "🔄" : "💰"}
          </div>
          <span className="text-xs font-semibold text-text-primary">{label}</span>
        </div>

        <div className="text-[20px] font-bold text-primary mb-1">{formatNaira(amount)}</div>

        {closed ? (
          <div className="inline-flex items-center gap-1.5 mb-2 mt-2 bg-gray-100 text-[#8F959E] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            <Lock size={11} />
            Closed
          </div>
        ) : (
          showActions && (
            <div className="flex items-center gap-2 mb-3 mt-2">
              <Button variant="primary" fullWidth onClick={onAccept} loading={acceptLoading} size="sm">
                Accept
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                className="border-[#BBBBC8] text-[#BBBBC8]"
                onClick={onCounter}
              >
                Counter
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                className="border-[#BBBBC8] text-[#BBBBC8]"
                loading={declineLoading}
                onClick={onDecline}
              >
                Decline
              </Button>
            </div>
          )
        )}

        <p className="text-[10px] text-[#6B7280] mt-1 text-center">{time}</p>
      </div>

      {note && <MessageBubble body={note} time={time} isMine={isMine} className="mt-4" />}
    </div>
  );
};

export default OfferMessageCard;
