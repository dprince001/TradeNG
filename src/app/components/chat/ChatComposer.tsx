import Input from "@/app/components/Input";
import MessageIcon from "@/app/assets/svgs/home/MessageIcon";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const ChatComposer = ({ value, onChange, onSend }: ChatComposerProps) => {
  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Type a message..."
        className="bg-[#F3F4F6] rounded-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
      />

      <button
        onClick={onSend}
        aria-label="Send message"
        className="w-12 h-12 bg-[#FF4304] rounded-full flex items-center justify-center text-white flex-shrink-0 hover:bg-orange-600 transition-colors shadow-sm active:scale-95"
      >
        <MessageIcon />
      </button>
    </div>
  );
};

export default ChatComposer;
