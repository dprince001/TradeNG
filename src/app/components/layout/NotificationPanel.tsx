"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { NotificationSkeleton } from "@/app/components/Loader";
import useGet from "@/app/hooks/useGet";
import usePost from "@/app/hooks/usePost";
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/app/redux/api/notificationsApiSlice";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeAgo = (isoDate: string) => {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { data: notificationsData, isFetching, refetch } = useGet(
    useGetNotificationsQuery,
    "",
    isOpen
  );
  const { handlePost: markRead } = usePost(useMarkNotificationReadMutation);
  const { handlePost: markAllRead } = usePost(useMarkAllNotificationsReadMutation);

  const notifications = notificationsData?.notifications || [];

  if (!isOpen) return null;

  const handleNotificationClick = async (notif: any) => {
    if (!notif.read_at) {
      await markRead(notif.id, { showSuccessToast: false });
      refetch();
    }
    if (notif.related_transaction_id) {
      router.push(`/confirm-delivery?id=${notif.related_transaction_id}`);
    } else if (notif.related_conversation_id && notif.related_listing_id) {
      router.push(`/${notif.related_listing_id}/chat?c_id=${notif.related_conversation_id}`);
    } else if (notif.related_listing_id) {
      router.push(`/${notif.related_listing_id}`);
    }
    onClose();
  };

  const handleMarkAllRead = async () => {
    await markAllRead(undefined, { showSuccessToast: false });
    refetch();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity cursor-pointer"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[360px] bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft">
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-100">
          <h2 className="text-[#1D1E20] font-extrabold text-base">Notifications</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="text-[10px] font-bold text-primary hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F5F6FA] hover:bg-brand-orange hover:text-white text-[#1D1E20] flex items-center justify-center transition-all duration-200"
              aria-label="Close notifications"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {isFetching ? (
            <NotificationSkeleton />
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-text-secondary gap-3">
              <span className="text-2xl">🔔</span>
              <span className="text-xs font-bold text-text-primary block">No notifications</span>
              <span className="text-[10px] text-text-secondary">You are all caught up!</span>
            </div>
          ) : (
            notifications.map((notif: any) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative group ${
                  !notif.read_at
                    ? "bg-[#FFF5F3] border-[#FF4304]/10 shadow-[0_2px_8px_rgba(255,67,4,0.02)]"
                    : "bg-white border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="text-xs font-bold text-[#1D1E20] truncate max-w-[200px]">
                    {notif.title}
                  </span>
                  <span className="text-[9px] text-[#8F959E] font-medium whitespace-nowrap">
                    {timeAgo(notif.created_at)}
                  </span>
                </div>
                <p className="text-[11px] text-[#4B5563] leading-relaxed">{notif.body}</p>

                {!notif.read_at && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4304]" />
                    <span className="text-[8px] font-bold text-[#FF4304] uppercase tracking-wider">
                      New
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
