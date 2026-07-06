"use client";

import { Suspense } from "react";
import AppShell from "@/app/components/layout/AppShell";
import ChatInbox from "@/app/components/chat/ChatInbox";

const ChatInboxPage = () => {
  return (
    <AppShell fixedHeight showFooter={false} headerProps={{ showSearch: false }}>
      <Suspense fallback={null}>
        <ChatInbox />
      </Suspense>
    </AppShell>
  );
};

export default ChatInboxPage;
