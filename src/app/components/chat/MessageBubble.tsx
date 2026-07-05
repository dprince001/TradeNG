import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  body: string;
  time: string;
  isMine: boolean;
  className?: string;
}

const MessageBubble = ({ body, time, isMine, className }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "rounded-[16px] px-4 py-3 text-xs max-w-[80%] w-fit shadow-sm mb-4",
        isMine ? "bg-primary text-white ml-auto" : "bg-white text-text-primary mr-auto",
        className
      )}
    >
      <p className="mb-1">{body}</p>
      <span className={cn("text-[10px]", isMine ? "text-[#D1FAE5]" : "text-[#6B7280]")}>{time}</span>
    </div>
  );
};

export default MessageBubble;
