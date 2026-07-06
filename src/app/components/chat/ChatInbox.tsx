"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MessagesSquare } from "lucide-react";
import useGet from "@/app/hooks/useGet";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { useGetAllConversationsQuery } from "@/app/redux/api/chatApiSlice";
import ConversationList from "@/app/components/chat/ConversationList";
import ConversationThread from "@/app/components/chat/ConversationThread";

const ChatInbox = () => {
  const { user } = useCurrentUser();
  const currentUserId = user?.user?.id;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isFetching } = useGet(useGetAllConversationsQuery, "");
  const conversations = data?.conversations ?? [];

  const selectedId = searchParams.get("c_id");
  const activeConversation = conversations.find((c: any) => c.id === selectedId) ?? null;

  const selectConversation = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set("c_id", id);
    } else {
      params.delete("c_id");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className="h-full flex min-h-0">
      <div
        className={`w-full md:w-[340px] md:flex-shrink-0 md:border-r md:border-gray-100 bg-white ${
          selectedId ? "hidden md:block" : "block"
        }`}
      >
        <ConversationList
          conversations={conversations}
          isLoading={isFetching}
          selectedId={selectedId}
          currentUserId={currentUserId}
          onSelect={selectConversation}
        />
      </div>

      <div className={`flex-1 min-h-0 ${selectedId ? "flex" : "hidden md:flex"}`}>
        {activeConversation ? (
          <ConversationThread
            key={activeConversation.id}
            conversation={activeConversation}
            currentUserId={currentUserId}
            onBack={() => selectConversation(null)}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 text-text-secondary">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
              <MessagesSquare className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-text-primary text-sm font-semibold">Select a conversation</p>
              <p className="text-xs mt-1">Choose a chat from the list to view messages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInbox;
