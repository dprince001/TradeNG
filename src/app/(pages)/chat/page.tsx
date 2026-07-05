"use client";

import AppShell from "@/app/components/layout/AppShell";
import ChatInbox from "@/app/components/chat/ChatInbox";

const ChatInboxPage = () => {
  return (
    <AppShell fixedHeight showFooter={false} headerProps={{ showSearch: false }}>
      <ChatInbox />
    </AppShell>
  );
};

export default ChatInboxPage;
