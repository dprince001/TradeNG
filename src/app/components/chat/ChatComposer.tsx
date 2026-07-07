import { useEffect, useRef } from "react";
import Input from "@/app/components/Input";
import MessageIcon from "@/app/assets/svgs/home/MessageIcon";
import { useSocket } from "@/app/context/SocketContext";
import { Spinner } from "@/app/components/Loader";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  conversationId: string;
  isLoading?: boolean;
}

const TYPING_IDLE_MS = 2000;

const ChatComposer = ({ value, onChange, onSend, conversationId, isLoading }: ChatComposerProps) => {
  const { startTyping, stopTyping } = useSocket();
  const isTypingRef = useRef(false);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearIdleTimeout = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  };

  const signalStoppedTyping = () => {
    clearIdleTimeout();
    if (isTypingRef.current) {
      isTypingRef.current = false;
      stopTyping(conversationId);
    }
  };

  useEffect(() => () => signalStoppedTyping(), [conversationId]);

  const handleChange = (nextValue: string) => {
    onChange(nextValue);

    if (!conversationId) return;

    if (!nextValue.trim()) {
      signalStoppedTyping();
      return;
    }

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      startTyping(conversationId);
    }

    clearIdleTimeout();
    idleTimeoutRef.current = setTimeout(signalStoppedTyping, TYPING_IDLE_MS);
  };

  const handleSend = () => {
    signalStoppedTyping();
    onSend();
  };

  return (
    <div className="flex items-center gap-3 mt-auto">
      <Input
        placeholder="Type a message..."
        className="bg-[#F3F4F6] rounded-full"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button
        onClick={handleSend}
        disabled={isLoading}
        aria-label="Send message"
        className="w-12 h-12 bg-[#FF4304] rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-orange-600 transition-colors shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <Spinner className="w-5 h-5 text-white" /> : <MessageIcon />}
      </button>
    </div>
  );
};

export default ChatComposer;
