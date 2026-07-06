import { useState } from "react";
import { Search, MessagesSquare } from "lucide-react";
import { Spinner } from "@/app/components/Loader";
import ConversationListItem from "@/app/components/chat/ConversationListItem";
import {
  formatConversationTime,
  getConversationCounterpart,
  getFullName,
} from "@/app/components/chat/chatHelpers";

interface ConversationListProps {
  conversations: any[];
  isLoading: boolean;
  selectedId: string | null;
  currentUserId?: string;
  onSelect: (id: string) => void;
}

const ConversationList = ({
  conversations,
  isLoading,
  selectedId,
  currentUserId,
  onSelect,
}: ConversationListProps) => {
  const [query, setQuery] = useState("");

  const filtered = conversations.filter((conversation) => {
    if (!query.trim()) return true;
    const counterpart = getConversationCounterpart(conversation, currentUserId);
    const name = getFullName(counterpart).toLowerCase();
    const itemName = (conversation?.listing?.item_name || "").toLowerCase();
    return name.includes(query.toLowerCase()) || itemName.includes(query.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
        <h1 className="text-text-primary text-lg font-bold mb-3">Chats</h1>
        <div className="flex items-center gap-2 bg-[#F5F6FA] rounded-lg px-3 py-2.5">
          <Search className="w-4 h-4 text-text-secondary flex-shrink-0" strokeWidth={2} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search conversations..."
            className="bg-transparent outline-none text-sm text-text-primary placeholder:text-text-secondary w-full"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {isLoading ? (
          <div className="py-10">
            <Spinner />
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((conversation) => {
            const counterpart = getConversationCounterpart(conversation, currentUserId);
            const lastMessage = conversation?.last_message ?? conversation?.latest_message;
            const preview =
              lastMessage?.body ||
              (lastMessage?.message_type === "OFFER" ? "Sent an offer" : "No messages yet");

            return (
              <ConversationListItem
                key={conversation.id}
                avatarUrl={counterpart?.avatar}
                name={getFullName(counterpart)}
                itemName={conversation?.listing?.item_name || "Item"}
                preview={preview}
                time={formatConversationTime(lastMessage?.created_at ?? conversation?.updated_at)}
                unread={(conversation?.unread_count ?? 0) > 0}
                active={selectedId === conversation.id}
                onClick={() => onSelect(conversation.id)}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-center gap-3 py-16 px-6 text-text-secondary">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
              <MessagesSquare className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-text-primary text-sm font-semibold">No conversations yet</p>
              <p className="text-xs mt-1">Messages with buyers and sellers will show up here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
